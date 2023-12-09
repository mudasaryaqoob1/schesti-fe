"use client"
import Image from "next/image"
import Table from '@/app/component/table/usermangement/index'
import { clientHeading } from './data'
import Heading from "@/app/component/customHeading/heading"
import { tertiaryHeading } from "@/globals/tailwindvariables"
import Button from "@/app/component/customButton/button"
import { useRouter } from "next/navigation"
const Index = () => {
    const router = useRouter()
    return (
        <div>

            <div className="flex justify-between items-center mb-3">
                <Heading
                    styledVars={tertiaryHeading}
                    title="Client List"
                    classes="text-graphiteGray"
                />
                <Button
                    text="Add New client"
                    className="!w-auto "
                    icon="plus.svg"
                    iconwidth={20}
                    iconheight={20}
                    onClick={() => router.push('/settings/usermanagment/adduser')}
                />
            </div>
            <article className="bg-snowWhite rounded-2xl shadow-instentWhite py-5 px-6">

                <div
                    className="rounded-lg border border-Gainsboro bg-silverGray w-[335px] h-[40px] 
                      my-5 flex items-center px-3">x
                    <Image
                        src={'/search.svg'}
                        alt="search icon "
                        width={16}
                        height={16}
                        className="cursor-pointer" />
                    <input
                        type="search"
                        name=""
                        id=""
                        placeholder="Search..."
                        className="w-full h-full bg-transparent outline-none"
                    />
                </div>
                <Table headings={clientHeading} />
                <div className="flex my-6 justify-between">
                    {/* dropdown */}
                    <div>dropdown</div>
                    {/* pagination */}
                    <div>
                        pagination
                    </div>
                </div>
            </article>

        </div>

    )
}

export default Index