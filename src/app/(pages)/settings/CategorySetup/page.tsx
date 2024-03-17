'use client';
import { useEffect, useCallback } from 'react';
import { Tabs } from 'antd';
import { useDispatch } from 'react-redux';

// module imports
import { AppDispatch } from '@/redux/store';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { bg_style } from '@/globals/tailwindvariables';
import { fetchSettingTargets } from '@/redux/company/settingSlices/setting.thunk';
import SettingSidebar from '../verticleBar';
import AddSubcategory from './Subcategory/page';
import AddCategory from './Category/page';
import { withAuth } from '@/app/hoc/withAuth';

export interface DataType {
  categoryId: string;
  companyName: string;
  _id: string;
  action: string;
}

const CategoriesTable = () => {
  const dispatch = useDispatch<AppDispatch>();

  const fetchSettingTargetsHandler = useCallback(async () => {
    await dispatch(fetchSettingTargets({ page: 1, limit: 10 }));
  }, [dispatch]);

  useEffect(() => {
    fetchSettingTargetsHandler();
  }, []);

  return (
    <SettingSidebar>
      <section className={`${bg_style} p-5 w-full`}>
        <TertiaryHeading title="Category Setup" className="text-graphiteGray" />
        <Tabs
          defaultActiveKey="0"
          className="mt-2"
          destroyInactiveTabPane
          items={['Category', 'Sub Category'].map((name, id) => {
            return {
              key: id.toString(),
              label: name,
              children: id ? <AddSubcategory /> : <AddCategory />,
            };
          })}
        />
      </section>
    </SettingSidebar>
  );
};

export default withAuth(CategoriesTable);
