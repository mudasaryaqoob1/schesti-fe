import Description from "@/app/component/description";
import Image from "next/image";
import React from "react";

function ChatMessage() {
    return (
        <div className="p-4 flex gap-2">
            <div>
                <Image width={100} height={100}
                    src="/avatar2.svg"
                    className="object-cover h-12 w-12 rounded-full "
                    alt=""
                />
                <div className="mt-2">
                    <Description title="6:21 PM" className="text-xs text-silver" />
                    <Description title="4th July" className="text-xs text-silver" />
                </div>
            </div>
            <div className="w-[70%] flex flex-col items-end gap-1">
                <p className=" bg-[#0079C2] rounded-tl-lg rounded-tr-lg rounded-br-lg p-2 text-sm border border-dark border-opacity-10 text-[#5A7184] bg-opacity-40">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid
                    magni iste qui veritatis sed non ad officia suscipit doloremque maxime
                </p>
            </div>
        </div>
    );
}

export default ChatMessage;