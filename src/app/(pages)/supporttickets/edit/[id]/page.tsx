'use client';
import { useEffect, useLayoutEffect, useState } from 'react';
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
import CustomNavbar from '@/app/component/customNavbar';
import { twMerge } from 'tailwind-merge';
// redux module
import { selectToken } from '@/redux/authSlices/auth.selector';
import { HttpService } from '@/app/services/base.service';

// supportTicket service
import { ISupportTicket } from '@/app/interfaces/supportTicket.interface';
import { supportTicketService } from '@/app/services/supportTicket.service';

import Description from '@/app/component/description';
import MinDescription from '@/app/component/description/minDesc';
import { selectSupportTickets } from '@/redux/company/companySelector';

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
  const token = useSelector(selectToken);
  const supportTicketsData = useSelector(selectSupportTickets);

  const { id } = params;

  useLayoutEffect(() => {
    if (token) {
      HttpService.setToken(token);
    }
  }, [token]);

  const [isLoading, setIsLoading] = useState(false);
  const [supportTicketData, setSupportTicketData] =
    useState<ISupportTicket | null>(null);

  useEffect(() => {
    setSupportTicketData(
      supportTicketsData?.find((item: any) => item._id === id)
    );
  }, [id, supportTicketsData]);

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
      router.push('/supporttickets');
    } else {
      setIsLoading(false);
      toast.error(result.message);
    }
  };

  return (
    <CustomNavbar>
      <section className="px-16 mt-6">
        <div className="flex gap-1 items-center">
          <Description title="My Ticket" className="font-base text-slateGray" />
          <Image
            src="/chevron-right.svg"
            alt="chevron-right icon"
            width={16}
            height={16}
          />
          <Description title="Update Ticket" className="text-RoyalPurple" />
        </div>
        <div className="mt-6 grid grid-cols-3 mb-3">
          <div>
            <Image
              src="/support-ticket.png"
              width={400}
              height={400}
              alt="support-img"
            />
          </div>
          <div className="col-span-2">
            <Formik
              initialValues={
                supportTicketData
                  ? {
                      title: supportTicketData.title,
                      description: supportTicketData.description,
                    }
                  : initialValues
              }
              validationSchema={validationSchema}
              enableReinitialize
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
    </CustomNavbar>
  );
};

export default EditSupportTicket;
