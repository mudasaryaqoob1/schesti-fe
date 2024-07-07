'use client';
import { useState, useContext, useEffect, useCallback, useRef } from 'react';
import ModalComponent from '@/app/component/modal';
import ScaleModal from '../components/scale';
import ModalsWrapper from './components/ModalWrapper';
import { Avatar, Checkbox, ColorPicker, Dropdown, InputNumber, Menu, Progress, Select, Space, Spin } from 'antd';
import { EditContext, ScaleContext, UploadFileContext } from '../context';
import { UploadFileContextProps } from '../context/UploadFileContext';
import Konva from 'konva';
import jsPDF from 'jspdf';
import {
  Measurements,
  ScaleInterface,
  Units,
  defaultMeasurements,
} from '../types';
import NextImage from 'next/image';
import { ScaleNavigation, Draw } from './components';
import { ScaleDataContextProps } from '../context/ScaleContext';
import { useRouter, useSearchParams } from 'next/navigation';
// import CusotmButton from '@/app/component/customButton/button';
// import { ReportDataContextProps } from '../context/ReportDataContext';
// import SelectPageModal from '../components/selectPageModal';
// import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/authSlices/auth.selector';

////////////////////////New Take OffData///////////////////////////////////
import CustomButton from '@/app/component/customButton/button'
import { bg_style } from '@/globals/tailwindvariables'
import { CloudUploadOutlined, CopyOutlined, DeleteOutlined, EditOutlined, FileOutlined, FilePdfOutlined, FolderOutlined, LeftOutlined, MenuUnfoldOutlined, MinusOutlined, MoreOutlined, PlusOutlined, RightOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons'
import React from 'react'
import { Button, Divider, Input, Table } from 'antd'
//@ts-ignore
import type { ColumnsType } from 'antd/es/table'
import { takeoffSummaryService } from '@/app/services/takeoffSummary.service';
import { EditableText } from '@/app/component/EditableText';
import ReportModal from '../components/ReportModal';
// import TertiaryHeading from '@/app/component/headings/tertiary';
import CreateProgressModal from '../components/createProgressModal';
// import { UploadFileData } from '../context/EditContext';
import { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist';
import AwsS3 from '@/app/utils/S3Intergration';
import { toast } from 'react-toastify';
// import { AnyArn } from 'aws-sdk/clients/groundstation';
// import { AnyCnameRecord } from 'dns';
import useWheelZoom from './components/useWheelZoom';
import Draggable from 'react-draggable';
import { twMerge } from 'tailwind-merge';
import { useSelector } from 'react-redux';
import { useDraw } from '@/app/hooks';


const groupDataForFileTable = (input: any[]) => {
  const groupedData = input?.reduce((result: any, currentItem: any) => {
    const {
      id,
      name,
      bucketUrl,
      file,
      page,
      status,
      width,
      height,
      src,
      pageId,
      pageNumber,
      // fileId
    } = currentItem;

    // Check if there's already an entry with the same projectName and pageLabel
    const existingEntry = result?.find(
      (entry: any) =>
        // entry.projectName === projectName && entry.pageLabel === pageLabel
        entry.file?.name === file?.name
    );

    if (existingEntry) {
      existingEntry?.children?.push({
        id,
        name,
        bucketUrl,
        file,
        page,
        status,
        width,
        height,
        src,
        pageId,
        pageNumber
      });
    } else {
      result.push({
        key: result?.length + 1, // Assuming keys start from 1
        id,
        name: file?.name,
        isParent: true,
        bucketUrl,
        file,
        page,
        status,
        children: [
          {
            id,
            name,
            bucketUrl,
            file,
            page,
            status,
            width,
            height,
            src,
            pageId,
            pageNumber
          },
        ],
      });
    }

    return result;
  }, []);

  return groupedData;
};

const getSingleMeasurements = (draw: any, pageId: any) => {
  let singleArr: any = [];
  // let returningArr: any = [];
  if (Object?.keys(draw)?.length > 0) {
    Object.keys(draw)?.map((key: string) => {
      if (Array.isArray(draw[`${key}`]) && draw[`${key}`]?.length > 0) {
        singleArr = [...singleArr, ...draw[`${key}`].map((i: any) => ({ ...i, type: key, pageId }))]
      }
      return "";
    })
    console.log(singleArr, pageId, " =====> measurementsTableData measurementsTableData")
    // if (singleArr?.length > 0) {
    //   //Reduce code for category
    //   returningArr = singleArr?.reduce((result: any, currentItem: any) => {
    //     const { category, subcategory, dateTime, points, projectName, stroke, strokeWidth, textUnit, id, lineCap, depth, x, y, user, type } = currentItem
    //     // Check if there's already an entry with the same projectName and pageLabel
    //     const existingEntry = result?.find((entry: any) => entry.category === category);
    //     if (existingEntry) { existingEntry?.children?.push({ category, subcategory, dateTime, points, projectName, stroke, strokeWidth, textUnit, id, lineCap, depth, x, y, user, isParent: false, pageId, type }) }
    //     else {
    //       result?.push({
    //         isParent: true, category, subcategory, dateTime, points, projectName, stroke, strokeWidth, textUnit, id, lineCap, depth, x, y, user, pageId, type,
    //         children: [{ isParent: false, category, subcategory, dateTime, points, projectName, stroke, strokeWidth, textUnit, id, lineCap, depth, x, y, pageId, type, user }]
    //       })
    //     }
    //     return result
    //   }, [])
    // }
  }
  return singleArr
}
const measurementsTableData1 = (takeOff: any, search?: string) => {
  let returningArr: any = [];
  if (takeOff?.measurements && Object.keys(takeOff?.measurements) && Object.keys(takeOff?.measurements)?.length > 0) {
    Object.keys(takeOff?.measurements)?.map((key: any, ind: any) => {
      console.log(ind, takeOff?.measurements[key], " =====> measurementsTableData measurementsTableData gotArr")
      if (takeOff?.measurements[`${key}`]) {
        const gotArr = getSingleMeasurements(takeOff?.measurements[`${key}`], key)
        console.log(gotArr, takeOff?.measurements[`${key}`], " =====> measurementsTableData measurementsTableData gotArr")
        if (Array.isArray(gotArr)) {
          returningArr = [...returningArr, ...gotArr]
        }
      }
      return ""
    })
  }
  if (search && search?.length > 0) {
    returningArr = returningArr?.filter((i: any) => { return (i?.projectName?.toLocaleLowerCase()?.includes(search?.toLocaleLowerCase()) || i?.category?.toLocaleLowerCase()?.includes(search?.toLocaleLowerCase()) || i?.subcategory?.toLocaleLowerCase()?.includes(search?.toLocaleLowerCase())) })
  }
  console.log(returningArr, " =====> measurementsTableData measurementsTableData")
  if (returningArr?.length > 0) {
    //Reduce code for category
    returningArr = returningArr?.reduce((result: any, currentItem: any) => {
      const { category, subcategory, dateTime, points, projectName, stroke, strokeWidth, textUnit, id, lineCap, depth, x, y, user, type, pageId, text } = currentItem
      // Check if there's already an entry with the same projectName and pageLabel
      const existingEntry = result?.find((entry: any) => entry.category === category);
      if (existingEntry) { existingEntry?.children?.push({ key: dateTime, category, subcategory, dateTime, points, projectName, stroke, strokeWidth, textUnit, id, lineCap, depth, x, y, user, isParent: false, type, pageId, text }) }
      else {
        result?.push({
          key: dateTime, isParent: true, category, subcategory, dateTime, points, projectName, stroke, strokeWidth, textUnit, id, lineCap, depth, x, y, user, type, pageId, text,
          children: [{ key: dateTime, isParent: false, category, subcategory, dateTime, points, projectName, stroke, strokeWidth, textUnit, id, lineCap, depth, x, y, user, type, pageId, text }]
        })
      }
      return result
    }, [])
  }
  return returningArr
}
const measurementsTableData = (takeOff: any, search?: string) => {
  let returningArr: any = [];
  if (takeOff?.measurements && Object.keys(takeOff?.measurements) && Object.keys(takeOff?.measurements)?.length > 0) {
    Object.keys(takeOff?.measurements)?.map((key: any, ind: any) => {
      console.log(ind, takeOff?.measurements[key], " =====> measurementsTableData measurementsTableData gotArr")
      if (takeOff?.measurements[`${key}`]) {
        const gotArr = getSingleMeasurements(takeOff?.measurements[`${key}`], key)
        console.log(gotArr, takeOff?.measurements[`${key}`], " =====> measurementsTableData measurementsTableData gotArr")
        if (Array.isArray(gotArr)) {
          returningArr = [...returningArr, ...gotArr]
        }
      }
      return ""
    })
  }
  if (search && search?.length > 0) {
    returningArr = returningArr?.filter((i: any) => { return (i?.projectName?.toLocaleLowerCase()?.includes(search?.toLocaleLowerCase()) || i?.category?.toLocaleLowerCase()?.includes(search?.toLocaleLowerCase()) || i?.subcategory?.toLocaleLowerCase()?.includes(search?.toLocaleLowerCase())) })
  }
  console.log(returningArr, " =====> measurementsTableData measurementsTableData")
  if (returningArr?.length > 0) {
    //Reduce code for category
    returningArr = returningArr?.reduce((result: any, currentItem: any) => {
      const { category, subcategory, dateTime, points, projectName, stroke, strokeWidth, textUnit, id, lineCap, depth, x, y, user, type, pageId, text } = currentItem
      // Check if there's already an entry with the same projectName and pageLabel
      const existingEntry = result?.find((entry: any) => entry.category === category);
      if (existingEntry) {
        const existingEntrySubCategory = existingEntry?.children?.find((entry: any) => entry?.subcategory === subcategory);
        const existingEntrySubCategoryIndex = existingEntry?.children?.findIndex((entry: any) => entry?.subcategory === subcategory);
        if (existingEntrySubCategory && subcategory && existingEntrySubCategoryIndex != -1) {
          existingEntrySubCategory['isSubParent'] = true
          if (Array.isArray(existingEntry?.children[existingEntrySubCategoryIndex]?.children)) {
            existingEntry?.children[existingEntrySubCategoryIndex]?.children?.push({ key: dateTime, isChild: true, category, subcategory, dateTime, points, projectName, stroke, strokeWidth, textUnit, id, lineCap, depth, x, y, user, isParent: false, type, pageId, text })
          } else {
            existingEntry.children[existingEntrySubCategoryIndex].children = [{ key: dateTime, isChild: true, category, subcategory, dateTime, points, projectName, stroke, strokeWidth, textUnit, id, lineCap, depth, x, y, user, isParent: false, type, pageId, text }]
          }
          console.log(returningArr, subcategory, result, " =====> measurementsTableData measurementsTableData the final obj given code runs here")
        } else {
          existingEntry?.children?.push(
            subcategory ?
              {
                key: dateTime, isSubParent: true, isParent: false, category, subcategory, dateTime, points, projectName, stroke, strokeWidth, textUnit, id, lineCap, depth, x, y, user, type, pageId, text,
                children: [{ key: dateTime, isParent: false, isChild: true, category, subcategory, dateTime, points, projectName, stroke, strokeWidth, textUnit, id, lineCap, depth, x, y, user, type, pageId, text }]
              }
              :
              { key: dateTime, category, subcategory, dateTime, points, projectName, stroke, strokeWidth, textUnit, id, lineCap, depth, x, y, user, isParent: false, type, pageId, text })
        }
      }
      else {
        result?.push({
          key: dateTime, isParent: true, category, subcategory, dateTime, points, projectName, stroke, strokeWidth, textUnit, id, lineCap, depth, x, y, user, type, pageId, text,
          children: subcategory ?
            [{
              key: dateTime, isSubParent: true, isParent: false, category, subcategory, dateTime, points, projectName, stroke, strokeWidth, textUnit, id, lineCap, depth, x, y, user, type, pageId, text,
              children: [{ key: dateTime, isParent: false, isChild: true, category, subcategory, dateTime, points, projectName, stroke, strokeWidth, textUnit, id, lineCap, depth, x, y, user, type, pageId, text }]
            }]
            :
            [{ key: dateTime, isParent: false, category, subcategory, dateTime, points, projectName, stroke, strokeWidth, textUnit, id, lineCap, depth, x, y, user, type, pageId, text }]
        })
      }
      return result
    }, [])
  }
  console.log(returningArr, " =====> measurementsTableData measurementsTableData the final obj1")
  return returningArr
}

// const { DirectoryTree, TreeNode } = Tree;
////////////////////////New Take OffData///////////////////////////////////

export interface ScaleData {
  xScale: string;
  yScale: string;
  precision: string;
}

export interface PageScale {
  [pageNumber: string]: ScaleData;
}

const TakeOffNewPage = () => {

  /////////////New TakeOff Files Sates, methods and data///////////////////////

  const pdfjs = useCallback(async () => {
    const pdfjs = await import('pdfjs-dist');
    await import('pdfjs-dist/build/pdf.worker.min.mjs');

    return pdfjs;
  }, []);

  const [selectedFiles, setselectedFiles] = useState<any>([])
  const [progressModalOpen, setprogressModalOpen] = useState(false)
  const [fullData, setfullData] = useState({
    files: [],
    pages: [],
  })
  const [allPages] = useState<any>([])
  const [isApiCalling, setisApiCalling] = useState(false)
  const [isLoading, setisLoading] = useState<boolean>(false)

  const handleUpdatePages = (pageIndex: any, s3Url: any, fileIndex: any, success: any, width: any, height: any, fileId: any, ar: any) => {
    setfullData((ps: any) => ({ ...ps, pages: [...ps.pages, { pageNum: pageIndex + 1, pageId: `${new Date().getTime()}`, fileId: fileId, width, height, name: `${pageIndex + 1} page`, src: s3Url, success: success, file: { name: ar[fileIndex]?.name ?? fileIndex, index: fileIndex } }] }))
  }

  const processSinglePage = async (pageIndex: any, pdf: PDFDocumentProxy, fileIndex: any, fileId: any, ar: any) => {
    try {
      const page: PDFPageProxy = await pdf.getPage(pageIndex + 1);
      console.log(page, typeof (page), " ===> pages while uplaoding")
      const scale = 1;
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const renderContext: any = {
        canvasContext: context,
        viewport: viewport,
      };
      await page.render(renderContext).promise;
      const obj = {
        src: canvas.toDataURL('image/png') || '',
        height: viewport.height,
        width: viewport.width,
      }
      const s3Url = await new AwsS3(obj.src, 'documents/takeoff-reports/').uploadS3URL()
      handleUpdatePages(pageIndex, s3Url, fileIndex, true, viewport?.width, viewport?.height, fileId, ar)
      page.cleanup()
    } catch (error) {
      console.log(error, " ===> Error insdie process single page");
      handleUpdatePages(pageIndex, "", fileIndex, false, 0, 0, fileId, ar)
    }
  }
  const processSingleFile = async (i: any, ar: any) => {
    try {
      const curFile = ar[i]
      const fileId = `${new Date()?.getTime()}`
      console.log(curFile, " ===> Current File Running");
      if (curFile) {
        const PDFJS = await pdfjs();
        // const pdfPagesData: UploadFileData[] = [];
        const reader = new FileReader();
        reader.onload = async (event: any) => {
          const data = new Uint8Array(event.target.result);
          const pdf: PDFDocumentProxy = await PDFJS.getDocument(data).promise;
          setfullData((ps: any) => ({ ...ps, files: [...ps.files, { name: curFile?.name ?? i, fileId, index: i, totalPages: pdf?.numPages ?? 5 }] }))
          for (let index = 0; index < pdf.numPages; index++) {
            await processSinglePage(index, pdf, i, fileId, ar)
          }
        }
        reader.readAsArrayBuffer(curFile);
      }
    } catch (error) {
      console.log(error, " Error while processing single file.");
    }
  }
  const startProcess = async (ar: any) => {
    setisLoading(true)
    if (Array.isArray(ar) && ar?.length > 0) {
      try {
        for (let i = 0; i < ar?.length; i++) {
          await processSingleFile(i, ar)
        }
        // setisLoading(false)
      } catch (error) {
        console.log(error, " Error startProcess");
        setisLoading(false)
      }
    }
  }


  const makeApiCall = async () => {
    try {
      setisApiCalling(true)
      setisLoading(true)
      const newupdatedMeasurements: any = await takeoffSummaryService.httpUpdateTakeoffSummary({
        id: takeOff?._id,
        //@ts-ignore
        data: { pages: [...(Array.isArray(takeOff?.pages) ? takeOff.pages : []), ...(Array.isArray(fullData?.pages) ? fullData.pages : [])], files: [...(Array.isArray(takeOff?.files) ? takeOff.files : []), ...(Array.isArray(fullData?.files) ? fullData.files : [])] }
      })
      console.log(newupdatedMeasurements, " ==> newupdatedMeasurements")
      settakeOff(newupdatedMeasurements?.data)
      setisApiCalling(false)
      setfullData({
        files: [],
        pages: [],
      })
      setselectedFiles([])
      setprogressModalOpen(false)
      toast.success('Added Successfully!')
    } catch (error) {
      setisApiCalling(false)
      console.log(error, " ===> Error while making api call")
      setisLoading(false)
    }
  }

  const addFileToWorkspace = () => {
    if (Array.isArray(fullData?.pages) && fullData?.pages?.length > 0) {
      if (fullData?.files?.every((i: any) => {
        return i?.totalPages == fullData?.pages?.filter((pg: any) => (i?.fileId == pg?.fileId))?.length
      })) {
        // setisLoading(false)
        //   setshouldContinue(true)
        // toast.success('Ready to go.')
        makeApiCall()
      } else {
        toast.error(`Please wait until loading files.`)
      }
    } else {
      toast.error(`Please select atleast one file to continue.`)
    }
  }
  /////////////New TakeOff States///////////////////////

  /////////////New TakeOff States///////////////////////
  // const [draw, setDraw] = useState<DrawInterface | any>({
  //   line: [],
  //   area: [],
  //   volume: [],
  //   count: [],
  //   dynamic: [],
  //   scale: [],
  //   perimeter: []
  // });
  const [draw, setDraw] = useState<any>({});
  const [takeOff, settakeOff] = useState<any>({})
  // const [pdMeasurements, setpdMeasurements] = useState(null)
  const [selectedTakeOffTab, setselectedTakeOffTab] = useState<'overview' | 'page' | 'file'>('overview')
  const [selectedPage, setselectedPage] = useState<any>({})
  const [selectedPagesList, setselectedPagesList] = useState([])
  /////////////New TakeOff States///////////////////////
  const [leftOpened, setleftOpened] = useState<boolean>(true)
  const urlSearch: any = new URLSearchParams(window.location.search)
  console.log(window.location, urlSearch, urlSearch.get('edit_id'), " Edit Data Edit Data");
  const router = useRouter();
  const params = useSearchParams()
  const edit_id = params.get('edit_id')
  ////categories
  // const [allCategories, setallCategories] = useState<any>([])
  // const [selectedCategory, setselectedCategory] = useState<any>("")
  // const [inputtxt, setinputtxt] = useState<any>("")
  ////
  const [tool, setTool] = useState<ScaleInterface>({ selected: 'scale' });
  const [countType, setcountType] = useState<string>("")
  useEffect(() => { if (tool.selected != 'count') { setcountType('') } }, [tool])
  const [showModal, setShowModal] = useState(false);
  const [border, setBorder] = useState<number>(4);
  const [color, setColor] = useState<string>('#1677ff');
  const [unit, setUnit] = useState<number>(14);
  const [depth, setDepth] = useState<number>(0);
  const [drawScale, setdrawScale] = useState<boolean>(false)
  const [scaleLine, setscaleLine] = useState<any>({})
  const [sideTabs, setsideTabs] = useState<"Plans" | "TakeOff" | "WBS">("Plans")
  const [measurements, setMeasurements] =
    useState<Measurements>(defaultMeasurements);

  console.log(measurements, " measurements changed")
  console.log(groupDataForFileTable(takeOff?.pages), takeOff?.pages, " ===> New Data to map")
  useEffect(() => {
    if (takeOff?.measurements) {
      console.log(measurementsTableData(takeOff), " =====> measurementsTableData measurementsTableData")
    }
  }, [takeOff])

  const [tableLoading, settableLoading] = useState<any>(false)
  const updateTableChangeInTakeOff = async (pageId: string, type: any, dateTime: any, keyToUpdate: string, valueToUpdate: any) => {
    console.log(pageId, type, dateTime, keyToUpdate, valueToUpdate, 'Update Run')
    if (pageId && type && dateTime && keyToUpdate && valueToUpdate) {
      try {
        let tempTakeOff = takeOff
        let slpg = tempTakeOff?.measurements[pageId]
        if (slpg) {
          settableLoading(true)
          slpg = {
            ...slpg,
            [type]: slpg[type]?.map((it: any) => {
              if (new Date(it.dateTime).valueOf() === new Date(dateTime).valueOf()) {
                return { ...it, [keyToUpdate]: valueToUpdate }
              } else {
                return it
              }
            })
          }
          tempTakeOff.measurements[pageId] = slpg
          // console.log(tempTakeOff)
          const newupdatedMeasurements: any = await takeoffSummaryService.httpUpdateTakeoffSummary({
            id: takeOff?._id,
            //@ts-ignore
            data: { measurements: tempTakeOff.measurements }
          })
          console.log(newupdatedMeasurements, " ==> newupdatedMeasurements")
          settakeOff(newupdatedMeasurements?.data)
          settableLoading(false)
          setDraw(newupdatedMeasurements?.data?.measurements[`${selectedPage?.pageId}`])
        }
      } catch (error) {
        settableLoading(false)
        console.log(error, " ===> Error while updating table data")
      }
    }
  }

  const deleteTableChangeInTakeOff = async (pageId: string, type: any, dateTime: any) => {
    // console.log(pageId, type, dateTime, keyToUpdate, valueToUpdate,'delete Run')
    if (pageId && type && dateTime) {
      try {
        let tempTakeOff = takeOff
        let slpg = tempTakeOff?.measurements[pageId]
        if (slpg) {
          settableLoading(true)
          slpg = {
            ...slpg,
            // [type]: slpg[type]?.map((it: any) => {
            //   if (new Date(it.dateTime).valueOf() === new Date(dateTime).valueOf()) {
            //     return { ...it, [keyToUpdate]: valueToUpdate };
            //   } else {
            //     return it
            //   };
            // })
            [type]: slpg[type]?.filter((it: any) => {
              return new Date(it.dateTime).valueOf() != new Date(dateTime).valueOf()
              // if (new Date(it.dateTime).valueOf() === new Date(dateTime).valueOf()) {
              //   return { ...it, [keyToUpdate]: valueToUpdate };
              // } else {
              //   return it
              // };
            })
          }
          tempTakeOff.measurements[pageId] = slpg
          // console.log(tempTakeOff)
          const newupdatedMeasurements: any = await takeoffSummaryService.httpUpdateTakeoffSummary({
            id: takeOff?._id,
            //@ts-ignore
            data: { measurements: tempTakeOff.measurements }
          })
          console.log(newupdatedMeasurements, " ==> newupdatedMeasurements")
          settakeOff(newupdatedMeasurements?.data)
          settableLoading(false)
          setDraw(newupdatedMeasurements?.data?.measurements[`${selectedPage?.pageId}`])
        }
      } catch (error) {
        settableLoading(false)
        console.log(error, " ===> Error while updating table data")
      }
    }
  }
  const handleMenuClick = async (key: any, item: any, newName: string = '', comment?: any) => {
    const takeOffTemp = takeOff
    const page = takeOffTemp?.pages?.find((i: any) => (i?.pageId == item?.pageId))
    const pageInd = takeOffTemp?.pages?.findIndex((i: any) => (i?.pageId == item?.pageId))
    console.log(item, key, page, pageInd, " ===> clicked dropdown item")
    let pages = takeOffTemp?.pages
    if (page) {
      if (key == 'duplicate') {
        const duplicatedPage = { ...page, pageId: `${new Date().getTime()}`, name: page?.name + " (COPY)" }
        pages?.splice(pageInd + 1, 0, duplicatedPage)
      } else if (key == 'delete') {
        pages = pages?.filter((i: any) => (i?.pageId != item?.pageId))
      } else if (key == 'rename') {
        pages = pages?.map((i: any) => {
          if (i?.pageId == item?.pageId) {
            return { ...i, name: newName }
          } else {
            return i
          }
        })
      } else if (key == 'comment') {
        pages = pages?.map((i: any) => {
          if (i?.pageId == item?.pageId) {
            return { ...i, comments: [...((item?.comments && Array.isArray(item?.comments)) ? item?.comments : []), comment] }
          } else {
            return i
          }
        })
      }
      try {
        settableLoading(true)
        const newupdatedMeasurements: any = await takeoffSummaryService.httpUpdateTakeoffSummary({
          id: takeOff?._id,
          //@ts-ignore
          data: { pages }
        })
        console.log(newupdatedMeasurements, " ==> newupdatedMeasurements")
        settakeOff(newupdatedMeasurements?.data)
        settableLoading(false)
      } catch (error) {
        settableLoading(false)
        console.log(error, " ===> Error while updatind")
      }
    }
  }

  const menu = (item: any) => (
    <Menu
      onClick={({ key }) => handleMenuClick(key, item)}
      items={[
        {
          label: 'Duplicate',
          key: 'duplicate',
          icon: <CopyOutlined />,
        },
        {
          label: 'Delete',
          key: 'delete',
          icon: <DeleteOutlined />,
          danger: true,
        },
      ]}
    />
  );

  const plansColumn: ColumnsType<any> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div onClick={() => {
          if (!record?.isParent) {
            console.log(record, "selected thing"); setselectedPage(record); setselectedTakeOffTab('page');
            if (!selectedPagesList?.find((i: any) => (i?.pageId == record?.pageId))) {
              //@ts-ignore
              setselectedPagesList((ps: any) => ([...ps, record]))
            }
          }
        }}
          className="flex items-center h-full cursor-pointer justify-between">
          <div>
            {record?.isParent == true ? <FolderOutlined className="mr-2" /> : <FileOutlined className="mr-2" />}
            {record?.isParent == true ? text : <EditableText className={'inline-block'} initialText={text} smallText={text?.slice(0, 30)} toolTip={"double click to rename."} onPressEnter={(value) => { handleMenuClick('rename', record, value) }} />}
          </div>
          {record?.isParent != true && <Dropdown overlay={menu(record)} trigger={['click']}>
            <MoreOutlined onClick={(e) => { e.stopPropagation() }} className='cursor-pointer text-[20px]' />
          </Dropdown>}
        </div>
      ),
    },
  ];

  const categoryColumns: ColumnsType<any> = [
    {
      title: 'Name',
      dataIndex: 'category',
      width: 150,
      className: '!pr-0',
      render: (text, record) => (
        <div
          className="flex items-center h-full cursor-pointer">
          {record?.isParent ? <span className='font-extrabold'>{text}
            {
              selectedCate == text ? <MinusOutlined className='border-2 rounded-full ml-2' onClick={() => { setselectedCate(null); setselectedSubCate(null) }} /> : <PlusOutlined className='border-2 rounded-full ml-2' onClick={() => { setselectedCate(text); }} />
            }
            {/* <Checkbox checked={selectedCate == text} onChange={(e) => {
            if (e.target.checked) { setselectedCate(text); }
            else { setselectedCate(null); setselectedSubCate(null) }
          }} /> */}
          </span> : record?.isSubParent ? <span className='font-extrabold'>{record?.subcategory}
            {
              selectedSubCate == record?.subcategory ? <MinusOutlined className='border-2 rounded-full ml-2' onClick={() => { setselectedCate(null); setselectedSubCate(null) }} /> : <PlusOutlined className='border-2 rounded-full ml-2' onClick={() => { setselectedCate(text); setselectedSubCate(record?.subcategory); }} />
            }
            {/* <Checkbox checked={selectedSubCate == record?.subcategory} onChange={(e) => {
            if (e.target.checked) { setselectedCate(text); setselectedSubCate(record?.subcategory) }
            else { setselectedCate(null); setselectedSubCate(null) }
          }} /> */}
          </span> : <span className='flex items-center gap-1'><EditableText initialText={record?.projectName} smallText={record?.projectName?.slice(0, 10) + "..."} onPressEnter={(value) => { updateTableChangeInTakeOff(record?.pageId, record?.type, record?.dateTime, 'projectName', value) }} toolTip={takeOff?.pages?.find((pg: any) => (pg?.pageId == record?.pageId))?.name + `(${takeOff?.pages?.find((pg: any) => (pg?.pageId == record?.pageId))?.file?.name})`} /></span>}
        </div>
      ),
    },
    // {
    //   title: 'Category',
    //   dataIndex: 'category',
    //   width: 150,
    //   className: '!pr-0',
    //   render: (text, record) => (
    //     <div
    //       className="flex items-center h-full cursor-pointer">
    //       {(record?.isParent || record?.isSubParent) ? <></> : <span className='flex items-center gap-1'><EditableText initialText={text} smallText={text?.slice(0, 15) + "..."} onPressEnter={(value) => { updateTableChangeInTakeOff(record?.pageId, record?.type, record?.dateTime, 'category', value) }} toolTip={takeOff?.pages?.find((pg: any) => (pg?.pageId == record?.pageId))?.name + `(${takeOff?.pages?.find((pg: any) => (pg?.pageId == record?.pageId))?.file?.name})`} /></span>}
    //     </div>
    //   ),
    // },
    // {
    //   title: 'SubCategory',
    //   dataIndex: 'subcategory',
    //   width: 150,
    //   className: '!pr-0',
    //   render: (text, record) => (
    //     <div
    //       className="flex items-center h-full cursor-pointer">
    //       {(record?.isParent || record?.isSubParent) ? <></> : <span className='flex items-center gap-1'><EditableText initialText={text} smallText={text?.slice(0, 15) + "..."} onPressEnter={(value) => { updateTableChangeInTakeOff(record?.pageId, record?.type, record?.dateTime, 'subcategory', value) }} toolTip={takeOff?.pages?.find((pg: any) => (pg?.pageId == record?.pageId))?.name + `(${takeOff?.pages?.find((pg: any) => (pg?.pageId == record?.pageId))?.file?.name})`} /></span>}
    //     </div>
    //   ),
    // },
    {
      title: 'ID',
      dataIndex: 'subcategory',
      width: 150,
      className: '!pr-0',
      render: (text, record) => (
        <div
          className="flex items-center h-full cursor-pointer">
          {(record?.isParent || record?.isSubParent) ? <></> : <span className='flex items-center gap-1'>{`${new Date(record?.dateTime)?.getTime()}`?.slice(-6)}</span>}
        </div>
      ),
    },
    {
      title: '',
      dataIndex: 'category',
      // key: 'category',
      width: 70,
      render: (text, record) => (
        <div
          className="flex items-center h-full cursor-pointer">
          {(record?.isParent || record?.isSubParent) ? <></> : <span className='flex items-center gap-1'>
            <Menu items={[
              {
                key: 'category', icon: <EditOutlined className='text-lavenderPurpleReplica bg-lavenderPurpleReplica bg-opacity-15 rounded-full p-1' />,
                children: [
                  { key: 'category', label: 'category', children: [...categoryList.map((i: any) => ({ key: i, label: i, onClick: () => { updateTableChangeInTakeOff(record?.pageId, record?.type, record?.dateTime, 'category', i) } }))] },
                  { key: 'sub-category', label: 'sub-category', children: [...subcategoryList.map((i: any) => ({ key: i, label: i, onClick: () => { updateTableChangeInTakeOff(record?.pageId, record?.type, record?.dateTime, 'subcategory', i) } }))] },
                ]
              },
            ]} />

            <DeleteOutlined className='text-lavenderPurpleReplica bg-lavenderPurpleReplica bg-opacity-15 rounded-full p-1' onClick={() => { deleteTableChangeInTakeOff(record?.pageId, record?.type, record?.dateTime) }} />
          </span>}
        </div>
      ),
    },
  ];

  const measurementsColumn: ColumnsType<any> = [
    {
      title: 'Name',
      dataIndex: 'category',
      key: 'category',
      width: 200,
      className: '!pr-0',
      render: (text, record) => (
        <div
          className="flex items-center h-full cursor-pointer">
          {record?.isParent ? text : <span
            className='flex items-center gap-1'
            onClick={() => {
              const pg = takeOff?.pages?.find((pgs: any) => (pgs?.pageId == record?.pageId))
              if (pg) {
                setselectedPage(pg);
                setselectedTakeOffTab('page');
                if (!selectedPagesList?.find((i: any) => (i?.pageId == pg?.pageId))) {
                  //@ts-ignore
                  setselectedPagesList((ps: any) => ([...ps, pg]))
                }
              }
            }}
          ><ColorPicker onChangeComplete={(val) => { updateTableChangeInTakeOff(record?.pageId, record?.type, record?.dateTime, 'stroke', val.toHexString()) }} className='!w-[2px] !h-[2px] border-none' value={record?.stroke} /> <EditableText initialText={record?.projectName} smallText={record?.projectName?.slice(0, 12) + "..."} onPressEnter={(value) => { updateTableChangeInTakeOff(record?.pageId, record?.type, record?.dateTime, 'projectName', value) }} toolTip={takeOff?.pages?.find((pg: any) => (pg?.pageId == record?.pageId))?.name + `(${takeOff?.pages?.find((pg: any) => (pg?.pageId == record?.pageId))?.file?.name})`} /></span>}
        </div>
      ),
    },
    {
      title: 'Sheet Number',
      dataIndex: 'pageLabel',
      width: 70,
      className: '!pr-0',
      render: (text, record) => (
        <div
          className="flex items-center h-full cursor-pointer">
          {record?.isParent ? <></> : <span className='flex items-center gap-1'>{takeOff?.pages?.find((pp: any) => pp?.pageId == record?.pageId)?.pageNum ?? ''}</span>}
        </div>
      ),
    },
    {
      title: 'Measurement',
      dataIndex: 'text',
      width: 120,
      className: '!pr-0',
      render: (text, record) => (
        <div
          className="flex items-center h-full cursor-pointer">
          {record?.isParent ? <></> : <span className=''>{text ?? record?.text ?? ''}</span>}
        </div>
      ),
    },
    {
      title: 'Author',
      dataIndex: 'category',
      width: 200,
      className: '!pr-0',
      render: (text, record) => (
        <div
          className="flex items-center h-full cursor-pointer">
          {record?.isParent ? <></> : <span className='flex items-center gap-1'>{<Avatar icon={<UserOutlined />} />}<span data-tooltip={`${record?.user?.firstName ?? record?.user?.email}`} >{(record?.user?.firstName ?? record?.user?.email ?? '')?.slice(0, 17) + "..."}</span></span>}
        </div>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'category',
      width: 100,
      className: '!pr-0',
      render: (text, record) => (
        <div
          className="flex items-center h-full cursor-pointer">
          {record?.isParent ? <></> : <span className='flex items-center gap-1'>{new Date(record?.dateTime)?.toLocaleDateString()}</span>}
        </div>
      ),
    },
    {
      title: '',
      dataIndex: '',
      width: 50,
      // key: 'category',
      render: (text, record) => (
        // <div
        //   className="flex items-center h-full cursor-pointer">
        //   {record?.isParent ? <></> : <span className='flex items-center gap-1'><MoreOutlined /></span>}
        // </div>
        <div
          className="flex items-center h-full cursor-pointer">
          {record?.isParent ? <></> : <span className='flex items-center gap-1'><DeleteOutlined className='text-lavenderPurpleReplica bg-lavenderPurpleReplica bg-opacity-15 rounded-full p-1' onClick={() => { deleteTableChangeInTakeOff(record?.pageId, record?.type, record?.dateTime) }} /></span>}
        </div>
      ),
    },
  ];


  const { scaleData, handleScaleData } = useContext(
    ScaleContext
  ) as ScaleDataContextProps;
  const { uploadFileData } = useContext(
    UploadFileContext
  ) as UploadFileContextProps;

  // const { reportData } = useContext(
  //   ReportDataContext
  // ) as ReportDataContextProps;
  const { editData } = useContext(EditContext)

  const getTakeOffDetails = async (id: string) => {
    try {
      const data = await takeoffSummaryService.httpGetSignleTakeOffSummary(id)
      console.log(data, " ===> Data coming for single record of summaruy")
      settakeOff(data?.data)
    } catch (error) {
      console.log(error, "error");
      router.push('/take-off')
    }
  }


  useEffect(() => {
    if (edit_id && edit_id?.length > 0) {
      getTakeOffDetails(edit_id)
    } else {
      router.push('/take-off')
    }
  }, [edit_id])



  useEffect(() => {
    const newData: any = {};
    for (let i = 1; i <= uploadFileData.length; i++) {
      newData[i] = {
        xScale: `1in=1in`,
        yScale: `1in=1in`,
        precision: '1',
      };
    }
    handleScaleData(newData);
  }, []);
  useEffect(() => { console.log(measurements, " ===> measurements") }, [measurements])
  // const hadleNewDrawing = () => {
  //   try {

  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const file = {
    src: "https://schesti-dev.s3.eu-north-1.amazonaws.com/2024/documents/takeoff-reports/4264282fef9d5a5191b025fd29daeb59",
    height: 842.04,
    width: 595.56
  }

  const updateMeasurements = async (newMeasurements: any) => {
    try {
      let updatedMeasurmentsR: any = takeOff?.measurements ? { ...takeOff?.measurements } : {};
      updatedMeasurmentsR[`${selectedPage?.pageId}`] = newMeasurements
      const newupdatedMeasurements: any = await takeoffSummaryService.httpUpdateTakeoffSummary({
        id: takeOff?._id,
        //@ts-ignore
        data: { measurements: updatedMeasurmentsR }
      })
      console.log(newupdatedMeasurements, " ==> newupdatedMeasurements")
      settakeOff(newupdatedMeasurements?.data)
      // if(selectedPage?.pageId){

      // }
    } catch (error) {
      console.log(error, " ===> Error Occured while measuring")
    }
  }

  useEffect(() => {
    console.log(draw, 'drawdrawdrawdrawdrawdrawdrawdrawdrawdraw')
    updateMeasurements(draw)
  }, [draw])

  useEffect(() => {
    if (selectedPage && takeOff?.measurements && takeOff?.measurements[`${selectedPage?.pageId}`]) {
      console.log(selectedPage, takeOff?.measurements[`${selectedPage?.pageId}`], selectedPage?.pageId, takeOff?.measurements, " ===> Selected Page in UseEffect")
      if (draw != takeOff?.measurements[`${selectedPage?.pageId}`]) {
        setDraw(takeOff?.measurements[`${selectedPage?.pageId}`])
      }
    } else {
      setDraw({})
    }
  }, [selectedPage])

  const [sideSearch, setsideSearch] = useState<string>("")
  const [tableColumns, settableColumns] = useState<any>([])
  const [tableData, settableData] = useState<any>([])
  const [scalUnits, setscalUnits] = useState<'feet' | 'meter'>('feet')

  // WBS States And Functions
  const [categoryList, setcategoryList] = useState<any>([])
  const [categoryText, setcategoryText] = useState<any>("")
  const [selectedCate, setselectedCate] = useState<any>(null)
  useEffect(() => { setisWBS(false) }, [sideTabs])

  const [subcategoryList, setsubcategoryList] = useState<any>([])
  const [subcategoryText, setsubcategoryText] = useState<any>("")
  const [selectedSubCate, setselectedSubCate] = useState<any>(null)

  const [isWBS, setisWBS] = useState<any>(false)
  // WBS States And Functions
  useEffect(() => {
    console.log(measurementsTableData(takeOff ?? {}), " ===> Data to view")
    if (sideTabs == 'Plans') {
      settableColumns(plansColumn)
      if (sideSearch && sideSearch?.length > 0) {
        groupDataForFileTable(takeOff?.pages?.filter((i: any) => (i?.name?.toLocaleLowerCase()?.includes(sideSearch?.toLocaleLowerCase()))))
      } else {
        settableData(groupDataForFileTable(takeOff?.pages))
      }
    } else if (sideTabs == 'TakeOff') {
      settableColumns(measurementsColumn)
      settableData(measurementsTableData1(takeOff ?? {}, sideSearch))
    } else if (sideTabs == 'WBS') {
      settableColumns(categoryColumns)
      settableData(measurementsTableData(takeOff ?? {}, sideSearch))
    }
  }, [sideTabs, takeOff, sideSearch, categoryList, subcategoryList, selectedCate, selectedSubCate])

  /////Image Loadings//////////////
  const [loadedImages, setLoadedImages] = useState<any>([]);

  const handleImageLoad = (index: any) => {
    setLoadedImages((prevLoadedImages: any) => [...prevLoadedImages, index]);
  };

  const isImgLoading = (index: any) => !loadedImages.includes(index);

  const [reportModal, setreportModal] = useState<boolean>(false)
  const {
    stageScale,
    stageX,
    stageY,
    handleWheel,
    handleZoomIn,
    handleZoomOut,
  } = useWheelZoom({
    compHeight: selectedPage.height || 600,
    compWidth: selectedPage.width || 600,
  })
  const [fillColor, setfillColor] = useState("rgba(255, 255, 0, 0.2)")
  const [textColor, settextColor] = useState("red")
  // const handleZoomIn = ()=>{}
  // const handleZoomOut = () => {}
  const handleRoomColorChange = (rgbaString: string) => {
    setfillColor(rgbaString)
  }



  const { user } = useSelector(selectUser)
  const handleAddComment = (comment: string) => {
    if (comment && selectedPage) {
      const cm = { comment, user }
      handleMenuClick('comment', selectedPage, '', cm)
      setselectedPage((ps: any) => ({ ...ps, comments: [...((ps?.comments && Array.isArray(ps?.comments)) ? ps?.comments : []), cm] }))
    }
  }

  //Download Markup functions
  const getPageData = () => {
    let reportData: any = [];
    if (takeOff?.measurements && Object.keys(takeOff?.measurements) && Object.keys(takeOff?.measurements)?.length > 0) {
      Object.keys(takeOff?.measurements)?.map((key: any) => {
        if (takeOff?.measurements[key] && Object.keys(takeOff?.measurements[key]) && Object.keys(takeOff?.measurements[key])?.length > 0) {
          Object.keys(takeOff?.measurements[key])?.map((type: any) => {
            reportData = [...reportData, ...((takeOff?.measurements[key][type] && Array.isArray(takeOff?.measurements[key][type]) && takeOff?.measurements[key][type]?.length > 0)
              ?
              takeOff.measurements[key][type].map((arrit: any) => {
                return {
                  ...arrit, pageId: key, type, pageData: takeOff?.pages?.find((pg: any) => (pg?.pageId == key)),
                  pageLabel: takeOff?.pages?.find((pg: any) => (pg?.pageId == key))?.pageNum, color: arrit?.stroke, config: arrit
                }
              })
              :
              [])]
          })
        }
      })
    }
    console.log(reportData, " ===> Take offs reportData")
    return reportData
  }
  //@ts-ignore
  const counterImage = new Image();
  counterImage.src = '/count-draw.png';
  const { calculateMidpoint, calculatePolygonCenter } = useDraw();
  // const captureShape = async (
  //   shape: any,
  //   background: HTMLImageElement,
  //   shapeType: string
  // ) => {
  //   // Create a temporary container for off-screen stage
  //   const container = document.createElement('div');
  //   container.style.display = 'none'; // Hide the container
  //   document.body.appendChild(container); // This is required for Konva.Stage initialization

  //   return new Promise<string | any>((resolve) => {
  //     // Initialize a temporary stage with the container
  //     const tempStage = new Konva.Stage({
  //       container: container,
  //       width: background.width,
  //       height: background.height,
  //     });

  //     const layer = new Konva.Layer();
  //     tempStage.add(layer);

  //     // Add the background image to the layer
  //     const bgImage = new Konva.Image({
  //       image: background,
  //       width: background.width,
  //       height: background.height,
  //     });
  //     layer.add(bgImage);

  //     let minX: number, minY: number, maxX: number, maxY: number;

  //     // Initialize variables to ensure they cover the shape with margins later
  //     minX = minY = Number.MAX_SAFE_INTEGER;
  //     maxX = maxY = 0;

  //     // Determine the type of shape and render accordingly
  //     switch (shapeType) {
  //       case 'count': {
  //         // Example for a circle shape
  //         const { x, y, radius = 20 } = shape;
  //         const circle = new Konva.Image({
  //           image: counterImage,
  //           width: 20,
  //           height: 20,
  //           x,
  //           y,
  //           radius,
  //         });
  //         layer.add(circle);

  //         // Adjust bounds for the circle, considering the radius and a margin
  //         minX = x - radius - 20;
  //         minY = y - radius - 20;
  //         maxX = x + radius + 20;
  //         maxY = y + radius + 20;
  //         break;
  //       }

  //       case 'line':
  //       case 'perimeter':
  //       case 'dynamic':
  //       case 'area':
  //       case 'volume':
  //         {
  //           // Example for a line or polygon shape
  //           const { points, stroke, strokeWidth, lineCap } = shape;
  //           const line = new Konva.Line({
  //             points,
  //             stroke,
  //             strokeWidth,
  //             lineCap,
  //             closed: shapeType === 'area' || shapeType === 'volume', // Close path for areas and volumes
  //             fill: shape?.fillColor
  //           });
  //           layer.add(line);
  //           console.warn(shape, 'sssss');
  //           let xText = 0,
  //             yText = 0;
  //           if (
  //             shapeType === 'area' ||
  //             shapeType === 'volume' ||
  //             shapeType === 'dynamic'
  //           ) {
  //             const { x, y } = calculatePolygonCenter(points);
  //             xText = x - 20;
  //             yText = y - 20;
  //           } else {
  //             const { x, y } = calculateMidpoint(points);
  //             xText = x - 20;
  //             yText = y - 20;
  //           }

  //           // Calculate bounds for lines and polygons, include margin
  //           const xs = points.filter((_: any, i: number) => i % 2 === 0);
  //           const ys = points.filter((_: any, i: number) => i % 2 !== 0);
  //           minX = Math.min(...xs) - 20;
  //           minY = Math.min(...ys) - 20;
  //           maxX = Math.max(...xs) + 20;
  //           maxY = Math.max(...ys) + 20;
  //           const textSize = ((maxX - minX) * (maxY - minY)) / 100000;

  //           console.warn(textSize);
  //           const text = new Konva.Text({
  //             x: xText,
  //             y: yText,
  //             text: shape.text,
  //             fontSize: Math.floor(textSize) * 10 + 25,
  //             fontFamily: 'Calibri',
  //             fill: shape?.textColor ?? 'red',
  //           });
  //           layer.add(text);
  //         }
  //         break;

  //       default:
  //         console.error('Unknown shape type:', shapeType);
  //         return;
  //     }

  //     layer.draw(); // Force drawing the layer to render shapes

  //     // Use toImage to capture the specified region
  //     tempStage.toImage({
  //       // x: minX,
  //       // y: minY,sss
  //       // width: maxX - minX,
  //       // height: maxY - minY,
  //       x: 0,
  //       y: 0,
  //       width: background.width,
  //       height: background.height,
  //       callback: (img) => {
  //         resolve(img)
  //         // Create a canvas to get the cropped image data
  //         // console.log(img, " ===> Image got from tempStage")
  //         // const canvas = document.createElement('canvas');
  //         // // canvas.width = maxX - minX;
  //         // // canvas.height = maxY - minY;
  //         // canvas.width = background.width;
  //         // canvas.height = background.height;
  //         // const ctx = canvas.getContext('2d');
  //         // if (ctx) {
  //         //   ctx.drawImage(img, 0, 0)//, canvas.width, canvas.height);
  //         //   const dataURL = canvas.toDataURL();
  //         //   resolve(dataURL); // Resolve the promise with the cropped image data URL
  //         // }
  //         // // Cleanup: remove the temporary container from the document
  //         // document.body.removeChild(container);
  //       },
  //     });
  //   });
  // };
  const captureShape = async (
    shapeArr: any[],
    background: HTMLImageElement,
    // shapeType: string
  ) => {
    // Create a temporary container for off-screen stage
    const container = document.createElement('div');
    container.style.display = 'none'; // Hide the container
    document.body.appendChild(container); // This is required for Konva.Stage initialization

    return new Promise<string | any>((resolve) => {
      // Initialize a temporary stage with the container
      const tempStage = new Konva.Stage({
        container: container,
        width: background.width,
        height: background.height,
      });

      const layer = new Konva.Layer();
      tempStage.add(layer);

      // Add the background image to the layer
      const bgImage = new Konva.Image({
        image: background,
        width: background.width,
        height: background.height,
      });
      layer.add(bgImage);

      let minX: number, minY: number, maxX: number, maxY: number;

      // Initialize variables to ensure they cover the shape with margins later
      minX = minY = Number.MAX_SAFE_INTEGER;
      maxX = maxY = 0;

      for (let i = 0; i < shapeArr?.length; i++) {
        const {type:shapeType,...shape} = shapeArr[i]
        // Determine the type of shape and render accordingly
        switch (shapeType) {
          case 'count': {
            // Example for a circle shape
            const { x, y, radius = 20 } = shape;
            const circle = new Konva.Image({
              image: counterImage,
              width: 20,
              height: 20,
              x,
              y,
              radius,
            });
            layer.add(circle);

            // Adjust bounds for the circle, considering the radius and a margin
            minX = x - radius - 20;
            minY = y - radius - 20;
            maxX = x + radius + 20;
            maxY = y + radius + 20;
            break;
          }

          case 'line':
          case 'perimeter':
          case 'dynamic':
          case 'area':
          case 'volume':
            {
              // Example for a line or polygon shape
              const { points, stroke, strokeWidth, lineCap } = shape;
              const line = new Konva.Line({
                points,
                stroke,
                strokeWidth,
                lineCap,
                closed: shapeType === 'area' || shapeType === 'volume', // Close path for areas and volumes
                fill: shape?.fillColor
              });
              layer.add(line);
              console.warn(shape, 'sssss');
              let xText = 0,
                yText = 0;
              if (
                shapeType === 'area' ||
                shapeType === 'volume' ||
                shapeType === 'dynamic'
              ) {
                const { x, y } = calculatePolygonCenter(points);
                xText = x - 20;
                yText = y - 20;
              } else {
                const { x, y } = calculateMidpoint(points);
                xText = x - 20;
                yText = y - 20;
              }

              // Calculate bounds for lines and polygons, include margin
              const xs = points.filter((_: any, i: number) => i % 2 === 0);
              const ys = points.filter((_: any, i: number) => i % 2 !== 0);
              minX = Math.min(...xs) - 20;
              minY = Math.min(...ys) - 20;
              maxX = Math.max(...xs) + 20;
              maxY = Math.max(...ys) + 20;
              const textSize = ((maxX - minX) * (maxY - minY)) / 100000;

              console.warn(textSize);
              const text = new Konva.Text({
                x: xText,
                y: yText,
                text: shape.text,
                fontSize: Math.floor(textSize) * 10 + 25,
                fontFamily: 'Calibri',
                fill: shape?.textColor ?? 'red',
              });
              layer.add(text);
            }
            break;

          default:
            console.error('Unknown shape type:', shapeType);
            return;
        }
      }


      layer.draw(); // Force drawing the layer to render shapes

      // Use toImage to capture the specified region
      tempStage.toImage({
        // x: minX,
        // y: minY,sss
        // width: maxX - minX,
        // height: maxY - minY,
        x: 0,
        y: 0,
        width: background.width,
        height: background.height,
        callback: (img) => {
          resolve(img)
          // Create a canvas to get the cropped image data
          // console.log(img, " ===> Image got from tempStage")
          // const canvas = document.createElement('canvas');
          // // canvas.width = maxX - minX;
          // // canvas.height = maxY - minY;
          // canvas.width = background.width;
          // canvas.height = background.height;
          // const ctx = canvas.getContext('2d');
          // if (ctx) {
          //   ctx.drawImage(img, 0, 0)//, canvas.width, canvas.height);
          //   const dataURL = canvas.toDataURL();
          //   resolve(dataURL); // Resolve the promise with the cropped image data URL
          // }
          // // Cleanup: remove the temporary container from the document
          // document.body.removeChild(container);
        },
      });
    });
  };
  const loadImage = (src: string) => {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      //@ts-ignore
      const img = new Image();
      img.crossOrigin = 'anonymous'
      img.src = `${src}?cacheBust=${new Date().getTime()}`;
      img.onload = () => resolve(img);
      img.onerror = (e: any) => { console.log(e, " ==> Page image loading of capture"); reject(e) };
    });
  };
  const imagesToPdf = (images: any) => {
    try {
      const pdf = new jsPDF();

      images.forEach((imgData: any, index: number) => {
        if (index !== 0) {
          pdf.addPage();
        }
        pdf.addImage(imgData.src, 'JPEG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
        // console.log(imgData?.width, imgData?.height, " ===> file page with its measurments final images error images to pdf function width height")
        // pdf.addImage(imgData?.src, 'JPEG', 0, 0, imgData?.width, imgData?.height);
      });

      pdf.save('output.pdf');
    } catch (error) {
      console.log(error, " ===> file page with its measurments final images error images to pdf function")
    }
  };
  const [markuploading, setmarkuploading] = useState(false)
  const downloadMarkup = async (file: any) => {
    if (!file?.fileId) return
    try {
      const allpgs = takeOff?.pages?.filter((i: any) => i?.fileId == file?.fileId)
      const arrMsr = getPageData() // converting measurements to array
      if (!Array.isArray(arrMsr) || !(arrMsr.length > 0)) {
        return
      }
      console.log(file, takeOff, allpgs, getPageData(), " ===> file")
      let imgArr: any[] = []
      if (allpgs && Array.isArray(allpgs) && allpgs?.length > 0) {
        setmarkuploading(true)
        await Promise.all(
          allpgs?.slice(0,6)?.map(async (it: any) => {
            const curPgMsr = arrMsr.filter((i: any) => (i?.pageId == it?.pageId))
            console.log(it, curPgMsr, " ===> file page with its measurments")
            const background = await loadImage(it?.src)
            if (curPgMsr && Array.isArray(curPgMsr) && curPgMsr?.length > 0) {
              const img = await captureShape([...curPgMsr?.map(i=>({...i?.config, text:i?.text, name:i?.projectName, type:i?.type}))], background)
              imgArr.push(img)
              // await Promise.all(
              //   curPgMsr.map(async (curMsr: any) => {
              //     try {
              //       const img = await captureShape({ ...curMsr.config, text: curMsr.text, name: curMsr.projectName }, background, curMsr?.type ?? 'line')
              //       console.log(img, " ===> file page with its measurments final images img ")
              //       imgArr.push({ src: img, width: background.width, height: background.height })
              //     } catch (error) {
              //       console.log(error, " ===> file page with its measurments final images error ")
              //     }
              //   })
              // )
            }else{
              imgArr?.push(background)
            }
          })
        )
        console.log(imgArr, " ===> file page with its measurments final images")
        imagesToPdf(imgArr)
        setmarkuploading(false)
      }
    } catch (error) {
      setmarkuploading(false)
      console.log(error)
    }
  }

  return (
    <>
      <section className="px-8 pb-4 mt-5">
        <div className='flex justify-between'>
          <h2>{takeOff?.name ?? ""}</h2>
          <CustomButton
            text="Generate Report"
            className="!w-auto shadow-md"
            // icon="plus.svg"
            iconwidth={20}
            iconheight={20}
            onClick={() => { setreportModal(true) }}
          // onClick={() => {
          //   //@ts-ignore
          //   (urlSearch && urlSearch.get('edit_id') && urlSearch.get('edit_id')?.length > 0) ? router.push(`/take-off/report?edit_id=${urlSearch.get('edit_id')}&scale=${JSON?.stringify(scaleData[1] ?? { xScale: `1in=1in`, yScale: `1in=1in`, precision: '1', })}`) : router.push('/take-off/report')
          // }}
          />
          <CustomButton
            text="Download Markup"
            className="!w-auto shadow-md"
            // icon="plus.svg"
            iconwidth={20}
            iconheight={20}
            isLoading={markuploading}
            onClick={() => { downloadMarkup((takeOff?.files && Array.isArray(takeOff?.files) && takeOff?.files?.length > 1) ? takeOff?.files[1] : {}) }}
          />
        </div>


        {/* grid place-items-center shadow-sceneryShadow  */}
        <div
          className={`flex gap-x-5 justify-between rounded-lg my-4 shadow-none ${bg_style} h-[800px] flex flex-wrap justify-between !bg-transparent`}
        >
          {/* Left Bar */}
          {leftOpened && <div className='w-[25%] h-[100%] rounded-2xl shadow-secondaryTwist border flex flex-col' >
            {/* sideBarHeader */}
            <div className='w-[full] h-[25%] border-b bg-gradient-to-r from-[#8449EB]/5 to-[#6A56F6]/5 flex flex-col p-3 bg-transparent rounded-t-2xl'>
              {/* upper */}
              <div className='h-[75%] flex flex-col justify-evenly'>
                <div className='flex gap-x-2'>
                  <Button onClick={() => { setsideTabs('Plans') }} className={sideTabs == 'Plans' ? 'bg-lavenderPurpleReplica text-white font-semibold' : ''} >Plans</Button>
                  <Button onClick={() => { setsideTabs('TakeOff') }} className={sideTabs == 'TakeOff' ? 'bg-lavenderPurpleReplica text-white font-semibold' : ''}>Takeoff</Button>
                  <Button onClick={() => { setsideTabs('WBS') }} className={sideTabs == 'WBS' ? 'bg-lavenderPurpleReplica text-white font-semibold' : ''}>WBS / Category</Button>
                </div>
                <div className='flex gap-x-2 w-[95%]'>
                  <Input className='grow' placeholder='Search' onChange={(e) => { setsideSearch(e.target.value) }} prefix={<SearchOutlined />} />
                  <Button onClick={() => { setselectedTakeOffTab('file') }} className='bg-lavenderPurpleReplica text-white font-semibold' icon={<CloudUploadOutlined className='text-[16px]' />} >Upload</Button>
                </div>
              </div>
              {/* lower */}
              <div className='h-[25%] flex justify-between gap-x-3 items-center'>
                <div className='grow flex gap-x-4 items-center' >
                  <MenuUnfoldOutlined className='text-lavenderPurpleReplica text-[20px]' />
                  <span className='font-inter font-[200] text-gray-800'>{sideTabs == 'Plans' ? 'Plan & Documents' : sideTabs == 'TakeOff' ? 'TakeOff' : sideTabs == 'WBS' ? 'WBS' : ''}</span>
                  {tableLoading && <Spin />}
                </div>
                {/* <MoreOutlined className='cursor-pointer text-[20px]' size={90} /> */}
                {sideTabs == 'WBS' && !isWBS && <Button onClick={() => { setisWBS(true) }} className='bg-white !px-2 border-lavenderPurpleReplica text-lavenderPurpleReplica font-semibold' icon={<PlusOutlined className='text-[16px]' />} >Add WBS</Button>}
                {sideTabs == 'WBS' && isWBS && <div className='flex flex-col gap-y-1'>
                  <Select
                    className='!w-52 !mb-1'
                    style={{ width: 300 }}
                    placeholder="Select Category"
                    onSelect={(value: any) => { if (selectedCate === value) { setselectedCate(null) } else { setselectedCate(value) } }}
                    value={selectedCate}
                    dropdownRender={(menu) => (
                      <>
                        {menu}
                        <Divider style={{ margin: '8px 0' }} />
                        <Space style={{ padding: '0 8px 4px' }}>
                          <Input
                            placeholder="Please enter item"
                            // ref={inputRef}
                            value={categoryText}
                            onChange={(e: any) => { setcategoryText(e?.target?.value) }}
                            onKeyDown={(e) => e.stopPropagation()}
                          />
                          <Button type="text" icon={<PlusOutlined />} onClick={() => { setcategoryList((ps: any) => ([...ps, categoryText])); setcategoryText('') }}>
                            Add
                          </Button>
                        </Space>
                      </>
                    )}
                    options={categoryList.map((item: any) => ({ label: item, value: item }))}
                  />
                  <Select
                    className='!w-52 !mb-1'
                    style={{ width: 300 }}
                    placeholder="Select SubCategory"
                    onSelect={(value: any) => { if (selectedSubCate === value) { setselectedSubCate(null) } else { setselectedSubCate(value) } }}
                    value={selectedSubCate}
                    dropdownRender={(menu) => (
                      <>
                        {menu}
                        <Divider style={{ margin: '8px 0' }} />
                        <Space style={{ padding: '0 8px 4px' }}>
                          <Input
                            placeholder="Please enter item"
                            // ref={inputRef}
                            value={subcategoryText}
                            onChange={(e: any) => { setsubcategoryText(e?.target?.value) }}
                            onKeyDown={(e) => e.stopPropagation()}
                          />
                          <Button type="text" icon={<PlusOutlined />} onClick={() => { setsubcategoryList((ps: any) => ([...ps, subcategoryText])); setsubcategoryText('') }}>
                            Add
                          </Button>
                        </Space>
                      </>
                    )}
                    options={subcategoryList.map((item: any) => ({ label: item, value: item }))}
                  />
                </div>}
              </div>
            </div>
            {/* sideBar Main */}
            {sideTabs == 'Plans' && <div className='grow flex !border-black'>
              <Table
                columns={tableColumns}
                expandable={{
                  // expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
                  rowExpandable: (record) => record?.isParent == true,
                  // expandIcon:(record:any) => <DownOutlined />
                }}
                // dataSource={groupDataForFileTable(pages)}
                dataSource={tableData}
                className='grow bg-transparent transparent-table'
                scroll={{ y: 580 }}
                pagination={false}
                showHeader={false}
                bordered
                style={{ backgroundColor: 'transparent' }}
                rowClassName={'table-row-transparent'}
                rootClassName='table-row-transparent'
              />
            </div>}
            {sideTabs == 'TakeOff' && <div className='grow flex !border-black'>
              <Table
                columns={tableColumns}
                expandable={{
                  // expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
                  rowExpandable: (record) => record?.isParent == true,
                  // expandIcon:(record:any) => <DownOutlined />
                }}
                // dataSource={groupDataForFileTable(pages)}
                dataSource={tableData}
                className='grow bg-transparent transparent-table'
                scroll={{ y: 580 }}
                pagination={false}
                showHeader={true}
                // bordered
                style={{ backgroundColor: 'transparent' }}
                rowClassName={'table-row-transparent'}
                rootClassName='table-row-transparent'
              />
            </div>}
            {sideTabs == 'WBS' && <div className='grow flex !border-black'>
              <Table
                columns={tableColumns}
                expandable={{
                  // expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
                  rowExpandable: (record) => record?.isParent == true,
                  // expandIcon:(record:any) => <DownOutlined />
                }}
                // dataSource={groupDataForFileTable(pages)}
                dataSource={tableData}
                className='grow bg-transparent transparent-table'
                scroll={{ y: 580 }}
                pagination={false}
                showHeader={true}
                // bordered
                style={{ backgroundColor: 'transparent' }}
                rowClassName={'table-row-transparent'}
                rootClassName='table-row-transparent'
              />
            </div>}
          </div>}
          {/* Take Off New */}
          <div className='h-[100%] w-[73%] grow rounded-2xl shadow-secondaryTwist border relative' >
            <div className='z-50 absolute top-[25px] left-[-13px] cursor-pointer border-[2px] rounded-full flex justify-center items-center p-1 text-gray-600 bg-white' onClick={() => { setleftOpened(ps => !ps) }}>{leftOpened ? <LeftOutlined /> : <RightOutlined />}</div>
            {/* Old Take Off Full Page */}
            {/* <OldTakeOffFullPage /> */}
            <>
              <>
                {/* <section className="md:px-16 px-8 pb-4"> */}
                {/* <div className="flex justify-end pt-4">
              <div
                className="flex flex-row gap-x-3 cursor-pointer"
                onClick={() => {
                  //@ts-ignore
                  (urlSearch && urlSearch.get('edit_id') && urlSearch.get('edit_id')?.length > 0) ? router.push(`/takeoff/report?edit_id=${urlSearch.get('edit_id')}`) : router.push('/takeoff/report')
                }}
              >
                <CusotmButton
                  disabled={!uploadFileData.length || !reportData.length}
                  text="Generate Report"
                  icon="/plus.svg"
                  iconwidth={20}
                  iconheight={20}
                />
              </div>
            </div> */}
                {selectedTakeOffTab == 'page' && <ScaleNavigation
                  tool={tool}
                  setTool={setTool}
                  setShowModal={setShowModal}
                  handleZoomIn={handleZoomIn}
                  handleZoomOut={handleZoomOut}
                  handleRoomColorChange={handleRoomColorChange}
                  fillColor={fillColor}
                  countType={countType}
                  setcountType={setcountType}
                  selectedPage={selectedPage}
                  handleAddComment={handleAddComment}
                />}

                <div className="py-6 h-[709px] relative">
                  <div className='absolute top-10 left-16 flex gap-x-3 p-3 z-40' >
                    <Button onClick={() => { setselectedTakeOffTab('overview') }} icon={<MenuUnfoldOutlined />} className={selectedTakeOffTab == 'overview' ? 'bg-lavenderPurpleReplica text-white font-semibold' : ''} >Overview</Button>
                    {
                      selectedPagesList && selectedPagesList?.length > 0 && selectedPagesList?.map((pg: any, index: number) => {
                        return <Button
                          className={(selectedTakeOffTab == 'page' && selectedPage?.pageId == pg?.pageId) ? 'bg-lavenderPurpleReplica text-white font-semibold' : ''}
                          onClick={() => {
                            setselectedPage(pg)
                            setselectedTakeOffTab('page')
                          }}
                          key={index} icon={<FilePdfOutlined />} >{pg?.name ? pg?.name?.slice(0, 15) : ''}
                          <span className='cursor-pointer ml-5'
                            onClick={(e) => {
                              e.stopPropagation()
                              console.log('filtered crossed here')
                              const filtered = selectedPagesList?.filter((i: any) => (i?.pageId != pg?.pageId))
                              setselectedPagesList(filtered)
                              if (selectedPage?.pageId == pg?.pageId) {
                                console.log('filtered crossed here inside selected page condition')
                                setselectedPage({})
                                setselectedTakeOffTab('overview')
                              }
                              if (!filtered?.length) {
                                console.log('filtered crossed here in side empty selected list')
                                setselectedTakeOffTab('overview')
                                setselectedPage({})
                              }
                            }}
                          >x</span>
                        </Button>
                      })
                    }
                    {/* <div>Overview</div>
            <div>First Page</div> */}
                  </div>
                  {selectedTakeOffTab == 'page' && <div className='absolute top-10 right-[50px] flex z-40 border rounded-lg bg-slate-50' >
                    <span onClick={handleZoomIn} className='border-r py-3 px-5 cursor-pointer' ><PlusOutlined className='font-extrabold' /></span>
                    <span onClick={handleZoomOut} className='py-3 px-5 cursor-pointer border-r'><MinusOutlined /></span>
                    <span className='py-0 px-2 flex items-center cursor-pointer'>
                      <Select value={scalUnits} options={[{ value: 'feet', label: <span>Feets</span> }, { value: 'meter', label: <span>Meters</span> }]} onSelect={setscalUnits} />
                    </span>
                  </div>}
                  {selectedTakeOffTab == 'page' && <div className={`absolute bottom-0 z-40 ${showModal ? 'block' : 'hidden'}`}>
                    <ModalsWrapper
                      tool={tool}
                      setTool={setTool}
                      setModalOpen={setShowModal}
                      measurements={measurements}
                    />
                  </div>}
                  <div className="h-full max-h-[100%] rounded-lg overflow-auto">
                    {selectedTakeOffTab == 'page' && <Draw
                      key={`draw-${0}`}
                      selectedTool={tool}
                      scale={
                        scaleData?.[`${0 + 1}`] || {
                          xScale: `1in=1in`,
                          yScale: `1in=1in`,
                          precision: '1',
                        }
                      }
                      depth={depth}
                      color={color}
                      border={border}
                      unit={unit * 1.5}
                      uploadFileData={(selectedPage && selectedPage?.pageId) ? selectedPage : file}
                      pageNumber={0 + 1}
                      handleScaleModal={(open) => setShowModal(open)}
                      handleChangeMeasurements={(measurements) =>
                        setMeasurements(measurements)
                      }
                      isEdit={(urlSearch.get('edit_id') && editData) ? true : false}
                      editData={editData}
                      drawScale={drawScale}
                      setdrawScale={setdrawScale}
                      setscaleLine={setscaleLine}
                      setModalOpen={setShowModal}
                      selectedCategory={selectedCate}
                      selectedSubCategory={selectedSubCate}
                      updateMeasurements={updateMeasurements}
                      draw={draw}
                      setDraw={setDraw}
                      stageScale={stageScale}
                      stageX={stageX}
                      stageY={stageY}
                      handleWheel={handleWheel}
                      handleZoomIn={handleZoomIn}
                      handleZoomOut={handleZoomOut}
                      textColor={textColor}
                      fillColor={fillColor}
                      countType={countType}
                      scaleUnits={scalUnits}
                    />}
                    {
                      selectedTakeOffTab == 'overview'
                      &&
                      <div className='w-full flex justify-center items-center p-5' >
                        <div className='grow flex flex-wrap gap-3 mt-32' >
                          {
                            takeOff && takeOff?.pages && Array.isArray(takeOff?.pages) && takeOff?.pages?.map((page: any, index: number) => {
                              return <>
                                <div key={page?.pageId} className='relative cursor-pointer border rounded-2xl'
                                  onClick={() => {
                                    setselectedTakeOffTab('page')
                                    if (!selectedPagesList?.find((i: any) => (i?.pageId == page?.pageId))) {
                                      //@ts-ignore
                                      setselectedPagesList((ps: any) => ([...ps, page]))
                                    }
                                    setselectedPage(page)
                                  }}
                                >
                                  <NextImage className='rounded-t-2xl' src={page?.src} width={250} height={300} alt='' onLoad={() => handleImageLoad(index)} />
                                  {isImgLoading(index) && <div className='rounded-t-2xl absolute top-0 left-0 w-[100%] h-[100%] bg-slate-300 flex justify-center items-center bg-opacity-30' >
                                    <Spin />
                                  </div>}
                                  <div className='py-5 px-3' >{page?.name?.slice(0, 30) ?? 'Unkonw'}</div>
                                </div>
                              </>
                            })
                          }
                        </div>
                      </div>
                    }
                    {
                      selectedTakeOffTab == 'file'
                      &&
                      <div className='w-full h-full flex justify-center items-center p-5' >
                        <div className='grow flex flex-col mt-32 h-full w-full gap-y-2 justify-center items-center' >
                          {/* <label className='relative w-[70%] h-[60%]' htmlFor="file-selector">
                            <input type="file" accept="application/pdf" multiple id='file-selector' className='hidden absolute top-0 left-0' style={{ display: 'none' }} onChange={(e: any) => {
                              console.log(e.target.result, " ==> event.target.result")
                              if (e.target.files?.length > 0) {
                                const arr = Object.keys(e.target?.files)?.map((it: any, ind: number) => {
                                  if (Number.isInteger(Number(it))) {
                                    return e?.target?.files[it]
                                  }
                                })
                                // setselectedFiles(arr)
                              }
                            }} />
                            <div className='cursor-pointer w-[100%] h-[100%] border-[2px] border-dashed rounded-lg flex items-center justify-center' >
                              <div className='w-[70%] h-[80%] flex flex-col items-center justify-evenly'>
                                <img className='w-[15%]' src={'/takeoff/uploadIcon.png'} alt="" />
                                <h4 className='text-gray-700' >Drag and Drop your files here</h4>
                                <p className='text-gray-400'>or</p>
                                <Button
                                  className='text-lavenderPurpleReplica font-bold border border-transparent bg-lavenderPurpleReplica bg-opacity-10 hover:!border-lavenderPurpleReplica hover:!text-lavenderPurpleReplica'
                                >Select file</Button>
                              </div>
                            </div>
                          </label> */}
                          {/* <div className='border-[2px] border-dashed w-[70%]' >
                            <div
                              className="p-5 flex flex-col rounded-lg border border-silverGray shadow-secondaryShadow2 bg-white"
                            >
                              <TertiaryHeading
                                className="text-graphiteGray mb-4 "
                                title="Processing Files"
                              />
                              <p>This is one time process and might take few minutes. Kindly don't close or reload tabs to continue.</p>
                              <div className='flex flex-col gap-y-10 w-full p-5'>
                                <div className='flex gap-2 flex-col'>
                                  <div className='flex gap-2'>
                                    <p className='whitespace-nowrap'>{'First.pdf'}</p>
                                    <Progress percent={50} />
                                  </div>
                                  <div className='flex gap-3'>
                                    <Progress size={'small'} type='circle' percent={60} />
                                    <Progress size={'small'} type='circle' percent={60} status='exception' />
                                  </div>
                                </div>
                                <div className='flex gap-2 flex-col'>
                                  <div className='flex gap-2'>
                                    <p className='whitespace-nowrap'>{'First.pdf'}</p>
                                    <Progress percent={50} />
                                  </div>
                                  <div className='flex gap-3'>
                                    <Progress size={'small'} type='circle' percent={60} />
                                    <Progress size={'small'} type='circle' percent={60} status='exception' />
                                  </div>
                                </div>
                                <div className='flex gap-2 flex-col'>
                                  <div className='flex gap-2'>
                                    <p className='whitespace-nowrap'>{'First.pdf'}</p>
                                    <Progress percent={50} />
                                  </div>
                                  <div className='flex gap-3'>
                                    <Progress size={'small'} type='circle' percent={60} />
                                    <Progress size={'small'} type='circle' percent={60} status='exception' />
                                  </div>
                                </div>
                              </div>
                              <div className="self-end flex justify-end items-center gap-5 md:mt-4 my-3">
                                {true && <div>
                                  <CustomButton
                                    className=" !border-celestialGray !shadow-scenarySubdued2 !text-graphiteGray !bg-snowWhite"
                                    text="Cancel"
                                  // onClick={() => { setModalOpen(false) }}//router.back()
                                  // isLoading={isLoading}
                                  />
                                </div>}
                                <div>
                                  <CustomButton
                                    // isLoading={isLoading}//isLoading
                                    // text={shouldContinue ? "Continue" : "Start Process"}
                                    text={"Start Process"}
                                  // onClick={() => {
                                  //   if (shouldContinue == true) {
                                  //     makeApiCall()
                                  //   } else {
                                  //     if (processFiles) {
                                  //       processFiles(); setisCancelAble(false);
                                  //     }
                                  //   }
                                  // }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div> */}
                          <div className='grow flex w-full'>
                            {fullData?.files && Array.isArray(fullData?.files) && fullData?.files?.length > 0 && <div className='flex flex-col gap-y-7 w-[40%]'>
                              {fullData?.files && Array.isArray(fullData?.files) && fullData?.files?.length > 0 &&
                                <CustomButton
                                  text={`Add ${selectedFiles?.length} files to workspace`}
                                  className="!w-auto"
                                  // icon="plus.svg"
                                  iconwidth={20}
                                  iconheight={20}
                                  isLoading={isApiCalling}
                                  onClick={() => {
                                    // setprogressModalOpen(true) 
                                    addFileToWorkspace()
                                  }}
                                />
                              }
                              {/* {selectedFiles && Array.isArray(selectedFiles) && selectedFiles?.length > 0 && <h4 className='text-gray-600'>{selectedFiles?.length} uploaded files</h4>} */}
                              <ul className='list-none flex flex-col gap-y-5'>
                                {
                                  fullData?.files && Array.isArray(fullData?.files) && fullData?.files?.length > 0 && fullData?.files?.map((it: any, ind: number) => {
                                    const totalProgress = fullData?.pages?.filter((i: any) => { return i?.fileId == it?.fileId })
                                    return <li key={ind} className='inline-flex gap-3 items-center justify-center'>
                                      <img src={'/fileCSV.png'} alt='' width={35} height={35} />
                                      <span data-tooltip={`${it?.name}`} className='whitespace-nowrap text-gray-500'>{`${it?.name?.slice(0, 4)}`}</span>
                                      <Progress percent={(totalProgress && Array.isArray(totalProgress) ? Math.ceil((totalProgress?.length / it?.totalPages) * 100) : 0)} strokeColor={'#007AB6'} />
                                    </li>
                                  })
                                }
                              </ul>
                            </div>}
                            <div className='grow p-3 !max-h-[500px]' >
                              <label className='relative' htmlFor="file-selector">
                                <input type="file" accept="application/pdf" multiple id='file-selector' className='hidden absolute top-0 left-0' style={{ display: 'none' }} onChange={(e: any) => {
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
                                      className='text-lavenderPurpleReplica font-bold border border-transparent bg-lavenderPurpleReplica bg-opacity-10 hover:!border-lavenderPurpleReplica hover:!text-lavenderPurpleReplica'
                                    >Select file</Button>
                                  </div>
                                </div>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    }
                    {/* } */}
                  </div>
                  {/* <DrawTable /> */}
                  {/* Second Bar to do it At Bottom */}
                  {selectedTakeOffTab == 'page'
                    &&
                    <Draggable>
                      <div
                        className="bg-[#F2F2F2] h-[52px] flex flex-row items-center justify-center mb-10 px-4 gap-6 rounded-lg border">
                        <div className="flex flex-row gap-2 items-center">
                          <label>Totals:</label>
                          <Select value="Length ----" />
                        </div>
                        <div className="flex flex-row gap-2 items-center">
                          <label>Units:</label>
                          <Select
                            className="w-[64px]"
                            value={unit}
                            onChange={(value) => setUnit(value)}
                          >
                            {Units.map((item) => (
                              <Select.Option value={item} key={item}>
                                {item}
                              </Select.Option>
                            ))}
                          </Select>
                        </div>
                        <div className="flex flex-row gap-2 items-center">
                          <label>Border:</label>
                          <InputNumber
                            min={1}
                            max={76}
                            value={border}
                            onChange={(value) => value && setBorder(value)}
                          />
                        </div>
                        <div className="flex flex-row gap-2 items-center">
                          <label>Color:</label>
                          <ColorPicker
                            value={color}
                            onChange={(color) => setColor(color.toHexString())}
                          />
                        </div>
                        <div className="flex flex-row gap-2 items-center">
                          <label>Text:</label>
                          <ColorPicker
                            value={textColor}
                            onChangeComplete={(color) => settextColor(color.toHexString())}
                          />
                        </div>
                        <div
                          className="flex flex-row gap-2 items-center"
                        // onClick={}
                        >
                          <label>Fill:</label>
                          {/* <NextImage src={'/selectedScale.svg'} alt={'zoomicon'} width={19.97} height={11.31} /> */}
                          <ColorPicker value={fillColor ?? '#ffffff'} onChangeComplete={(value) => { handleRoomColorChange(value?.toRgbString()) }} />
                          {/* <span
                            className={twMerge(
                              `text-xs capitalize`
                            )}
                          >
                            {"Room Color"}
                          </span> */}
                        </div>
                        {tool.selected === 'volume' && (
                          <InputNumber
                            type="number"
                            min={1}
                            placeholder="Depth"
                            onChange={(value) => value && setDepth(value)}
                          />
                        )}
                        {/* <input placeholder='Add Custom Category' className='p-1' type='text' value={inputtxt} onChange={(e: any) => { setinputtxt(e.target.value) }} />
            <button className='bg-RoyalPurple cursor-pointer text-white p-1 rounded font-bold' onClick={() => { if (inputtxt?.length > 0) { setallCategories((ps: any) => ([...ps, inputtxt])); setselectedCategory(inputtxt); setinputtxt(""); } }} >Add</button>
            {
              allCategories?.map((it: any, ind: number) => {
                const isSelected = it == selectedCategory
                return <div className={`cursor-pointer p-1 rounded text-white ${isSelected ? '!bg-RoyalPurple' : 'bg-slate-400'}`}
                  onClick={() => {
                    if (isSelected) {
                      setselectedCategory("")
                    } else {
                      setselectedCategory(it)
                    }
                  }} >
                  {it}
                </div>
              })
            } */}
                      </div>
                    </Draggable>
                  }

                </div>
                {tool.selected === 'scale' && (
                  <ModalComponent open={showModal} setOpen={setShowModal}>
                    <ScaleModal
                      numOfPages={uploadFileData.length}
                      setModalOpen={setShowModal}
                      drawScale={drawScale}
                      setdrawScale={setdrawScale}
                      scaleLine={scaleLine}
                    />
                  </ModalComponent>
                )}
                <ModalComponent open={reportModal} setOpen={setreportModal} width='100vw'>
                  <ReportModal
                    setModalOpen={setreportModal}
                    takeOff={takeOff}
                    modalOpen={reportModal}
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
                {/* {showModal && ( */}
                {/* <ModalComponent open={showSelectModal} setOpen={()=>{}}>
              <SelectPageModal
                numOfPages={uploadFileData.length}
                setModalOpen={setshowSelectModal}
                uploadFileData={uploadFileData}
                handleSrc={handleSrc}
              />
            </ModalComponent> */}
                {/* )} */}
                {/* </section> */}
              </>
            </>
            {/* End Here New Take Off */}
          </div>
        </div>
      </section>
    </>
  );
};

export default TakeOffNewPage;
