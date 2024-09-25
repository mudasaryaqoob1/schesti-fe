import React, { useEffect, useState } from 'react';
import SinglePost from './SinglePost';
import { socialMediaService } from '@/app/services/social-media.service';
import { Skeleton } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { IPost } from '.';
import { useParams } from 'next/navigation';

const UserPosts = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const { fetchPosts } = useSelector((state: RootState) => state.socialMedia);

  const getUserPosts = async () => {
    setIsLoading(true);
    const { data } = await socialMediaService.httpGetUserPosts({
      id: id as string,
    });
    setIsLoading(false);
    setPosts(data.posts);
  };

  useEffect(() => {
    if (id) {
      getUserPosts();
    }
  }, [fetchPosts, id]);

  if (isLoading) {
    <Skeleton />;
  }

  return (
    <div>
      {posts.length ? (
        posts.map((postData) => <SinglePost {...postData} key={postData._id} />)
      ) : (
        <p className="text-md font-semibold mt-2">No Posts Available</p>
      )}
    </div>
  );
};

export default UserPosts;
