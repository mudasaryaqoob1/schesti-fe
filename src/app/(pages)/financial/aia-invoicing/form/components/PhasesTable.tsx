import { IAIAInvoice } from '@/app/interfaces/client-invoice.interface';
import { clientInvoiceService } from '@/app/services/client-invoices.service';
import { Table } from 'antd';
import { type ColumnsType } from 'antd/es/table';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type Props = {
  parentInvoice: IAIAInvoice;
};
export function AIAInvoicePhasesTable({ parentInvoice }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<IAIAInvoice[]>([]);

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

  return (
    <div className="p-2">
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={data}
        rowKey="id"
        // size="small"
        pagination={false}
      />
    </div>
  );
}
