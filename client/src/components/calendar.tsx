import { useEffect, useMemo, useRef } from 'react';
import { trpc } from '../utils';

import { BryntumCalendar } from '@bryntum/calendar-react';

import { calendarProps } from '../config';
import { EventModel, ResourceModel } from '@bryntum/calendar';
import '@bryntum/calendar/calendar.stockholm.css';

type SyncData  = {
    action: 'dataset' | 'add' | 'remove' | 'update';
    record: ResourceModel | EventModel;
    records: {
        data: ResourceModel | EventModel ;
        meta: {
          modified: Partial<ResourceModel> | Partial<EventModel>;
        };
      }[];
    changes: Partial<ResourceModel> | Partial<EventModel>;
    store: {
      id: 'resources' | 'events';
    };
  };

function Calendar() {
    const
        resourcesQuery = trpc.getResources.useQuery(undefined, {
            refetchOnWindowFocus : false
        }),
        eventsQuery = trpc.getEvents.useQuery(undefined, {
            refetchOnWindowFocus : false
        });

    const
        events = useMemo(() => eventsQuery?.data || [], [eventsQuery]),
        resources = useMemo(() => resourcesQuery?.data || [], [resourcesQuery]);

    const calendarRef = useRef<BryntumCalendar>(null);

    const utils = trpc.useUtils();

    const eventDeleteMutation = trpc.deleteEvent.useMutation({
            onSuccess() {
                utils.getEvents.invalidate();
            }
        }),
        eventCreateMutation = trpc.createEvent.useMutation({
            onSuccess() {
                utils.getEvents.invalidate();
            }
        }),eventUpdateMutation = trpc.updateEvent.useMutation({
            onSuccess() {
                utils.getEvents.invalidate();
            }
        });

    useEffect(() => {
        // Bryntum calendar instance
        const calendar = calendarRef?.current?.instance;
        console.log({ calendar });
    }, []);


    function deleteEvent(id: number) {
        eventDeleteMutation.mutate(id);
    }

    async function createEvent(record: EventModel) {
        const { id, resourceId, startDate, endDate, timeZone, recurrenceRule, resizable, exceptionDates, cls, eventColor, eventStyle, ...rest } = record;

        eventCreateMutation.mutate({
            resourceId     : Number(resourceId),
            timeZone       : timeZone ? `${timeZone}` : undefined,
            resizable      : `${resizable}`,
            exceptionDates : `${exceptionDates}`,
            startDate      : `${startDate}`,
            endDate        : `${endDate}`, ...rest,
            recurrenceRule : recurrenceRule ? `${recurrenceRule}` : undefined
        });
    }

    async function updateEvent(id: number, changes: Partial<EventModel>) {
        const newValues = Object.fromEntries(
            Object.entries(changes).map(([key, obj]) => [key, obj.value])
        );

        // check if only duration is changed
        if (newValues.duration === null) return;

        if (newValues.timeZone) {
            newValues.timeZone = `${newValues.timeZone}`;
        }
        else {
            newValues.timeZone = undefined;
        }

        eventUpdateMutation.mutate(
            { id, ...newValues }
        );
    }

    const syncData = ({ store, action, record, records, changes }: SyncData) => {
        const storeId = store.id;
        if (storeId === 'events') {
            if (action === 'remove') {
                if (`${records[0]?.data?.id}`.startsWith('_generated')) return;
                records.forEach((record) => {
                    deleteEvent(Number(record.data.id));
                });
            }
            if (action === 'update') {
                if (`${record.id}`.startsWith('_generated')) return;
                updateEvent(Number(record.id), changes as Partial<EventModel>);
            }
        }
    };

    const afterEventSave = (event: EventModel) => {
        createEvent(event.eventRecord.data as EventModel);
    };

    return (
        <BryntumCalendar
            ref={calendarRef}
            events={events}
            resources={resources}
            onDataChange={syncData}
            onAfterEventSave={afterEventSave}
            {...calendarProps}
        />
    );
}

export default Calendar;
