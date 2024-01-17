'use client';

import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useLayoutEffect,
} from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';

// module imports
import Description from '@/app/component/description';
import QuinaryHeading from '@/app/component/headings/quinary';
import MinDescription from '@/app/component/description/minDesc';
import { senaryHeading } from '@/globals/tailwindvariables';
import CustomButton from '@/app/component/customButton/button';
import { supportTicketService } from '@/app/services/supportTicket.service';
import { selectSupportTickets } from '@/redux/supportTickets/supportTicketSelector';
import { ISupportTicket } from '@/app/interfaces/supportTicket.interface';
import moment from 'moment';
import { selectToken } from '@/redux/authSlices/auth.selector';
import { HttpService } from '@/app/services/base.service';
import SettingSidebar from '../../verticleBar';

const SupportTicketDetails = () => {
  const params = useParams();
  const divRef: any = useRef(null);
  const { id }: any = params;

  const token = useSelector(selectToken);

  useLayoutEffect(() => {
    if (token) {
      HttpService.setToken(token);
    }
  }, [token]);

  const supportTicketData = useSelector(selectSupportTickets);

  // const [isLoading, setIsLoading] = useState(true);
  const [supportDetailDetail, setSupportDetailDetail] = useState<any>({});
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any>([]);
  const [messageLoading, setMessageLoading] = useState(false);

  const fetchedSupportTicketsMessagesHandler = useCallback(async () => {
    let result = await supportTicketService.httpGetMessages(id);
    setMessages(result.data.messages);
  }, []);

  useEffect(() => {
    fetchedSupportTicketsMessagesHandler();
  }, []);

  useEffect(() => {
    divRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  }, []);

  useEffect(() => {
    const selectedSupportTicket = supportTicketData.find(
      (ticket: ISupportTicket) => ticket._id === id
    );
    setSupportDetailDetail(selectedSupportTicket);
  }, [supportTicketData]);

  const submitHandler = async (e: any) => {
    setMessageLoading(true);

    e.preventDefault();

    let result = await supportTicketService.httpCreateMessage({
      ticketId: id,
      sender: 'user',
      message: message,
    });
    setMessage('');
    setMessageLoading(false);
    setMessages([...messages, ...[result.data.newMessage]]);
  };

  return (
    <SettingSidebar>
      <section className="w-full">
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-1 items-center ">
            <Image src="/home.svg" alt="home icon" width={20} height={20} />
            <Image
              src="/chevron-right.svg"
              alt="chevron-right icon"
              width={16}
              height={16}
            />
            <p className={`${senaryHeading} font-base text-slateGray`}>
              Support Tickets
            </p>
            <Image
              src="/chevron-right.svg"
              alt="chevron-right icon"
              width={16}
              height={16}
            />

            <MinDescription
              title="Ticket details"
              className={`${senaryHeading} font-semibold text-lavenderPurple cursor-pointer underline`}
            />
          </div>
          <p className="bg-lightblue rounded-xl px-2">
            <span className="text-xs text-darkblue font-normal p-1">
              {supportDetailDetail.status}
            </span>
          </p>
        </div>
        <div className="grid grid-cols-1 gap-y-6 sm:gap-x-6 sm:grid-cols-2 md:grid-cols-3 mt-6">
          <div className="shadow-primaryGlow rounded-2xl p-5">
            <p className="text-xs text-slateGray font-normal">
              Orignal Request
            </p>
            <div className="flex flex-col gap-4 mt-2">
              <Description
                title={`Ticket # ${supportDetailDetail._id}`}
                className="text-steelGray font-semibold"
              />
              <QuinaryHeading
                title={`${supportDetailDetail.title}`}
                className="text-base font-medium"
              />
              <p className="text-xs text-slateGray font-normal flex gap-1">
                <Image src="/calendar.svg" alt="date" width={12} height={12} />
                Date: {moment(supportDetailDetail.createdAt).format('ll')}
              </p>
              <Description
                className="text-steelGray"
                title={`${supportDetailDetail?.description}`}
              />
              {supportDetailDetail?.avatar && (
                <img
                  width="100%"
                  height="auto"
                  src={supportDetailDetail?.avatar}
                  alt="supportticketavatar"
                />
              )}
            </div>
          </div>
          <div className="shadow-primaryGlow rounded-2xl p-5 md:col-span-2">
            <div className="h-auto">
              <div className="h-[66vh] overflow-y-auto scroll-smooth">
                <div className="flex flex-col gap-y-5" ref={divRef}>
                  {messages.map((message: any) => {
                    if (message.sender == 'user') {
                      return (
                        <p
                          key={message._id}
                          className="bg-slate-100 text-[#5A7184] text-[16px] leading-5 rounded-l-lg px-4 py-3 mr-8 self-end"
                        >
                          {message.message}
                        </p>
                      );
                    } else {
                      return (
                        <p
                          key={message._id}
                          className="bg-sky-100 text-[#5A7184] text-[16px] leading-5 rounded-r-lg px-4 py-3 max-w-max"
                        >
                          {message.message}
                        </p>
                      );
                    }
                  })}
                </div>
              </div>
              <form onSubmit={submitHandler}>
                <div className="relative w-full">
                  <input
                    type="text"
                    className="border border-Gainsboro w-full p-4 font-poppin text-sm"
                    placeholder="Please answer..."
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <div className="flex gap-3 items-center absolute top-2 right-3">
                    {/* <img
                  width={24}
                  height={24}
                  src="/select-file.svg"
                  alt="select file"
                />
                <div className="w-0.5 h-7 bg-darkGray" /> */}
                    <span>
                      <CustomButton
                        isLoading={messageLoading}
                        type="submit"
                        text="Reply"
                        className="!bg-[#EF9F28] !py-2.5 !px-6 !border-none"
                      />
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </SettingSidebar>
  );
};

export default SupportTicketDetails;
