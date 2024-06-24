'use client';

import CustomButton from "@/app/component/customButton/button";
import VerticleBar from "../../verticleBar";
import TertiaryHeading from "@/app/component/headings/tertiary";
import { InputComponent } from "@/app/component/customInput/Input";
import { Plans, } from "@/app/utils/plans.utils";
import { Checkbox } from "antd";
import * as Yup from 'yup';
import { useFormik } from "formik";

const CompanyRoleSchema = Yup.object().shape({
    name: Yup.string().required('Role Name is required!'),
    permissions: Yup.array().of(Yup.string()).required('Permissions is required!'),
});

export default function NewCompanyRolePage() {

    const formik = useFormik({
        initialValues: {
            name: '',
            permissions: [] as string[],
        },
        onSubmit(values) {

            console.log(values)
        },
        validationSchema: CompanyRoleSchema,
        enableReinitialize: true
    })

    function handleRemovePermission(value: string) {

        formik.setFieldValue('permissions', formik.values.permissions.filter((permission) => permission !== value))
    }

    function handleAddPermission(value: string) {
        formik.setFieldValue('permissions', [...formik.values.permissions, value])
    }

    console.log(formik.values);
    return <VerticleBar>
        <div className="w-full">
            <div className="flex w-full justify-between items-center">
                <div>
                    <TertiaryHeading title="Contractor" className="text-schestiPrimaryBlack text-2xl font-semibold" />
                    <p className="text-schestiLightBlack font-normal text-[14px] leading-6 ">Manage your company roles</p>
                </div>

                <CustomButton
                    text="Create new role"
                    icon="/plus.svg"
                    iconwidth={20}
                    iconheight={20}
                    className="!w-fit"
                />
            </div>

            <div className="bg-snowWhite rounded-2xl mt-4 shadow-instentWhite py-5 px-6">

                <div className="grid grid-cols-12 gap-2 items-center">
                    <div className="col-span-4">
                        <InputComponent
                            label="Role Name"
                            name="name"
                            placeholder="Enter Role Name"
                            type="text"
                            field={{
                                onChange: formik.handleChange,
                                onBlur: formik.handleBlur,
                                value: formik.values.name
                            }}
                            hasError={formik.touched.name && Boolean(formik.errors.name)}
                            errorMessage={formik.touched.name && formik.errors.name ? formik.errors.name : ''}
                        />
                    </div>
                    <div className="col-span-2 pt-5">
                        <p className="text-schestiPrimaryBlack font-medium text-[14px] leading-6">
                            Created At: <span className="text-schestiLightBlack">2023/10/06</span>
                        </p>
                    </div>
                </div>


                <div className="p-5 mt-6 border border-schestiLightGray rounded-md">
                    <p className="text-[14px] text-schestiLightBlack leading-5">Select permission/access for this role</p>

                    <div className="grid mt-3 grid-cols-3 gap-3">
                        {Object.keys(Plans).map((planKey) => {
                            const value = Plans[planKey as keyof typeof Plans];
                            const isChecked = formik.values.permissions.includes(value)
                            return <Checkbox
                                key={planKey}
                                checked={isChecked}
                                className="text-schestiPrimaryBlack font-normal"
                                onChange={() => {
                                    if (isChecked) {
                                        handleRemovePermission(value);
                                    } else {
                                        handleAddPermission(value);
                                    }
                                }}
                            >
                                {planKey}
                            </Checkbox>
                        })}
                    </div>
                </div>

            </div>
        </div>
    </VerticleBar>

}