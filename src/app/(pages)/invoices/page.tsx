"use client"
import TertiaryHeading from "@/app/component/headings/tertiary";
import { HttpService } from "@/app/services/base.service";
import { bg_style } from "@/globals/tailwindvariables";
import { selectToken } from "@/redux/authSlices/auth.selector";
import { useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import Button from '@/app/component/customButton/button';
import { useRouter } from "next/navigation";

const ClientTable = () => {
    const router = useRouter();

    const token = useSelector(selectToken);
    useLayoutEffect(() => {
        if (token) {
            HttpService.setToken(token);
        }
    }, [token]);





    return (
        <section className="mt-6 mb-[39px] md:ms-[69px] md:me-[59px] mx-4 rounded-xl ">
            <div className={`${bg_style} p-5 border border-solid border-silverGray`}>
                <div className="flex justify-between items-center mb-4">
                    <TertiaryHeading title="Invoices" className="text-graphiteGray" />
                    <Button
                        text="Add New client"
                        className="!w-auto "
                        icon="plus.svg"
                        iconwidth={20}
                        iconheight={20}
                        onClick={() => router.push('/clients/create')}
                    />
                </div>
            </div>
        </section>
    );
};

export default ClientTable;