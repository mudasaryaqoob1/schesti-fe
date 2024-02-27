import { IUser } from "@/app/interfaces/companyEmployeeInterfaces/user.interface";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { useSelector } from "react-redux";

export function ClientInvoiceHeader() {
    const auth = useSelector((state: RootState) => state.auth);
    const user = auth.user?.user as IUser | undefined;
    return <div className={`h-[60px] p-7 flex items-center`} style={{
        backgroundColor: user?.brandingColor || "rgb(127 86 217)"
    }}>
        <Image
            src={user?.avatar || "/logowhite.svg"}
            width={50}
            height={50}
            alt="logo"
            className="rounded-full"
        />
    </div>
}