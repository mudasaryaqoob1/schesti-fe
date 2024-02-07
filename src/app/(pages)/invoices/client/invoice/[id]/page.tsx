'use client';

import { HttpService } from "@/app/services/base.service";
import { selectToken } from "@/redux/authSlices/auth.selector";
import { useParams } from "next/navigation";
import { useLayoutEffect } from "react";
import { useSelector } from "react-redux";

export default function CreateClientInvoicePage() {
    const token = useSelector(selectToken);
    const params = useParams();
    useLayoutEffect(() => {
        if (token) {
            HttpService.setToken(token);
        }
    }, [token]);
    console.log(params);

    return <div>
        Client Invoice Page
    </div>
}