'use client';
import { useLayoutEffect } from "react";
import { useSelector } from "react-redux";


import { HttpService } from "@/app/services/base.service";
import { selectToken } from "@/redux/authSlices/auth.selector";

export default function CreateClientInvoicePage() {
  const token = useSelector(selectToken);


  useLayoutEffect(() => {
    if (token) {
      HttpService.setToken(token);
    }
  }, [token]);
  return (
    <div>
      <h1>Create Client Invoice Page</h1>
    </div>
  )
}