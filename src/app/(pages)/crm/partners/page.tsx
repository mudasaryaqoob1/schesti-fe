'use client';
import { useEffect, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dropdown, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

// module imports
import { AppDispatch } from '@/redux/store';
import { selectPartners } from '@/redux/company/companySelector';
import { selectClientsLoading } from '@/redux/company/companySelector';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { bg_style } from '@/globals/tailwindvariables';
import Button from '@/app/component/customButton/button';
import {
  deleteCompanyPartner,
  fetchCompanyPartner,
} from '@/redux/company/company.thunk';
import Image from 'next/image';
import { SearchOutlined } from '@ant-design/icons';
import { InputComponent } from '@/app/component/customInput/Input';
import { IPartner } from '@/app/interfaces/companyInterfaces/companyClient.interface';
import { DeleteContent } from '@/app/component/delete/DeleteContent';
import ModalComponent from '@/app/component/modal';
import { toast } from 'react-toastify';
import { withAuth } from '@/app/hoc/withAuth';
import { Routes } from '@/app/utils/plans.utils';

interface DataType {
  firstName: string;
  companyName: string;
  email: number;
  phone: string;
  address: string;
  status: string;
  action: string;
}

const items: MenuProps['items'] = [
  {
    key: 'editPartnerDetail',
    label: <p>Edit details</p>,
  },
  {
    key: 'deletePartner',
    label: <p>Delete</p>,
  },
];

const PartnerTable = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const partnersData: IPartner[] | null = useSelector(selectPartners);
  const partnerLoading = useSelector(selectClientsLoading);
  const [search, setSearch] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPartner, setselectedPartner] = useState<IPartner | null>(null);

  const fetchCompanyPartnerHandler = useCallback(async () => {
    await dispatch(fetchCompanyPartner({ page: 1, limit: 10 }));
  }, [dispatch]);

  useEffect(() => {
    fetchCompanyPartnerHandler();
  }, []);

  const handleDropdownItemClick = async (key: string, partner: any) => {
     if (key == 'deletePartner') {
      setselectedPartner(partner);
      setShowDeleteModal(true);
    } else if (key == 'editPartnerDetail') {
      router.push(`${Routes.CRM.Partners}/edit/${partner._id}`);
    }
  };


  
  const columns: ColumnsType<DataType> = [
    {
      title: 'Partner Name',
      dataIndex: 'firstName',
    },
    {
      title: 'Company',
      dataIndex: 'companyName',
      ellipsis: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Phone number',
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
        <p className="bg-lime-100 w-max text-[#027A48] bg-[#ECFDF3] px-2 py-1 rounded-full">
          Active
        </p>
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
  const filteredPartners = partnersData
    ? partnersData.filter((partner) => {
        if (!search) {
          return partner;
        }
        return (
          partner.firstName.toLowerCase().includes(search.toLowerCase()) ||
          partner.lastName.toLowerCase().includes(search.toLowerCase()) ||
          partner.email?.includes(search)
        );
      })
    : [];
  return (
    <section className="mt-6 mb-[39px] md:ms-[69px] md:me-[59px] mx-4 rounded-xl ">
      {selectedPartner && showDeleteModal ? (
        <ModalComponent
          open={showDeleteModal}
          setOpen={setShowDeleteModal}
          width="30%"
        >
          <DeleteContent
            onClick={async () => {
              if ('_id' in selectedPartner) {
                await dispatch(
                  deleteCompanyPartner(selectedPartner._id as string)
                );
                toast.success('Partner deleted successfully');
              }
              setShowDeleteModal(false);
            }}
            onClose={() => setShowDeleteModal(false)}
          />
        </ModalComponent>
      ) : null}
      <div className={`${bg_style} p-5 border border-solid border-silverGray`}>
        <div className="flex justify-between items-center mb-4">
          <TertiaryHeading title="Partner List" className="text-graphiteGray" />
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
            <Button
              text="Add New Partner"
              className="!w-48 "
              icon="/plus.svg"
              iconwidth={20}
              iconheight={20}
              onClick={() => router.push(`${Routes.CRM.Partners}/create`)}
            />
          </div>
        </div>
        <Table
          loading={partnerLoading}
          columns={columns as ColumnsType<IPartner>}
          dataSource={filteredPartners}
          pagination={{ position: ['bottomCenter'] }}
        />
      </div>
    </section>
  );
};

export default withAuth(PartnerTable);
