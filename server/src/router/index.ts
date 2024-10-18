import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { Event, Resource } from '../models';
import { EventSchema } from '../zodSchema';

export const t = initTRPC.create();

export const appRouter = t.router({
    getResources : t.procedure.query(async() => {
        const resourcesData = await Resource.findAll();
        const resources = resourcesData.map((resource) => resource.dataValues);
        return resources;
    }),
    getEvents : t.procedure.query(async() => {
        const eventsData = await Event.findAll();
        const events = eventsData.map((event) => event.dataValues);
        return events;
    }),
    createEvent : t.procedure.input(
        EventSchema.partial({ id : true })).mutation(async(opts) => {
        const newEvent = await Event.create(opts.input);
        return newEvent;
    }),
    updateEvent : t.procedure.input(
        EventSchema.partial()).mutation(async(opts) => {
        const { id, ...rest } = opts.input;
        await Event.update(rest, { where : { id } });
        return { success : true };
    }),
    deleteEvent : t.procedure.input(z.number()).mutation(async(opts) => {
        const id  = opts.input;
        await Event.destroy({ where : { id } });
        return { success : true };
    })
});

// export type definition of API
export type AppRouter = typeof appRouter;