import { InputComponent } from "@/app/component/customInput/Input";
import { SelectComponent } from "@/app/component/customSelect/Select.component";
import SenaryHeading from "@/app/component/headings/senaryHeading";
import TertiaryHeading from "@/app/component/headings/tertiary";
import { IBidManagement } from "@/app/interfaces/bid-management/bid-management.interface";
import { Checkbox, Divider } from "antd";
import Dragger from "antd/es/upload/Dragger";
import type { FormikProps } from "formik";
import moment from "moment";
import Image from "next/image";
import { getTimezoneFromCountryAndState } from "@/app/utils/date.utils";

type Props = {
    children?: React.ReactNode;
    formik:FormikProps<IBidManagement>
}

export function PostFinalize({ formik, children }: Props) {
    const {values} = formik;

    
    return <div className="space-y-6">
        <div className=" bg-white shadow-2xl rounded-xl border p-4">


            <TertiaryHeading
                title="Summary"
                className="text-[20px] leading-[30px]"
            />
            <fieldset className="border-[2px] mt-[21px] space-y-4 p-4  rounded-lg border-dashed border-[#aeafb8] relative">
                <legend className="text-[#667085] text-[14px] leading-6 absolute -top-4 z-10 bg-white w-fit px-2">Basic Information</legend>

                <div className="grid grid-cols-4 gap-3">
                    <div className="space-y-2">
                        <SenaryHeading
                            title="Project Name"
                            className="text-[14px] leading-6 text-[#98A2B3] font-normal"
                        />
                        <p className="text-[#344054] text-[14px] leading-6 font-medium ">{values.projectName}</p>
                    </div>
                    <div className="space-y-2">
                        <SenaryHeading
                            title="Address"
                            className="text-[14px] leading-6 text-[#98A2B3] font-normal"
                        />
                        <p className="text-[#344054] text-[14px] leading-6 font-medium ">{values.address}</p>
                    </div>
                    <div className="space-y-2">
                        <SenaryHeading
                            title="Zip Code"
                            className="text-[14px] leading-6 text-[#98A2B3] font-normal"
                        />
                        <p className="text-[#344054] text-[14px] leading-6 font-medium ">{values.zipCode}</p>
                    </div>
                    <div className="space-y-2">
                        <SenaryHeading
                            title="City"
                            className="text-[14px] leading-6 text-[#98A2B3] font-normal"
                        />
                        <p className="text-[#344054] text-[14px] leading-6 font-medium ">{values.city}</p>
                    </div>


                </div>

                <div className="grid grid-cols-4 gap-3">

                    <div className="space-y-2">
                        <SenaryHeading
                            title="Bid Due"
                            className="text-[14px] leading-6 text-[#98A2B3] font-normal"
                        />
                        <p className="text-[#344054] text-[14px] leading-6 font-medium ">12 May 2022, 12:40</p>
                    </div>
                    <div className="space-y-2">
                        <SenaryHeading
                            title="Estimated Start Date: "
                            className="text-[14px] leading-6 text-[#98A2B3] font-normal"
                        />
                        <p className="text-[#344054] text-[14px] leading-6 font-medium ">
                            {moment(values.estimatedStartDate).format('DD MMM YYYY')}
                            </p>
                    </div>
                    <div className="space-y-2">
                        <SenaryHeading
                            title="Estimated Completion Date"
                            className="text-[14px] leading-6 text-[#98A2B3] font-normal"
                        />
                        <p className="text-[#344054] text-[14px] leading-6 font-medium ">12 May 2022, 12:40</p>
                    </div>
                    <div className="space-y-2">
                        <SenaryHeading
                            title="Time Zone"
                            className="text-[14px] leading-6 text-[#98A2B3] font-normal"
                        />
                        <p className="text-[#344054] text-[14px] leading-6 font-medium ">
                            {getTimezoneFromCountryAndState(values.country,values.state)}
                            </p>
                    </div>


                </div>

                <div className="grid grid-cols-4 gap-3">

                    <div className="space-y-2">
                        <SenaryHeading
                            title="Duration"
                            className="text-[14px] leading-6 text-[#98A2B3] font-normal"
                        />
                        <p className="text-[#344054] text-[14px] leading-6 font-medium ">{values.estimatedDuration} {values.durationType}</p>
                    </div>
                    <div className="space-y-2">
                        <SenaryHeading
                            title="Square Footage"
                            className="text-[14px] leading-6 text-[#98A2B3] font-normal"
                        />
                        <p className="text-[#344054] text-[14px] leading-6 font-medium ">12 Ft</p>
                    </div>
                    <div className="space-y-2">
                        <SenaryHeading
                            title="Project Value"
                            className="text-[14px] leading-6 text-[#98A2B3] font-normal"
                        />
                        <p className="text-[#344054] text-[14px] leading-6 font-medium ">$2,400</p>
                    </div>
                    <div className="space-y-2">
                        <SenaryHeading
                            title="Stage"
                            className="text-[14px] leading-6 text-[#98A2B3] font-normal"
                        />
                        <p className="text-[#344054] text-[14px] leading-6 font-medium ">{values.stage}</p>
                    </div>


                </div>


                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-[8px]">
                        <div className="space-y-[8px]">
                            <SenaryHeading
                                title="Project Type"
                                className="text-[14px] leading-6 text-[#98A2B3] font-normal"
                            />

                            <div className="flex items-center space-x-3">
                               {values.projectType.map(pt =>  <p key={pt} className="px-[12px] rounded py-[7px] bg-[#F2F4F7] text-[#475467] text-[14px] leading-4">
                                    {pt}
                                </p>
                                )}
                            </div>
                        </div>
                        <div className="space-y-[8px]">
                            <SenaryHeading
                                title="Project Building Use"
                                className="text-[14px] leading-6 text-[#98A2B3] font-normal"
                            />

                            <div className="flex items-center space-x-3">
                                {values.projectBuildingUse.map(building => <p key={building} className="px-[12px] rounded py-[7px] bg-[#F2F4F7] text-[#475467] text-[14px] leading-4">
                                    {building}
                                </p>)}
                            </div>
                        </div>
                    </div>


                    <div className="space-y-[8px]">
                        <div className="space-y-[8px]">
                            <SenaryHeading
                                title="Sector & Labor Status"
                                className="text-[14px] leading-6 text-[#98A2B3] font-normal"
                            />

                            <div className="flex items-center space-x-4 flex-wrap space-y-2">
                                <p className="px-[12px] rounded py-[7px] bg-[#F2F4F7] text-[#475467] text-[14px] leading-4">
                                    Demolition
                                </p>
                                <p className="px-[12px]  rounded py-[7px] bg-[#F2F4F7] text-[#475467] text-[14px] leading-4">
                                    New Construction no Site Work
                                </p>
                                <p className="px-[12px] rounded py-[7px] bg-[#F2F4F7] text-[#475467] text-[14px] leading-4">
                                    Renovation/Remodel/Repair
                                </p>
                            </div>
                        </div>
                        <div className="space-y-[8px]">
                            <SenaryHeading
                                title="Construction Type"
                                className="text-[14px] leading-6 text-[#98A2B3] font-normal"
                            />

                            <div className="flex items-center space-x-3">
                                {values.constructionTypes.map(ct => <p key={ct} className="px-[12px] rounded py-[7px] bg-[#F2F4F7] text-[#475467] text-[14px] leading-4">
                                    {ct}
                                </p>)}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <SenaryHeading
                            title="Project Description"
                            className="text-[14px] leading-6 text-[#98A2B3] font-normal"
                        />
                        <p className="text-[#344054] text-[14px] leading-6 font-medium ">{values.description}</p>
                    </div>
                    <div className="space-y-2">
                        <SenaryHeading
                            title="Special Instructions"
                            className="text-[14px] leading-6 text-[#98A2B3] font-normal"
                        />
                        <p className="text-[#344054] text-[14px] leading-6 font-medium ">{values.instruction}</p>
                    </div>
                </div>
            </fieldset>
        </div>
        <div className=" bg-white shadow-2xl rounded-xl border p-4">
            <TertiaryHeading
                title="Invite and Finalize"
                className="text-[20px] leading-[30px]"
            />

            <div className="flex items-center space-x-4 mt-5">
                <button className="justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-[#7138DF] cursor-pointer disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 flex items-center space-x-2 rounded-lg bg-[#F2F4F7]  p-5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#8449EB]">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                    <span className="text-[#181818] text-[16px] font-normal leading-4">Public Planroom (Free)</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#828FA3]">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 16v-4"></path>
                        <path d="M12 8h.01"></path>
                    </svg>
                </button>
                <button className="justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-[#E4E4E4] cursor-pointer disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 flex items-center space-x-2 rounded-lg bg-white  p-5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#EF9F28]">
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    <span className="text-[#181818] text-[16px] font-normal leading-4">Private Planroom ( Free)</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#828FA3]">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 16v-4"></path>
                        <path d="M12 8h.01"></path>
                    </svg>
                </button>



            </div>

            <div className="mt-5">
                <SelectComponent
                    label="Select your team members who can receive bids"
                    name="selectTeamMembers"
                    labelStyle="text-[14px] leading-6 text-[#98A2B3] font-normal"
                    placeholder="Estimating Team (You)"
                />
            </div>

            <Divider className="border-dashed border-t-2" />

            <div className="grid grid-cols-2 gap-6 mt-2">
                <div className="space-y-2">
                    <Checkbox >
                        <SenaryHeading
                            title="Schesti members with matching trades and region"
                            className="text-[#344054] font-normal leading-7 text-[14px]"
                        />
                    </Checkbox>

                    <Checkbox disabled>
                        <SenaryHeading
                            title="My In-Network members (Sends only to those with matching trades and regions)
                        ( 2603 ) In-Network  | View chevron_right"
                            className="text-[#667085] font-normal leading-7 text-[14px] !w-fit"
                        />
                    </Checkbox>
                </div>

                <div className="space-y-2">
                    <SenaryHeading
                        title="To send ITB to a full list overriding matching trades and regions, use saved lists below or upload/enter email addresses below."
                        className="text-[#344054] text-[14px] leading-6"
                    />

                    <InputComponent
                        label="Add email address"
                        name="addEmailAddress"
                        placeholder="Enter email address"
                        type="email"
                    />

                    <div className="space-y-1 px-1">
                        <Dragger
                            name={'file'}
                            accept="image/*"
                            multiple={true}
                            beforeUpload={() => {

                                return false;
                            }}
                            style={{
                                borderStyle: "dashed",
                                borderWidth: 2
                            }}
                            itemRender={() => {
                                return null
                            }}
                        >
                            <p className="ant-upload-drag-icon">
                                <Image
                                    src={'/uploadcloud.svg'}
                                    width={34}
                                    height={34}
                                    alt="upload"
                                />
                            </p>
                            <p className="text-[12px] leading-3 text-[#98A2B3]">Drop your image here, or browse</p>

                        </Dragger>
                        <SenaryHeading
                            title="Download format"
                            className="text-[#7F56D9] text-[14px] leading-5"
                        />
                    </div>
                </div>
            </div>
            {children}
        </div>
    </div>
}