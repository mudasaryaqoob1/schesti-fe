import { bg_style } from '@/globals/tailwindvariables'
import Image from 'next/image'
import React from 'react'
interface IProps {
    setstep:any;
}
const InitialUpload = ({setstep}:IProps) => {
    return (
        <div className={`${bg_style} p-5 h-[75vh] flex justify-center`}>
            <div className='flex justify-between w-[90%] '>
                <div className='h-[80%] w-[45%]  flex justify-center flex-col items-center rounded-3xl my-10'>
                    <div className='h-[50%] flex items-end'>
                        <div className='p-8 bg-gray-100 rounded-full mb-5'>
                            <Image width={85} height={80} src={'/takeoff/noRecord.png'} alt='' />
                        </div>
                    </div>
                    <div className='h-[50%] flex flex-col items-center gap-1 pt-12'>
                        <div className='font-semibold font-inter text-[20px] leading-[34px] tracking-wide text-[#181818]'>
                            Upload
                        </div>
                        <div className='text-center font-inter font-light text-[14px] text-[#667085]  break-words w-[90%] leading-[22px] tracking-wider'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, eveniet. Iste earum necessitatibus quibusdam minima alias sapiente, modi nostrum temporibus.
                        </div>
                        <button onClick={()=>{setstep(1)}} className='cursor-pointer mt-5 w-[60%] bg-[#7138DF] rounded-md text-white p-2 tracking-wide font-inter text-[14px]'>
                            Create your takeoff
                        </button>
                    </div>
                </div>
                <div className='h-[80%] w-[45%] flex justify-center flex-col items-center rounded-3xl my-10 bg-gradient-to-r from-[#8449EB]/5 to-[#6A56F6]/5'>
                    <div className='h-[50%] flex items-end'>
                        <div className='p-8 rounded-full mb-5 bg-gradient-to-r from-[#8449EB]/10 to-[#6A56F6]/10'>
                            <Image width={85} height={80} src={'/takeoff/ai.png'} alt='' />
                        </div>
                    </div>
                    <div className='h-[50%] flex flex-col items-center gap-1 pt-12'>
                        <div className='font-semibold font-inter text-[20px] leading-[34px] tracking-wide text-[#181818]'>
                            Takeoff by AI
                        </div>
                        <div className='text-center font-inter font-light text-[14px] text-[#667085]  break-words w-[90%] leading-[22px] tracking-wider'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, eveniet. Iste earum necessitatibus quibusdam minima alias sapiente, modi nostrum temporibus.
                        </div>
                        <button className='cursor-pointer mt-5 w-[60%] bg-transparent rounded-md p-2 tracking-wide font-inter text-[14px] border border-[#7138DF] text-[#7138DF] hover:text-white hover:!border-none hover:bg-gradient-to-r from-[#8449EB] to-[#6A56F6]'>
                            Create AI takeoff
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InitialUpload