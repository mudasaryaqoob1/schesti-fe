'use client';

import { HttpService } from "@/app/services/base.service";
import { selectToken } from "@/redux/authSlices/auth.selector";
import { useLayoutEffect } from "react";
import { useSelector } from "react-redux";

export default function CreateClientInvoicePage() {
    const token = useSelector(selectToken);

    useLayoutEffect(() => {
        if (token) {
            HttpService.setToken(token);
        }
    }, [token]);


    return <div>
        Client Invoice Page
    </div>
}