import CustomButton from "@/app/component/customButton/white";
import Description from "@/app/component/description";
import { Carousel } from "antd";
import Image from "next/image";

const data = [
    { id: 1, clientName: 'AdsManagement 1', startDate: '2022-01-01', expiryDate: '2022-01-02', picture: "https://s3-alpha-sig.figma.com/img/fa49/6391/2bed79afc1a8eba2ddb92945d7428145?Expires=1710115200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=na6IENwlBdeoydn3crQ7X1ldHZAiUQ69S4NDrxsAqo3i2cu~FVh2A0C2VN8-tYrkDnYBPQTzNWe1H6aEWdgDSXiuIRmYuZPVWZNczQJutV8IWT5pEto5QAKeZlnefEKBhDZ6DM5jO7vtyqUELDjgSwiXJy2g8Mg308zOSZ8putDdaVxsT5adcZsEzGQ9j-MUjnY2u8-CHwlmQo4geAFXJlaJtAkVTX6DlFiGWIalnleGC2CkdDPJFH5FhYLt04wlvbCEEtItactQmT2JKQ~NCfuFgWDX-TXZAcjYUhTLGZqRg-ZrAvl81vXeZwegPZz9My9yCMmdj-n1~j5KV1Lcig__" },
    { id: 2, clientName: 'AdsManagement 2', startDate: '2022-01-01', expiryDate: '2022-01-02', picture: "https://s3-alpha-sig.figma.com/img/fa49/6391/2bed79afc1a8eba2ddb92945d7428145?Expires=1710115200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=na6IENwlBdeoydn3crQ7X1ldHZAiUQ69S4NDrxsAqo3i2cu~FVh2A0C2VN8-tYrkDnYBPQTzNWe1H6aEWdgDSXiuIRmYuZPVWZNczQJutV8IWT5pEto5QAKeZlnefEKBhDZ6DM5jO7vtyqUELDjgSwiXJy2g8Mg308zOSZ8putDdaVxsT5adcZsEzGQ9j-MUjnY2u8-CHwlmQo4geAFXJlaJtAkVTX6DlFiGWIalnleGC2CkdDPJFH5FhYLt04wlvbCEEtItactQmT2JKQ~NCfuFgWDX-TXZAcjYUhTLGZqRg-ZrAvl81vXeZwegPZz9My9yCMmdj-n1~j5KV1Lcig__" },
    { id: 3, clientName: 'AdsManagement 3', startDate: '2022-01-01', expiryDate: '2022-01-02', picture: "https://s3-alpha-sig.figma.com/img/fa49/6391/2bed79afc1a8eba2ddb92945d7428145?Expires=1710115200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=na6IENwlBdeoydn3crQ7X1ldHZAiUQ69S4NDrxsAqo3i2cu~FVh2A0C2VN8-tYrkDnYBPQTzNWe1H6aEWdgDSXiuIRmYuZPVWZNczQJutV8IWT5pEto5QAKeZlnefEKBhDZ6DM5jO7vtyqUELDjgSwiXJy2g8Mg308zOSZ8putDdaVxsT5adcZsEzGQ9j-MUjnY2u8-CHwlmQo4geAFXJlaJtAkVTX6DlFiGWIalnleGC2CkdDPJFH5FhYLt04wlvbCEEtItactQmT2JKQ~NCfuFgWDX-TXZAcjYUhTLGZqRg-ZrAvl81vXeZwegPZz9My9yCMmdj-n1~j5KV1Lcig__" },
]
export function AdsManagement() {
    return (
        <Carousel effect="fade" style={{ height: 250, width: '100%' }}>
            {data.map(item => {
                return <div className="w-full h-56 my-6 shadow-md rounded-md bg-gradient-to-r from-[#7A4FF0] to-[#B29BFF] px-10 pt-4" key={item.id}>
                    <div className="grid grid-cols-12 gap-8">
                        <div className="space-y-2 col-span-3 flex flex-col items-center">
                            <CustomButton
                                text="Thinking of"
                                className="!bg-[#EF9F28] !text-[#F5F6FA] !text-[16px] leading-[20px] !w-40 !rounded-full !border-[#EF9F28]"
                            />
                            <Description
                                title="buying or selling"
                                className="text-[24px] uppercase leading-[44px] font-semibold text-white"
                            />
                            <Description
                                title="A Home?"
                                className="text-[54px] uppercase leading-[58px] font-semibold text-white"
                            />
                        </div>
                        <div className="col-span-4">
                            <Description
                                title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium quidem vitae quae? Nobis, expedita. Esse error porro sed odio explicabo facilis hic saepe ea animi autem, quaerat a voluptate. Similique!"
                                className="text-[14px] text-white leading-[20px] font-normal"
                            />
                        </div>
                        <div className="space-y-4 col-span-2 flex flex-col items-center">
                            <Description
                                title="CALL US TODAY FOR ALL YOUR REAL ESTATE NEEDS"
                                className="text-[14px] text-white leading-[20px] font-normal"
                            />
                            <CustomButton
                                text="1-000-000-0000"
                                className="!bg-[#EF9F28] !text-[#F5F6FA] !text-[16px] leading-[20px] !w-48 !rounded-full !border-[#EF9F28]"
                            />
                        </div>
                        <div className="col-span-3 flex justify-end">
                            <Image
                                alt="AdsManagement"
                                src={item.picture}
                                width={250}
                                height={200}
                                className="rounded-md"
                            />
                        </div>
                    </div>

                </div>
            })}
        </Carousel>
    )
}