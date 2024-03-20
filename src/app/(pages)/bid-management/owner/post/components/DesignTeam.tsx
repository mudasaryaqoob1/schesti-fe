import CustomButton from '@/app/component/customButton/button';
import WhiteButton from '@/app/component/customButton/white';
import { InputComponent } from '@/app/component/customInput/Input';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { PhoneNumberInputWithLable } from '@/app/component/phoneNumberInput/PhoneNumberInputWithLable';
import { Drawer, Table, type TableProps } from 'antd';
import Image from 'next/image';
import { useState } from 'react';

type Props = {
    children?: React.ReactNode;
};

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
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: 'Action',
        key: 'action',
    },
];

export function PostDesignTeam({ children }: Props) {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <div className="">
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
                    />
                    <InputComponent
                        label="Role"
                        name="role"
                        type="text"
                        placeholder="Enter Role"
                    />
                    <InputComponent
                        label="Company Name"
                        name="companyName"
                        type="text"
                        placeholder="Enter Company Name"
                    />

                    <InputComponent
                        label="Location"
                        name="location"
                        type="text"
                        placeholder="Enter Location"
                    />

                    <PhoneNumberInputWithLable
                        label='Phone Number'
                        onChange={val => console.log("Phone", val)}
                    />

                    <InputComponent
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="Enter Email"
                    />

                    <div className="flex items-center justify-between">
                        <WhiteButton text="Cancel" className="!w-40" onClick={onClose} />
                        <CustomButton text="Save" className="!w-40" />
                    </div>
                </div>
            </Drawer>

            <div className="mt-5">
                <Table columns={columns} bordered />
            </div>

            {children}
        </div>
    );
}
