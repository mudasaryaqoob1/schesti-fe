'use client';

import CustomButton from '@/app/component/customButton/button';
import WhiteButton from '@/app/component/customButton/white';
import { InputComponent } from '@/app/component/customInput/Input';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { withAuth } from '@/app/hoc/withAuth';
import { SearchOutlined } from '@ant-design/icons';
import { Drawer } from 'antd';
import Table, { type ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { ExpenseForm } from './components/Form';

function Expense() {
  const [search, setSearch] = useState('');
  const [showDrawer, setShowDrawer] = useState(false);

  const columns: ColumnsType<{}> = [
    { title: 'Expense#' },
    { title: 'Item name' },
    { title: 'Project' },
    { title: 'Category' },
    { title: 'Details' },
    { title: 'Price' },
    { title: 'Date' },
    { title: 'File' },
    { title: 'Action' },
  ];

  return (
    <section className="mt-6  space-y-2 mb-[39px] mx-4 rounded-xl bg-white p-5">
      <Drawer
        title="Expense"
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
        width={800}
      >
        <ExpenseForm />
      </Drawer>

      <div className="flex justify-between items-center mb-4">
        <TertiaryHeading title="Expense" className="text-graphiteGray" />
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
                className: '!py-2',
              }}
            />
          </div>

          <div>
            <WhiteButton
              text="Export"
              className="!w-fit !py-2.5"
              icon="/download-icon.svg"
              iconwidth={20}
              iconheight={20}
            />
          </div>
          <CustomButton
            text="Add Expense"
            className="!w-fit !py-2.5"
            icon="/plus.svg"
            iconwidth={20}
            iconheight={20}
            onClick={() => setShowDrawer(true)}
          />
        </div>
      </div>

      <Table
        columns={columns}
        pagination={{
          position: ['bottomCenter'],
        }}
        dataSource={[]}
        bordered
      />
    </section>
  );
}

export default withAuth(Expense);
