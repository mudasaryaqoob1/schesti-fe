'use client';
import { useEffect, useLayoutEffect, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dropdown, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

// module imports
import { AppDispatch } from '@/redux/store';
import { selectToken } from '@/redux/authSlices/auth.selector';
import {
  selectSubcontracters,
  selectSubcontractLoading,
} from '@/redux/company/companySelector';
import { HttpService } from '@/app/services/base.service';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { bg_style } from '@/globals/tailwindvariables';
import Button from '@/app/component/customButton/button';
import {
  deleteSubcontractor,
  fetchCompanySubcontractors,
} from '@/redux/company/company.thunk';
import Image from 'next/image';
import { ISubcontractor } from '@/app/interfaces/companyInterfaces/subcontractor.interface';
import ModalComponent from '@/app/component/modal';
import { DeleteContent } from '@/app/component/delete/DeleteContent';
import { toast } from 'react-toastify';
import Head from 'next/head';

export interface DataType {
  company: string;
  companyRep: string;
  email: string;
  phone: string;
  address: string;
  status: string;
  action: string;
}

const items: MenuProps['items'] = [
  {
    key: 'editSubcontractor',
    label: <p>Edit subcontractor details</p>,
  },
  {
    key: 'deleteSubcontractor',
    label: <p>Delete</p>,
  },
];

const SubcontractTable = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const token = useSelector(selectToken);

  const subcontractersData = useSelector(selectSubcontracters);
  const subcontractersLoading = useSelector(selectSubcontractLoading);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSubcontractor, setSelectedSubcontractor] =
    useState<ISubcontractor | null>(null);

  useLayoutEffect(() => {
    if (token) {
      HttpService.setToken(token);
    }
  }, [token]);

  const fetchSubcontactors = useCallback(async () => {
    await dispatch(fetchCompanySubcontractors({ page: 1, limit: 10 }));
  }, [dispatch]);

  useEffect(() => {
    fetchSubcontactors();
  }, [fetchSubcontactors]);

  const handleDropdownItemClick = async (key: string, subcontractor: any) => {
    if (key == 'deleteSubcontractor') {
      setSelectedSubcontractor(subcontractor as ISubcontractor);
      setShowDeleteModal(true);
    } else if (key == 'editSubcontractor') {
      router.push(`/subcontractor/edit/${subcontractor._id}`);
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
    {
      title: 'Status',
      dataIndex: 'status',
      render: () => (
        <a className="text-[#027A48] bg-[#ECFDF3] px-2 py-1 rounded-full">
          Active
        </a>
      ),
    },
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
            title="Subcontractor List"
            className="text-graphiteGray"
          />
          <Button
            text="New subcontractor"
            className="!w-auto "
            icon="plus.svg"
            iconwidth={20}
            iconheight={20}
            onClick={() => router.push('/subcontractor/create')}
          />
        </div>
        <Table
          loading={subcontractersLoading}
          columns={columns}
          dataSource={subcontractersData ? subcontractersData : undefined}
          pagination={{ position: ['bottomCenter'] }}
        />
      </div>
    </section>
  );
};

export default SubcontractTable;
