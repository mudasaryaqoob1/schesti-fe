'use client';
import React, { useState } from 'react';
import { Form } from 'antd';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

// module imports
import Progessbar from '@/app/component/progressBar';
import PrimaryHeading from '@/app/component/headings/primary';
import Button from '@/app/component/customButton/button';
import { tertiaryHeading } from '@/globals/tailwindvariables';
import { IRegisterCompany } from '@/app/interfaces/companyInterfaces/companyRegister.interface';
import AuthNavbar from '@/app/(pages)/(auth)/authNavbar';


const RegisterVerification = () => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    const [isLoadingSkip, setIsLoadingSkip] = useState(false);

    const submitHandler = (event: any) => {
        event.preventDefault();
        setIsLoading(true);
        return;
    };

    const handleSkipClick = () => {
        setIsLoadingSkip(true); // Set loading state to true before redirection
        router.push('/plans');
    };
    return (
        <>
            <AuthNavbar />
            <div className="h-[calc(100vh-100px)] grid place-items-center">
                <div className="w-full max-w-xl bg-snowWhite">
                    <h2 className={twMerge(`${tertiaryHeading} mb-4 `)}>Verification</h2>
                    <div className="w-full h-1 bg-mistyWhite"></div>
                    <div className="mt-6 bg-snowWhite shadow-tertiaryMystery p-10">
                        <PrimaryHeading
                            title="Verification"
                            className="text-center mb-12"
                        />
                        <p>Upload all the documents to get schesti verification badge. That will help to get more project</p>
                        <Form name="basic" autoComplete="off" >
                            <div className="flex flex-col gap-6">
                                <label htmlFor="myInput">EIN Number</label>
                                <div className="w-full h-1 bg-mistyWhite"></div>
                                <div className="flex items-center">
                                    <label htmlFor="dropzone-file" className="flex flex-col items-start justify-start w-full border-2 border-gray-300 border-solid rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                        <div className="flex items-center justify-start p-2 w-full">
                                            <svg className="w-6 h-6 text-gray-500 dark:text-gray-400 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                            </svg>
                                            <div>
                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold text-purple-600">Click to upload</span> or drag and drop</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                                            </div>
                                        </div>
                                        <input id="dropzone-file" type="file" style={{ display: 'none' }} />
                                    </label>
                                </div>
                                <label htmlFor="myInput">Secretary of State</label>
                                <div className="w-full h-1 bg-mistyWhite"></div>
                                <div className="flex items-center">
                                    <label htmlFor="dropzone-file" className="flex flex-col items-start justify-start w-full border-2 border-gray-300 border-solid rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                        <div className="flex items-center justify-start p-2 w-full">
                                            <svg className="w-6 h-6 text-gray-500 dark:text-gray-400 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                            </svg>
                                            <div>
                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold text-purple-600">Click to upload</span> or drag and drop</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                                            </div>
                                        </div>
                                        <input id="dropzone-file" type="file" style={{ display: 'none' }} />
                                    </label>
                                </div>
                                <label htmlFor="myInput">License if needed</label>
                                <div className="w-full h-1 bg-mistyWhite"></div>
                                <div className="flex items-center">
                                    <label htmlFor="dropzone-file" className="flex flex-col items-start justify-start w-full border-2 border-gray-300 border-solid rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                        <div className="flex items-center justify-start p-2 w-full">
                                            <svg className="w-6 h-6 text-gray-500 dark:text-gray-400 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                            </svg>
                                            <div>
                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold text-purple-600">Doc title.pdf</span></p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">200 KB - 70% uploaded</p>
                                            </div>
                                        </div>
                                        <input id="dropzone-file" type="file" style={{ display: 'none' }} />
                                    </label>
                                </div>
                                <label htmlFor="myInput">License if needed</label>
                                <div className="w-full h-1 bg-mistyWhite"></div>
                                <div className="flex items-center">
                                    <label htmlFor="dropzone-file" className="flex flex-col items-start justify-start w-full border-2 border-gray-300 border-solid rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                        <div className="flex items-center justify-start p-2 w-full">
                                            <svg className="w-6 h-6 text-gray-500 dark:text-gray-400 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                            </svg>
                                            <div>
                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold text-purple-600">Doc title.pdf</span></p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">200 KB - 70% uploaded</p>
                                            </div>
                                        </div>
                                        {/* <input id="dropzone-file" type="file" style={{display: 'none'}} /> */}
                                    </label>
                                </div>
                            </div>
                            <Button isLoading={isLoading} onClick={submitHandler} text="Submit" className="w-full my-3" type="submit" />
                            <Button isLoading={isLoadingSkip} onClick={handleSkipClick} text="Skip" className="w-full my-3" type="submit" />
                        </Form>
                    </div>
                    <Progessbar progress={'25%'} step={1} className="my-3" />
                </div>
            </div>
        </>
    );
};

export default RegisterVerification;