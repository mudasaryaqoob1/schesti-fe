import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import SingleComment from './SingleComment'
import { socialMediaService } from '@/app/services/social-media.service'
import Loader from '@/app/component/loader'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { IUserInterface } from '@/app/interfaces/user.interface'
import { setCommentContent } from '@/redux/social-media/social-media.slice'
import { IPost } from '../post'

export interface IComment {
    _id: string
    postId: string
    associatedCompany: IUserInterface
    content: string
    createdAt: string
    updatedAt: string
    post: IPost
    replyComments: any
    __v: number
}

const Comments = ({ postId, setTotalComments, isPostOwner, isAdmin }: { postId: string, setTotalComments: Dispatch<SetStateAction<number>>, isPostOwner: boolean, isAdmin: boolean }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [comments, setComments] = useState<IComment[]>([]);
    const { fetchComments } = useSelector((state: RootState) => state.socialMedia);
    const dispatch = useDispatch();


    const getCommentsHandler = async () => {
        try {
            setIsLoading(true);
            const { data: { postComments } } = await socialMediaService.httpGetPostComments({ id: postId });
            setComments(postComments);
            setTotalComments(postComments.length);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        dispatch(setCommentContent(''));
        getCommentsHandler();
    }, [fetchComments])

    if (isLoading) {
        return <Loader />
    }


    return (
        <div className='mt-4 flex  gap-2 flex-col'>
            {
                comments.map((data) => (
                    <SingleComment key={data._id} {...data} isPostOwner={isPostOwner} isAdmin={isAdmin} />
                ))
            }
        </div>
    )
}

export default Comments