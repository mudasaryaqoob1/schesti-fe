import { InputComponent } from '@/app/component/customInput/Input';
import PrimaryHeading from '@/app/component/headings/primary';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { IAIAInvoice } from '@/app/interfaces/client-invoice.interface';
import { clientInvoiceService } from '@/app/services/client-invoices.service';
import { Table } from 'antd';
import { type ColumnsType } from 'antd/es/table';
import { AxiosError } from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type Props = {
  parentInvoice: IAIAInvoice;
}
export function AIAHistory({ parentInvoice }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<IAIAInvoice[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getParentInvoices(parentInvoice._id);
  }, [parentInvoice._id]);

  async function getParentInvoices(id: string) {
    setIsLoading(true);
    try {
      const response = await clientInvoiceService.httpGetInvoicePhases(id);
      if (response.data) {
        setData(response.data.invoices);
      }
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  const columns: ColumnsType = [
    {
      title: 'Invoice #',
      dataIndex: 'applicationNo',
    },
    {
      title: 'Invoice Name',
      dataIndex: 'invoiceName',
      ellipsis: true,
      width: 300,
    },
    {
      title: 'Owner',
      dataIndex: 'toOwner',
    },
    {
      title: 'Project Name',
      dataIndex: 'project',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Distributed To',
      dataIndex: 'distributionTo',
      render: (value) => value?.toUpperCase(),
    },
  ];


  const filteredData = data.filter((item) => {
    if (!search) {
      return true;
    }
    return item.invoiceName?.toLowerCase().includes(search.toLowerCase()) || item.applicationNo?.toLowerCase().includes(search.toLowerCase())
      || item.toOwner?.toLowerCase().includes(search.toLowerCase()) || item.project?.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="p-5 space-y-5 shadow-md rounded-lg border border-silverGray  bg-white">
      <div className="flex justify-between items-center">
        <PrimaryHeading title="Invoice History" className="text-[18px]" />

        <InputComponent
          label=""
          name=""
          type="text"
          placeholder="Search Invoice History"
          prefix={
            <Image
              alt="search icon"
              src={'/search.svg'}
              width={20}
              height={20}
            />
          }
          field={{
            value: search,
            onChange: (e) => {
              setSearch(e.target.value);
            },
          }}
        />
      </div>

      <div>
        <div className="grid grid-cols-7 px-4 gap-3">
          <TertiaryHeading
            title='Invoice #'
            className='text-schestiLightBlack font-normal text-sm'
          />
          <TertiaryHeading
            className='text-schestiLightBlack font-normal text-sm'
            title="Invoice Name"
          />
          <TertiaryHeading
            className='text-schestiLightBlack font-normal text-sm'
            title="Owner Name"
          />
          <TertiaryHeading
            className='text-schestiLightBlack font-normal text-sm'
            title="Project Name"
          />
          <TertiaryHeading
            className='text-schestiLightBlack font-normal text-sm'
            title="Address"
          />
          <TertiaryHeading
            className='text-schestiLightBlack font-normal text-sm'
            title="Distributed To"
          />
          <TertiaryHeading
            className='text-schestiLightBlack font-normal text-sm'
            title="Invoices"
          />
        </div>

        <div className='grid grid-cols-7 gap-3 mt-4 p-4 rounded-md bg-schestiLightPrimary'>
          <TertiaryHeading
            title={parentInvoice.applicationNo}
            className='text-schestiPrimaryBlack text-sm'
          />
          <TertiaryHeading
            title={parentInvoice.invoiceName}
            className='text-schestiPrimaryBlack text-sm'
          />

          <TertiaryHeading
            title={parentInvoice.toOwner}
            className='text-schestiPrimaryBlack text-sm'
          />
          <TertiaryHeading
            title={parentInvoice.project}
            className='text-schestiPrimaryBlack text-sm'
          />
          <TertiaryHeading
            title={parentInvoice.address}
            className='text-schestiPrimaryBlack text-sm'
          />

          <TertiaryHeading
            title={parentInvoice.distributionTo}
            className='text-schestiPrimaryBlack text-sm uppercase'
          />

          <TertiaryHeading
            title={data.length.toString()}
            className='text-schestiPrimaryBlack text-sm'
          />

        </div>

        <div className='p-4 bg-schestiPrimaryBG'>
          <Table
            columns={columns}
            dataSource={filteredData}
            loading={isLoading}
            pagination={{
              position: ['bottomCenter'],
            }}
            bordered
          />
        </div>
      </div>
    </div>
  );
}
