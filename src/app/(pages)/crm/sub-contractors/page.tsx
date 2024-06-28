'use client';
import { useEffect, useCallback, useState } from 'react';
import Head from 'next/head';
import { Dropdown, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { toast } from 'react-toastify';
import { SearchOutlined } from '@ant-design/icons';
import Image from 'next/image';

// module imports
import {
  selectSubcontracters,
  selectSubcontractLoading,
} from '@/redux/company/companySelector';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { bg_style } from '@/globals/tailwindvariables';
import Button from '@/app/component/customButton/button';
import { InputComponent } from '@/app/component/customInput/Input';
import {
  deleteSubcontractor,
  fetchCompanySubcontractors,
} from '@/redux/company/company.thunk';
import { ISubcontractor } from '@/app/interfaces/companyInterfaces/subcontractor.interface';
import ModalComponent from '@/app/component/modal';
import { DeleteContent } from '@/app/component/delete/DeleteContent';
import { Routes } from '@/app/utils/plans.utils';
import { withAuth } from '@/app/hoc/withAuth';
import { useRouterHook } from '@/app/hooks/useRouterHook';
import WhiteButton from '@/app/component/customButton/white';

export interface DataType {
  company: string;
  companyRep: string;
  email: string;
  phone: string;
  address: string;
  // status: string;
  action: string;
}

const items: MenuProps['items'] = [
  {
    key: 'createNewInvoice',
    label: <p>Create Invoice</p>,
  },
  {
    key: 'createSchedule',
    label: <p>Create Schedule</p>,
  },
  {
    key: 'editSubcontractor',
    label: <p>Edit Subcontractor Detail</p>,
  },
  {
    key: 'deleteSubcontractor',
    label: <p>Delete</p>,
  },
];

const SubcontractTable = () => {
  const router = useRouterHook();
  const dispatch = useDispatch<AppDispatch>();

  const subcontractersData = useSelector(selectSubcontracters);
  const subcontractersLoading = useSelector(selectSubcontractLoading);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSubcontractor, setSelectedSubcontractor] =
    useState<ISubcontractor | null>(null);
  const [search, setSearch] = useState('');

  const fetchSubcontactors = useCallback(async () => {
    await dispatch(fetchCompanySubcontractors({ page: 1, limit: 10 }));
  }, []);

  useEffect(() => {
    fetchSubcontactors();
  }, [fetchSubcontactors]);

  const handleDropdownItemClick = async (key: string, subcontractor: any) => {
    if (key === 'createEstimateRequest') {
      router.push(`/estimates/requests/create`);
    } else if (key === 'createNewInvoice') {
      router.push(
        `/financial/standard-invoicing/create?subcontractorId=${subcontractor._id}`
      );
    } else if (key === 'createSchedule') {
      router.push(`/schedule`);
    } else if (key == 'editSubcontractor') {
      router.push(`${Routes.CRM['Sub-Contractors']}/edit/${subcontractor._id}`);
    } else if (key == 'deleteSubcontractor') {
      setSelectedSubcontractor(subcontractor as ISubcontractor);
      setShowDeleteModal(true);
    }
  };

  const columns: ColumnsType<ISubcontractor> = [
    {
      title: 'Company Rep',
      dataIndex: 'companyRep',
      ellipsis: true,
    },
    {
      title: 'Company',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    // {
    //   title: 'Status',
    //   dataIndex: 'status',
    //   render: () => (
    //     <a className="text-[#027A48] bg-[#ECFDF3] px-2 py-1 rounded-full">
    //       Active
    //     </a>
    //   ),
    // },
    {
      title: 'Action',
      dataIndex: 'action',
      align: 'center',
      key: 'action',
      render: (text, record) => (
        <Dropdown
          menu={{
            items,
            onClick: (event) => {
              const { key } = event;
              handleDropdownItemClick(key, record);
            },
          }}
          placement="bottomRight"
        >
          <Image
            src={'/menuIcon.svg'}
            alt="logo white icon"
            width={20}
            height={20}
            className="active:scale-105 cursor-pointer"
          />
        </Dropdown>
      ),
    },
  ];

  function handleCloseModal() {
    setShowDeleteModal(false);
    setSelectedSubcontractor(null);
  }

  const filteredSubcontractor = subcontractersData
    ? subcontractersData.filter((client) => {
      if (!search) {
        return {
          ...client,
        };
      }
      return (
        client.name.toLowerCase().includes(search.toLowerCase()) ||
        client.companyRep.toLowerCase().includes(search.toLowerCase()) ||
        client.email?.includes(search) ||
        client.phone?.includes(search) ||
        client.address?.includes(search)
      );
    })
    : [];

  return (
    <section className="mt-6 mb-[39px] md:ms-[69px] md:me-[59px] mx-4 rounded-xl ">
      <Head>
        <title>Schesti - Subcontractor</title>
      </Head>
      {selectedSubcontractor && showDeleteModal ? (
        <ModalComponent
          open={showDeleteModal}
          setOpen={handleCloseModal}
          width="30%"
        >
          <DeleteContent
            onClick={async () => {
              await dispatch(deleteSubcontractor(selectedSubcontractor._id));
              toast.success('Subcontractor deleted successfully');
              handleCloseModal();
            }}
            onClose={handleCloseModal}
          />
        </ModalComponent>
      ) : null}
      <div className={`${bg_style} p-5 border border-solid border-silverGray`}>
        <div className="flex justify-between items-center mb-4">
          <TertiaryHeading
            title="Subcontractors List"
            className="text-graphiteGray"
          />
          <div className=" flex space-x-3">
            <div className="w-96">
              <InputComponent
                label=""
                type="text"
                placeholder="Search"
                name="search"
                prefix={<SearchOutlined />}
                field={{
                  type: 'text',
                  value: search,
                  onChange: (e: any) => {
                    setSearch(e.target.value);
                  },
                }}
              />
            </div>
            <WhiteButton
              text='Export'
              className='!w-fit'
              icon='/download-icon.svg'
              iconwidth={20}
              iconheight={20}
            />
            <WhiteButton
              text='Import'
              className='!w-fit'
              icon='/uploadcloud.svg'
              iconwidth={20}
              iconheight={20}
            />
            <Button
              text="Add New Subcontractor"
              className="!w-auto "
              icon="/plus.svg"
              iconwidth={20}
              iconheight={20}
              onClick={() =>
                router.push(`${Routes.CRM['Sub-Contractors']}/create`)
              }
            />
          </div>
        </div>
        <Table
          loading={subcontractersLoading}
          columns={columns}
          dataSource={filteredSubcontractor}
          pagination={{ position: ['bottomCenter'] }}
        />
      </div>
    </section>
  );
};

export default withAuth(SubcontractTable);
