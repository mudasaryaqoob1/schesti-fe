'use client';
import { useEffect, useLayoutEffect, useCallback, useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useSelector } from 'react-redux';
// module imports
import TertiaryHeading from '@/app/component/headings/tertiary';
import { bg_style } from '@/globals/tailwindvariables';
import { selectToken } from '@/redux/authSlices/auth.selector';
import { HttpService } from '@/app/services/base.service';
import { authService } from '@/app/services/auth.service';
import moment from 'moment';

interface DataType {
  company: string;
  email: string;
  phone: string;
  address: string;
  isActive: string;
  status: string;
  action: string;
}

const TransactionHistories = () => {


  const token = useSelector(selectToken);

  useLayoutEffect(() => {
    if (token) {
      HttpService.setToken(token);
    }
  }, [token]);

  const [isLoading, setisLoading] = useState(true);
  const [invoices, setinvoices] = useState([])

  const getInvoiceHandler = useCallback(async() => {
    const result = await authService.httpStripeInvoices()
    setisLoading(false)
    setinvoices(result.data)
  },[])


 

  useEffect(() => {
    getInvoiceHandler();
  }, []);

  const columns: ColumnsType<DataType> = [
  
    {
      title: 'Customer ID',
      dataIndex: 'customer',
   
    },
    {
        title: 'Customer Email',
        dataIndex: 'customer_email',
        ellipsis: true,
      },
    {
      title: 'Invoice Date',
      dataIndex: 'created',
      render: (text, records : any) => moment(records.created).format('ll') ,
    },
    {
      title: 'Amount',
      dataIndex: 'total',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      align: 'center',
      render: (text, records : any) => <a download href={records.invoice_pdf} >Download</a> ,
    },
  ];

  

  return (
    <section className="mt-6 mb-[39px] md:ms-[69px] md:me-[59px] mx-4 rounded-xl ">
      <TertiaryHeading
        title="Manage Payment Invoices"
        className="text-graphiteGray"
      />
      <div className={`${bg_style} p-5 border border-solid border-silverGray`}>
        <Table
          loading={isLoading}
          columns={columns}
          dataSource={invoices}
          pagination={{ position: ['bottomCenter'] }}
        />
      </div>
    </section>
  );
};

export default TransactionHistories;
