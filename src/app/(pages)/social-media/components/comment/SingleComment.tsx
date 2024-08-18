import Image from 'next/image'
import React from 'react'
import { IComment } from '.'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { socialMediaService } from '@/app/services/social-media.service'
import { setFetchComments } from '@/redux/social-media/social-media.slice'
import AddComment from '../post/AddComment'
import ReplyComent from './Reply'
import useToggleVisibility from '@/app/hooks/useToggleVisibility'
import { useRouter } from 'next/navigation'

export type ICommentProps = {
    isPostOwner: boolean;
} & IComment

const SingleComment = ({ _id, postId, isPostOwner, content, updatedAt, associatedCompany, replyComments }: ICommentProps) => {
    const { user } = useSelector((state: RootState) => state.auth.user);
    const router = useRouter();
    const dispatch = useDispatch();
    const { isVisible: editVisible, toggleVisibility: toggleEditVisibility, containerRef: editContainerRef } = useToggleVisibility<HTMLDivElement>();
    const { isVisible: replyVisible, toggleVisibility: toggleReplyVisibility, containerRef: replyContainerRef } = useToggleVisibility<HTMLDivElement>();

    const isCommentOnwer = user._id === associatedCompany._id;
    const deletePostCommentHandler = async () => {
        try {
            await socialMediaService.httpDeletePostComment(_id);
            dispatch(setFetchComments());
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className="flex gap-3 justify-between">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push(`/user/${associatedCompany._id}`)}>
                    <Image src='/profileAvatar.png' width={36} height={36} alt='profile' />
                    <div>
                        <p className='font-bold text-xs text-graphiteGray'>{associatedCompany.name}</p>
                        <p className='mt-1.5 text-coolGray text-[10px]'>{moment(updatedAt).fromNow()}</p>
                    </div>
                </div>
                {
                    isCommentOnwer ? (
                        <div className="flex gap-2">
                            <div onClick={deletePostCommentHandler} className="flex gap-2 cursor-pointer rounded-[3px] py-0.5 px-2 items-center bg-schestiLightPrimary">
                                <Image src='/trash-03.svg' width={10} height={10} alt='profile' />
                                <p className='text-lavenderPurpleReplica font-semibold text-[10px]'>Delete</p>
                            </div>
                            <div onClick={toggleEditVisibility} className="flex gap-2 cursor-pointer rounded-[3px] py-0 px-2 items-center bg-schestiLightPrimary">
                                <Image src='/edit-2.svg' width={10} height={10} alt='profile' />
                                <p className='text-lavenderPurpleReplica font-semibold text-[10px]'>Edit</p>
                            </div>
                        </div>
                    ) : isPostOwner ? (
                        <div className="flex gap-2">
                            <div onClick={deletePostCommentHandler} className="flex gap-2 cursor-pointer rounded-[3px] py-0.5 px-2 items-center bg-schestiLightPrimary">
                                <Image src='/trash-03.svg' width={10} height={10} alt='profile' />
                                <p className='text-lavenderPurpleReplica font-semibold text-[10px]'>Delete</p>
                            </div>
                            <div onClick={toggleReplyVisibility} className="flex gap-2 cursor-pointer rounded-[3px] py-0.5 px-2 items-center bg-schestiLightPrimary">
                                <Image src='/reply.svg' width={10} height={10} alt='profile' />
                                <p className='text-lavenderPurpleReplica cursor-pointer font-semibold text-xs'>Reply</p>
                            </div>
                        </div>

                    ) : (
                        <div onClick={toggleReplyVisibility} className="flex gap-2 cursor-pointer rounded-[3px] py-0.5 px-2 items-center bg-schestiLightPrimary">
                            <Image src='/reply.svg' width={10} height={10} alt='profile' />
                            <p className='text-lavenderPurpleReplica cursor-pointer font-semibold text-xs'>Reply</p>
                        </div>
                    )
                }

            </div>
            {
                editVisible && (
                    <div ref={editContainerRef}>
                        <AddComment postId={postId} commentId={_id} isEdit commentContent={content} />
                    </div>
                )
            }
            {
                replyVisible && (
                    <div ref={replyContainerRef}>
                        <AddComment postId={postId} replyComment commentId={_id} />
                    </div>
                )
            }
            <p className='mt-3 text-stormGrey'>{content}</p>
            <div className="mt-4 border-l flex flex-col gap-2 border-mercury ps-10">
                {
                    replyComments.map((data: any) => (
                        <ReplyComent key={data._id} {...data} />
                    ))
                }
            </div>
        </div>
    )
}

export default SingleComment