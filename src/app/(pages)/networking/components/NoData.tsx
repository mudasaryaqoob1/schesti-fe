import React from 'react'

type Props = {
    title?: string
}
const NoData = ({ title = 'No Data Available' }: Props) => {
    return (
        <p className='font-medium text-center w-full'>{title}</p>
    )
}

export default NoData