import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { trpc } from './utils';
import Calendar from './components/calendar';
import '@bryntum/calendar/calendar.stockholm.css';

const queryClient = new QueryClient();
const trpcClient = trpc.createClient({
    links : [
        httpBatchLink({
            url : 'http://localhost:4000/trpc'
        })
    ]
});

export default function App() {
    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <Calendar />
            </QueryClientProvider>
        </trpc.Provider>
    );
}