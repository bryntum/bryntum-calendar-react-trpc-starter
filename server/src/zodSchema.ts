import { z } from 'zod';

export const EventSchema = z.object({
    id             : z.number(),
    name           : z.string().optional(),
    readOnly       : z.boolean().optional(),
    resourceId     : z.coerce.number().optional(),
    timeZone       : z.string().optional(),
    draggable      : z.boolean().optional(),
    resizable      : z.string().optional(),
    allDay         : z.boolean().optional(),
    duration       : z.number().optional(),
    durationUnit   : z.string().optional(),
    startDate      : z.string().optional(),
    endDate        : z.string().optional(),
    exceptionDates : z.string().optional(),
    recurrenceRule : z.string().optional(),
    cls            : z.string().optional(),
    eventColor     : z.string().optional(),
    iconCls        : z.string().optional(),
    style          : z.string().optional()
});

export const ResourceSchema = z.object({
    id         : z.number(),
    name       : z.string(),
    eventColor : z.string().optional(),
    readOnly   : z.boolean().optional()
});

