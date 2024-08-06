import Image from 'next/image'
import React from 'react'

const SingleComment = () => {
    return (
        <div>
            <div className="flex gap-3 justify-between">
                <div className="flex items-center gap-2">
                    <Image src='/profileAvatar.png' width={36} height={36} alt='profile' />
                    <div>
                        <p className='font-bold text-xs text-graphiteGray'>amyrobson</p>
                        <p className='mt-1.5 text-coolGray text-[10px]'>1 month ago</p>
                    </div>
                </div>
                <div className="flex gap-2 rounded-[3px] py-1 px-2 items-center bg-schestiLightPrimary">
                    <Image src='/reply.svg' width={10} height={10} alt='profile' />
                    <p className='text-lavenderPurpleReplica font-medium text-xs'>Reply</p>
                </div>

            </div>
            <p className='mt-3 text-stormGrey'>
                <span className='text-schestiPrimary font-semibold mr-1'>@maxblagu</span>
                Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You’ve nailed the design and the responsiveness at various breakpoints works really well.</p>
        </div>
    )
}

export default SingleComment