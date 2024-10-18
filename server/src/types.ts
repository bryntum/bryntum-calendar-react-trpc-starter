import { z } from 'zod';
import { EventSchema, ResourceSchema } from './zodSchema';

export type EventSchemaType = z.infer<typeof EventSchema>;
export type ResourceSchemaType = z.infer<typeof ResourceSchema>;