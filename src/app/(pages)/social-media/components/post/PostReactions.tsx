import { socialMediaService } from '@/app/services/social-media.service';
import { setFetchPosts } from '@/redux/social-media/social-media.slice';
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useDispatch } from 'react-redux';
import { IUserReaction } from '.';

type Props = {
    id: string; userReaction: IUserReaction | null, setRefetchPost: Dispatch<SetStateAction<boolean>>; reactions: string[]
}
const PostReactions = ({ id, userReaction = null, reactions, setRefetchPost }: Props) => {
    const [showReactions, setShowReactions] = useState(false);
    const dispatch = useDispatch();

    const addPostReactionHandler = async ({ type = 'like', removeReaction = false }: { type?: string, removeReaction?: boolean }) => {
        console.log({ id, body: { type, ...(removeReaction && { removeReaction: true }) } }, 'body...')
        try {
            await socialMediaService.httpAddPostReaction({ id, body: { type, ...(removeReaction && { removeReaction: true }) } });
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
            <div className="flex gap-2 items-center">
                {userReaction ? (
                    <Image
                        src={userReaction.type === 'like' ? '/like-blue.svg' : '/heart-01.svg'}
                        className='cursor-pointer'
                        onClick={() => addPostReactionHandler({ removeReaction: true })}
                        width={20}
                        height={20}
                        alt={userReaction.type}
                    />
                ) : (
                    <Image
                        src='/like-plain.svg'
                        className='cursor-pointer'
                        onClick={() => addPostReactionHandler({})}
                        width={22}
                        height={22}
                        alt='like'
                    />
                )}

                {reactions.length > 0 && (
                    <p className='font-medium text-xs text-schestiPrimaryBlack'>
                        {(userReaction && 'You ') || ''}
                        {userReaction && reactions.length > 1 && `${reactions.length - 1} Other`}
                    </p>
                )}
            </div>

            {showReactions && (
                <div
                    className="absolute left-0 -top-10 flex space-x-2.5 bg-white p-2 rounded-full shadow-lg border border-gray-200"
                    style={{ paddingTop: '10px', marginTop: '10px' }}
                >
                    <button
                        className="flex flex-col items-center text-center"
                        onClick={() => addPostReactionHandler({ type: 'like' })}
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
                        onClick={() => addPostReactionHandler({ type: 'love' })}
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
