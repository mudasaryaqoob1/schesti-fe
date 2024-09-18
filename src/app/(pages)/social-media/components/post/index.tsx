import React, { useEffect, useState } from 'react'
import SinglePost from './SinglePost'
import { socialMediaService } from '@/app/services/social-media.service';
import { Skeleton } from 'antd';
import { IUserInterface } from '@/app/interfaces/user.interface';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export interface IUserReaction {
    type: string;
    associatedCompany: string
}
export interface IPost {
    _id: string
    description?: string
    associatedCompany: IUserInterface
    mediaFiles: IMediaFile[]
    userReaction: IUserReaction
    reactions: string[]
    pinPosts: string[]
    savedPosts: string[]
    createdAt: string
    updatedAt: string
    feeling?: string
    __v: number
}

export interface IMediaFile {
    type: string
    url: string
    name: string
    extension: string
    _id?: string
}

const SchestiPosts = () => {

    const [posts, setPosts] = useState<IPost[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { fetchPosts } = useSelector((state: RootState) => state.socialMedia)

    const getPost = async () => {
        setIsLoading(true);
        const { data } = await socialMediaService.httpGetPosts({ searchText: '' });
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
                    <SinglePost {...postData} key={postData._id} />
                ))
            }
        </div>
    )
}

export default SchestiPosts