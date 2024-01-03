'use client';
import { useEffect, useLayoutEffect, useCallback, useState } from 'react';
import { Tabs } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useDispatch, useSelector } from 'react-redux';

// module imports
import { AppDispatch } from '@/redux/store';
import { selectToken } from '@/redux/authSlices/auth.selector';
import { HttpService } from '@/app/services/base.service';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { bg_style } from '@/globals/tailwindvariables';
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
import SubCategories from './components/SubCategories';
import Categories from './components/Categories';

export interface DataType {
  categoryId: string;
  companyName: string;
  _id: string;
  action: string;
}

const CategoriesTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState<
    undefined | ISettingTarget
  >();

  const token = useSelector(selectToken);

  const settingTargetsData = useSelector(selectSettingTargets);
  const settingTargetsLoading = useSelector(selectSettingTargetsLoading);

  useLayoutEffect(() => {
    if (token) {
      HttpService.setToken(token);
    }
  }, [token]);

  const fetchSettingTargetsHandler = useCallback(async () => {
    await dispatch(fetchSettingTargets({ page: 1, limit: 10 }));
  }, [dispatch]);

  useEffect(() => {
    fetchSettingTargetsHandler();
  }, []);

  const columns: ColumnsType<DataType> = [
    {
      title: 'Category  ID',
      dataIndex: 'categoryId',
    },
    {
      title: 'Category  Name',
      dataIndex: 'companyName',
      ellipsis: true,
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
              // setSelectedTarget(record);
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
        <CreateTaget setShowModal={setShowCreateModal} />
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
        />
      </ModalComponent>
      <section className={`${bg_style} p-5 w-full`}>
        <TertiaryHeading title="Category Setup" className="text-graphiteGray" />
        <Tabs
          defaultActiveKey="0"
          className='mt-2'
          destroyInactiveTabPane
          items={["Category", "Sub Category"].map((name, id) => {
            return {
              key: id.toString(),
              label: name,
              children: id ? <SubCategories /> : <Categories />,
            };
          })}
        />

      </section>
    </SettingSidebar>
  );
};

export default CategoriesTable;
