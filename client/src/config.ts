import { BryntumCalendarProps } from '@bryntum/calendar-react';

const calendarProps: BryntumCalendarProps = {
    date             : new Date(2024, 11, 9),
    timeZone         : 'UTC',
    eventEditFeature : {
        items : {
            nameField : {
                required : true
            }
        }
    }
};

export { calendarProps };