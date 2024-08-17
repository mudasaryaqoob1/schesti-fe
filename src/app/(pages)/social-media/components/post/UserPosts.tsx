import React, { useEffect, useState } from 'react'
import SinglePost from './SinglePost'
import { socialMediaService } from '@/app/services/social-media.service';
import { Skeleton } from 'antd';
import { IUserInterface } from '@/app/interfaces/user.interface';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export interface IPost {
    _id: string
    description?: string
    associatedCompany: IUserInterface
    mediaFiles: IMediaFile[]
    reactions: string[]
    pinPosts: string[]
    savedPosts: string[]
    createdAt: string
    updatedAt: string
    __v: number
}

export interface IMediaFile {
    type: string
    url: string
    name: string
    extension: string
    _id?: string
}

const UserPosts = () => {

    const [posts, setPosts] = useState<IPost[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useSelector((state: RootState) => state.auth.user);
    const { fetchPosts } = useSelector((state: RootState) => state.socialMedia);

    const getPost = async () => {
        setIsLoading(true);
        const { data } = await socialMediaService.httpGetUserPosts({ id: user._id });
        setIsLoading(false);
        setPosts(data.posts);
    }

    useEffect(() => {
        getPost();
    }, [fetchPosts])


    if (isLoading) {
        <Skeleton />
    }

    return (
        <div >
            {
                posts.map((postData) => (
                    <SinglePost {...postData} key={postData._id} showOptions={false} />
                ))
            }
        </div>
    )
}

export default UserPosts