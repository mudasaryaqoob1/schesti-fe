'use client'
import React from 'react'
import Records from './components/records'
import NoData from './components/noData'
import { estimateRequests } from './data'
import CustomButton from '@/app/component/customButton/button'
import { useRouter } from 'next/navigation'

const page = () => {
    const router = useRouter()
    return (
        <div>
            <div className='flex justify-end  me-3 mb-2'>
                <CustomButton
                    text="Estimates Requests"
                    className="!w-auto"
                    onClick={() => router.push('/estimates/generated/estimates')}
                />
            </div>
            {estimateRequests.length > 0 ?
                <Records /> : <NoData />
            }
        </div>
    )
}

export default page