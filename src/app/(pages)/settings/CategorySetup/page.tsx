'use client';
import { useEffect, useLayoutEffect, useCallback } from 'react';
import { Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

// module imports
import { AppDispatch } from '@/redux/store';
import { selectToken } from '@/redux/authSlices/auth.selector';
import { HttpService } from '@/app/services/base.service';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { bg_style } from '@/globals/tailwindvariables';
import {
  fetchSettingTargets,
} from '@/redux/company/settingSlices/setting.thunk';
import SettingSidebar from '../verticleBar';
import AddSubcategory from './Subcategory/page';
import AddCategory from './Category/page';

export interface DataType {
  categoryId: string;
  companyName: string;
  _id: string;
  action: string;
}

const CategoriesTable = () => {
  const dispatch = useDispatch<AppDispatch>();

  const token = useSelector(selectToken);


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

  return (
    <SettingSidebar>
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
              children: id ? <AddSubcategory /> : <AddCategory />,
            };
          })}
        />

      </section>
    </SettingSidebar>
  );
};

export default CategoriesTable;
