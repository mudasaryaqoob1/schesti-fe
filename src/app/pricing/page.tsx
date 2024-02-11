'use client'
import { LandingNavbar } from "../component/navbar/LandingNavbar";
import ToggleBtn from '@/app/component/plans/toggleBtn';

export default function PricingPage() {
    return <section>
        <main style={{
            background: "linear-gradient(180deg, #8449EB 0%, #6A56F6 100%)"
        }} className="h-[501px] relative">
            <LandingNavbar />
            <div className="mt-[101px] mx-auto w-[1063px]">
                <h1 className="text-center font-extrabold text-white text-[64px] leading-[80px]">
                    Pricing
                </h1>
                <p
                    className="text-center text-white w-[774px] leading-[44px] font-light text-[24px] mx-auto my-[26px]"
                >
                    Pricing built for businesses of all sizes.<br />
                    Free 14-day trial • No credit card required • Cancel anytime
                </p>
            </div>
        </main>

        <div className="px-[200px] mt-[151px]">
            <div className="w-[966.356px] mx-auto">
                <h1 className="text-center text-[21.672px] text-[#7138DF] leading-[21.672px ]" >
                    Craft Your Success
                </h1>
                <h1 className="mx-auto text-[#1D2939] text-center font-bold mt-[15px] leading-[54.181px] text-[36.121px]">
                    Exclusive Schesti Subscriptions, A gateway to Unparalleled Excellence in Field Service Dynamics.
                </h1>
            </div>


            <div>
                <div className="flex w-full align-items-center justify-center">
                    <ToggleBtn isChecked={true} onChange={() => { }} />
                </div>
            </div>
        </div>
    </section>
}