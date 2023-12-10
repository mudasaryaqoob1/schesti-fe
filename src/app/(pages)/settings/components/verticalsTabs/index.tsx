"use client"
import { senaryHeading } from '@/globals/tailwindvariables'
import React from 'react'
import styled from 'styled-components'

const Index = () => {
    const StyledDiv = styled.div`
    width: 250px;
    height:auto;
    padding: 12px;
    border-radius: 12px;
    background: #FFF;
    box-shadow: 0px 0px 20px 0px rgba(52, 73, 92, 0.07);
`;
    const active = "bg-cosmicGray  text-rotalPurple w-full rounded-[6px] font-semibold"
    return (
        <StyledDiv >
            <div className='flex flex-col items-start gap-3'>
                <p
                    className={`${active} py-1 px-3 ${senaryHeading}`}

                >
                    General setting
                </p>
                <p
                    className={`${active} py-1 px-3 ${senaryHeading}`}

                >
                    Plans
                </p>
                <p
                    className={`${active} py-1 px-3 ${senaryHeading}`}

                >
                    User Managements
                </p>
                <p
                    className={`${active} py-1 px-3 ${senaryHeading}`}

                >
                    Material Settings
                </p>
                <p
                    className={`${active} py-1 px-3 ${senaryHeading}`}

                >
                    Materials
                </p>
                <p
                    className={`${active} py-1 px-3 ${senaryHeading}`}

                >
                    Target
                </p>
            </div>

        </StyledDiv>
    )
}

export default Index