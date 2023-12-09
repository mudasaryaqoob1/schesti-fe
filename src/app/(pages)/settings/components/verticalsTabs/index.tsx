"use client"
import Paragraph from '@/app/component/customParagraph/paragraph'
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
                <Paragraph
                    classes={`${active} py-1 px-3`}
                    title='General setting'
                    styledVars={senaryHeading}

                />
                <Paragraph
                    classes=' py-1 px-3 cursor-pointer'
                    title='Plans'
                    styledVars={senaryHeading}

                />
                <Paragraph
                    classes=' py-1 px-3 cursor-pointer'
                    title='User Managements'
                    styledVars={senaryHeading}

                />
                <Paragraph
                    classes=' py-1 px-3 cursor-pointer'
                    title='Material Settings'
                    styledVars={senaryHeading}

                />
                <Paragraph
                    classes=' py-1 px-3 cursor-pointer'
                    title='Materials'
                    styledVars={senaryHeading}

                />
                <Paragraph
                    classes=' py-1 px-3 cursor-pointer'
                    title='Target'
                    styledVars={senaryHeading}

                />
            </div>

        </StyledDiv>
    )
}

export default Index