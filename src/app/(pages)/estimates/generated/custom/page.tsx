"use client"
import CustomButton from '@/app/component/customButton/button'
import Description from '@/app/component/description'
import QuaternaryHeading from '@/app/component/headings/quaternary'
import TertiaryHeading from '@/app/component/headings/tertiary'
import FormControl from '@/app/component/formControl';
import ClientNavbar from '@/app/component/navbar/clientnavbar';
// import AddItemTable from '@/app/component/table/(generatedestimate)/addnewItem/index'
import { headings, AddItemData } from "./data"
import { senaryHeading, tertiaryHeading } from '@/globals/tailwindvariables';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form } from 'antd';
import Paragraph from '@/app/component/customparagraph/paragraph';
import Image from 'next/image';
import { useRouter } from 'next/navigation'
// import { useRouter } from 'next/navigation';
import { StyledWrapper } from './style';
const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    additionalEmail: '',
    password: '',
    phoneNumber: '',
    officeNumber: '',
    address: '',
    address2: '',
};

const newClientSchema: any = Yup.object({
    firstName: Yup.string().required(' first name is required!'),
    lastName: Yup.string().required('last name is required!'),
    phoneNumber: Yup.string().required('phone number is required!'),
    officeNumber: Yup.string().required('office number is required!'),
    email: Yup.string()
        .required('Email is required!')
        .email('Email should be valid'),
    additionalEmail: Yup.string()
        .required('Additional Email is required!')
        .email('Additional Email should be valid'),
    address: Yup.string().required('Address is required!'),
    address2: Yup.string().required('Address 2 is required!'),
});
const page = () => {
    const submitHandler = () => { };
    const router = useRouter()
    return (
        <StyledWrapper>
            <section className="md:mx-16 mx-8">
                {/* scope */}
                <article className="flex justify-center w-full mb-8 shadow-secondaryTwist rounded-xl bg-snowWhite
        border border-solid border-silverGray p-3 my-6
        ">
                    {/*  */}
                    <div className="md:flex hidden flex-col">
                        {/* // stepbase*/}
                        <div className="flex items-center">
                            <Image
                                src={'/purpletick.svg'}
                                alt="tick icon"
                                width={40}
                                height={40}
                            />
                            <div className="line bg-[#7F56D9] h-[2px] w-[250px]"></div>
                            <Image
                                src={'/recordwhite.svg'}
                                alt="recordwhite icon"
                                width={40}
                                height={40}
                            />
                            <div className="bg-[#7F56D9] h-[2px] w-[250px]"></div>
                            <Image
                                src={'/whiteDot.svg'}
                                alt="recordwhite icon"
                                width={40}
                                height={40}
                            />
                            {/* // */}
                        </div>
                        {/* content */}
                        <div className="flex items-center mt-4 justify-between">
                            <div className="text-center">
                                <Description
                                    title="Take off"
                                    className="text-graphiteGray font-semibold"
                                />
                                <Description
                                    title="measurements"
                                    className="text-slateGray font-normal"
                                />
                            </div>
                            <div className="text-center ms-12">
                                <Description
                                    title="Scope"
                                    className="text-supremePurple font-semibold"
                                />
                                <Description
                                    title="Add all of your scope"
                                    className="text-lavenderPurple font-normal"
                                />
                            </div>
                            <div className="text-center ms-12">
                                <Description
                                    title="Summary"
                                    className="text-graphiteGray font-semibold"
                                />
                                <Description
                                    title="Confirm all the details"
                                    className="text-slateGray font-normal"
                                />
                            </div>
                        </div>
                    </div>
                    {/*  */}
                </article>
                {/*  */}
                <div className="flex justify-between items-center mb-3">
                    <TertiaryHeading
                        title="Scope"
                        className="text-graphiteGray font-semibold"
                    />
                    <div className="flex gap-3 items-center lg:w-3/12">
                        <CustomButton
                            text="previous"
                            onClick={() => router.push('/estimates/generated/estimates')}
                            className="!text-graphiteGray !bg-snowWhite !shadow-scenarySubdued 
              border-2 border-solid !border-celestialGray"
                        />

                        <CustomButton text="Next" className="!w-full"

                            onClick={() => router.push('/estimates/generated/multiple')}
                        />
                    </div>
                </div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={newClientSchema}
                    onSubmit={submitHandler}
                >
                    {(formik) => {
                        return (
                            <Form
                                name="basic"
                                onFinish={formik.handleSubmit}
                                autoComplete="off"
                                className={`flex flex-col gap-4  !p-2             
                shadow-secondaryTwist rounded-xl bg-snowWhite
                 border border-solid border-silverGray
                `}
                            >
                                <div className="md:flex block justify-between sec-1">
                                    <FormControl
                                        control="select"
                                        label="CSI Section"
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                        className="w-full"
                                    />
                                    <FormControl
                                        control="select"
                                        label="Scope of Work"
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                        className="w-full"
                                    />
                                    <FormControl
                                        control="select"
                                        label="Scope of Work"
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                        className="w-full"
                                    />
                                </div>
                                <div className="md:flex block items-center gap-1 flex-wrap sec-2">
                                    <FormControl
                                        control="select"
                                        label=""
                                        type="text"
                                        name="phoneNumber"
                                        placeholder="Select the items"
                                        className="2xl:w-[700px] lg:[600px] w-full md:my-0 my-2"
                                    />
                                    <FormControl
                                        control="select"
                                        label=""
                                        type="text"
                                        name="officeNumber"
                                        placeholder="Select unit"
                                        className="md:w-[220px] w-full  md:my-0 my-2"
                                    />
                                    <FormControl
                                        control="select"
                                        label=""
                                        type="text"
                                        name="officeNumber"
                                        placeholder="Select unit"
                                        className="md:w-[220px] w-full md:my-0 my-2"
                                    />
                                    <FormControl
                                        control="select"
                                        label=""
                                        type="text"
                                        name="officeNumber"
                                        placeholder="Select unit"
                                        className="md:w-[220px] w-full  md:my-0 my-2"
                                    />
                                    <FormControl
                                        control="select"
                                        label=""
                                        type="text"
                                        name="officeNumber"
                                        placeholder="Select unit"
                                        className="md:w-[220px] w-full  md:my-0 my-2"
                                    />
                                    <FormControl
                                        control="select"
                                        label=""
                                        type="text"
                                        name="officeNumber"
                                        placeholder="Select unit"
                                        className="md:w-[220px] w-full  md:my-0 my-2"
                                    />
                                    <FormControl
                                        control="input"
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                    />
                                    <FormControl
                                        control="input"
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                    />
                                    <FormControl
                                        control="input"
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                    />
                                    <FormControl
                                        control="input"
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                    />
                                    <div className="md:w-[100px] w-full h-6 md:my-0 my-2">
                                        <CustomButton
                                            type="submit"
                                            text="Add item"
                                            className="
                        !border-celestialGray !shadow-scenarySubdued2 !text-snowWhite !bg-goldenrodYellow
                        shadow-scenarySubdued !py-2 !px-4
                        "
                                        />
                                    </div>
                                </div>
                                <div className="self-end flex justify-end items-center gap-5 md:my-5 my-3">
                                    <div>
                                        <CustomButton
                                            className=" !border-celestialGray 
                        !py-2
                        !shadow-scenarySubdued2 !text-graphiteGray !bg-snowWhite"
                                            text="Cancel"

                                        />
                                    </div>
                                    <div>
                                        <CustomButton
                                            className="mx-w-30"
                                            type="submit"
                                            text="Add Div"
                                            icon="/plus.svg"
                                            iconwidth={20}
                                            iconheight={20}

                                        />
                                    </div>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
                {/* <AddItemTable headings={headings} AddItem={AddItemData} /> */}
            </section>
        </StyledWrapper>
    );
};

export default page