'use client';
import { useParams } from 'next/navigation';
import { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';

import TertiaryHeading from '@/app/component/headings/tertiary';
import { IInvoice } from '@/app/interfaces/invoices.interface';
import { HttpService } from '@/app/services/base.service';
import { selectToken } from '@/redux/authSlices/auth.selector';
import QuinaryHeading from '@/app/component/headings/quinary';
import QuaternaryHeading from '@/app/component/headings/quaternary';
import Table, { type ColumnType } from 'antd/es/table';
import { ConfigProvider, Divider, Skeleton } from 'antd';
import CustomButton from '@/app/component/customButton/button';
import { PDFDownloadLink } from '@react-pdf/renderer';
import moment from 'moment';
import { RootState } from '@/redux/store';
import { withAuth } from '@/app/hoc/withAuth';
import { useQuery } from 'react-query';
import { invoiceService } from '@/app/services/invoices.service';
import { IResponseInterface } from '@/app/interfaces/api-response.interface';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { IUpdateCompanyDetail } from '@/app/interfaces/companyInterfaces/updateCompany.interface';
import dynamic from 'next/dynamic';

const NewClientPdf = dynamic(() => import("@/app/component/newClientPdf"), { ssr: false });

function ViewSubcontractorInvoicePage() {
  const token = useSelector(selectToken);
  const params = useParams<{ id: string }>();
  const id = params.id;
  const auth = useSelector((state: RootState) => state.auth);
  const user = auth.user?.user as IUpdateCompanyDetail | undefined;
  useLayoutEffect(() => {
    if (token) {
      HttpService.setToken(token);
    }
  }, [token]);

  const invoiceQuery = useQuery<
    IResponseInterface<{ invoice: IInvoice }> | null,
    AxiosError<{ message: string; statusCode: number }>
  >(
    ['get-contractor-invoice', id],
    () => {
      if (!id) {
        return null;
      }
      return invoiceService.httpGetSubcontractorInvoiceById(id);
    },
    {
      onError(err) {
        toast.error(err.response?.data.message || 'Unable to get the invoice');
      },
      staleTime: 60 * 5000,
    }
  );

  const columns: ColumnType<IInvoice['invoiceItems'][0]>[] = [
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
    },
    {
      title: 'Unit Cost',
      dataIndex: 'unitCost',
    },
    {
      title: 'Total Price',
      dataIndex: 'total',
      render(_value, record) {
        return `$${record.total}`;
      },
    },
  ];

  // calculate sub total
  function calculateSubTotal(items: IInvoice['invoiceItems']) {
    return items.reduce((total, invoice) => {
      return total + invoice.quantity * invoice.unitCost;
    }, 0);
  }

  if (invoiceQuery.isLoading) {
    return <Skeleton />;
  }

  if (!invoiceQuery.data?.data?.invoice || !user) {
    return null;
  }

  const invoiceData = invoiceQuery.data.data.invoice;
  console.log({ invoiceData });
  return (
    <section className="mx-16 my-2">
      <div className="p-5 flex flex-col rounded-lg border border-silverGray shadow-secondaryShadow2 bg-white">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex items-center space-x-5">
            <TertiaryHeading title="Invoice Details" />
            <div className="flex items-center space-x-2">
              <QuinaryHeading
                title="Invoice Number#"
                className="text-gray-400"
              />
              <QuaternaryHeading title={invoiceData.invoiceNumber} />
            </div>
          </div>
          {invoiceData.status === 'paid' ? (
            <div className="inline-flex items-center rounded-lg whitespace-nowrap border px-7 py-3 w-fit font-normal transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent text-secondary-foreground hover:bg-secondary/80 text-[#6aa689] text-md bg-green-50">
              Paid
            </div>
          ) : (
            <div className="inline-flex items-center rounded-lg whitespace-nowrap border px-7 py-3 w-fit font-normal transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent text-secondary-foreground hover:bg-secondary/80 text-[#EFA037] text-md bg-yellow-50">
              Unpaid
            </div>
          )}
        </div>
        <div className="grid grid-cols-5 gap-5 mt-5">
          <div>
            <QuinaryHeading title="Invoice Subject" className="text-gray-400" />

            <QuaternaryHeading title={invoiceData.invoiceSubject} />
          </div>
          <div>
            <QuinaryHeading title="Project Name" className="text-gray-400" />

            <QuaternaryHeading title={invoiceData.projectName} />
          </div>
          <div>
            <QuinaryHeading title="Application#" className="text-gray-400" />

            <QuaternaryHeading title={invoiceData.applicationNumber} />
          </div>
          <div>
            <QuinaryHeading title="Issue Date" className="text-gray-400" />

            <QuaternaryHeading
              title={moment(invoiceData.issueDate).format('MM/DD/YYYY')}
            />
          </div>
          <div>
            <QuinaryHeading title="Due Date" className="text-gray-400" />

            <QuaternaryHeading
              title={moment(invoiceData.dueDate).format('MM/DD/YYYY')}
            />
          </div>
          <div>
            <QuinaryHeading title="Recipient Name" className="text-gray-400" />

            <QuaternaryHeading
              title={
                invoiceData.subContractorFirstName +
                ' ' +
                invoiceData.subContractorLastName
              }
            />
          </div>
          <div>
            <QuinaryHeading title="Phone Number" className="text-gray-400" />

            <QuaternaryHeading
              title={`${invoiceData.subContractorPhoneNumber}`}
            />
          </div>
          <div>
            <QuinaryHeading title="Email" className="text-gray-400" />

            <QuaternaryHeading title={invoiceData.subContractorEmail} />
          </div>
          <div>
            <QuinaryHeading title="Company Name" className="text-gray-400" />

            <QuaternaryHeading title={invoiceData.subContractorCompanyName} />
          </div>
          <div>
            <QuinaryHeading title="Company Address" className="text-gray-400" />

            <QuaternaryHeading title={invoiceData.subContractorAddress} />
          </div>
        </div>
      </div>

      <div className="p-5 mt-3 rounded-lg space-y-2 border border-silverGray shadow-secondaryShadow2 bg-white">
        <TertiaryHeading title="Invoice Items" />
        <ConfigProvider
          theme={{
            components: {
              Table: {
                // headerBg: "#F9F5FF",
                borderColor: 'red',
              },
            },
          }}
        >
          <Table
            loading={false}
            columns={columns}
            dataSource={invoiceData.invoiceItems}
            rowKey={(record) => record._id}
            pagination={{ position: ['bottomCenter'] }}
          />
        </ConfigProvider>
      </div>

      <div className="mt-4 flex justify-between">
        <div className="flex items-center space-x-2">
          <QuaternaryHeading title="Sub total:" />
          <QuinaryHeading
            title={`$${calculateSubTotal(invoiceData.invoiceItems)}`}
            className="font-bold"
          />
        </div>

        <div className="flex items-center space-x-2">
          <QuaternaryHeading title="Discount:" />
          <QuinaryHeading
            title={`$${invoiceData.discount}`}
            className="font-bold"
          />
        </div>

        <div className="flex items-center space-x-2">
          <QuaternaryHeading title="Taxes:" />
          <QuinaryHeading
            title={`$${invoiceData.taxes}`}
            className="font-bold"
          />
        </div>

        <div className="flex items-center space-x-2">
          <QuaternaryHeading title="Profit And Overhead:" />
          <QuinaryHeading
            title={`${invoiceData.profitAndOverhead}%`}
            className="font-bold"
          />
        </div>

        <div className="flex items-center space-x-2">
          <QuaternaryHeading title="Total:" />
          <QuinaryHeading
            title={`$${invoiceData.totalPayable}`}
            className="font-bold"
          />
        </div>
      </div>
      <Divider />
      <div className="mt-4 flex justify-end">
        <PDFDownloadLink
          document={<NewClientPdf invoice={invoiceData} user={user} />}
          fileName="invoice.pdf"
        >
          {({ loading }) => (
            <CustomButton
              isLoading={loading}
              loadingText="Downloading"
              text={loading ? 'Downloading...' : 'Download'}
              className="!w-48"
            />
          )}
        </PDFDownloadLink>
      </div>
    </section>
  );
}

export default withAuth(ViewSubcontractorInvoicePage);
