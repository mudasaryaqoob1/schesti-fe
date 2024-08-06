import React, { useState } from 'react'
import Image from 'next/image'
import CustomButton from '@/app/component/customButton/button'
import { toast } from 'react-toastify';
import { socialMediaService } from '@/app/services/social-media.service';
import filesUrlGenerator from '@/app/utils/filesUrlGenerator';
import { CloseCircleOutlined } from '@ant-design/icons';
import { IMediaFile } from './';
import { useDispatch } from 'react-redux';
import { setFetchPosts } from '@/redux/social-media/social-media.slice';

const CreatePost = () => {
    const dispatch = useDispatch();
    const [isFilesUploading, setIsFilesUploading] = useState(false);
    const [files, setFiles] = useState([] as File[]);
    const [description, setDescription] = useState('');


    async function createPost() {

        try {
            setIsFilesUploading(true);
            const { mediaFiles, mediaFilesLength } = await filesUrlGenerator(files);
            if (mediaFilesLength || description) {
                const payload: Partial<{
                    mediaFiles: IMediaFile[],
                    description: string
                }> = {};

                if (mediaFiles) {
                    payload['mediaFiles'] = mediaFiles;
                }

                if (description) {
                    payload['description'] = description;
                }
                const { message } = await socialMediaService.httpCreatePost(
                    payload
                );
                toast.success(message);
            } else {
                toast.error('Description or image,video is required!')
            }
        } catch (error) {
            console.error('Error uploading file to S3:', error);
            toast.error(`Unable to upload Files`);
            setIsFilesUploading(false);
        } finally {
            dispatch(setFetchPosts());
            setFiles([]);
            setIsFilesUploading(false);
            setDescription('');
        }
    }

    return (
        <div className='w-full mt-3.5 shadow rounded-xl p-6 bg-white'>
            <div className="flex items-center gap-2">
                <Image src='/profileAvatar.png' width={36} height={36} alt='profile' />
                <p className='font-medium text-graphiteGray text-sm'>Create Post</p>
            </div>
            <textarea value={description} onChange={({ target }) => setDescription(target.value)} rows={5} className='w-full placeholder:text-coolGray border border-mercury rounded-md mt-3 p-3' placeholder='What’s in your mind...' />
            <div className="media-list-section mt-3 flex flex-wrap gap-2">
                {
                    files && files.map((file, i) => (
                        <div className='relative'>
                            <CloseCircleOutlined onClick={() => setFiles(prev => prev.filter((_, fileIndex) => fileIndex !== i))} className='text-red-600 absolute -right-1 cursor-pointer rounded-full -top-1 bg-cloudWhite' />
                            {
                                file.type.includes('image') ? (
                                    <Image className='rounded-md' key={i} src={URL.createObjectURL(file)} height={100} width={100} alt={'img-' + i} />
                                ) : (
                                    <video className='rounded-md size-[100px] object-cover' key={i} src={URL.createObjectURL(file)} />
                                )
                            }

                        </div>
                    ))
                }
            </div>
            <div className="upload-media-section flex flex-wrap justify-between items-center mt-3">
                <div className='flex gap-4 items-center '>
                    <label className="flex items-center cursor-pointer gap-2">
                        <Image src='/video.svg' width={16} height={12} alt='profile' />
                        <p className='font-medium text-xs text-schestiPrimaryBlack'>Live Video</p>
                    </label>
                    <label htmlFor="photo-video" className="flex items-center cursor-pointer gap-2">
                        <Image src='/photo-video.svg' width={16} height={12} alt='profile' />
                        <p className='font-medium text-xs text-schestiPrimaryBlack'>Photo/Video</p>
                    </label>
                    <input multiple id='photo-video' className='hidden' type="file" onChange={({ target }) => {
                        if (target.files) {
                            setFiles(prev => ([...prev, ...Array.from(target.files as FileList)]));
                        }
                    }} />
                    <label className="flex items-center cursor-pointer gap-2">
                        <Image src='/camera-02.svg' width={16} height={12} alt='profile' />
                        <p className='font-medium text-xs text-schestiPrimaryBlack'>Feeling/Activity</p>
                    </label>
                </div>
                <CustomButton isLoading={isFilesUploading} onClick={createPost} text='Post' className='max-w-16 bg-lavenderPurpleReplica text-xs text-white' />
            </div>
        </div>
    )
}

export default CreatePost