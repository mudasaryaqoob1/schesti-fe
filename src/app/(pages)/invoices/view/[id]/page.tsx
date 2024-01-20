'use client';
import { HttpService } from "@/app/services/base.service";
import { selectToken } from "@/redux/authSlices/auth.selector";
import { useParams, useRouter } from "next/navigation";
import { useLayoutEffect } from "react";
import { useSelector } from "react-redux";

export default function ViewSubcontractorInvoicePage() {
    const router = useRouter();
    const token = useSelector(selectToken);
    const params = useParams<{ id: string }>();
    const id = params.id;


    useLayoutEffect(() => {
        if (token) {
            HttpService.setToken(token);
        }
    }, [token]);

    return <section>
        <h1>View Subcontractor Invoice {id}</h1>
    </section>
}