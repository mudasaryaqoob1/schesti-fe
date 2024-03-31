'use client';
import React, { useState } from 'react';

// module imports
import Button from '@/app/component/customButton/button';
import { Pagination, Skeleton } from 'antd';
import WhiteButton from '@/app/component/customButton/white';
import { InputComponent } from '@/app/component/customInput/Input';
import { SearchOutlined } from '@ant-design/icons';
import { useQuery } from 'react-query';
import { bidManagementService } from '@/app/services/bid-management.service';
import moment from 'moment';
import { Country } from 'country-state-city';
import { USCurrencyFormat } from '@/app/utils/format';

const BidManagement = () => {
  const [expandedId, setExpandedId] = useState(null);

  const handleExpand = (id: any) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  // Pagination
  const itemsPerPage = 4;
  const [invitedPage, setInvitedPage] = useState<number>(1);
  const [projectPage, setProjectPage] = useState<number>(1);

  const handleInvitedPageChange = (pageNumber: number) => {
    setInvitedPage(pageNumber);
  };

  const handleProjectPageChange = (pageNumber: number) => {
    setProjectPage(pageNumber);
  };

  const startInvitedIndex = (invitedPage - 1) * itemsPerPage;
  const startProjectIndex = (projectPage - 1) * itemsPerPage;

  const projectsQuery = useQuery(['projects'], () => {
    return bidManagementService.httpGetOwnerProjects();
  });

  const invitedUsersQuery = useQuery(['invited-projects'], () => {
    return bidManagementService.httpGetBidProjectInvitedUsers();
  });

  const projects =
    projectsQuery.data && projectsQuery.data.data
      ? projectsQuery.data.data?.projects
      : [];
  const invitedProjects =
    invitedUsersQuery.data && invitedUsersQuery.data.data
      ? invitedUsersQuery.data.data.projects
      : [];

  const endInvitedIndex = Math.min(
    startInvitedIndex + itemsPerPage,
    projects.length
  );
  const endProjectIndex = Math.min(
    startProjectIndex + itemsPerPage,
    projects.length
  );

  if (projectsQuery.isLoading) {
    return <Skeleton />;
  }

  return (
    <>
      <div className="h-[calc(100vh-100px)] grid place-items-center mt-7">
        <div className="bg-white shadow-md rounded-lg w-11/12 lg:w-95">
          <section className="">
            <div className="container mx-auto px-6">
              <div className="px-2 py-4 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="flex">
                    <span style={{ fontSize: '18px', fontWeight: '600' }}>
                      Find a project&nbsp;{' '}
                    </span>
                    <span style={{ fontSize: '18px', fontWeight: '400' }}>
                      as Sub-contractor
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-[290px]">
                    <InputComponent
                      label=""
                      type="text"
                      placeholder="Search"
                      name="search"
                      prefix={<SearchOutlined />}
                    />
                  </div>
                  <WhiteButton
                    text="Export"
                    icon="/uploadcloud.svg"
                    className="whitespace-nowrap !w-32 text-gray-700"
                    iconwidth={20}
                    iconheight={20}
                    type="submit"
                  />
                  <WhiteButton
                    text="Advance Filters"
                    icon={'/filter.svg'}
                    iconwidth={20}
                    iconheight={20}
                    className="whitespace-nowrap !w-44 text-gray-700"
                    type="submit"
                  />
                  <Button
                    text="Post a project"
                    icon={'/plus.svg'}
                    iconwidth={20}
                    iconheight={20}
                    className="whitespace-nowrap !w-44"
                    type="submit"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="pt-4">
            <div className="container mx-auto px-4">
              <section className="w-12/12 lg:w-95">
                <div className="container mx-auto px-4">
                  <div>
                    <h4>Invited</h4>
                  </div>
                  <div>
                    <div
                      className={`max-w-full gap-4 lg:py-3 ${expandedId !== null ? 'lg:grid lg:grid-cols-8' : 'lg:w-full'}`}
                    >
                      <div className="lg:col-span-5">
                        {invitedProjects
                          .slice(startInvitedIndex, endInvitedIndex)
                          .map((item, index) => (
                            <div
                              key={index}
                              className="border border-gray-300 rounded-lg p-3 foundation-primary-50 mb-2"
                            >
                              <div
                                className={`flex items-center pb-2 ${expandedId !== null ? 'justify-between' : 'justify-start'}`}
                              >
                                <div
                                  className={`flex items-center justify-between ${expandedId !== null ? 'lg:grid lg:grid-cols-5' : ''}`}
                                >
                                  <div
                                    className={`${expandedId !== null ? 'flex lg:col-span-1 pe-5 justify-end' : ''}`}
                                  >
                                    <svg
                                      className="h-8 w-8 mr-2"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                                      />
                                    </svg>
                                  </div>
                                  <div
                                    className={`${expandedId !== null ? 'lg:col-span-3' : ''}`}
                                  >
                                    <p className="h-font-size">
                                      {item.projectName}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center justify-between mb-2">
                                <div className="text-gray-500 pe-4">
                                  <p className="flex p-font-size">Posted:</p>
                                  <p className="p-font-size text-gray-900 flex">
                                    {moment(item.createdAt).format('ll')}
                                  </p>
                                </div>
                                <div className="text-gray-500 pe-4">
                                  <p className="flex p-font-size">Bid Date:</p>
                                  <p className="p-font-size text-gray-900 flex">
                                    24th March,2024
                                  </p>
                                </div>
                                <div className="text-gray-500 pe-4">
                                  <p className="flex p-font-size">Location:</p>
                                  <p className="p-font-size text-gray-900 flex">
                                    {item.city},{' '}
                                    {
                                      Country.getCountryByCode(item.country)
                                        ?.name
                                    }
                                  </p>
                                </div>
                                <div className="text-gray-500 pe-4">
                                  <p className="flex p-font-size">
                                    Project value:
                                  </p>
                                  <p className="p-font-size text-gray-900 flex">
                                    {USCurrencyFormat.format(13213)}
                                  </p>
                                </div>
                                <p className="foundation-gray-100 text-lavenderPurple rounded-full p-2 p-font-size">
                                  Budgeting/Planning
                                </p>
                                <div
                                  className="foundation-gray-100 rounded-full px-2 ms-2"
                                  onClick={() => handleExpand(index)}
                                >
                                  <svg
                                    className="h-6 w-6 flex items-center"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  >
                                    {' '}
                                    <polyline points="9 18 15 12 9 6" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                      {expandedId !== null && (
                        <div className="lg:col-span-3">
                          {invitedProjects
                            .filter((_, index) => index === expandedId)
                            .map((expandedItem, index) => (
                              <div
                                key={index}
                                className="border border-gray-300 rounded-lg p-5"
                              >
                                <div className="flex items-center justify-between">
                                  <p className="mr-auto p-font-size">
                                    Posted:{' '}
                                    {moment(expandedItem.createdAt).format(
                                      'll'
                                    )}
                                  </p>
                                  <div className="flex items-center space-x-2">
                                    <p className="foundation-gray-100 text-lavenderPurple rounded-full p-2 p-font-size">
                                      {expandedItem.stage}
                                    </p>
                                    <svg
                                      className="h-6 w-6"
                                      viewBox="0 0 21 20"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <g id="trash-01">
                                        <path
                                          id="Icon"
                                          d="M13.8333 5.00033V4.33366C13.8333 3.40024 13.8333 2.93353 13.6517 2.57701C13.4919 2.2634 13.2369 2.00844 12.9233 1.84865C12.5668 1.66699 12.1001 1.66699 11.1667 1.66699H9.83333C8.89991 1.66699 8.4332 1.66699 8.07668 1.84865C7.76308 2.00844 7.50811 2.2634 7.34832 2.57701C7.16667 2.93353 7.16667 3.40024 7.16667 4.33366V5.00033M8.83333 9.58366V13.7503M12.1667 9.58366V13.7503M3 5.00033H18M16.3333 5.00033V14.3337C16.3333 15.7338 16.3333 16.4339 16.0608 16.9686C15.8212 17.439 15.4387 17.8215 14.9683 18.0612C14.4335 18.3337 13.7335 18.3337 12.3333 18.3337H8.66667C7.26654 18.3337 6.56647 18.3337 6.03169 18.0612C5.56129 17.8215 5.17883 17.439 4.93915 16.9686C4.66667 16.4339 4.66667 15.7338 4.66667 14.3337V5.00033"
                                          stroke="#475467"
                                          stroke-width="1.66667"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                        />
                                      </g>
                                    </svg>
                                    <svg
                                      className="h-6 w-6"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                                      />
                                    </svg>
                                    <svg
                                      className="h-6 w-6"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      stroke-width="2"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    >
                                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                      <polyline points="22,6 12,13 2,6" />
                                    </svg>
                                  </div>
                                </div>
                                <div>
                                  <h3 className="py-3 h-font-size">
                                    {expandedItem.projectName}
                                  </h3>
                                  <p className="text-gray-600 p-font-size">
                                    {expandedItem.description}
                                  </p>
                                </div>
                                <div>
                                  <div className="whitespace-nowrap py-3 inline-block relative group">
                                    <span className="underline text-lavenderPurple p-font-size">
                                      View Full Details
                                    </span>
                                  </div>
                                </div>
                                <div className="w-full h-1 bg-mistyWhite my-3"></div>
                                <div>
                                  <p className="text-gray-500 py-2 p-font-size">
                                    Location:{' '}
                                    <span className="text-gray-900 font-bold p-font-size">
                                      {expandedItem.city},{' '}
                                      {
                                        Country.getCountryByCode(
                                          expandedItem.country
                                        )?.name
                                      }
                                    </span>
                                  </p>
                                  <p className="text-gray-500 py-2 p-font-size">
                                    Project value:{' '}
                                    <span className="text-gray-900 font-bold p-font-size">
                                      {USCurrencyFormat.format(231312)}
                                    </span>
                                  </p>
                                  <p className="text-gray-500 py-2 p-font-size">
                                    Bid Date:{' '}
                                    <span className="text-gray-900 font-bold p-font-size">
                                      24th March, 2024
                                    </span>
                                  </p>
                                </div>
                                <div className="w-full h-1 bg-mistyWhite my-3"></div>
                                <h4 className="font-bold py-2 h-font-size">
                                  Who is bidding this project?
                                </h4>
                                <div>
                                  <div className="border border-gray-300 rounded-lg p-3 foundation-primary-50">
                                    <div className="flex items-center justify-between pb-2">
                                      <div className="flex items-center">
                                        <svg
                                          className="h-8 w-8 mr-2"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                        >
                                          <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                                          />
                                        </svg>
                                        <p className="font-bold p-font-size">
                                          Johen Markjes
                                          <br /> construction
                                        </p>
                                      </div>

                                      <div>
                                        <p className="text-lavenderPurple pb-2 p-font-size">
                                          Representative
                                        </p>
                                        <p className="font-bold p-font-size">
                                          Johen Markes
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <p className="text-gray-500 p-font-size">
                                        Phone: (671) 555-0110
                                      </p>
                                      <p className="text-gray-500 p-font-size">
                                        Email: willie.jennings@example.com
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="w-full h-1 bg-mistyWhite my-3"></div>
                                <div className="flex items-center content-between py-2">
                                  <svg
                                    className="h-8 w-8 text-lavenderPurple"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  >
                                    {' '}
                                    <polyline points="8 17 12 21 16 17" />{' '}
                                    <line x1="12" y1="12" x2="12" y2="21" />{' '}
                                    <path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29" />
                                  </svg>
                                  <span className="underline text-lavenderPurple ms-2 p-font-size">
                                    Download all File
                                  </span>
                                </div>
                                <div>
                                  <Button
                                    text="Send Bid"
                                    className="whitespace-nowrap !p-[10px] my-2"
                                    type="submit"
                                  />
                                  <WhiteButton
                                    text="Add to my Bidding Projects"
                                    className="text-lavenderPurple whitespace-nowrap !p-[10px] my-2"
                                    type="submit"
                                  />
                                  <WhiteButton
                                    text="Send an RFI"
                                    className="text-lavenderPurple whitespace-nowrap !p-[10px] my-2 foundation-primary-200"
                                    type="submit"
                                  />
                                </div>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                    <div>
                      <Pagination
                        current={invitedPage}
                        total={projects.length}
                        pageSize={itemsPerPage}
                        onChange={handleInvitedPageChange}
                        showSizeChanger={false}
                        className="flex items-center justify-center custom-pagination mb-5"
                      />
                    </div>
                  </div>

                  {/* End Invited */}
                  <div>
                    <h4>Explore all project</h4>
                  </div>
                  <div>
                    <div
                      className={`max-w-full gap-4 lg:py-3 ${expandedId !== null ? 'lg:grid lg:grid-cols-8' : 'lg:w-full'}`}
                    >
                      <div className="lg:col-span-5">
                        {projects
                          .slice(startProjectIndex, endProjectIndex)
                          .map((item, index) => (
                            <div
                              key={index}
                              className="border border-gray-300 rounded-lg p-3 foundation-primary-50 mb-2"
                            >
                              <div
                                className={`flex items-center pb-2 ${expandedId !== null ? 'justify-between' : 'justify-start'}`}
                              >
                                <div
                                  className={`flex items-center justify-between ${expandedId !== null ? 'lg:grid lg:grid-cols-5' : ''}`}
                                >
                                  <div
                                    className={`${expandedId !== null ? 'flex lg:col-span-1 pe-5 justify-end' : ''}`}
                                  >
                                    <svg
                                      className="h-8 w-8 mr-2"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                                      />
                                    </svg>
                                  </div>
                                  <div
                                    className={`${expandedId !== null ? 'lg:col-span-3' : ''}`}
                                  >
                                    <p className="h-font-size">
                                      {item.projectName}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center justify-between mb-2">
                                <div className="text-gray-500 pe-4">
                                  <p className="flex p-font-size">Posted:</p>
                                  <p className="p-font-size text-gray-900 flex">
                                    {moment(item.createdAt).format('ll')}
                                  </p>
                                </div>
                                <div className="text-gray-500 pe-4">
                                  <p className="flex p-font-size">Bid Date:</p>
                                  <p className="p-font-size text-gray-900 flex">
                                    24th March, 2024
                                  </p>
                                </div>
                                <div className="text-gray-500 pe-4">
                                  <p className="flex p-font-size">Location:</p>
                                  <p className="p-font-size text-gray-900 flex">
                                    {item.city},{' '}
                                    {
                                      Country.getCountryByCode(item.country)
                                        ?.name
                                    }
                                  </p>
                                </div>
                                <div className="text-gray-500 pe-4">
                                  <p className="flex p-font-size">
                                    Project value:
                                  </p>
                                  <p className="p-font-size text-gray-900 flex">
                                    {USCurrencyFormat.format(23213)}
                                  </p>
                                </div>
                                <p className="foundation-gray-100 text-lavenderPurple rounded-full p-2 p-font-size">
                                  Budgeting/Planning
                                </p>
                                <div
                                  className="foundation-gray-100 rounded-full px-2 ms-2"
                                  onClick={() => handleExpand(index)}
                                >
                                  <svg
                                    className="h-6 w-6 flex items-center"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  >
                                    {' '}
                                    <polyline points="9 18 15 12 9 6" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                      {expandedId !== null && (
                        <div className="lg:col-span-3">
                          {projects
                            .filter((_, index) => index === expandedId)
                            .map((expandedItem, index) => (
                              <div
                                key={index}
                                className="border border-gray-300 rounded-lg p-5"
                              >
                                <div className="flex items-center justify-between">
                                  <p className="mr-auto p-font-size">
                                    Posted:{' '}
                                    {moment(expandedItem.createdAt).format(
                                      'll'
                                    )}
                                  </p>
                                  <div className="flex items-center space-x-2">
                                    <p className="foundation-gray-100 text-lavenderPurple rounded-full p-2 p-font-size">
                                      {expandedItem.stage}
                                    </p>
                                    <svg
                                      className="h-6 w-6"
                                      viewBox="0 0 21 20"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <g id="trash-01">
                                        <path
                                          id="Icon"
                                          d="M13.8333 5.00033V4.33366C13.8333 3.40024 13.8333 2.93353 13.6517 2.57701C13.4919 2.2634 13.2369 2.00844 12.9233 1.84865C12.5668 1.66699 12.1001 1.66699 11.1667 1.66699H9.83333C8.89991 1.66699 8.4332 1.66699 8.07668 1.84865C7.76308 2.00844 7.50811 2.2634 7.34832 2.57701C7.16667 2.93353 7.16667 3.40024 7.16667 4.33366V5.00033M8.83333 9.58366V13.7503M12.1667 9.58366V13.7503M3 5.00033H18M16.3333 5.00033V14.3337C16.3333 15.7338 16.3333 16.4339 16.0608 16.9686C15.8212 17.439 15.4387 17.8215 14.9683 18.0612C14.4335 18.3337 13.7335 18.3337 12.3333 18.3337H8.66667C7.26654 18.3337 6.56647 18.3337 6.03169 18.0612C5.56129 17.8215 5.17883 17.439 4.93915 16.9686C4.66667 16.4339 4.66667 15.7338 4.66667 14.3337V5.00033"
                                          stroke="#475467"
                                          stroke-width="1.66667"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                        />
                                      </g>
                                    </svg>
                                    <svg
                                      className="h-6 w-6"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                                      />
                                    </svg>
                                    <svg
                                      className="h-6 w-6"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      stroke-width="2"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    >
                                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                      <polyline points="22,6 12,13 2,6" />
                                    </svg>
                                  </div>
                                </div>
                                <div>
                                  <h3 className="py-3 h-font-size">
                                    {expandedItem.projectName}
                                  </h3>
                                  <p className="text-gray-600 p-font-size">
                                    {expandedItem.description}
                                  </p>
                                </div>
                                <div>
                                  <div className="whitespace-nowrap py-3 inline-block relative group">
                                    <span className="underline text-lavenderPurple p-font-size">
                                      View Full Details
                                    </span>
                                  </div>
                                </div>
                                <div className="w-full h-1 bg-mistyWhite my-3"></div>
                                <div>
                                  <p className="text-gray-500 py-2 p-font-size">
                                    Location:{' '}
                                    <span className="text-gray-900 font-bold p-font-size">
                                      {expandedItem.city},{' '}
                                      {
                                        Country.getCountryByCode(
                                          expandedItem.country
                                        )?.name
                                      }
                                    </span>
                                  </p>
                                  <p className="text-gray-500 py-2 p-font-size">
                                    Project value:{' '}
                                    <span className="text-gray-900 font-bold p-font-size">
                                      {USCurrencyFormat.format(23123)}
                                    </span>
                                  </p>
                                  <p className="text-gray-500 py-2 p-font-size">
                                    Bid Date:{' '}
                                    <span className="text-gray-900 font-bold p-font-size">
                                      24th March, 2024
                                    </span>
                                  </p>
                                </div>
                                <div className="w-full h-1 bg-mistyWhite my-3"></div>
                                <h4 className="font-bold py-2 h-font-size">
                                  Who is bidding this project?
                                </h4>
                                <div>
                                  <div className="border border-gray-300 rounded-lg p-3 foundation-primary-50">
                                    <div className="flex items-center justify-between pb-2">
                                      <div className="flex items-center">
                                        <svg
                                          className="h-8 w-8 mr-2"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                        >
                                          <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                                          />
                                        </svg>
                                        <p className="font-bold p-font-size">
                                          Johen Markjes
                                          <br /> construction
                                        </p>
                                      </div>

                                      <div>
                                        <p className="text-lavenderPurple pb-2 p-font-size">
                                          Representative
                                        </p>
                                        <p className="font-bold p-font-size">
                                          Johen Markes
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <p className="text-gray-500 p-font-size">
                                        Phone: (671) 555-0110
                                      </p>
                                      <p className="text-gray-500 p-font-size">
                                        Email: willie.jennings@example.com
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="w-full h-1 bg-mistyWhite my-3"></div>
                                <div className="flex items-center content-between py-2">
                                  <svg
                                    className="h-8 w-8 text-lavenderPurple"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  >
                                    {' '}
                                    <polyline points="8 17 12 21 16 17" />{' '}
                                    <line x1="12" y1="12" x2="12" y2="21" />{' '}
                                    <path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29" />
                                  </svg>
                                  <span className="underline text-lavenderPurple ms-2 p-font-size">
                                    Download all File
                                  </span>
                                </div>
                                <div>
                                  <Button
                                    text="Send Bid"
                                    className="whitespace-nowrap !p-[10px] my-2"
                                    type="submit"
                                  />
                                  <WhiteButton
                                    text="Add to my Bidding Projects"
                                    className="text-lavenderPurple whitespace-nowrap !p-[10px] my-2"
                                    type="submit"
                                  />
                                  <WhiteButton
                                    text="Send an RFI"
                                    className="text-lavenderPurple whitespace-nowrap !p-[10px] my-2 foundation-primary-200"
                                    type="submit"
                                  />
                                </div>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                    <div>
                      <Pagination
                        current={projectPage}
                        total={projects.length}
                        pageSize={itemsPerPage}
                        onChange={handleProjectPageChange}
                        showSizeChanger={false}
                        className="flex items-center justify-center custom-pagination mb-5"
                      />
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default BidManagement;
