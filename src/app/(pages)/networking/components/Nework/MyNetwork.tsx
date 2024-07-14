import Image from 'next/image'
import React from 'react'

const MyNetwork = () => {
    return (
        <div className="w-full flex gap-3 col-span-2 items-center mb-4 shadow rounded-xl p-2 bg-white">
            <div className="flex">
                <Image src='/role.png' alt='role' width={36} height={36} />
            </div>
        </div>
    )
}

export default MyNetwork