import { userService } from "@/app/services/user.service";
import Image from "next/image";
import { useQuery } from "react-query";

export function TotalCost() {
    const clientQuery = useQuery('clients', () => {
        return userService.httpGetAllCompanyClients();
    }, {
        onSuccess: (data) => {
            console.log("clients", data);
        },
        onError(err) {
            console.log(err);
        },
    });

    return <div className="grid grid-cols-4 gap-3 my-3">
        <div className="flex justify-between items-center bg-white shadow rounded-md p-4">
            <div className="space-y-2">
                <h2 className="text-[#EF9F28] font-semibold text-[30px] leading-[38px]">146</h2>
                <h3 className={'text-[#344054] text-[18px] leading-[26px] font-normal'}>Total Estimates</h3>
            </div>
            <div>
                <Image
                    src={'/documentIcon.svg'}
                    alt="Picture of the author"
                    width={50}
                    height={50}
                    className="text-[#8449EB]"
                />
            </div>
        </div>
        <div className="flex justify-between items-center bg-white shadow rounded-md p-4">
            <div className="space-y-2">
                <h2 className="text-[#EF9F28] font-semibold text-[30px] leading-[38px]">146</h2>
                <h3 className={'text-[#344054] text-[18px] leading-[26px] font-normal'}>Total Takeoff</h3>
            </div>
            <div>
                <Image
                    src={'/documentIcon.svg'}
                    alt="Picture of the author"
                    width={50}
                    height={50}
                    className="text-[#8449EB]"
                />
            </div>
        </div>
        <div className="flex justify-between items-center bg-white shadow rounded-md p-4">
            <div className="space-y-2">
                <h2 className="text-[#EF9F28] font-semibold text-[30px] leading-[38px]">146</h2>
                <h3 className={'text-[#344054] text-[18px] leading-[26px] font-normal'}>Project Scheduled</h3>
            </div>
            <div>
                <Image
                    src={'/documentIcon.svg'}
                    alt="Picture of the author"
                    width={50}
                    height={50}
                    className="text-[#8449EB]"
                />
            </div>
        </div>
        <div className="flex justify-between items-center bg-white shadow rounded-md p-4">
            <div className="space-y-2">
                <h2 className="text-[#EF9F28] font-semibold text-[30px] leading-[38px]">146</h2>
                <h3 className={'text-[#344054] text-[18px] leading-[26px] font-normal'}>Total Clients</h3>
            </div>
            <div>
                <Image
                    src={'/documentIcon.svg'}
                    alt="Picture of the author"
                    width={50}
                    height={50}
                    className="text-[#8449EB]"
                />
            </div>
        </div>
    </div>
}