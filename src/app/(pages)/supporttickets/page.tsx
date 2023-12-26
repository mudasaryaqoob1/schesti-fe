'use client';

import React, { useCallback, useEffect, useLayoutEffect } from 'react';

// module imports
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import { Dropdown, Skeleton } from 'antd';
import type { MenuProps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import CustomButton from '@/app/component/customButton/button';
import CustomNavbar from '@/app/component/customNavbar';
import Description from '@/app/component/description';
import QuinaryHeading from '@/app/component/headings/quinary';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { AppDispatch } from '@/redux/store';
import { selectToken } from '@/redux/authSlices/auth.selector';
import { HttpService } from '@/app/services/base.service';
import {
  selectSupportTickets,
  selectSupportTicketsLoading,
} from '@/redux/company/companySelector';
import {
  deleteSupportTicket,
  fetchSupportTickets,
} from '@/redux/company/company.thunk';
import { ISupportTicket } from '@/app/interfaces/supportTicket.interface';

const SupportTickets = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const token = useSelector(selectToken);

  const supportTicketsData = useSelector(selectSupportTickets);
  const supportTicketsLoading = useSelector(selectSupportTicketsLoading);

  useLayoutEffect(() => {
    if (token) {
      HttpService.setToken(token);
    }
  }, [token]);

  const fetchSupportTicketsHandler = useCallback(async () => {
    await dispatch(fetchSupportTickets({ page: 1, limit: 10 }));
  }, [dispatch]);

  useEffect(() => {
    fetchSupportTicketsHandler();
  }, [fetchSupportTicketsHandler]);

  const items: MenuProps['items'] = [
    {
      key: 'edit',
      label: <a href="#">Edit</a>,
    },
    {
      key: 'delete',
      label: <a href="#">Delete</a>,
    },
    {
      key: 'details',
      label: <a href="#">Details</a>,
    },
  ];

  const handleDropdownItemClick = async (
    key: string,
    supportTicket: ISupportTicket
  ) => {
    if (key == 'delete') {
      await dispatch(deleteSupportTicket(supportTicket._id!));
    } else if (key == 'edit') {
      router.push(`/supporttickets/edit/${supportTicket._id}`);
    } else if (key == 'details') {
      router.push(`/supporttickets/${supportTicket._id}`);
    }
  };

  return (
    <CustomNavbar>
      <section className="px-16 mt-6">
        <div className="flex justify-between items-center">
          <TertiaryHeading title="Support Ticket" />
          <CustomButton
            text="Create New Ticket"
            className="!w-auto "
            icon="plus.svg"
            iconwidth={20}
            iconheight={20}
            onClick={() => router.push('/supporttickets/create')}
          />
        </div>
        {supportTicketsLoading ? (
          <div className="flex flex-col w-full mt-5">
          <Skeleton active />
          <Skeleton active />
        </div>
        ) : (
          supportTicketsData?.map(
            (supportTicket: ISupportTicket, i: number) => {
              const { _id, createdAt, title, description, updatedAt } =
                supportTicket;
              return (
                <div
                  key={i}
                  className="shadow-primaryGlow rounded-2xl cursor-pointer flex flex-col p-4 mt-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex gap-4">
                      <Description
                        title={`Ticket # ${_id}`}
                        className="text-steelGray font-semibold"
                      />
                      <p className="bg-lightblue rounded-xl px-2">
                        <span className="text-xs text-darkblue font-normal">
                          In Progress
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Description
                        title={moment(createdAt).startOf('minute').fromNow()}
                        className="text-lightenGreyish"
                      />
                      <Dropdown
                        menu={{
                          items,
                          onClick: (event) => {
                            const { key } = event;
                            handleDropdownItemClick(key, supportTicket);
                          },
                        }}
                        placement="bottomRight"
                      >
                        <Image
                          src="/more-horizontal.svg"
                          width={24}
                          height={6}
                          alt="options"
                          className="cursor-pointer"
                        />
                      </Dropdown>
                    </div>
                  </div>
                  <QuinaryHeading
                    title={title}
                    className="text-base font-medium mt-3"
                  />
                  <Description
                    className="text-steelGray mt-2"
                    title={description}
                  />
                  <div className="flex items-center gap-7 mt-5">
                    <p className="text-xs text-slateGray font-normal flex gap-1">
                      <Image
                        src="/calendar.svg"
                        alt="date"
                        width={12}
                        height={12}
                      />
                      Date: {moment(createdAt).format('ll')}
                    </p>
                    <p className="text-xs text-slateGray font-normal flex gap-1 items-center">
                      <Image
                        src="/reply-rounded.svg"
                        alt="date"
                        width={16}
                        height={14}
                      />
                      Last reply: {moment(updatedAt).format('ll')}
                    </p>
                  </div>
                </div>
              );
            }
          )
        )}
      </section>
    </CustomNavbar>
  );
};

export default SupportTickets;
