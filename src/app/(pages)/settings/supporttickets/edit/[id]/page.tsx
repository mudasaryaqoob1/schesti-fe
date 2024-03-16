'use client';
import { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

// module imports
import { senaryHeading } from '@/globals/tailwindvariables';
import CustomButton from '@/app/component/customButton/button';
import FormControl from '@/app/component/formControl';
import { twMerge } from 'tailwind-merge';
// redux module

// supportTicket service
import { ISupportTicket } from '@/app/interfaces/supportTicket.interface';
import { supportTicketService } from '@/app/services/supportTicket.service';

import Description from '@/app/component/description';
import MinDescription from '@/app/component/description/minDesc';
import { selectSupportTickets } from '@/redux/supportTickets/supportTicketSelector';
import CustomNavbar from '@/app/component/customNavbar';
import { withAuth } from '@/app/hoc/withAuth';

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required!'),
  description: Yup.string().required('Description is required!'),
});

const initialValues = {
  title: '',
  description: '',
};

const EditSupportTicket = () => {
  const router = useRouter();
  const params = useParams();
  const supportTicketsData = useSelector(selectSupportTickets);

  const { id } = params;



  const [isLoading, setIsLoading] = useState(false);
  const [supportTicketData, setSupportTicketData] =
    useState<ISupportTicket | null>(null);

  useEffect(() => {
    setSupportTicketData(
      supportTicketsData?.find((item: any) => item._id === id)
    );
  }, [id, supportTicketsData]);
  console.log(supportTicketsData);

  const onSubmit = async ({ title, description }: ISupportTicket) => {
    setIsLoading(true);
    let updateSupportTicketBody = {
      title,
      description,
    };
    setIsLoading(true);
    let result = await supportTicketService.httpUpdateSupportTicket(
      updateSupportTicketBody,
      id
    );
    if (result.statusCode == 200) {
      setIsLoading(false);
      router.push('/settings/supporttickets');
    } else {
      setIsLoading(false);
      toast.error(result.message);
    }
  };

  return (
    <CustomNavbar>
      <div className="grid grid-cols-12 gap-8 p-8">
        <div className="col-span-4">
          <Image
            alt="Service24-7"
            src="/service24-7.svg"
            width={498}
            height={628}
          />
        </div>
        <section className="w-full  col-span-8">
          <div className="flex gap-1 items-center">
            <Description
              title="Support Ticket"
              className="font-base text-slateGray cursor-pointer"
              onClick={() => router.push('/settings/supporttickets')}
            />
            <Image
              src="/chevron-right.svg"
              alt="chevron-right icon"
              width={16}
              height={16}
            />
            <Description title="Update Ticket" className="text-RoyalPurple" />
          </div>
          <div className="mt-6 ">
            {/* <div>
          <Image
            src="/support-ticket.png"
            width={400}
            height={400}
            alt="support-img"
          />
        </div> */}
            <div className="col-span-2">
              <Formik
                initialValues={
                  supportTicketData
                    ? {
                      title: supportTicketData.title,
                      description: supportTicketData.description,
                      avatar: supportTicketData.avatar,
                    }
                    : initialValues
                }
                validationSchema={validationSchema}
                enableReinitialize
                onSubmit={onSubmit}
              >
                {({ handleSubmit, values }) => {
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
                      <div
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
                        {values.avatar ? (
                          <Image
                            src={values.avatar!}
                            alt="upload icon"
                            width={100}
                            height={100}
                          />
                        ) : null}
                        <MinDescription
                          className="text-steelGray font-popin text-center"
                          title="SVG, PNG, JPG or GIF (max. 800x400px)"
                        />
                      </div>
                      <div className="flex justify-end gap-2 mt-6">
                        <span>
                          <CustomButton
                            text="Cancel"
                            className="!bg-white !text-graphiteGray !border !border-celestialGray"
                          />
                        </span>
                        <span>
                          <CustomButton
                            text="Update Ticket"
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
          </div>
        </section>
      </div>
    </CustomNavbar>
  );
};

export default withAuth(EditSupportTicket);
