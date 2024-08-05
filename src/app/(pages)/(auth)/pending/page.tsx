'use client';
import AuthNavbar from "../authNavbar";

export default function PendingPage() {
    return <>
        <AuthNavbar />
        <div className="h-[calc(100vh-100px)] grid place-items-center rounded-s">
            Pending
        </div>
    </>
}