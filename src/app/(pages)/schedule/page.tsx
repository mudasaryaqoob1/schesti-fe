'use client';
import CustomButton from '@/app/component/customButton/button';
import { InputComponent } from '@/app/component/customInput/Input';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { HttpService } from '@/app/services/base.service';
import { selectToken } from '@/redux/authSlices/auth.selector';
import { SearchOutlined } from '@ant-design/icons';
import React, { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';

const Schedule = () => {
  const token = useSelector(selectToken);

  useLayoutEffect(() => {
    if (token) {
      HttpService.setToken(token);
    }
  }, [token]);

  return (
    <section className="mt-6 shadow p-4 mb-[39px] md:ms-[69px] md:me-[59px] mx-4 rounded-xl ">
      <div className="flex justify-between flex-wrap items-center md:flex-nowrap mb-2">
        <TertiaryHeading
          title="Schedule"
          className="text-graphiteGray"
        />
        <div className="flex items-center space-x-2 flex-1 justify-end">
          <div className="w-96 ">
            <InputComponent
              label=""
              type="text"
              placeholder="Search"
              name="search"
              prefix={<SearchOutlined />}
              field={{
                type: 'text',
              }}
            />
          </div>
          <CustomButton
            text="Start new Schedule"
            icon="/plus.svg"
            className="!w-auto"
            iconwidth={20}
            iconheight={20}
          />
        </div>
      </div>
    </section>
  );
};

export default Schedule;
