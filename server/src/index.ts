import express from 'express';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './router';

const app = express();

app.use(cors({
    origin : 'http://localhost:5173'
}));

app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
        router : appRouter,
        onError(opts) {
            const { error } = opts;
            console.error('Error:', error);
            if (error.code === 'INTERNAL_SERVER_ERROR') {
                // send to bug reporting
            }
        }
    })
);

app.listen(4000);