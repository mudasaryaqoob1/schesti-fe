'use client';
import { useEffect, useCallback, useState, useRef, ChangeEventHandler } from 'react';
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
import WhiteButton from '@/app/component/customButton/white';
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
import { useRouterHook } from '@/app/hooks/useRouterHook';
import { Excel } from 'antd-table-saveas-excel';
import { AxiosError } from 'axios';
import { userService } from '@/app/services/user.service';
import { PreviewCSVImportFileModal } from '../components/PreviewCSVImportFileModal';
import { insertManyPartnersAction } from '@/redux/company/partnerSlice/companyPartner.slice';

interface DataType {
  firstName: string;
  companyName: string;
  email: number;
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
    key: 'editPartnerDetail',
    label: <p>Edit details</p>,
  },
  {
    key: 'deletePartner',
    label: <p>Delete</p>,
  },
];

const PartnerTable = () => {
  const router = useRouterHook();
  const dispatch = useDispatch<AppDispatch>();

  const partnersData: IPartner[] | null = useSelector(selectPartners);
  const partnerLoading = useSelector(selectClientsLoading);
  const [search, setSearch] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPartner, setselectedPartner] = useState<IPartner | null>(null);


  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [parseData, setParseData] = useState<Required<IPartner>[]>([]);
  const [isUploadingMany, setIsUploadingMany] = useState(false);


  const fetchCompanyPartnerHandler = useCallback(async () => {
    await dispatch(fetchCompanyPartner({ page: 1, limit: 10 }));
  }, []);

  useEffect(() => {
    fetchCompanyPartnerHandler();
  }, []);

  const handleDropdownItemClick = async (key: string, partner: any) => {
    if (key === 'createEstimateRequest') {
      router.push(`/estimates/requests/create`);
    } else if (key === 'createNewInvoice') {
      router.push(`/financial/aia-invoicing`);
    } else if (key === 'createSchedule') {
      router.push(`/schedule`);
    } else if (key == 'deletePartner') {
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
    // {
    //   title: 'Status',
    //   dataIndex: 'status',
    //   render: () => (
    //     <p className="bg-lime-100 w-max text-[#027A48] bg-[#ECFDF3] px-2 py-1 rounded-full">
    //       Active
    //     </p>
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


  function downloadCSV(data: IPartner[]) {
    const excel = new Excel();
    excel
      .addSheet('Partners')
      .addColumns((columns as any).slice(0, 5))
      .addDataSource(data)
      .saveAs(`crm-partners-${Date.now()}.xlsx`);
  }


  const uploadAndParseClientData: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const files = e.target.files;
    setParseData([]);
    if (files && files.length > 0) {
      setIsUploadingFile(true);
      try {
        const file = files[0];
        const formData = new FormData();
        formData.append('file', file);
        const response = await userService.httpUploadCrmPartnersCsvAndParse(formData);
        if (response.data) {
          toast.success('File parsed successfully');
          setParseData(response.data);
        }
      } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        toast.error(err.response?.data.message || 'An error occurred')
      } finally {
        setIsUploadingFile(false);
      }
    }
  }


  async function insertManyPartners(data: IPartner[]) {
    setIsUploadingMany(true);
    try {
      for (const item of data) {
        const response = await userService.httpAddNewPartner(item);
        if (response.data && response.data.client) {
          toast.success(`${item.email} added successfully`);
          dispatch(insertManyPartnersAction([response.data.client]));
          setParseData(
            parseData.filter((item) => item.email !== response.data!.client.email)
          );
        }
      }
      setParseData([]);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>
      toast.error(err.response?.data.message || 'An error occurred');
    } finally {
      setIsUploadingMany(false);
    }
  }

  return (
    <section className="mt-6 mb-[39px] mx-4 rounded-xl ">
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

      <PreviewCSVImportFileModal
        columns={columns as any}
        data={parseData}
        onClose={() => setParseData([])}
        onConfirm={() => insertManyPartners(parseData)}
        setData={setParseData}
        isLoading={isUploadingMany}
        title='Import Partners'
      />

      <div className={`${bg_style} p-5 border border-solid border-silverGray`}>
        <div className="flex justify-between items-center mb-4">
          <TertiaryHeading title="Partner List" className="text-graphiteGray" />
          <div className=" flex items-center space-x-3">
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
            <div>
              <WhiteButton
                text='Export'
                className='!w-fit'
                icon='/download-icon.svg'
                iconwidth={20}
                iconheight={20}
                onClick={() => {
                  if (partnersData) {
                    downloadCSV(partnersData)
                  }
                }}
              />
            </div>
            <div>
              <WhiteButton
                text='Import'
                className='!w-fit'
                icon='/uploadcloud.svg'
                iconwidth={20}
                iconheight={20}
                onClick={() => {
                  if (inputFileRef.current) {
                    inputFileRef.current.click();
                  }
                }}
                isLoading={isUploadingFile}
                loadingText='Uploading...'
              />
              <input
                ref={inputFileRef}
                accept='.csv, .xlsx'
                type="file"
                name=""
                id="importClients"
                className='hidden'
                onChange={uploadAndParseClientData}
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
