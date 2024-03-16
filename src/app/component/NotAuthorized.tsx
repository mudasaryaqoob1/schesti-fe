'use client';

import { useRouter } from "next/navigation";
import { useEffect } from "react";


export function NotAuthorized() {
    const router = useRouter();

    useEffect(() => {
        router.push("/login");
    }, [])

    return <>
    </>
}