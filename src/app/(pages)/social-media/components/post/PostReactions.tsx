import { socialMediaService } from '@/app/services/social-media.service';
import { setFetchPosts } from '@/redux/social-media/social-media.slice';
import { RootState } from '@/redux/store';
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

type Props = {
    id: string; postReactions: string[], totalComments: number, setRefetchPost: Dispatch<SetStateAction<boolean>>; reactions: string[]
}
const PostReactions = ({ id, postReactions, totalComments, reactions, setRefetchPost }: Props) => {
    const [showReactions, setShowReactions] = useState(false);
    const dispatch = useDispatch();

    const { user } = useSelector((state: RootState) => state.auth)

    const addPostReactionHandler = async () => {
        try {
            await socialMediaService.httpAddPostReaction(id);
            setRefetchPost(prev => !prev);
            dispatch(setFetchPosts());
            setShowReactions(false);
        } catch (error) {
            console.log(error, 'erro in post reaction...')
        }
    }

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setShowReactions(true)}
            onMouseLeave={() => setShowReactions(false)}
        >
            {/* Main Content */}
            <div className="flex gap-2 items-center">
                {postReactions.includes(user._id) && (
                    <Image
                        src='/like-blue.svg'
                        className='cursor-pointer'
                        onClick={addPostReactionHandler}
                        width={20}
                        height={20}
                        alt='like'
                    />
                )}
                <Image
                    src='/heart-01.svg'
                    className='cursor-pointer'
                    onClick={addPostReactionHandler}
                    width={20}
                    height={20}
                    alt='love'
                />
                {reactions.length > 0 && (
                    <p className='font-medium text-xs text-schestiPrimaryBlack'>
                        {reactions.length} Like
                    </p>
                )}
            </div>

            {showReactions && (
                <div
                    className="absolute left-0 -top-10 flex space-x-2.5 bg-white p-2 rounded-full shadow-lg border border-gray-200"
                    style={{ paddingTop: '10px', marginTop: '10px' }}
                >
                    {/* Like Icon */}
                    <button
                        className="flex flex-col items-center text-center"
                        onClick={addPostReactionHandler}
                    >
                        <Image
                            src='/like-blue.svg'
                            className='cursor-pointer'
                            width={20}
                            height={20}
                            alt='like'
                        />
                    </button>

                    <button
                        className="flex flex-col items-center text-center"
                        onClick={addPostReactionHandler}
                    >
                        <Image
                            src='/heart-01.svg'
                            className='cursor-pointer'
                            width={20}
                            height={20}
                            alt='love'
                        />
                    </button>

                </div>
            )}
        </div>
    );
};


export default PostReactions;
