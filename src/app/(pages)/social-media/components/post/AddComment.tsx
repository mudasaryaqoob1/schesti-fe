import { socialMediaService } from '@/app/services/social-media.service';
import React, { useState } from 'react';
import {
  setCommentContent,
  setFetchComments,
} from '@/redux/social-media/social-media.slice';
import { Form } from 'antd';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import clsx from 'clsx';
import ProfileAvatar from './Profile';
import { useUser } from '@/app/hooks/useUser';

type Props = {
  isEdit?: boolean;
  commentId?: string;
  replyComment?: boolean;
  parentId: string;
  commentContent?: string;
};
const AddComment = ({
  parentId,
  isEdit,
  commentId,
  replyComment,
  commentContent,
}: Props) => {
  const [content, setContent] = useState(commentContent);
  const dispatch = useDispatch();
  const user = useUser();

  const addPostCommentHandler = async () => {
    try {
      if (!content) {
        toast.error('fill comment field');
        return;
      }
      if (replyComment) {
        await socialMediaService.httpAddPostComment({
          id: parentId,
          content,
          type: 'reply',
        });
        dispatch(setCommentContent(''));
        dispatch(setFetchComments());
      } else if (isEdit) {
        await socialMediaService.httpUpdatePostComment({
          id: commentId!,
          content,
        });
        dispatch(setCommentContent(''));
        dispatch(setFetchComments());
      } else {
        await socialMediaService.httpAddPostComment({ id: parentId, content });
        dispatch(setFetchComments());
      }
      setContent('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form
      className={clsx(
        'flex gap-3 mt-4 items-center',
        (replyComment || isEdit) && 'ms-6'
      )}
      onFinish={addPostCommentHandler}
    >
      {/* <Image src="/profileAvatar.png" width={36} height={36} alt="profile" /> */}
      <ProfileAvatar showName={false} name={user?.firstName || user?.name} avatar={user?.socialAvatar || user?.avatar} />
      <input
        autoFocus={true}
        value={content}
        onChange={({ target }) => setContent(target.value)}
        type="text"
        className="border p-3 border-mercury placeholder:text-coolGray text-sm w-full rounded-md"
        placeholder="Add a comment"
      />
    </Form>
  );
};

export default AddComment;
