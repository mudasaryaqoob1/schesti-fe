'use client';
import React from 'react';
import Button from '@/app/component/customButton/button';
import ConvenienceStore from '@/app/constants/BidsData.json';

// module imports
import PrimaryHeading from '@/app/component/headings/primary';

const BidManagement = () => {
  return (
    <>
      <div className="h-[calc(100vh-100px)] grid place-items-center mt-7">
        <section className="bg-white shadow-md w-11/12 lg:w-95">
          <div className="container mx-auto px-6">
            <div className="px-2 py-4 flex justify-between items-center">
              <div className="flex items-center">
                <PrimaryHeading title="Find a project as Sub-contractor" />
              </div>
              <div className="flex">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="border border-gray-300 rounded-md px-4 py-2 pl-10 focus:outline focus:border-indigo-500"
                  />
                  <svg
                    className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 0a8 8 0 015.656 13.657l4.95 4.95a1 1 0 11-1.414 1.414l-4.95-4.95A8 8 0 118 0zm0 2a6 6 0 100 12A6 6 0 008 2z"
                    />
                  </svg>
                </div>
                <button
                  className="whitespace-nowrap !p-[10px] mx-2"
                  type="submit"
                >
                  <span className="inline-flex items-center">
                    <svg
                      className="h-8 w-8 mr-2"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <path d="M7 18a4.6 4.4 0 0 1 0 -9h0a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" />
                      <polyline points="9 15 12 12 15 15" />
                      <line x1="12" y1="12" x2="12" y2="21" />
                    </svg>
                    Export
                  </span>
                </button>

                <Button
                  text="Export"
                  className="whitespace-nowrap !p-[10px] mx-2"
                  type="submit"
                />
                <Button
                  text="Advance Filters"
                  className="whitespace-nowrap !p-[12px] mx-2"
                  type="submit"
                />
                <Button
                  text="+ Post a project"
                  className="whitespace-nowrap !p-[12px] mx-2"
                  type="submit"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white shadow-md w-11/12 lg:w-95">
          <div className="container mx-auto px-4">
            <div className="max-w-full gap-4 lg:grid lg:grid-cols-2 lg:py-3 lg:px-6">
              <div>
                {ConvenienceStore.map((item: any, index: any) => (
                  <div
                    key={index}
                    className="border border-gray-300 rounded-lg p-3 foundation-primary-50"
                  >
                    <div className="flex items-center justify-center pb-2">
                      <div className="flex items-center justify-between">
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
                        <p className="h-font-size">{item.title}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-gray-500 pe-4">
                        <p className="flex p-font-size">Posted:</p>
                        <p className="p-font-size text-gray-900 flex">
                          {item.posted}
                        </p>
                      </div>
                      <div className="text-gray-500 pe-4">
                        <p className="flex p-font-size">Bid Date:</p>
                        <p className="p-font-size text-gray-900 flex">
                          {item.bidDate}
                        </p>
                      </div>
                      <div className="text-gray-500 pe-4">
                        <p className="flex p-font-size">Location:</p>
                        <p className="p-font-size text-gray-900 flex">
                          {item.location}
                        </p>
                      </div>
                      <div className="text-gray-500 pe-4">
                        <p className="flex p-font-size">Project value:</p>
                        <p className="p-font-size text-gray-900 flex">
                          {item.projectValue}
                        </p>
                      </div>
                      <p className="foundation-gray-100 text-lavenderPurple rounded-full p-2 p-font-size">
                        Budgeting/Planning
                      </p>
                      <div className="foundation-gray-100 rounded-full px-2 ms-2">
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
              <div className="border border-gray-300 rounded-lg p-5">
                <div className="flex items-center justify-between">
                  <p className="mr-auto p-font-size">
                    Posted: 12 May 2022, 12:40
                  </p>
                  <div className="flex items-center space-x-2">
                    <p className="foundation-gray-100 text-lavenderPurple rounded-full p-2 p-font-size">
                      Budgeting/Planning
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
                    Seabreeza Village comercial Developemnst - convenience store
                  </h3>
                  <p className="text-gray-600 p-font-size">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industrys
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
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
                      Austin
                    </span>
                  </p>
                  <p className="text-gray-500 py-2 p-font-size">
                    Project value:{' '}
                    <span className="text-gray-900 font-bold p-font-size">
                      $900,000
                    </span>
                  </p>
                  <p className="text-gray-500 py-2 p-font-size">
                    Bid Date:{' '}
                    <span className="text-gray-900 font-bold p-font-size">
                      12 May 2022, 12:40
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
                        <p className="font-bold p-font-size">Johen Markes</p>
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
                  <Button
                    text="Add to my Bidding Projects"
                    className="whitespace-nowrap !p-[10px] my-2"
                    type="submit"
                  />
                  <Button
                    text="Send an RFI"
                    className="whitespace-nowrap !p-[10px] my-2"
                    type="submit"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BidManagement;
