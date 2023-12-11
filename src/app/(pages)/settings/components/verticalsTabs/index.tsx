"use client"
import { bg_style, senaryHeading } from '@/globals/tailwindvariables'
import React, { Dispatch } from 'react'
interface Props {
    setPrevNext: Dispatch<React.SetStateAction<number>>
    prevNext: number
}
const Index = ({ prevNext, setPrevNext }: Props) => {
    const active = "bg-cosmicGray  text-rotalPurple w-full rounded-[6px] font-semibold"
    const tabs = [
        { id: 1, name: "General Settings" },
        { id: 2, name: "Plans" },
        { id: 3, name: "User Managements" },
        { id: 4, name: "Material Settings" },
        { id: 5, name: "Materials" },
        { id: 6, name: "Target" },
    ];
    return (
        <div className={`${bg_style} md:min-w-[222px] h-auto p-3`}>
            <div className='flex flex-col items-start gap-1'>
                {tabs.map((tab) => (
                    <p
                        key={tab.id}
                        className={`py-1 px-3 cursor-pointer transition-colors ${senaryHeading} ${tab.id === prevNext ? active : ""}`}
                        onClick={() => setPrevNext(tab.id)}
                    >
                        {tab.name}
                    </p>
                ))}
            </div>
        </div>
    )
}

export default Index