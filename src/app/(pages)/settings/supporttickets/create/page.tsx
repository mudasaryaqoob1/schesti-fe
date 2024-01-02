'use client';

import React, { useLayoutEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import Image from 'next/image';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

// module imports
import Description from '@/app/component/description';
import FormControl from '@/app/component/formControl';
import CustomButton from '@/app/component/customButton/button';
// redux imports
import { useSelector } from 'react-redux';
import { selectToken } from '@/redux/authSlices/auth.selector';
import { HttpService } from '@/app/services/base.service';

// support tickets service
import { ISupportTicket } from '@/app/interfaces/supportTicket.interface';
import { supportTicketService } from '@/app/services/supportTicket.service';
import SettingSidebar from '../../verticleBar';

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required!'),
  description: Yup.string().required('Description is required!'),
});

const initialValues: ISupportTicket = {
  title: '',
  description: '',
};

const CreateTicket = () => {
  const router = useRouter();
  const token = useSelector(selectToken);

  useLayoutEffect(() => {
    if (token) {
      HttpService.setToken(token);
    }
  }, [token]);

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: ISupportTicket) => {
    setIsLoading(true);
    supportTicketService
      .httpAddNewSupportTicket(values)
      .then((response: any) => {
        setIsLoading(false);
        if (response.statusCode == 201) {
          setIsLoading(false);
          router.push('/settings/supporttickets');
        }
      })
      .catch(({ response }: any) => {
        setIsLoading(false);
        toast.error(response.data.message);
      });
  };

  return (
    <SettingSidebar>
      <section className="w-full">
        <div className="flex gap-1 items-center">
          <Description
            title="Support Ticket"
            className="font-base text-slateGray"
          />
          <Image
            src={'/chevron-right.svg'}
            alt="chevron-right icon"
            width={16}
            height={16}
          />
          <Description title="Create New Ticket" className="text-RoyalPurple" />
        </div>
        <div className="mt-6">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ handleSubmit }) => {
              return (
                <Form
                  name="basic"
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5 px-5 py-6 shadow-primaryGlow rounded-2xl"
                >
                  <FormControl
                    control="input"
                    label="Title"
                    type="text"
                    name="title"
                    placeholder="Enter title"
                  />
                  <FormControl
                    control="textarea"
                    label="Description"
                    type="text"
                    name="description"
                    placeholder="Write message here"
                  />
                  {/* <div
                      className="p-6 flex items-center flex-col gap-2 border-2
                    border-silverGray pb-4 rounded-lg "
                    >
                      <Image
                        src="/uploadcloud.svg"
                        alt="upload icon"
                        width={20}
                        height={20}
                        className="rounded-3xl border-5 border-paleblueGray bg-lightGrayish"
                      />
                      <div className="flex gap-1 items-center">
                        <div>
                          <p
                            className={twMerge(
                              `${senaryHeading}
                                text-RoyalPurple font-semibold`
                            )}
                          >
                            Doc
                          </p>
                        </div>
                        <MinDescription
                          className="text-steelGray font-popin text-center"
                          title="or drag and drop"
                        />
                      </div>
                      <MinDescription
                        className="text-steelGray font-popin text-center"
                        title="SVG, PNG, JPG or GIF (max. 800x400px)"
                      />
                    </div> */}
                  <div className="flex justify-end gap-2 mt-6">
                    <span>
                      <CustomButton
                        onClick={() => router.push('/settings/supporttickets')}
                        text="Cancel"
                        className="!bg-white !text-graphiteGray !border !border-celestialGray"
                      />
                    </span>
                    <span>
                      <CustomButton
                        text="Create New Ticket"
                        type="submit"
                        className="!bg-mediumSlateBlue"
                        isLoading={isLoading}
                      />
                    </span>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </section>
    </SettingSidebar>
  );
};

export default CreateTicket;
