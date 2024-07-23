import Image from 'next/image'
import React from 'react'

const Search = () => {
    return (
        <div className="w-full grid grid-cols-8 gap-3 items-center mb-4 shadow rounded-xl p-4 bg-white">
            <div className="flex items-center col-span-3 gap-1 border-r border-lightSteelGray h-full">
                <Image src='/search.svg' alt='search' width={16} height={16} />
                <input type="text" placeholder='Search' className='focus:border-none w-full placeholder:text-osloGrey text-osloGrey outline-none' />
            </div>
            <div className="flex items-center col-span-2 gap-1 border-r border-lightSteelGray h-full">
                <Image src='/navigation-black.svg' alt='search' width={16} height={16} />
                <input type="text" placeholder='Yogyakarta, ID' className='focus:border-none w-full placeholder:text-osloGrey text-osloGrey outline-none' />
            </div>

            <div className='col-span-2'>
                <select defaultValue='volvo' name="cars" id="cars" className='focus:border-none placeholder:text-osloGrey w-full text-osloGrey cursor-pointer outline-none ps-6'>
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>

                </select>
            </div>

            <div className='col-span-1 w-full'>
                <button className='cursor-pointer p-3 rounded-lg border border-schestiPrimary text-schestiPrimary bg-transparent font-semibold w-full'>Search </button>
            </div>
        </div>
    )
}

export default Search