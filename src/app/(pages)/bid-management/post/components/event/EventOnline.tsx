import { CreateMeeting } from "@/app/(pages)/meeting/components/CreateMeeting";
import { Checkbox } from "antd";
import Image from "next/image";
import { useState } from "react";

export function EventOnlineForm() {
    const [showModal, setShowModal] = useState(false);


    return <div className='space-y-2 mt-3'>
        <Checkbox>{"It's a mandatory meeting"}</Checkbox>

        <div
            onClick={() => setShowModal(true)}
            className="w-[190px] flex items-center py-2 px-[14px] rounded-lg cursor-pointer border border-[#F9F5FF] bg-[#F9F5FF]">
            <Image
                src={'/calendar-purple.svg'}
                alt="calendar"
                width={15}
                height={16}
            />
            <span className="text-[#7138DF] text-[14px] leading-5 font-semibold  ml-2">{"Schedule a meeting"}</span>
        </div>
        <CreateMeeting
            setShowModal={() => setShowModal(false)}
            showModal={showModal}
        />
    </div>
}