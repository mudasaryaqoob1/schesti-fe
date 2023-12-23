import Description from "@/app/component/description";
import Image from "next/image";
import React from "react";

function ReplyMessage() {
    return (
        <div className="p-4 flex justify-start flex-row-reverse gap-2">
            <div>

                <Image width={100} height={100}
                    src="/avatar.svg"
                    className="object-cover h-12 w-12 rounded-full "
                    alt=""
                />
                <div className="mt-2">
                    <Description title="6:21 PM" className="text-xs text-silver" />
                    <Description title="4th July" className="text-xs text-silver" />
                </div>
            </div>
            <div className="w-[70%]">
                <p className=" bg-silverFoil rounded-bl-lg rounded-br-lg rounded-tl-lg p-2 text-sm text-wedgeWood border border-dark border-opacity-10">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid
                    magni iste qui veritatis sed non ad officia suscipit doloremque maxime
                </p>
            </div>
        </div>
    );
}

export default ReplyMessage;

