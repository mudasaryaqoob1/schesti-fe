import { DateInputComponent } from "@/app/component/cutomDate/CustomDateInput";
import { TimeInputComponent } from "@/app/component/cutomDate/CustomTimeInput";

export function RfiDeadline() {
    return <div className='space-y-2 mt-3'>
        <div className='flex items-center space-x-3'>
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

    </div>
}