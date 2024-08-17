import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import CustomButton from '@/app/component/customButton/button'
import { toast } from 'react-toastify';
import { socialMediaService } from '@/app/services/social-media.service';
import filesUrlGenerator from '@/app/utils/filesUrlGenerator';
import { CloseCircleOutlined } from '@ant-design/icons';
import { IMediaFile } from './';
import { useDispatch, useSelector } from 'react-redux';
import { setFetchPosts, setPostData } from '@/redux/social-media/social-media.slice';
import { RootState } from '@/redux/store';
import ModalComponent from '@/app/component/modal';
import FeelingActivityFeature from './FeelingActivity';

type IPost = {
    mediaFiles: IMediaFile[],
    description: string,
    feeling: string
}
const CreatePost = () => {
    const dispatch = useDispatch();
    const [isFilesUploading, setIsFilesUploading] = useState(false);
    const [files, setFiles] = useState([] as File[]);
    const [description, setDescription] = useState('');
    const { postData } = useSelector((state: RootState) => state.socialMedia);
    const [postOldUrls, setPostOldUrls] = useState<IMediaFile[]>([]);
    const [showFeelingActivity, setShowFeelingActivity] = useState(false);
    const [feeling, setFeeling] = useState('');

    async function createPost() {

        try {
            setIsFilesUploading(true);
            const { mediaFiles, mediaFilesLength } = await filesUrlGenerator(files);
            if (mediaFilesLength || description) {
                const payload: Partial<IPost> = {};

                if (mediaFiles) {
                    payload['mediaFiles'] = mediaFiles;
                }

                if (description) {
                    payload['description'] = description;
                }

                if (feeling) {
                    payload['feeling'] = feeling;
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
            setFeeling('');
            setIsFilesUploading(false);
            setDescription('');
        }
    }

    async function updatePost() {

        try {
            setIsFilesUploading(true);
            const { mediaFiles, mediaFilesLength } = await filesUrlGenerator(files);
            if (mediaFilesLength || postOldUrls || description) {
                const allMediaFiles: IMediaFile[] = [];
                const payload: Partial<IPost> = {};

                if (mediaFilesLength) {
                    allMediaFiles.push(...mediaFiles);
                }
                if (postOldUrls.length > 0) {
                    allMediaFiles.push(...postOldUrls);
                }

                if (mediaFilesLength > 0 || postOldUrls.length > 0) {
                    payload['mediaFiles'] = allMediaFiles;
                }

                if (description) {
                    payload['description'] = description;
                }

                if (feeling) {
                    payload['feeling'] = feeling;
                }

                const { message } = await socialMediaService.httpUpdatePost(
                    postData?._id!, payload
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
            setIsFilesUploading(false);
            dispatch(setFetchPosts());
            resetPost();
        }
    }

    useEffect(() => {
        if (postData) {
            const { description, mediaFiles } = postData;
            setDescription(description);
            setPostOldUrls(mediaFiles);
        }
    }, [postData])

    function resetPost() {
        setFiles([]);
        setDescription('');
        setFeeling('');
        setPostOldUrls([]);
        dispatch(setPostData(null))
    }


    return (
        <div className='w-full mt-3.5 shadow rounded-xl p-6 bg-white'>
            <ModalComponent setOpen={setShowFeelingActivity} open={showFeelingActivity}>
                <FeelingActivityFeature setIsModalOpen={setShowFeelingActivity} setFeeling={setFeeling} />
            </ModalComponent>
            <div className="flex items-center gap-2">
                <Image src='/profileAvatar.png' width={36} height={36} alt='profile' />
                <p className='font-medium text-graphiteGray text-sm'>Create Post</p>
            </div>
            <textarea value={description} onChange={({ target }) => setDescription(target.value)} rows={5} className='w-full placeholder:text-coolGray border border-mercury rounded-md mt-3 p-3' placeholder='What’s in your mind...' />

            <div className="media-list-section mt-3 flex flex-wrap gap-2">
                {
                    postOldUrls.map(({ url }, i) => (
                        <div className='relative'>
                            <CloseCircleOutlined onClick={() => setPostOldUrls(prev => prev.filter((_, fileIndex) => fileIndex !== i))} className='text-red-600 absolute -right-1 cursor-pointer rounded-full -top-1 bg-cloudWhite' />
                            <Image className='rounded-md' key={i} src={url} height={100} width={100} alt={'img-' + i} />
                        </div>
                    ))
                }
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

                    <label htmlFor="photo-video" className="flex items-center cursor-pointer gap-2">
                        <Image src='/photo-video.svg' width={16} height={12} alt='profile' />
                        <p className='font-medium text-xs text-schestiPrimaryBlack'>Photo/Video</p>
                    </label>
                    <input multiple id='photo-video' className='hidden' type="file" onChange={({ target }) => {
                        if (target.files) {
                            setFiles(prev => ([...prev, ...Array.from(target.files as FileList)]));
                        }
                    }} />
                    <label className="flex items-center cursor-pointer gap-2" onClick={() => setShowFeelingActivity(true)}>
                        <Image src='/camera-02.svg' width={16} height={12} alt='profile' />
                        <p className='font-medium text-xs text-schestiPrimaryBlack'>Feeling/Activity {feeling && `is ${feeling}`}</p>
                    </label>
                </div>
                <div className='flex gap-3'>
                    {
                        postData && (
                            <CustomButton isLoading={isFilesUploading} onClick={resetPost} text={'Cancel'} className='max-w-16 flex justify-center bg-vividRed text-xs text-white' />
                        )
                    }
                    <CustomButton isLoading={isFilesUploading} onClick={() => postData ? updatePost() : createPost()} text={postData ? 'Update' : 'Create'} className='max-w-16 flex justify-center bg-lavenderPurpleReplica text-xs text-white' />
                </div>
            </div>
        </div>
    )
}

export default CreatePost