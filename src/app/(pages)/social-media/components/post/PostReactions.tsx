import React, { Dispatch, SetStateAction, useState } from 'react';
import Image from 'next/image';
import { socialMediaService } from '@/app/services/social-media.service';
import { setFetchPosts } from '@/redux/social-media/social-media.slice';
import { useDispatch } from 'react-redux';
import { IUserReaction } from '.';

type Props = {
    id: string; userReaction: IUserReaction | null, setRefetchPost: Dispatch<SetStateAction<boolean>>; reactions: string[]
}
const reactionTypes: any = { like: '/like-blue.svg', love: '/heart-01.svg', clap: '/clap.svg' };

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

    const postReactionTypes = [{
        img: '/like-blue.svg', type: "like"
    }, {
        img: '/heart-01.svg', type: "love"
    }, {
        img: '/clap.svg', type: "clap"
    }];

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setShowReactions(true)}
            onMouseLeave={() => setShowReactions(false)}
        >
            <div className="flex gap-2 items-center">
                {userReaction ? (
                    <Image
                        src={reactionTypes[userReaction.type]}
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
                    {
                        postReactionTypes.map(({ img, type }, i) => (
                            <button
                                className="flex flex-col items-center text-center"
                                onClick={() => addPostReactionHandler({ type })}
                                key={i}
                            >
                                <img
                                    src={img}
                                    className='cursor-pointer size-5 mix-blend-multiply rounded-full'
                                    alt={type}
                                />
                            </button>
                        ))
                    }

                </div>
            )}
        </div>
    );
};


export default PostReactions;
