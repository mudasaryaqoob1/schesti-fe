import CustomButton from '@/app/component/customButton/button'
// import Description from '@/app/component/description'
// import SecondaryHeading from '@/app/component/headings/Secondary'
import SenaryHeading from '@/app/component/headings/senaryHeading'
import TertiaryHeading from '@/app/component/headings/tertiary'
import { bg_style } from '@/globals/tailwindvariables'
import { DeleteOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons'
import { Form, Formik } from 'formik'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import FormControl from '@/app/component/formControl';
// import { PhoneNumberInputWithLable } from '@/app/component/phoneNumberInput/PhoneNumberInputWithLable'
import { Avatar, Button, Progress, Select, Table } from 'antd'
//@ts-ignore
import type { ColumnsType } from 'antd/es/table'
import ModalComponent from '@/app/component/modal'
import ClientModal from '../createClientModal';
// import { UploadFileData } from '../../context/EditContext'
import { toast } from 'react-toastify'
import CreateProgressModal from '../createProgressModal'
// import { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist'
import AwsS3 from '@/app/utils/S3Intergration'
// import axios from 'axios'
import { takeoffSummaryService } from '@/app/services/takeoffSummary.service'
import { useRouter, useSearchParams } from 'next/navigation'
import { userService } from '@/app/services/user.service'
import CreateUserModal from '../createUserModal'
import { IUser } from '@/app/interfaces/companyEmployeeInterfaces/user.interface'
// import { useSelector } from 'react-redux'
// import { selectToken } from '@/redux/authSlices/auth.selector'

// const formattedData = [{ name: 'Ellen', scope: "Project Manager", createdAt: '02/06/2024' }, { name: 'Ellen', scope: "Project Manager", createdAt: '02/06/2024' }, { name: 'Ellen', scope: "Project Manager", createdAt: '02/06/2024' },
// { name: 'Ellen', scope: "Project Manager", createdAt: '02/06/2024' }, { name: 'Ellen', scope: "Project Manager", createdAt: '02/06/2024' }, { name: 'Ellen', scope: "Project Manager", createdAt: '02/06/2024' },
// { name: 'Ellen', scope: "Project Manager", createdAt: '02/06/2024' }, { name: 'Ellen', scope: "Project Manager", createdAt: '02/06/2024' }, { name: 'Ellen', scope: "Project Manager", createdAt: '02/06/2024' },
// { name: 'Ellen', scope: "Project Manager", createdAt: '02/06/2024' }, { name: 'Ellen', scope: "Project Manager", createdAt: '02/06/2024' }, { name: 'Ellen', scope: "Project Manager", createdAt: '02/06/2024' },
// { name: 'Ellen', scope: "Project Manager", createdAt: '02/06/2024' }, { name: 'Ellen', scope: "Project Manager", createdAt: '02/06/2024' }, { name: 'Ellen', scope: "Project Manager", createdAt: '02/06/2024' },
// { name: 'Ellen', scope: "Project Manager", createdAt: '02/06/2024' }, { name: 'Ellen', scope: "Project Manager", createdAt: '02/06/2024' }, { name: 'Markus', scope: "Project Manager", createdAt: '02/06/2024' },
// ]

const CreateInfo = () => {
    const router = useRouter()

    const [assignedUser, setassignedUser] = useState<any>([])
    const [clientModal, setclientModal] = useState<boolean>(false)
    const [allPages] = useState<any>([])
    const [projectData, setprojectData] = useState({
        name: "",
        number: "",
        status: "",
        createdate: "",
        deadline: ""
    })
    const [selectecClient, setselectecClient] = useState<any>(null)
    const [selectedFiles, setselectedFiles] = useState<any>([])
    const [progressModalOpen, setprogressModalOpen] = useState(false)
    console.log(selectecClient, selectedFiles);
    const [fullData, setfullData] = useState({
        files: [],
        pages: [],
    })
    console.log(setfullData)

    const columns: ColumnsType<any> = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text, record) => {
                return <div className='flex items-center justify-start gap-x-3'>
                    <Avatar icon={record?.companyLogo ? <Image src={record?.companyLogo} width={50} height={50} alt="" /> : <UserOutlined />} />{`${record?.firstName ?? record?.email}`}
                </div>
            }
        },
        {
            title: 'Role',
            dataIndex: 'role',
            render: (text, record) => {
                return <div className=''>
                    {(record?.roles && Array.isArray(record?.roles)) ? record?.roles[0] : ''}
                </div>
            }
        },
        {
            title: '',
            dataIndex: 'action',
            width: 50,
            render: (val, record) => {
                return <div className='cursor-pointer' onClick={() => { setselectedAssignedUsers((ps: any) => (ps?.filter((i: any) => (i != record)))) }}><DeleteOutlined className='' /></div>
            }
        },
    ];


    // const pdfjs = useCallback(async () => {
    //     const pdfjs = await import('pdfjs-dist');
    //     await import('pdfjs-dist/build/pdf.worker.min.mjs');

    //     return pdfjs;
    // }, []);

    const getAssignedUsers = async () => {
        try {
            const response = await userService.httpGetUsers(1, 100, "");
            if (Array.isArray(response?.data?.employees)) {
                console.log(response?.data?.employees, " ===> assigned users")
                setassignedUser(response?.data?.employees)
            }
        } catch (error) {
            console.log(error, " error while fetching assinged users")
        }
    }
    useEffect(() => { getAssignedUsers() }, [])

    // const handleFileChange = async (event: any) => {
    //     try {
    //         const file = event.target.files[0];
    //         console.log(file, " file full");
    //         //   breakLoopRef.current = false

    //         if (file) {
    //             // setloading(true)
    //             // handleSrc([])
    //             // setshowSelectModal(true)
    //             const PDFJS = await pdfjs();
    //             const pdfPagesData: UploadFileData[] = [];
    //             const reader = new FileReader();
    //             reader.onload = async (event: any) => {
    //                 const data = new Uint8Array(event.target.result);
    //                 const pdf = await PDFJS.getDocument(data).promise;

    //                 for (let index = 0; index < pdf.numPages; index++) {
    //                     console.log(index, " ===> for loop indexing running");
    //                     // if (breakLoopRef.current) { // Check breakLoopRef instead of state
    //                     //   console.log('Task interrupted! for loop indexing running');
    //                     //   break;
    //                     // }

    //                     const page = await pdf.getPage(index + 1);
    //                     console.log(page, typeof (page), " ===> pages while uplaoding")
    //                     const scale = 1;
    //                     const viewport = page.getViewport({ scale });
    //                     const canvas = document.createElement('canvas');
    //                     const context = canvas.getContext('2d');
    //                     canvas.width = viewport.width;
    //                     canvas.height = viewport.height;
    //                     const renderContext: any = {
    //                         canvasContext: context,
    //                         viewport: viewport,
    //                     };
    //                     await page.render(renderContext).promise;

    //                     pdfPagesData.push({
    //                         src: canvas.toDataURL('image/png') || '',
    //                         height: viewport.height,
    //                         width: viewport.width,
    //                     });
    //                     // if (!breakLoopRef.current) {
    //                     //   handleSrc({
    //                     //     src: canvas.toDataURL('image/png') || '',
    //                     //     height: viewport.height,
    //                     //     width: viewport.width,
    //                     //   }, true);
    //                     // }
    //                 }
    //                 //   setloading(false)
    //             };
    //             reader.readAsArrayBuffer(file);
    //         }
    //     } catch (error) {
    //         console.log(error, " ===> Error while reading file")
    //         //   setloading(false)
    //         //   toast.error('Error while reading file')
    //     }
    // };
    const handleChange = (e: any) => {
        console.log("onchange", e.target);
        setprojectData((ps: any) => ({
            ...ps,
            [e.target.id]: e.target?.value
        }))
    }
    // const handleUpdatePages = (pageIndex: any, s3Url: any, fileIndex: any, success: any, width: any, height: any, fileId: any, ar: any) => {
    //     setfullData((ps: any) => ({ ...ps, pages: [...ps.pages, { pageNum: pageIndex + 1, pageId: `${new Date().getTime()}`, fileId: fileId, width, height, name: `${pageIndex + 1} page`, src: s3Url, success: success, file: { name: ar[fileIndex]?.name ?? fileIndex, index: fileIndex } }] }))
    // }
    console.log(projectData, " projectData");
    console.log(fullData, " ===> Full Data")

    const startTakeOf = () => {
        if (!projectData?.name || !projectData?.deadline || !projectData?.status || !projectData?.createdate || !projectData?.number || !selectecClient || !selectecClient?._id) {
            toast.error('Missing Required Feilds')
            return
        }
        if (new Date(projectData?.createdate) > new Date(projectData.deadline)) {
            toast.error('Deadline should be greater than created date.')
            return
        }
        if (!selectedFiles || !Array.isArray(selectedFiles) || !(selectedFiles?.length > 0)) {
            toast.error('At least one file is required.')
            return
        }
        if (fileLoading) {
            toast.error('Wait unit process.')
            return
        }
        console.log(projectData, selectecClient, selectedFiles)
        makeApiCall()
        // if (Array.isArray(fullData?.pages) && fullData?.pages?.length > 0) {
        //     if (fullData?.files?.every((i: any) => {
        //         return i?.totalPages == fullData?.pages?.filter((pg: any) => (i?.fileId == pg?.fileId))?.length
        //     })) {
        //         // setisLoading(false)
        //         //   setshouldContinue(true)
        //         toast.success('Ready to go.')
        //         makeApiCall()
        //     } else {
        //         toast.error(`Please wait until loading files.`)
        //     }
        // } else {
        //     toast.error(`Please select atleast one file to continue.`)
        // }
        // setprogressModalOpen(true)
    }
    // const processSinglePage = async (pageIndex: any, pdf: PDFDocumentProxy, fileIndex: any, fileId: any, ar: any) => {
    //     try {
    //         const page: PDFPageProxy = await pdf.getPage(pageIndex + 1);
    //         console.log(page, typeof (page), " ===> pages while uplaoding")
    //         const scale = 1;
    //         const viewport = page.getViewport({ scale });
    //         const canvas = document.createElement('canvas');
    //         const context = canvas.getContext('2d');
    //         canvas.width = viewport.width;
    //         canvas.height = viewport.height;
    //         const renderContext: any = {
    //             canvasContext: context,
    //             viewport: viewport,
    //         };
    //         await page.render(renderContext).promise;
    //         const obj = {
    //             src: canvas.toDataURL('image/png') || '',
    //             height: viewport.height,
    //             width: viewport.width,
    //         }
    //         const s3Url = await new AwsS3(obj.src, 'documents/takeoff-reports/').uploadS3URL()
    //         handleUpdatePages(pageIndex, s3Url, fileIndex, true, viewport?.width, viewport?.height, fileId, ar)
    //         page.cleanup()
    //     } catch (error) {
    //         console.log(error, " ===> Error insdie process single page");
    //         handleUpdatePages(pageIndex, "", fileIndex, false, 0, 0, fileId, ar)
    //     }
    // }
    // const processSingleFile = async (i: any, ar: any) => {
    //     try {
    //         const curFile = ar[i]
    //         const fileId = `${new Date()?.getTime()}`
    //         console.log(curFile, " ===> Current File Running");
    //         if (curFile) {
    //             const PDFJS = await pdfjs();
    //             // const pdfPagesData: UploadFileData[] = [];
    //             const reader = new FileReader();
    //             reader.onload = async (event: any) => {
    //                 const data = new Uint8Array(event.target.result);
    //                 const pdf: PDFDocumentProxy = await PDFJS.getDocument(data).promise;
    //                 setfullData((ps: any) => ({ ...ps, files: [...ps.files, { name: curFile?.name ?? i, fileId, index: i, totalPages: pdf?.numPages ?? 5 }] }))
    //                 for (let index = 0; index < pdf.numPages; index++) {
    //                     await processSinglePage(index, pdf, i, fileId, ar)
    //                 }
    //             }
    //             reader.readAsArrayBuffer(curFile);
    //         }
    //     } catch (error) {
    //         console.log(error, " Error while processing single file.");
    //     }
    // }

    // const token = useSelector(selectToken);
    const params = useSearchParams()
    const edit_id = params.get('edit_id')
    const [fileLoading, setfileLoading] = useState(false)
    const [fileState, setfileState] = useState<{ name: string, status: 'uploading' | 'processing' | 'failed' | 'done', uploadProgress: number }[]>([])
    console.log(fileState, " ===> log to filestate change")

    const processSingleFileNew = async (i: any, ar: any) => {
        const curFile = ar[i]
        setfileState(ps => ([...ps, { name: curFile?.name, status: 'uploading', uploadProgress: 0 }]))
        try {
            console.log(curFile, " ===> Current file happening here")


            //https://api.schesti.com/api/takeoff-summary/processFiles
            // const res = await takeoffSummaryService.httpProcessFiles(formData)

            //axios.defaults!.headers!['Authorization'] = `Bearer ${token}`
            const url = await new AwsS3(
                curFile,
                'documents/take-off/'
            ).getS3URLWithProgress((progress) => {
                // calculate progress upto 100%
                const percent = Math.round((progress.loaded / progress.total) * 100);
                setfileState((ps) => {
                    return ps.map(i => {
                        if (i.name == curFile?.name) {
                            return { ...i, uploadProgress: percent }
                        } else {
                            return i
                        }
                    })
                })
                if (percent > 99) {
                    setfileState((ps) => {
                        return ps.map(i => {
                            if (i.name == curFile?.name) {
                                return { ...i, status: 'processing' }
                            } else {
                                return i
                            }
                        })
                    })
                }
            });

            const formData = new FormData();
            formData.append('s3PdfUrl', url);
            formData.append('id', `${edit_id}`);
            // const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/takeoff-summary/processFiles`, formData,
            //     {
            //         headers: {
            //             'Authorization': `Bearer ${token}`,
            //             'Content-Type': 'multipart/form-data'
            //         },
            //         timeout: 3600000,
            //         onUploadProgress: (progressEvent) => {
            //             if (progressEvent?.total && progressEvent?.loaded) {
            //                 // Calculate the upload progress percentage
            //                 const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            //                 console.log(`Upload progress: ${progress}%`);
            //                 setfileState((ps) => {
            //                     return ps.map(i => {
            //                         if (i.name == curFile?.name) {
            //                             return { ...i, uploadProgress: progress }
            //                         } else {
            //                             return i
            //                         }
            //                     })
            //                 })
            //                 if (progress > 99) {
            //                     setfileState((ps) => {
            //                         return ps.map(i => {
            //                             if (i.name == curFile?.name) {
            //                                 return { ...i, status: 'processing' }
            //                             } else {
            //                                 return i
            //                             }
            //                         })
            //                     })
            //                 }
            //             }
            //         },
            //     }
            // )
            await takeoffSummaryService.httpProcessFiles(formData)
            setfileState((ps) => {
                return ps.map(i => {
                    if (i.name == curFile?.name) {
                        return { ...i, status: 'done' }
                    } else {
                        return i
                    }
                })
            })
        } catch (error) {
            console.log(error, " Error while processing single file.");
            setfileState((ps) => {
                return ps.map(i => {
                    if (i.name == curFile?.name) {
                        return { ...i, status: 'failed' }
                    } else {
                        return i
                    }
                })
            })
        }
    }

    const [isLoading, setisLoading] = useState<boolean>(false)
    const startProcess = async (ar: any) => {
        setisLoading(true)
        if (Array.isArray(ar) && ar?.length > 0) {
            try {
                setfileLoading(true)
                for (let i = 0; i < ar?.length; i++) {
                    // await processSingleFile(i, ar)
                    await processSingleFileNew(i, ar)
                }
                // setisLoading(false)
                setfileLoading(false)
            } catch (error) {
                console.log(error, " Error startProcess");
                setisLoading(false)
                setfileLoading(false)
            }
        }
    }

    // const processRequest = async () => {
    //     try {
    //         setisLoading(true)
    //         const formData = new FormData()
    //         formData.append('projectData', JSON.stringify(projectData))
    //         formData.append('selectecClient', JSON.stringify(selectecClient))
    //         // Append each file from the array to the FormData object
    //         for (let i = 0; i < selectedFiles?.length; i++) {
    //             formData.append('pdfFiles', selectedFiles[i]);
    //         }
    //         const data = await takeoffSummaryService.httpCreateTakeOffNew(formData)
    //         console.log(data)
    //         setisLoading(false)
    //         router.push('/take-off')
    //     } catch (error) {
    //         console.log(error);
    //         setisLoading(false)
    //     }
    // }
    const [isApiCalling, setisApiCalling] = useState(false)
    const [selectedAssignedUsers, setselectedAssignedUsers] = useState<any>([])



    const makeApiCall = async () => {
        try {
            if (!edit_id || !(edit_id?.length > 0)) {
                toast.error('Invalid takeoff selected.')
                return
            }
            setisApiCalling(true)
            setisLoading(true)
            let asUs = [];
            if (selectedAssignedUsers && Array.isArray(selectedAssignedUsers) && selectedAssignedUsers?.length > 0) {
                asUs = selectedAssignedUsers?.map(i => i?._id)
            }
            const { data } = await takeoffSummaryService.httpUpdateTakeoffSummary({
                // projectData, selectecClient, fullData, assignedUsers: asUs
                id: edit_id,
                //@ts-ignore
                data: {
                    name: projectData?.name,
                    number: projectData?.number,
                    status: projectData?.status,
                    createdate: projectData?.createdate,
                    deadline: projectData?.deadline,
                    client: selectecClient?._id,
                    assignedUsers: asUs,
                }
            })
            console.log(data, " ===> Data after creation");
            //@ts-ignore
            if (data?._id && data?._id?.length > 0) {
                //@ts-ignore
                router.push(`/take-off/scale?edit_id=${data?._id}`)
            } else {
                router.push('/take-off')
            }
            // setisApiCalling(false)
        } catch (error) {
            setisApiCalling(false)
            console.log(error, " ===> Error while making api call")
            setisLoading(false)
        }
    }
    // const [shouldContinue, setshouldContinue] = useState<boolean>(false)
    // useEffect(() => {
    //     // setfLoading(getLoading)
    //     // getLoading()
    //     if(Array.isArray(fullData?.pages) && fullData?.pages?.length>0){
    //       if(fullData?.files?.every((i:any)=>{
    //         return i?.totalPages == fullData?.pages?.filter((pg:any)=>(i?.fileId == pg?.fileId))?.length
    //       })){
    //         // setisLoading(false)
    //         setshouldContinue(true)
    //       }
    //     }
    //   }, [fullData])

    const [userModal, setuserModal] = useState<boolean>(false)
    const addUserHandler = async (values: IUser) => {
        try {
            setisLoading(true)
            await userService.httpAddNewEmployee({ ...values, roles: [values.roles] })
            await getAssignedUsers()
            setisLoading(false)
            setuserModal(false)
            toast.success('User added.')
        } catch (error: any) {
            setisLoading(false)
            console.log(error, " ===> Error Occured while creating User")
            toast.error(error?.response?.data?.message ?? 'Failed to add user.')
        }
    }
    // Create a ref for the file input
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <>
            {/* <section className="md:px-16 px-8 pb-4"> */}
            <div className='flex justify-between mt-5'>
                <div className="flex gap-4 items-center mt-6">
                    <Image src={'/home.svg'} alt="home icon" width={20} height={20} />
                    <Image
                        src={'/chevron-right.svg'}
                        alt="chevron-right icon"
                        width={16}
                        height={16}
                    />
                    <SenaryHeading title="Takeoff" className="font-base !font-semibold text-slateGray" />
                    <Image
                        src={'/chevron-right.svg'}
                        alt="chevron-right icon"
                        width={16}
                        height={16}
                    />

                    <SenaryHeading
                        title="Project information"
                        className="font-semibold text-lavenderPurpleReplica cursor-pointer"
                    />
                </div>
                <CustomButton
                    text="Start takeoff"
                    className="!w-auto"
                    // icon="plus.svg"
                    iconwidth={20}
                    iconheight={20}
                    onClick={() => { startTakeOf() }}
                    isLoading={isApiCalling}
                />
            </div>


            {/* grid place-items-center shadow-sceneryShadow  */}
            <div
                className={`grid grid-cols-2 grid-rows-2 gap-4 !shadow-none rounded-lg my-4 ${bg_style} h-[800px] flex flex-wrap justify-between !bg-transparent`}
            >
                {/* Project Info */}
                <div
                    className="p-5 flex flex-col rounded-2xl border border-silverGray shadow-secondaryShadow bg-white flex-1"
                >
                    <TertiaryHeading
                        className="text-graphiteGray mb-4 "
                        title="Project information"
                    />
                    <div className='grow'>
                        <Formik
                            initialValues={{}}
                            onSubmit={() => { }}
                        >
                            {({
                                handleSubmit,
                                // setFieldValue,
                                // values,
                                // setFieldTouched,
                                // touched,
                                // errors,
                            }) => {
                                return (
                                    <Form name="basic" onSubmit={handleSubmit} autoComplete="off">
                                        <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-3 gap-x-4 gap-y-4">
                                            <div className="md:col-span-full">
                                                <FormControl
                                                    control="simpleInput"
                                                    label="Project Name"
                                                    type="text"
                                                    name="name"
                                                    placeholder="Enter Project Name"
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <FormControl
                                                control="simpleInput"
                                                label="Project Number"
                                                type="number"
                                                name="number"
                                                placeholder="Enter Project Number"
                                                onChange={handleChange}
                                            />
                                            <FormControl
                                                control="select"
                                                label="Project Status"
                                                type="text"
                                                name="status"
                                                placeholder="Select Status"
                                                handleChange={(val: any) => { console.log(val); setprojectData((ps: any) => ({ ...ps, status: val })) }}
                                                options={[
                                                    { label: "Not Set", value: "Not Set" },
                                                    { label: "Under Bidding", value: "Under Bidding" },
                                                    { label: "Project Awarded", value: "Project Awarded" },
                                                    { label: "ReCheck", value: "ReCheck" },
                                                    { label: "As built", value: "As built" },
                                                    { label: "Preliminary", value: "Preliminary" },
                                                ]}
                                            />
                                            <FormControl
                                                control="simpleInput"
                                                label="Created Date"
                                                type="date"
                                                name="createdate"
                                                placeholder="Select Start Date"
                                                onChange={handleChange}
                                            />
                                            <FormControl
                                                control="simpleInput"
                                                label="Deadline Dates"
                                                type="date"
                                                name="deadline"
                                                placeholder="Select Deadline"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </Form>
                                );
                            }}
                        </Formik>
                    </div>
                </div>
                {/* Client Info */}
                <div
                    className="p-5 flex flex-col rounded-2xl border border-silverGray shadow-secondaryShadow bg-white flex-1"
                >
                    <div className='flex justify-between'>
                        <TertiaryHeading
                            className="text-graphiteGray mb-4 "
                            title="Client information"
                        />
                        {selectecClient && <Button
                            onClick={() => { setclientModal(true) }}
                            // icon={<Image src={'/takeoff/uploadIcon.png'} alt='' width={20} height={20} />}
                            icon={<PlusOutlined />}
                            className='text-lavenderPurpleReplica font-bold border border-transparent bg-lavenderPurpleReplica bg-opacity-10 hover:!border-lavenderPurpleReplica hover:!text-lavenderPurpleReplica'
                        >Select Client</Button>}
                    </div>
                    <div className='grow'>
                        {selectecClient ? <Formik
                            initialValues={{}}
                            validationSchema={{}}
                            onSubmit={() => { }}
                        >
                            {({
                                handleSubmit,
                                // setFieldValue,
                                // values,
                                // setFieldTouched,
                                // touched,
                                // errors,
                            }) => {
                                return (
                                    <Form name="basic" onSubmit={handleSubmit} autoComplete="off">
                                        <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-3 gap-x-4 gap-y-4">
                                            <FormControl
                                                control="simpleInput"
                                                label="Client Name"
                                                type="email"
                                                name="email"
                                                placeholder="Email Address"
                                                disabled
                                                value={selectecClient?.firstName ?? selectecClient?.email ?? " "}
                                            />
                                            <FormControl
                                                control="simpleInput"
                                                label="Company Name"
                                                type="email"
                                                name="email"
                                                placeholder="Email Address"
                                                disabled
                                                value={selectecClient?.companyName ?? " "}
                                            />
                                            <FormControl
                                                control="simpleInput"
                                                label="Phone Number"
                                                type="email"
                                                name="email"
                                                placeholder="Email Address"
                                                disabled
                                                value={selectecClient?.phone ?? " "}
                                            />
                                            <FormControl
                                                control="simpleInput"
                                                label="Email"
                                                type="email"
                                                name="email"
                                                placeholder="Email Address"
                                                disabled
                                                value={selectecClient?.email ?? " "}
                                            />
                                            <div className="md:col-span-full">
                                                <FormControl
                                                    control="simpleInput"
                                                    label="Address"
                                                    type="text"
                                                    name="companyName"
                                                    placeholder="Enter Company Name"
                                                    disabled
                                                    value={selectecClient?.address ?? " "}
                                                />
                                            </div>
                                        </div>
                                    </Form>
                                );
                            }}
                        </Formik>
                            :
                            <div className='w-full h-full flex justify-center items-center' >
                                <Button
                                    onClick={() => { setclientModal(true) }}
                                    size='large'
                                    // icon={<Image src={'/takeoff/uploadIcon.png'} alt='' width={20} height={20} />}
                                    icon={<PlusOutlined />}
                                    className='text-lavenderPurpleReplica font-bold border border-transparent bg-lavenderPurpleReplica bg-opacity-10 hover:!border-lavenderPurpleReplica hover:!text-lavenderPurpleReplica'
                                >Select Client</Button>
                            </div>
                        }
                    </div>
                </div>
                {/* User Table */}
                <div
                    className="p-5 flex flex-col rounded-2xl border border-silverGray shadow-secondaryShadow bg-white flex-1"
                >
                    <div className='flex justify-between'>
                        <TertiaryHeading
                            className="text-graphiteGray mb-4 "
                            title="Assigned to"
                        />
                        <Button
                            icon={<PlusOutlined />}
                            className='text-lavenderPurpleReplica font-bold border border-transparent bg-lavenderPurpleReplica bg-opacity-10 hover:!border-lavenderPurpleReplica hover:!text-lavenderPurpleReplica'
                            onClick={() => setuserModal(true)}
                        >Add User</Button>
                    </div>
                    <div className='px-2'>
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="Select users to assing"
                            // defaultValue={['a10', 'c12']}
                            value={selectedAssignedUsers?.map((record: any) => ({ label: record?.firstName ?? record?.email, value: JSON.stringify(record) })) ?? []}
                            onChange={(v: any) => { setselectedAssignedUsers(v?.map((su: any) => JSON.parse(su))) }}
                            options={assignedUser?.map((record: any) => ({ label: record?.firstName ?? record?.email, value: JSON.stringify(record) }))}
                        />
                    </div>
                    <div className='grow'>
                        <Table
                            columns={columns}
                            dataSource={selectedAssignedUsers}
                            onChange={() => { }} className='max-h-[100%]'
                            scroll={{ y: 170 }}
                        />
                    </div>
                </div>
                {/* Upload Files */}
                <div
                    className="p-5 flex flex-col rounded-2xl border border-silverGray shadow-secondaryShadow bg-white flex-1"
                >
                    <div className='flex justify-between'>
                        <TertiaryHeading
                            className="text-graphiteGray mb-4 "
                            title="Project Files"
                        />
                        {/* <Button
                            icon={<PlusOutlined />}
                            className='text-lavenderPurpleReplica font-bold border border-transparent bg-lavenderPurpleReplica bg-opacity-10 hover:!border-lavenderPurpleReplica hover:!text-lavenderPurpleReplica'
                        >Add User</Button> */}
                    </div>
                    <div className='grow flex'>
                        {/* {fullData?.files && Array.isArray(fullData?.files) && fullData?.files?.length > 0 && <div className='flex flex-col gap-y-7 w-[50%]'>
                            {fullData?.files && Array.isArray(fullData?.files) && fullData?.files?.length > 0 && <h4 className='text-gray-600'>{fullData?.files?.length} uploaded files</h4>}
                            <ul className='list-none flex flex-col gap-y-5'>
                                {
                                    fullData?.files && Array.isArray(fullData?.files) && fullData?.files?.length > 0 && fullData?.files?.map((it: any, ind: number) => {
                                        const totalProgress = fullData?.pages?.filter((i: any) => { return i?.fileId == it?.fileId })
                                        return <li key={ind} className='inline-flex gap-3 items-center justify-center'>
                                            <img src={'/fileCSV.png'} alt='' width={35} height={35} />
                                            <span data-tooltip={`${it?.name}`} className='whitespace-nowrap text-gray-500'>{`${it?.name?.slice(0, 4)}`}</span>
                                            <Progress percent={(totalProgress && Array.isArray(totalProgress) ? Math.ceil((totalProgress?.length / it?.totalPages) * 100) : 0)} strokeColor={'#007AB6'} />
                                            <Progress percent={fileLoading ? 10 : 100} strokeColor={'#007AB6'} />
                                        </li>
                                    })
                                }
                            </ul>
                        </div>} */}
                        {selectedFiles && Array.isArray(selectedFiles) && selectedFiles?.length > 0 && <div className='flex flex-col gap-y-7 w-[50%]'>
                            {selectedFiles && Array.isArray(selectedFiles) && selectedFiles?.length > 0 && <h4 className='text-gray-600'>{selectedFiles?.length} uploaded files</h4>}
                            <ul className='list-none flex flex-col gap-y-5'>
                                {
                                    selectedFiles && Array.isArray(selectedFiles) && selectedFiles?.length > 0 && selectedFiles?.map((it: any, ind: number) => {
                                        // const totalProgress = fullData?.pages?.filter((i: any) => { return i?.fileId == it?.fileId })
                                        return <li key={ind} className='inline-flex gap-3 items-center justify-center'>
                                            <img src={'/fileCSV.png'} alt='' width={35} height={35} />
                                            <span data-tooltip={`${it?.name}`} className='whitespace-nowrap text-gray-500'>{`${it?.name?.slice(0, 4)}`}</span>
                                            {/* <Progress percent={(totalProgress && Array.isArray(totalProgress) ? Math.ceil((totalProgress?.length / it?.totalPages) * 100) : 0)} strokeColor={'#007AB6'} /> */}
                                            {fileState.find(i => i.name == it?.name)?.status != 'failed' && <Progress percent={fileState.find(i => i.name == it?.name)?.uploadProgress ?? 1} strokeColor={'#007AB6'} />}
                                            <span className='text-sm text-gray-500' >{`(${fileState.find(i => i.name == it?.name)?.status})`}</span>
                                        </li>
                                    })
                                }
                            </ul>
                        </div>}
                        <div className='grow p-3' >
                            <label className='relative' htmlFor="file-selector">
                                <input ref={fileInputRef} type="file" accept="application/pdf" id='file-selector' className='hidden absolute top-0 left-0' style={{ display: 'none' }} onChange={(e: any) => {
                                    console.log(e.target.result, " ==> event.target.result")
                                    if (e.target.files?.length > 0) {
                                        const arr = Object.keys(e.target?.files)?.map((it: any) => {
                                            if (Number.isInteger(Number(it))) {
                                                return e?.target?.files[it]
                                            }
                                        })
                                        console.log(arr, " array of file to pro")
                                        setselectedFiles((ps: any) => ([...ps, ...arr]))
                                        startProcess(arr)
                                    }
                                }} />
                                <div className='cursor-pointer w-[100%] h-[100%] border-[2px] border-dashed rounded-lg flex items-center justify-center' >
                                    <div className='w-[70%] h-[80%] flex flex-col items-center justify-evenly'>
                                        <img className='w-[15%]' src={'/uploadNew.png'} alt="" />
                                        <h4 className='text-gray-700' >Drag and Drop your files here</h4>
                                        <p className='text-gray-400'>or</p>
                                        <Button
                                            onClick={() => {
                                                fileInputRef.current?.click()
                                            }}
                                            className='text-lavenderPurpleReplica font-bold border border-transparent bg-lavenderPurpleReplica bg-opacity-10 hover:!border-lavenderPurpleReplica hover:!text-lavenderPurpleReplica'
                                        >Select file</Button>
                                    </div>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Client Modal */}
                <ModalComponent open={clientModal} setOpen={setclientModal}>
                    <ClientModal
                        setModalOpen={setclientModal}
                        setSelectedClient={setselectecClient}
                        selectecClient={selectecClient}
                    />
                </ModalComponent>
                <ModalComponent open={userModal} setOpen={setuserModal}>
                    <CreateUserModal
                        setModalOpen={setuserModal}
                        submitHandler={addUserHandler}
                        isLoading={isLoading}
                    />
                </ModalComponent>
                <ModalComponent open={progressModalOpen} setOpen={() => { }}>
                    <CreateProgressModal
                        setModalOpen={setprogressModalOpen}
                        files={selectedFiles}
                        pages={allPages}
                        processFiles={startProcess}//{processRequest}
                        fullData={fullData}
                        isLoading={isLoading}
                        setisLoading={setisLoading}
                        makeApiCall={makeApiCall}
                        isApiCalling={isApiCalling}
                    />
                </ModalComponent>
            </div>
        </>
    )
}

export default CreateInfo