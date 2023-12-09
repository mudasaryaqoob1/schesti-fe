import React from 'react'
import VerticalsTabs from './components/verticalsTabs/index'
import General from './general/index'
import UserManagment from './usermanagment/index'
const Page = () => {
    return (
        <>
            <section className='mx-16 flex gap-3 items-start'>
                <VerticalsTabs />
                <General />
                {/* <UserManagment /> */}
            </section>
        </>
    )
}

export default Page