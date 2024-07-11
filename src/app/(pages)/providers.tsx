'use client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { ConfigProvider } from 'antd';
const queryClient = new QueryClient();

const PRIMARY_COLOR = '#007AB6';
const SECONDARY_COLOR = '#E6F2F8';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          components: {
            Tabs: {
              inkBarColor: PRIMARY_COLOR,
              colorBorderSecondary: '#EAECF0',
              lineWidth: 2
            },
            Switch: {
              colorPrimary: PRIMARY_COLOR,
              colorPrimaryHover: SECONDARY_COLOR,
            },
            Radio: {
              colorPrimary: PRIMARY_COLOR,
            },
            Checkbox: {
              colorPrimary: PRIMARY_COLOR,
              colorPrimaryHover: PRIMARY_COLOR,
            },
            Collapse: {
              headerBg: '#F9F9F9',
              colorBorder: '#EAECF0',
            },
            Table: {
              headerColor: "#475467"
            }
          },
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
