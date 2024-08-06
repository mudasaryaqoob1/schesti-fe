import { socialMediaService } from '@/app/services/social-media.service'
import { setCommentContent, setFetchComments } from '@/redux/social-media/social-media.slice';
import { RootState } from '@/redux/store';
import { Form } from 'antd';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const AddComment = ({ postId }: { postId: string }) => {
    const { selectedPostId, commentId, commmentContent } = useSelector((state: RootState) => state.socialMedia);
    const [content, setContent] = useState('');
    const dispatch = useDispatch();

    const addPostCommentHandler = async () => {
        try {
            if (!content) {
                toast.error('fill comment field')
                return;
            }
            if (commmentContent) {
                await socialMediaService.httpUpdatePostComment({ id: commentId, content });
                dispatch(setCommentContent(''));
                dispatch(setFetchComments());

            } else {
                await socialMediaService.httpAddPostComment({ id: postId, content });
                dispatch(setFetchComments());
            }
            setContent('');
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (selectedPostId === postId) {
            setContent(commmentContent);
        }
    }, [commmentContent])


    return (
        <Form className='flex gap-3 mt-4 items-center' onFinish={addPostCommentHandler}>
            <Image src='/profileAvatar.png' width={36} height={36} alt='profile' />
            <input value={content} onChange={({ target }) => setContent(target.value)} type="text" className='border p-3 border-mercury placeholder:text-coolGray text-sm w-full rounded-md' placeholder='Add a comment' />
        </Form>
    )
}

export default AddComment