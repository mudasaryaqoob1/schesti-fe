'use client';
import { useEffect, useCallback, useState, useRef, ChangeEventHandler } from 'react';
import Head from 'next/head';
import { Dropdown, Table, Tag } from 'antd';
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
import { Excel } from 'antd-table-saveas-excel';
import { subcontractorService } from '@/app/services/subcontractor.service';
import { AxiosError } from 'axios';
import { insertManySubcontractorsAction } from '@/redux/company/subcontractorSlice/companySubcontractor.slice';
import { PreviewCSVImportFileModal } from '../components/PreviewCSVImportFileModal';

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
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [parseData, setParseData] = useState<ISubcontractor[]>([]);
  const [isUploadingManySubcontractors, setIsUploadingManySubcontractors] = useState(false);


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
    {
      title: 'Status',
      dataIndex: 'status',
      render: () => (
        <Tag className='rounded-full' color="green">Active</Tag>
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

  function downloadSubcontractorCSV(data: ISubcontractor[]) {
    const excel = new Excel();
    console.log(data);

    excel
      .addSheet('Subcontractors')
      .addColumns([
        {
          dataIndex: "companyRep",
          title: "Company Rep",
        },
        {
          dataIndex: "name",
          title: "Company",
        },
        {
          dataIndex: "email",
          title: "Email Address"
        },
        {
          dataIndex: "phone",
          title: "Phone Number"
        },
        {
          dataIndex: "address",
          title: "Address"
        },
      ])
      .addDataSource(data)
      .saveAs(`crm-subcontractors-${Date.now()}.xlsx`);
  }


  const uploadAndParseClientData: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setIsUploadingFile(true);
      try {
        const file = files[0];
        const formData = new FormData();
        formData.append('file', file);
        const response = await subcontractorService.httpUploadCrmSubcontractorCsvAndParse(formData);
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
  async function insertManySubcontractors(data: ISubcontractor[]) {
    setIsUploadingManySubcontractors(true);
    try {
      for (const subcontractor of data) {
        const response = await subcontractorService.httpAddNewSubcontractor(subcontractor);
        if (response.data && response.data.user) {
          toast.success(`${subcontractor.name} added successfully`);
          dispatch(insertManySubcontractorsAction([response.data.user]));
          setParseData(
            parseData.filter((subcontractor) => subcontractor.email !== response.data!.user.email)
          );
        }
      }
      setParseData([]);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>
      toast.error(err.response?.data.message || 'An error occurred');
    } finally {
      setIsUploadingManySubcontractors(false);
    }
  }


  return (
    <section className="mt-6 mb-[39px] mx-4 rounded-xl ">
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


      <PreviewCSVImportFileModal
        columns={columns}
        data={parseData}
        onClose={() => setParseData([])}
        onConfirm={() => insertManySubcontractors(parseData)}
        setData={setParseData}
        isLoading={isUploadingManySubcontractors}
        title='Import Subcontractors'
      />


      <div className={`${bg_style} p-5 border border-solid border-silverGray`}>
        <div className="flex justify-between items-center mb-4">
          <TertiaryHeading
            title="Subcontractors List"
            className="text-graphiteGray"
          />
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
                  if (subcontractersData) {
                    downloadSubcontractorCSV(subcontractersData);
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
              <input ref={inputFileRef}
                accept='.csv, .xlsx'
                type="file"
                name=""
                id="importClients"
                className='hidden'
                onChange={uploadAndParseClientData}
              />
            </div>
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
