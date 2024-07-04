'use client';
import { useEffect, useState, useRef } from 'react';
import { Dropdown, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

// module imports
import { AppDispatch, RootState } from '@/redux/store';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { bg_style } from '@/globals/tailwindvariables';
import Button from '@/app/component/customButton/button';
import WhiteButton from '@/app/component/customButton/white';
import Image from 'next/image';
import { SearchOutlined } from '@ant-design/icons';
import { InputComponent } from '@/app/component/customInput/Input';
import { DeleteContent } from '@/app/component/delete/DeleteContent';
import ModalComponent from '@/app/component/modal';
import { withAuth } from '@/app/hoc/withAuth';
import { Routes } from '@/app/utils/plans.utils';
import { useRouterHook } from '@/app/hooks/useRouterHook';
import { PreviewCSVImportFileModal } from '../components/PreviewCSVImportFileModal';
import { getCrmItemsThunk, updateCrmItemStatusThunk } from '@/redux/crm/crm.thunk';
import { CommonCrmType, CrmType, ICrmItem } from '@/app/interfaces/crm/crm.interface';
import { deleteCrmItemById, downloadCrmItemsAsCSV, saveManyCrmItems, uploadAndParseCSVData } from '../utils';
import { insertManyCrmItemAction, removeCrmItemAction } from '@/redux/crm/crm.slice';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { CrmStatusFilter } from '../components/CrmStatusFilter';

const activeClientMenuItems: MenuProps['items'] = [
  {
    key: 'createEstimateRequest',
    label: <p>Create Estimate Request</p>,
  },
  {
    key: 'createNewInvoice',
    label: <p>Create Invoice</p>,
  },
  {
    key: 'createSchedule',
    label: <p>Create Schedule</p>,
  },
  {
    key: 'editClientDetail',
    label: <p>Edit Client Details</p>,
  },
  {
    key: 'createContract',
    label: <p>Create Contract</p>,
  },
  {
    key: 'createNewTakeoff',
    label: <p>Create New Takeoff</p>,
  },
  {
    key: 'email',
    label: <p>Email</p>,
  },
  {
    key: 'deleteClient',
    label: <p>Delete</p>,
  },
  {
    key: 'inActiveClient',
    label: <p>In Active</p>,
  },
];

const inActiveClientMenuItems: MenuProps['items'] = [
  {
    key: 'activeClient',
    label: <p>Active</p>,
  },
];

const ClientTable = () => {
  const router = useRouterHook();
  const dispatch = useDispatch<AppDispatch>();

  const state = useSelector((state: RootState) => state.crm);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<string>('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ICrmItem | null>(null);
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [parseData, setParseData] = useState<CommonCrmType[]>([]);
  const [duplicates, setDuplicates] = useState<CommonCrmType[]>([]);
  const [isSavingMany, setIsSavingMany] = useState(false);


  useEffect(() => {
    dispatch(getCrmItemsThunk({ module: "clients" }));
  }, [])

  const handleDropdownItemClick = async (key: string, client: any) => {
    if (key === 'createEstimateRequest') {
      router.push(`/estimates/requests/create?clientId=${client._id}`);
    } else if (key === 'createNewInvoice') {
      router.push(`/financial/aia-invoicing`);
    } else if (key === 'createSchedule') {
      router.push(`/schedule`);
    } else if (key == 'deleteClient') {
      setSelectedItem(client);
      setShowDeleteModal(true);
    } else if (key == 'editClientDetail') {
      router.push(`${Routes.CRM.Clients}/edit/${client._id}`);
    }
    else if (key === 'inActiveClient') {
      dispatch(updateCrmItemStatusThunk({
        id: client._id,
        status: false
      }))
    }
    else if (key === 'activeClient') {
      dispatch(updateCrmItemStatusThunk({
        id: client._id,
        status: true
      }))
    }
  };

  const columns: ColumnsType<ICrmItem> = [
    {
      title: 'Client Name',
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
      render: (_, value) => {
        if (value.status) {
          return (
            <Tag className="rounded-full" color="green">
              Active
            </Tag>
          );
        } else {
          return (
            <Tag className="rounded-full" color="red">
              In Active
            </Tag>
          );
        }
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      align: 'center',
      key: 'action',
      render: (text, record: any) => {
        if (record?.status) {
          return (
            <Dropdown
              menu={{
                items: activeClientMenuItems,
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
          );
        } else {
          return (
            <Dropdown
              menu={{
                items: inActiveClientMenuItems,
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
          );
        }
      },
    },
  ];

  const filteredClients = state.data.filter(item => {
    if (!search) {
      return true;
    }
    if (item.module === 'subcontractors' || item.module === 'partners') {
      return true;
    }
    return item.firstName.toLowerCase().includes(search.toLowerCase()) ||
      item.lastName.toLowerCase().includes(search.toLowerCase()) ||
      item.companyName.toLowerCase().includes(search.toLowerCase()) ||
      item.email?.includes(search) ||
      item.phone?.includes(search) ||
      item.address?.includes(search)
  }).filter(item => {
    if (!status) {
      return true;
    }
    return status === 'active' ? item.status === true : item.status === false;
  })




  return (
    <section className="mt-6 mb-[39px]  mx-4 rounded-xl ">
      {selectedItem && showDeleteModal ? (
        <ModalComponent
          open={showDeleteModal}
          setOpen={setShowDeleteModal}
          width="30%"
        >
          <DeleteContent
            onClick={() => deleteCrmItemById(selectedItem._id, setIsDeleting, item => {
              toast.success('Client deleted successfully');
              dispatch(removeCrmItemAction(item._id));
              setShowDeleteModal(false);
              setSelectedItem(null);
            })}
            isLoading={isDeleting}
            onClose={() => setShowDeleteModal(false)}
          />
        </ModalComponent>
      ) : null}

      <PreviewCSVImportFileModal
        columns={columns as any}
        data={parseData}
        onClose={() => setParseData([])}
        onConfirm={() => {
          saveManyCrmItems(
            parseData,
            setIsSavingMany,
            "clients",
            setDuplicates,
            items => {
              dispatch(insertManyCrmItemAction(items));
              const remainingParsedData = _.differenceBy(parseData, items, 'email');
              setParseData(remainingParsedData);
            }
          )
        }}
        duplicates={duplicates}
        setData={setParseData}
        isLoading={isSavingMany}
        title='Import Clients'

      />

      <div className={`${bg_style} p-5 border border-solid border-silverGray`}>
        <div className="flex justify-between items-center mb-4">
          <TertiaryHeading title="Client List" className="text-graphiteGray" />
          <div className=" flex items-end space-x-3">
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
                  className: "!py-2"
                }}
              />
            </div>
            <CrmStatusFilter
              status={status}
              setStatus={setStatus}
            />
            <div>
              <WhiteButton
                text='Export'
                className='!w-fit !py-2.5'
                icon='/download-icon.svg'
                iconwidth={20}
                iconheight={20}
                onClick={() => {
                  downloadCrmItemsAsCSV(state.data, columns as ColumnsType<CrmType>, "clients")
                }}
              />
            </div>
            <div>
              <WhiteButton
                text='Import'
                className='!w-fit !py-2.5'
                icon='/uploadcloud.svg'
                iconwidth={20}
                iconheight={20}
                onClick={() => {
                  inputFileRef.current?.click();
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
                onChange={uploadAndParseCSVData(setIsUploadingFile, "clients", setParseData)}
              />
            </div>
            <Button
              text="Add New client"
              className="!w-fit !py-2.5"
              icon="/plus.svg"
              iconwidth={20}
              iconheight={20}
              onClick={() => router.push(`${Routes.CRM.Clients}/create`)}
            />
          </div>
        </div>
        <Table
          loading={state.loading || state.isUpdatingStatus}
          columns={columns as ColumnsType<CrmType>}
          dataSource={filteredClients}
          pagination={{ position: ['bottomCenter'] }}
        />
      </div>
    </section>
  );
};

export default withAuth(ClientTable);
