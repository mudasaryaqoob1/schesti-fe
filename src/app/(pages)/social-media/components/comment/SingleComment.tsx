import Image from 'next/image';
import React from 'react';
import Comments, { IComment } from '.';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { socialMediaService } from '@/app/services/social-media.service';
import { setFetchComments } from '@/redux/social-media/social-media.slice';
import AddComment from '../post/AddComment';
import useToggleVisibility from '@/app/hooks/useToggleVisibility';
import { useRouter } from 'next/navigation';
import Report from '../post/Report';
import Profile from '../post/Profile';

export type ICommentProps = {
  isPostOwner: boolean;
  isAdmin: boolean;
  reply_to_username?: string;
  postId: string;
} & IComment;

const SingleComment = ({
  _id,
  parentId,
  isPostOwner,
  content,
  updatedAt,
  associatedCompany,
  replyCount,
  isAdmin,
  type,
  reply_to_username,
  postId,
}: ICommentProps) => {
  const { user } = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    isVisible: editVisible,
    toggleVisibility: toggleEditVisibility,
    containerRef: editContainerRef,
  } = useToggleVisibility<HTMLDivElement>();
  const {
    isVisible: replyVisible,
    toggleVisibility: toggleReplyVisibility,
    containerRef: replyContainerRef,
  } = useToggleVisibility<HTMLDivElement>();

  const isCommentOwner = user._id === associatedCompany._id;
  const deletePostCommentHandler = async () => {
    try {
      await socialMediaService.httpDeletePostComment(_id);
      dispatch(setFetchComments());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex gap-3 justify-between mt-1">
        <Profile
          name={associatedCompany.name}
          avatar={associatedCompany.avatar}
          date={updatedAt}
          onClick={() => router.push(`/user/${associatedCompany._id}`)}
          isOwner={isCommentOwner}
        />
        {isCommentOwner ? (
          <div className="flex gap-2 items-center">
            <div
              onClick={deletePostCommentHandler}
              className="h-6 cursor-pointer rounded-[3px] px-2 bg-schestiLightPrimary"
            >
              <Image src="/trash-03.svg" width={12} height={12} alt="profile" />
            </div>
            <div
              onClick={toggleEditVisibility}
              className="h-6 cursor-pointer rounded-[3px] py-0 px-2 bg-schestiLightPrimary"
            >
              <Image src="/edit-2.svg" width={12} height={12} alt="profile" />
            </div>
          </div>
        ) : isPostOwner ? (
          <div className="flex gap-2 items-center">
            <div
              onClick={deletePostCommentHandler}
              className="h-6 cursor-pointer rounded-[3px] px-2 bg-schestiLightPrimary"
            >
              <Image src="/trash-03.svg" width={12} height={12} alt="profile" />
            </div>
            <div
              onClick={toggleReplyVisibility}
              className="flex gap-2 cursor-pointer rounded-[3px] p-2 bg-schestiLightPrimary"
            >
              <Image src="/reply.svg" width={12} height={12} alt="profile" />
              <p className="text-lavenderPurpleReplica cursor-pointer font-semibold text-xs">
                Reply
              </p>
            </div>
          </div>
        ) : (
          <div className="flex gap-2 items-center">
            {!isAdmin && (
              <Report
                id={postId}
                refetch={() => dispatch(setFetchComments())}
                commentId={_id}
              />
            )}
            <div
              onClick={toggleReplyVisibility}
              className="flex gap-2 cursor-pointer rounded-[3px] p-2 items-center bg-schestiLightPrimary"
            >
              <Image src="/reply.svg" width={12} height={12} alt="profile" />
              <p className="text-lavenderPurpleReplica cursor-pointer font-semibold text-xs">
                Reply
              </p>
            </div>
          </div>
        )}
      </div>
      {editVisible && (
        <div ref={editContainerRef}>
          <h1>Edit Comment Visible parent {parentId} {_id}</h1>
          <AddComment
            parentId={parentId}
            commentId={_id}
            isEdit
            commentContent={content}
          />
        </div>
      )}
      {replyVisible && (
        <div ref={replyContainerRef}>
          <h1>Reply Comment Visible</h1>
          <AddComment parentId={_id} commentId={_id} replyComment />
        </div>
      )}
      <p className="mt-3 text-stormGrey">
        <span className="font-semibold text-base text-schestiPrimary mr-[2px]">
          {type == 'reply' && `@${reply_to_username}`}
        </span>
        {content}
      </p>
      <div className="mt-4 border-l flex flex-col gap-2 border-mercury ps-10">
        {replyCount > 0 && (
          <Comments
            parentId={_id}
            isPostOwner={isPostOwner}
            isAdmin={isAdmin}
            reply_to_username={associatedCompany.name}
            postId={_id}
          />
        )}
      </div>
    </>
  );
};

export default SingleComment;
