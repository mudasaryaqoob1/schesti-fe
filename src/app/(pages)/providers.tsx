'use client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ProgressBar
        height="4px"
        color="#EF9F28"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </QueryClientProvider>
  );
}
