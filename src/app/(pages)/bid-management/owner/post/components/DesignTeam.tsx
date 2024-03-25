import CustomButton from '@/app/component/customButton/button';
import WhiteButton from '@/app/component/customButton/white';
import { InputComponent } from '@/app/component/customInput/Input';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { PhoneNumberInputWithLable } from '@/app/component/phoneNumberInput/PhoneNumberInputWithLable';
import { IResponseInterface } from '@/app/interfaces/api-response.interface';
import { IBidManagement, IBidManagementProjectTeamMember } from '@/app/interfaces/bid-management/bid-management.interface';
import { CreateTeamMemberType, bidManagementService } from '@/app/services/bid-management.service';
import { Drawer, Table, type TableProps } from 'antd';
import { AxiosError } from 'axios';
import { type FormikProps, useFormik } from 'formik';
import Image from 'next/image';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

type Props = {
    children?: React.ReactNode;
    mainFormik:FormikProps<IBidManagement>
};

const DesignTeamMemberSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    role: Yup.string().required('Role is required'),
    companyName: Yup.string().required('Company Name is required'),
    location: Yup.string().required('Location is required'),
    phoneNumber: Yup.string().min(11,"Phone Number must be at least 11 digits").max(14,"Phone Number must be between 11 and 14 digits").required('Phone Number is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
});

const columns: TableProps['columns'] = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
    },
    {
        title: 'Company Name',
        dataIndex: 'companyName',
        key: 'companyName',
    },
    {
        title: 'Location',
        dataIndex: 'location',
        key: 'location',
    },
    {
        title: 'Phone',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
    },
    {
        title: 'Action',
        key: 'action',
        render() {
            return "Actions";
        },
    },
];

export function PostDesignTeam({mainFormik, children }: Props) {
    const [open, setOpen] = useState(false);
    const [teamMembers,setTeamMembers] = useState<IBidManagementProjectTeamMember[]>([]);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    
    const projectQuery = useQuery<IResponseInterface<{project:IBidManagement}>,AxiosError<{message:string}>>(['project',mainFormik.values._id],() => bidManagementService.httpGetOwnerProjectById(mainFormik.values._id),{
        enabled:!!mainFormik.values._id,
        onSuccess(res){
            if (res.data && res.data.project) {
                setTeamMembers(res.data.project.teamMembers);
            }
        }
    })

    const createTeamMemberMutation = useMutation<IResponseInterface<{user:IBidManagementProjectTeamMember}>,AxiosError<{message:string}>,CreateTeamMemberType>({
        mutationKey:"createTeamMember",
        mutationFn:(values:CreateTeamMemberType) => {
            return bidManagementService.httpCreateTeamDesignMember(values);
        },
        onSuccess(res) {
            if (res.data && res.data.user) {
                toast.success("Team Member Added Successfully");
                setTeamMembers([...teamMembers,res.data.user]);
                if (!mainFormik.values.teamMembers) {
                    mainFormik.setFieldValue('teamMembers', [res.data.user._id]);
                }
                else{
                    mainFormik.setFieldValue('teamMembers', [...mainFormik.values.teamMembers, res.data.user._id]);
                }
            }
        },
        onError(error) {
            if (error.response?.data) {
                toast.error(error.response?.data.message);
            }
        },
    })



    const designTeamFormik = useFormik({
        initialValues: {
            name: '',
            role: '',
            companyName: '',
            location: '',
            phoneNumber: '',
            email: '',
        },
        validationSchema: DesignTeamMemberSchema,
        onSubmit: values => {
            createTeamMemberMutation.mutate(values);
        },
    })

    return (
        <div className=" bg-white shadow-2xl rounded-xl border p-4">
            <div className="flex items-center justify-between">
                <TertiaryHeading
                    title="Design Team"
                    className="text-[20px] leading-[30px]"
                />
                <CustomButton
                    text="Add New Member"
                    className="!w-48"
                    onClick={showDrawer}
                />
            </div>
            <Drawer
                title="Add New Member"
                placement="right"
                open={open}
                onClose={onClose}
                width={400}
                closable={false}
                extra={
                    <Image
                        src="/closeicon.svg"
                        alt="close"
                        width={20}
                        height={20}
                        className="cursor-pointer"
                        onClick={onClose}
                    />
                }
            >
                <div className="space-y-3">
                    <InputComponent
                        label="Name"
                        name="name"
                        placeholder="Enter Name"
                        type="text"
                        field={{
                            value: designTeamFormik.values.name,
                            onChange: designTeamFormik.handleChange,
                            onBlur: designTeamFormik.handleBlur,
                        }}
                        hasError={designTeamFormik.touched.name && Boolean(designTeamFormik.errors.name)}
                        errorMessage={designTeamFormik.touched.name && designTeamFormik.errors.name ? designTeamFormik.errors.name : ''}
                    />
                    <InputComponent
                        label="Role"
                        name="role"
                        type="text"
                        placeholder="Enter Role"
                        field={{
                            value: designTeamFormik.values.role,
                            onChange: designTeamFormik.handleChange,
                            onBlur: designTeamFormik.handleBlur,
                        }}
                        hasError={designTeamFormik.touched.role && Boolean(designTeamFormik.errors.role)}
                        errorMessage={designTeamFormik.touched.role && designTeamFormik.errors.role ? designTeamFormik.errors.role : ''}
                    />
                    <InputComponent
                        label="Company Name"
                        name="companyName"
                        type="text"
                        placeholder="Enter Company Name"
                        field={{
                            value: designTeamFormik.values.companyName,
                            onChange: designTeamFormik.handleChange,
                            onBlur: designTeamFormik.handleBlur,
                        }}
                        hasError={designTeamFormik.touched.companyName && Boolean(designTeamFormik.errors.companyName)}
                        errorMessage={designTeamFormik.touched.companyName && designTeamFormik.errors.companyName ? designTeamFormik.errors.companyName : ''}
                    />

                    <InputComponent
                        label="Location"
                        name="location"
                        type="text"
                        placeholder="Enter Location"
                        field={{
                            value: designTeamFormik.values.location,
                            onChange: designTeamFormik.handleChange,
                            onBlur: designTeamFormik.handleBlur,
                        }}
                        hasError={designTeamFormik.touched.location && Boolean(designTeamFormik.errors.location)}
                        errorMessage={designTeamFormik.touched.location && designTeamFormik.errors.location ? designTeamFormik.errors.location : ''}
                    />

                    <PhoneNumberInputWithLable
                        label='Phone Number'
                        onChange={val => designTeamFormik.setFieldValue('phoneNumber', val)}
                        value={designTeamFormik.values.phoneNumber}
                        onBlur={() => designTeamFormik.setFieldTouched('phoneNumber', true)}
                        hasError={designTeamFormik.touched.phoneNumber && Boolean(designTeamFormik.errors.phoneNumber)}
                        errorMessage={designTeamFormik.touched.phoneNumber && designTeamFormik.errors.phoneNumber ? designTeamFormik.errors.phoneNumber : ''}
                    />

                    <InputComponent
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="Enter Email"
                        field={{
                            value: designTeamFormik.values.email,
                            onChange: designTeamFormik.handleChange,
                            onBlur: designTeamFormik.handleBlur,
                        }}
                        hasError={designTeamFormik.touched.email && Boolean(designTeamFormik.errors.email)}
                        errorMessage={designTeamFormik.touched.email && designTeamFormik.errors.email ? designTeamFormik.errors.email : ''}
                    />

                    <div className="flex items-center justify-between">
                        <WhiteButton text="Cancel" className="!w-40" onClick={onClose} />
                        <CustomButton text="Save" className="!w-40" 
                            isLoading={createTeamMemberMutation.isLoading}
                            loadingText='Saving...'
                            onClick={() => designTeamFormik.handleSubmit()}
                        />
                    </div>
                </div>
            </Drawer>

            <div className="mt-5">
                <Table 
                columns={columns}
                 bordered 
                 dataSource={teamMembers}
                 loading={projectQuery.isLoading}
                 />
            </div>

            {children}
        </div>
    );
}
