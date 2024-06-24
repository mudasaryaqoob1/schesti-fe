'use client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { ConfigProvider } from 'antd';
const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          components: {
            Tabs: {
              inkBarColor: '#007AB6',
            }
          }
        }}
      >
        {children}
      </ConfigProvider>
      <ProgressBar
        height="4px"
        color="#EF9F28"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </QueryClientProvider>
  );
}
