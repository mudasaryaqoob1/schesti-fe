import { InputComponent } from "@/app/component/customInput/Input";
import { DateInputComponent } from "@/app/component/cutomDate/CustomDateInput";
import { TimeInputComponent } from "@/app/component/cutomDate/CustomTimeInput";
import { TextAreaComponent } from "@/app/component/textarea";
import { Checkbox } from "antd";
import Image from "next/image";

export function EventSiteWalkThroughForm() {
    return <div className='space-y-2 mt-3'>
        <Checkbox>{"It's a mandatory meeting"}</Checkbox>
        <div className='flex items-center space-x-3'>
            <div className='flex-1'>
                <InputComponent
                    placeholder='Enter Location'
                    label=''
                    name='location'
                    type='text'
                    field={{
                        suffix: <Image src='/navigation-icon.svg' width={20} height={20} alt='location' />,
                    }}
                />
            </div>

            <div>
                <DateInputComponent
                    label=''
                    name=''
                    placeholder='Select Date'
                    fieldProps={{

                    }}
                />
            </div>
            <div>
                <TimeInputComponent
                    label=''
                    name=''
                    placeholder='Select Time'
                    fieldProps={{
                        use12Hours: true,
                        format: "h:mm a"
                    }}
                />
            </div>

        </div>
        <TextAreaComponent
            label=''
            name='meetingDescription'
            placeholder='Meeting Instructions'
        />
    </div>
}