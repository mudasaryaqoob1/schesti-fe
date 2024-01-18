'use client';
import { useLayoutEffect } from "react";
import { useSelector } from "react-redux";


import { HttpService } from "@/app/services/base.service";
import { selectToken } from "@/redux/authSlices/auth.selector";
import { useSearchParams } from "next/navigation";
import TertiaryHeading from "@/app/component/headings/tertiary";

export default function CreateClientInvoicePage() {
  const token = useSelector(selectToken);
  const searchParams = useSearchParams()
  const invoiceName = searchParams.get("invoiceName");


  useLayoutEffect(() => {
    if (token) {
      HttpService.setToken(token);
    }
  }, [token]);


  return (
    <section className="mx-16 my-2">
      <div className="p-5 shadow-md rounded-lg border border-silverGray  bg-white">
        <div className="flex space-x-3">
          <TertiaryHeading title="Involve name:"
            className="font-medium"
          />
          <TertiaryHeading title={`${invoiceName}`} />
        </div>
      </div>


      <div className="p-5 shadow-md rounded-lg border border-silverGray  bg-white">

      </div>
    </section>
  )
}