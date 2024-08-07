'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Comments from '../comment'
import { IPost } from '.'
import moment from 'moment'
import { truncate } from 'lodash'
import { socialMediaService } from '@/app/services/social-media.service'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import AddComment from './AddComment'
import { Dropdown } from 'antd'
import type { MenuProps } from 'antd';
import { setFetchPosts, setPostData } from '@/redux/social-media/social-media.slice'
import { useCopyToClipboard } from 'usehooks-ts'

type Props = {

} & IPost

const postMenuItems: MenuProps['items'] = [
    {
        key: 'pin',
        label: <p>Pin Post</p>,
    },
    {
        key: 'edit',
        label: <p>Edit Post</p>,
    },
    {
        key: 'delete',
        label: <p>Delete Post</p>,
    }]

const SinglePost = ({ _id, description, mediaFiles, createdAt, reactions, associatedCompany: { name = '', companyName = '', organizationName = '' } }: Props) => {
    const [postReactions, setPostReactions] = useState<string[]>([]);
    const { user } = useSelector((state: RootState) => state.auth)
    const [refetchPost, setRefetchPost] = useState(false);
    const [seeMore, setSeeMore] = useState(false);
    const [totalComments, setTotalComments] = useState(0);
    const [showComments, setShowComments] = useState(false);
    const [, copy] = useCopyToClipboard();
    const fullName = name || companyName || organizationName;
    const dispatch = useDispatch();
    const addPostReactionHandler = async () => {
        try {
            await socialMediaService.httpAddPostReaction(_id);
            setRefetchPost(prev => !prev);
            dispatch(setFetchPosts());
        } catch (error) {
            console.log(error, 'erro in post reaction...')
        }
    }

    const getPostHandler = async () => {
        try {
            const { data: { post } } = await socialMediaService.httpGetPost({ id: _id })
            setPostReactions(post.reactions);
        } catch (error) {
            const err = error as AxiosError<{ messsage: string }>;
            toast.error(err.response?.data.messsage)
            console.log(error, 'erro in post reaction...')
        }
    }

    useEffect(() => {
        getPostHandler();
    }, [refetchPost])

    const handlePostDropdownClick = async (key: string) => {
        if (key === 'pin') {
            await socialMediaService.httpPinPost(_id)
        } else if (key === 'edit') {
            dispatch(setPostData({ _id, description, mediaFiles }))
        } else {
            try {
                await socialMediaService.httpDeletePost(_id);
                dispatch(setFetchPosts());
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <section className='w-full my-3.5 shadow relative rounded-xl p-6 bg-white'>
            <Dropdown
                menu={{
                    items: postMenuItems,
                    onClick: (event) => {
                        const { key } = event;
                        handlePostDropdownClick(key);
                    },
                }}
                className='absolute right-4 text-2xl'
                placement="bottomRight"
            >
                <Image
                    src={'/menuIcon.svg'}
                    alt="logo white icon"
                    width={20}
                    height={20}
                    className="active:scale-105 cursor-pointer"
                />
            </Dropdown>

            <div className="flex items-center gap-2">
                <Image src='/profileAvatar.png' width={36} height={36} alt='profile' />
                <div>
                    <p className='font-bold text-xs text-graphiteGray'>{fullName}</p>
                    <p className='mt-1.5 text-coolGray text-[10px]'>{moment(createdAt).fromNow()}</p>
                </div>
            </div>
            {
                description && (
                    <div className="flex description mt-3 text-steelGray text-xs">
                        <p>{truncate(description, { length: seeMore ? description.length : 100, omission: "...", separator: ' ' })} {description.length > 100 && <span><button className='text-blueOrchid font-medium cursor-pointer bg-transparent' onClick={() => setSeeMore(prev => !prev)}>{seeMore ? 'see more' : 'show less'}</button></span>} </p>
                    </div>
                )
            }
            <div className="images-section mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
                {
                    mediaFiles.slice(0, 3).map(({ _id, url }, i) => (
                        <div className='relative h-44 w-auto col-span-1' key={_id}>
                            <Image
                                fill={true}
                                alt={`media-${i}`}
                                src={url}
                                className='rounded-xl size-24'
                            />
                            {
                                (mediaFiles.length > 2 && i === 2) && (
                                    <p className='absolute text-white font-semibold text-xl left-[50%] top-[50%]'>+2</p>
                                )
                            }
                        </div>
                    ))
                }

            </div>
            <div className="post-actions-section flex justify-between mt-4 items-center">
                <div className="flex gap-2 items-center">
                    {
                        postReactions.includes(user._id) && (
                            <Image src='/like-blue.svg' className='cursor-pointer' onClick={addPostReactionHandler} width={20} height={20} alt='profile' />
                        )
                    }
                    <Image src='/heart-01.svg' className='cursor-pointer' onClick={addPostReactionHandler} width={20} height={20} alt='profile' />
                    {
                        reactions.length > 0 && (
                            <p className='font-medium text-xs text-schestiPrimaryBlack'>{reactions.length} Like</p>
                        )
                    }
                    <div className="flex gap-2 items-center cursor-pointer" onClick={() => setShowComments(prev => !prev)}>
                        <Image src='/comments-01.svg' width={20} height={20} alt='profile' />
                        <p className='font-medium text-xs text-schestiPrimaryBlack'>{totalComments > 0 && totalComments} Comments</p>
                    </div>

                </div>
                <div className="flex items-center gap-3">
                    <Image src='/flag-03.svg' className='cursor-pointer' onClick={async () => {
                        await socialMediaService.httpSavePost(_id)
                    }} width={18} height={18} alt='profile' />
                    <Image src='/share-07.svg' onClick={() => copy(`${process.env.NEXT_PUBLIC_APP_URL}/post/${_id}`)} className='cursor-pointer' width={20} height={20} alt='profile' />
                    <p className='font-medium text-xs text-schestiPrimaryBlack'>Share</p>
                </div>
            </div>
            {
                showComments && (
                    <Comments postId={_id} setTotalComments={setTotalComments} />
                )
            }
            <AddComment postId={_id} />
        </section>
    )
}

export default SinglePost