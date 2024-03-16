'use client';
import { useEffect, useCallback, useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useDispatch, useSelector } from 'react-redux';

// module imports
import { AppDispatch } from '@/redux/store';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { bg_style } from '@/globals/tailwindvariables';
import Button from '@/app/component/customButton/button';
import {
  selectSettingTargets,
  selectSettingTargetsLoading,
} from '@/redux/company/settingSlices/settingSelector';
import {
  deleteSettingTarget,
  fetchSettingTargets,
} from '@/redux/company/settingSlices/setting.thunk';
import SettingSidebar from '../verticleBar';
import ModalComponent from '@/app/component/modal';
import CreateTaget from './components/create';
import EditTaget from './components/edit';
import Image from 'next/image';
import { ISettingTarget } from '@/app/interfaces/companyInterfaces/setting.interface';
import { withAuth } from '@/app/hoc/withAuth';

export interface DataType {
  price: string;
  month: string;
  _id: string;
  action: string;
}

const TargetsTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState<
    undefined | Omit<ISettingTarget, 'year'>
  >();


  const settingTargetsData = useSelector(selectSettingTargets);
  const settingTargetsLoading = useSelector(selectSettingTargetsLoading);



  const fetchSettingTargetsHandler = useCallback(async () => {
    await dispatch(fetchSettingTargets({ page: 1, limit: 10 }));
  }, [dispatch]);

  useEffect(() => {
    fetchSettingTargetsHandler();
  }, []);
  const columns: ColumnsType<DataType> = [
    {
      title: 'Month',
      dataIndex: 'month',
    },
    {
      title: 'Target Price',
      dataIndex: 'price',
      ellipsis: true,
      render(value) {
        return `$${value}`;
      },
    },

    {
      title: 'Action',
      dataIndex: 'action',
      align: 'center',
      key: 'action',
      render: (_, record) => (
        <div className="flex gap-2 justify-center">
          <Image
            src="/trash.svg"
            className="cursor-pointer"
            width={20}
            height={20}
            alt="delete"
            onClick={() => dispatch(deleteSettingTarget(record._id))}
          />
          <Image
            src="/edit.svg"
            className="cursor-pointer"
            width={20}
            height={20}
            alt="edit"
            onClick={() => {
              setSelectedTarget(record);
              setShowEditModal(true);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <SettingSidebar>
      <ModalComponent
        width="380px"
        destroyOnClose
        title="Add New Target"
        open={showCreateModal}
        setOpen={setShowCreateModal}
      >
        <CreateTaget
          setShowModal={setShowCreateModal}
          settingTargetsData={settingTargetsData}
        />
      </ModalComponent>
      <ModalComponent
        width="380px"
        destroyOnClose
        title="Edit Target"
        open={showEditModal}
        setOpen={setShowEditModal}
      >
        <EditTaget
          setShowModal={setShowEditModal}
          selectedTarget={selectedTarget}
          settingTargetsData={settingTargetsData}
        />
      </ModalComponent>
      <section>
        <div className="flex justify-between items-center">
          <TertiaryHeading title="Set Target" className="text-graphiteGray" />
          <Button
            text="Add Target"
            className="!w-auto "
            icon="/plus.svg"
            iconwidth={20}
            iconheight={20}
            onClick={() => setShowCreateModal(true)}
          />
        </div>
        <div
          className={`${bg_style} border border-solid border-silverGray mt-4`}
        >
          <Table
            loading={settingTargetsLoading}
            columns={columns}
            dataSource={settingTargetsData}
            pagination={{ position: ['bottomCenter'] }}
          />
        </div>
      </section>
    </SettingSidebar>
  );
};

export default withAuth(TargetsTable);
