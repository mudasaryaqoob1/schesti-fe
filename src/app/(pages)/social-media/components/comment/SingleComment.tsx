import Image from 'next/image'
import React from 'react'
import CommentReplies from './Reply'
import { IComment } from '.'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { socialMediaService } from '@/app/services/social-media.service'
import { setCommentContent, setSelectedPostId, setFetchComments, setCommentId } from '@/redux/social-media/social-media.slice'

type Props = {

} & IComment

const SingleComment = ({ _id, postId, content, updatedAt, associatedCompany }: Props) => {
    const { user } = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();

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
                <div className="flex items-center gap-2">
                    <Image src='/profileAvatar.png' width={36} height={36} alt='profile' />
                    <div>
                        <p className='font-bold text-xs text-graphiteGray'>{associatedCompany.name}</p>
                        <p className='mt-1.5 text-coolGray text-[10px]'>{moment(updatedAt).fromNow()}</p>
                    </div>
                </div>
                {
                    user._id === associatedCompany._id ? (
                        <div className="flex gap-2">
                            <div className="flex gap-2 cursor-pointer rounded-[3px] py-0.5 px-2 items-center bg-schestiLightPrimary">
                                <Image src='/trash-03.svg' width={10} height={10} alt='profile' />
                                <p className='text-lavenderPurpleReplica font-semibold text-[10px]' onClick={deletePostCommentHandler}>Delete</p>
                            </div>
                            <div onClick={() => {
                                dispatch(setCommentContent(content));
                                dispatch(setSelectedPostId(postId));
                                dispatch(setCommentId(_id));
                            }} className="flex gap-2 cursor-pointer rounded-[3px] py-0 px-2 items-center bg-schestiLightPrimary">
                                <Image src='/edit-2.svg' width={10} height={10} alt='profile' />
                                <p className='text-lavenderPurpleReplica font-semibold text-[10px]'>Edit</p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex gap-2 cursor-pointer rounded-[3px] py-0.5 px-2 items-center bg-schestiLightPrimary">
                            <Image src='/reply.svg' width={10} height={10} alt='profile' />
                            <p className='text-lavenderPurpleReplica font-medium text-xs'>Reply</p>
                        </div>
                    )
                }

            </div>
            <p className='mt-3 text-stormGrey'>{content}</p>
            <div className="mt-4 border-l border-mercury ps-10">
                <CommentReplies />
            </div>
        </div>
    )
}

export default SingleComment