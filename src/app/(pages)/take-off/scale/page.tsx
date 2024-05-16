'use client';
import { useState, useContext, useEffect } from 'react';
import ModalComponent from '@/app/component/modal';
import ScaleModal from '../components/scale';
import ModalsWrapper from './components/ModalWrapper';
import { Avatar, ColorPicker, InputNumber, Select, Spin } from 'antd';
import { EditContext, ReportDataContext, ScaleContext, UploadFileContext } from '../context';
import { UploadFileContextProps } from '../context/UploadFileContext';
import {
  Measurements,
  ScaleInterface,
  Units,
  defaultMeasurements,
} from '../types';
import Image from 'next/image';
import { ScaleNavigation, DrawTable, Draw } from './components';
import { ScaleDataContextProps } from '../context/ScaleContext';
import { useRouter, useSearchParams } from 'next/navigation';
import CusotmButton from '@/app/component/customButton/button';
import { ReportDataContextProps } from '../context/ReportDataContext';
import SelectPageModal from '../components/selectPageModal';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/authSlices/auth.selector';

////////////////////////New Take OffData///////////////////////////////////
import CustomButton from '@/app/component/customButton/button'
import { bg_style } from '@/globals/tailwindvariables'
import { CloudUploadOutlined, DownOutlined, FileOutlined, FilePdfOutlined, FolderOutlined, LeftOutlined, MenuUnfoldOutlined, MoreOutlined, RightOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons'
import React from 'react'
import { Button, Divider, Input, Table, TableColumnsType, Tree, TreeDataNode } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { takeoffSummaryService } from '@/app/services/takeoffSummary.service';
import { EditableText } from '@/app/component/EditableText';


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
      fileId
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
  let returningArr: any = [];
  if (Object?.keys(draw)?.length > 0) {
    Object.keys(draw)?.map((key: string, index: number) => {
      if (Array.isArray(draw[`${key}`]) && draw[`${key}`]?.length > 0) {
        singleArr = [...singleArr, ...draw[`${key}`]?.map((i: any) => ({ ...i, type: key,pageId }))]
      }
      return "";
    })
    console.log(singleArr, pageId, " =====> measurementsTableData measurementsTableData")
    if (singleArr?.length > 0) {
      //Reduce code for category
      returningArr = singleArr?.reduce((result: any, currentItem: any) => {
        const { category, dateTime, points, projectName, stroke, strokeWidth, textUnit, id, lineCap, depth, x, y, user, type } = currentItem
        // Check if there's already an entry with the same projectName and pageLabel
        const existingEntry = result?.find((entry: any) => entry.category === category);
        if (existingEntry) { existingEntry?.children?.push({ category, dateTime, points, projectName, stroke, strokeWidth, textUnit, id, lineCap, depth, x, y, user, isParent: false, pageId, type }) }
        else {
          result?.push({
            isParent: true, category, dateTime, points, projectName, stroke, strokeWidth, textUnit, id, lineCap, depth, x, y, user, pageId, type,
            children: [{ isParent: false, category, dateTime, points, projectName, stroke, strokeWidth, textUnit, id, lineCap, depth, x, y, pageId, type, user }]
          })
        }
        return result
      }, [])
    }
  }
  return singleArr
}
const measurementsTableData = (takeOff: any) => {
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
  console.log(returningArr, " =====> measurementsTableData measurementsTableData")
  if (returningArr?.length > 0) {
    //Reduce code for category
    returningArr = returningArr?.reduce((result: any, currentItem: any) => {
      const { category, dateTime, points, projectName, stroke, strokeWidth, textUnit, id, lineCap, depth, x, y, user, type, pageId } = currentItem
      // Check if there's already an entry with the same projectName and pageLabel
      const existingEntry = result?.find((entry: any) => entry.category === category);
      if (existingEntry) { existingEntry?.children?.push({ key: dateTime, category, dateTime, points, projectName, stroke, strokeWidth, textUnit, id, lineCap, depth, x, y, user, isParent: false, type, pageId }) }
      else {
        result?.push({
          key: dateTime, isParent: true, category, dateTime, points, projectName, stroke, strokeWidth, textUnit, id, lineCap, depth, x, y, user, type,pageId,
          children: [{ key: dateTime, isParent: false, category, dateTime, points, projectName, stroke, strokeWidth, textUnit, id, lineCap, depth, x, y, user, type,pageId }]
        })
      }
      return result
    }, [])
  }
  return returningArr
}

const { DirectoryTree, TreeNode } = Tree;
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
  const [pdMeasurements, setpdMeasurements] = useState(null)
  const [selectedTakeOffTab, setselectedTakeOffTab] = useState<'overview' | 'page'>('overview')
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
  const [allCategories, setallCategories] = useState<any>([])
  const [selectedCategory, setselectedCategory] = useState<any>("")
  const [inputtxt, setinputtxt] = useState<any>("")
  ////
  const [tool, setTool] = useState<ScaleInterface>({ selected: 'scale' });
  const [showModal, setShowModal] = useState(false);
  const [border, setBorder] = useState<number>(4);
  const [color, setColor] = useState<string>('#1677ff');
  const [unit, setUnit] = useState<number>(14);
  const [depth, setDepth] = useState<number>(0);
  const [drawScale, setdrawScale] = useState<boolean>(false)
  const [scaleLine, setscaleLine] = useState<any>({})
  const [sideTabs, setsideTabs] = useState<"Plans" | "TakeOff" | "WBS">("TakeOff")
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
    console.log(pageId, type, dateTime, keyToUpdate, valueToUpdate,'Update Run')
    if (pageId && type && dateTime && keyToUpdate) {
      try {
        let tempTakeOff = takeOff
        let slpg = tempTakeOff?.measurements[pageId]
        if (slpg) {
          settableLoading(true)
          slpg = {
            ...slpg,
            [type]: slpg[type]?.map((it: any) => {
              if (new Date(it.dateTime).valueOf() === new Date(dateTime).valueOf()) {
                return { ...it, [keyToUpdate]: valueToUpdate };
              } else {
                return it
              };
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
          className="flex items-center h-full cursor-pointer">
          {record?.isParent == true ? <FolderOutlined className="mr-2" /> : <FileOutlined className="mr-2" />}
          {text}
        </div>
      ),
    },
  ];

  const measurementsColumn: ColumnsType<any> = [
    {
      title: 'Project Name',
      dataIndex: 'category',
      key: 'dateTime',
      render: (text, record) => (
        <div
          className="flex items-center h-full cursor-pointer">
          {record?.isParent ? text : <span className='flex items-center gap-1'><ColorPicker onChangeComplete={(val)=>{updateTableChangeInTakeOff(record?.pageId,record?.type,record?.dateTime,'stroke',val.toHexString())}} className='!w-[2px] !h-[2px] border-none' value={record?.stroke} /> <EditableText initialText={record?.projectName} smallText={record?.projectName?.slice(0, 6) + "..."} onPressEnter={(value) => {updateTableChangeInTakeOff(record?.pageId,record?.type,record?.dateTime,'projectName',value)}} toolTip={takeOff?.pages?.find((pg:any)=>(pg?.pageId == record?.pageId))?.name+`(${takeOff?.pages?.find((pg:any)=>(pg?.pageId == record?.pageId))?.file?.name})`} /></span>}
        </div>
      ),
    },
    {
      title: 'Project Name',
      dataIndex: 'category',
      // key: 'category',
      render: (text, record) => (
        <div
          className="flex items-center h-full cursor-pointer">
          {record?.isParent ? <></> : <span className='flex items-center gap-1'><Avatar icon={<UserOutlined />} /> <span data-tooltip="Kamran Sadiq" >Kamr...</span></span>}
        </div>
      ),
    },
    {
      title: 'Project Name',
      dataIndex: 'category',
      // key: 'category',
      render: (text, record) => (
        <div
          className="flex items-center h-full cursor-pointer">
          {record?.isParent ? <></> : <span className='flex items-center gap-1'>{record?.dateTime}</span>}
        </div>
      ),
    },
    {
      title: 'Project Name',
      dataIndex: 'category',
      // key: 'category',
      render: (text, record) => (
        <div
          className="flex items-center h-full cursor-pointer">
          {record?.isParent ? <></> : <span className='flex items-center gap-1'><MoreOutlined/></span>}
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

  const { reportData } = useContext(
    ReportDataContext
  ) as ReportDataContextProps;
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
  const hadleNewDrawing = () => {
    try {

    } catch (error) {
      console.log(error)
    }
  }

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

  const OldTakeOffFullPage = () => {
    return <>
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
        />}

        <div className="py-6 h-[709px] relative">
          {/* <div className="absolute bottom-48 left-10 flex gap-6 z-50 ">
                <Image src={'/cursor.svg'} alt="t" width={24} height={24} />
                <Image src={'/t1.svg'} alt="t" width={24} height={24} />
                <Image src={'/t1.svg'} alt="t" width={24} height={24} />
                <Image src={'/t1.svg'} alt="t" width={24} height={24} />
                <Image src={'/fx.svg'} alt="t" width={24} height={24} />
              </div> */}
          {/* Side Bar Showing Previously */}
          {/* <div className="absolute top-10 right-10 flex flex-col gap-3 items-center z-50 bg-white px-3 py-2  rounded-sm drop-shadow-md ">
                <Image src={'/cursor.svg'} alt="t" width={24} height={24} />
                <Image src={'/pencil.svg'} alt="t" width={34} height={34} />
                <Image src={'/t1.svg'} alt="t" width={24} height={24} />
                <Image src={'/shapeTool.svg'} alt="t" width={34} height={34} />
                <Image src={'/stickyNotes.svg'} alt="t" width={34} height={34} />
                <Image src={'/fx.svg'} alt="t" width={24} height={24} />
                <Image src={'/calculator.svg'} alt="t" width={34} height={34} />
                <Image src={'/comments.svg'} alt="t" width={34} height={34} />
                <Image src={'/uploadFile.svg'} alt="t" width={34} height={34} />
                <Image src={'/library.svg'} alt="t" width={34} height={34} />
              </div> */}
          <div className='absolute top-10 left-10 flex gap-x-3 p-3 z-40' >
            <Button onClick={() => { setselectedTakeOffTab('overview') }} icon={<MenuUnfoldOutlined />} className={selectedTakeOffTab == 'overview' ? 'bg-[#7138DF] text-white font-semibold' : ''} >Overview</Button>
            {
              selectedPagesList && selectedPagesList?.length > 0 && selectedPagesList?.map((pg: any, index: number) => {
                return <Button
                  className={(selectedTakeOffTab == 'page' && selectedPage?.pageId == pg?.pageId) ? 'bg-[#7138DF] text-white font-semibold' : ''}
                  onClick={() => {
                    setselectedPage(pg)
                    setselectedTakeOffTab('page')
                  }}
                  key={index} icon={<FilePdfOutlined />} >{pg?.name ? pg?.name?.slice(0, 15) : ''}
                  <span className='cursor-pointer ml-5'
                    onClick={() => {
                      const filtered = selectedPagesList?.filter((i: any) => (i?.pageId != pg?.pageId))
                      setselectedPagesList(filtered)
                    }}
                  >x</span>
                </Button>
              })
            }
            {/* <div>Overview</div>
            <div>First Page</div> */}
          </div>
          {selectedTakeOffTab == 'page' && <div className={`absolute bottom-0 z-40 ${showModal ? 'block' : 'hidden'}`}>
            <ModalsWrapper
              tool={tool}
              setTool={setTool}
              setModalOpen={setShowModal}
              measurements={measurements}
            />
          </div>}
          <div className="h-fit rounded-lg overflow-y-auto">
            {/* {uploadFileData.map((file, index) => (
              <Draw
                key={`draw-${index}`}
                selectedTool={tool}
                scale={
                  scaleData?.[`${index + 1}`] || {
                    xScale: `1in=1in`,
                    yScale: `1in=1in`,
                    precision: '1',
                  }
                }
                depth={depth}
                color={color}
                border={border}
                unit={unit * 1.5}
                uploadFileData={file}
                pageNumber={index + 1}
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
                selectedCategory={selectedCategory}
              />
            ))} */}
            {/* {selectedPage && selectedPage?.src && selectedPage?.width && selectedTakeOffTab == 'page' && */}
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
              selectedCategory={selectedCategory}
              draw={draw}
              setDraw={setDraw}
            />}
            {
              selectedTakeOffTab == 'overview'
              &&
              <div className='w-full h-full flex justify-center items-center p-5' >
                <div className='grow flex flex-wrap gap-3 mt-32' >
                  {
                    takeOff && takeOff?.pages && Array.isArray(takeOff?.pages) && takeOff?.pages?.map((page: any, index: number) => {
                      return <>
                        <div key={index} className='relative cursor-pointer border rounded-2xl'
                          onClick={() => {
                            setselectedTakeOffTab('page')
                            if (!selectedPagesList?.find((i: any) => (i?.pageId == page?.pageId))) {
                              //@ts-ignore
                              setselectedPagesList((ps: any) => ([...ps, page]))
                            }
                            setselectedPage(page)
                          }}
                        >
                          <Image className='rounded-t-2xl' src={page?.src} width={250} height={300} alt='' />
                          <div className='py-5 px-3' >{page?.name?.slice(0, 30) ?? 'Unkonw'}</div>
                        </div>
                      </>
                    })
                  }
                </div>
              </div>
            }
            {/* } */}
          </div>
          {/* <DrawTable /> */}
          {/* Second Bar to do it At Bottom */}
          {selectedTakeOffTab == 'page' && <div className="bg-[#F2F2F2] h-[52px] flex flex-row items-center justify-center mb-10 px-4 gap-6 rounded-lg">
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
          </div>}

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
  }

  const [tableColumns, settableColumns] = useState<any>([])
  const [tableData, settableData] = useState<any>([])
  useEffect(() => {
    console.log(measurementsTableData(takeOff ?? {}), " ===> Data to view")
    if (sideTabs == 'Plans') {
      settableColumns(plansColumn)
      settableData(groupDataForFileTable(takeOff?.pages))
    } else if (sideTabs == 'TakeOff') {
      settableColumns(measurementsColumn)
      settableData(measurementsTableData(takeOff ?? {}))
    } else if (sideTabs == 'WBS') {
      settableColumns(measurementsColumn)
      settableData(measurementsTableData(takeOff ?? {}))
    }
  }, [sideTabs, takeOff])

  return (
    <>
      <section className="md:px-16 px-8 pb-4">
        <div className='flex justify-between'>
          <h2>Project Name showing here</h2>
          <CustomButton
            text="Generate Report"
            className="!w-auto"
            // icon="plus.svg"
            iconwidth={20}
            iconheight={20}
            onClick={() => { }}
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
                  <Button onClick={() => { setsideTabs('Plans') }} className={sideTabs == 'Plans' ? 'bg-[#7138DF] text-white font-semibold' : ''} >Plans</Button>
                  <Button onClick={() => { setsideTabs('TakeOff') }} className={sideTabs == 'TakeOff' ? 'bg-[#7138DF] text-white font-semibold' : ''}>Takeoff</Button>
                  <Button onClick={() => { setsideTabs('WBS') }} className={sideTabs == 'WBS' ? 'bg-[#7138DF] text-white font-semibold' : ''}>WBS / Category</Button>
                </div>
                <div className='flex gap-x-2 w-[95%]'>
                  <Input className='grow' placeholder='Search' prefix={<SearchOutlined />} />
                  <Button className='bg-[#7138DF] text-white font-semibold' icon={<CloudUploadOutlined className='text-[16px]' />} >Upload</Button>
                </div>
              </div>
              {/* lower */}
              <div className='h-[25%] flex justify-between gap-x-3 items-center'>
                <div className='grow flex gap-x-4 items-center' >
                  <MenuUnfoldOutlined className='text-[#7138DF] text-[20px]' />
                  <span className='font-inter font-[200] text-gray-800'>Plan & Documents</span>
                  {tableLoading && <Spin />}
                </div>
                <MoreOutlined className='cursor-pointer text-[20px]' size={90} />
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
                showHeader={false}
                bordered
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
                showHeader={false}
                bordered
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
                />}

                <div className="py-6 h-[709px] relative">
                  {/* <div className="absolute bottom-48 left-10 flex gap-6 z-50 ">
                <Image src={'/cursor.svg'} alt="t" width={24} height={24} />
                <Image src={'/t1.svg'} alt="t" width={24} height={24} />
                <Image src={'/t1.svg'} alt="t" width={24} height={24} />
                <Image src={'/t1.svg'} alt="t" width={24} height={24} />
                <Image src={'/fx.svg'} alt="t" width={24} height={24} />
              </div> */}
                  {/* Side Bar Showing Previously */}
                  {/* <div className="absolute top-10 right-10 flex flex-col gap-3 items-center z-50 bg-white px-3 py-2  rounded-sm drop-shadow-md ">
                <Image src={'/cursor.svg'} alt="t" width={24} height={24} />
                <Image src={'/pencil.svg'} alt="t" width={34} height={34} />
                <Image src={'/t1.svg'} alt="t" width={24} height={24} />
                <Image src={'/shapeTool.svg'} alt="t" width={34} height={34} />
                <Image src={'/stickyNotes.svg'} alt="t" width={34} height={34} />
                <Image src={'/fx.svg'} alt="t" width={24} height={24} />
                <Image src={'/calculator.svg'} alt="t" width={34} height={34} />
                <Image src={'/comments.svg'} alt="t" width={34} height={34} />
                <Image src={'/uploadFile.svg'} alt="t" width={34} height={34} />
                <Image src={'/library.svg'} alt="t" width={34} height={34} />
              </div> */}
                  <div className='absolute top-10 left-10 flex gap-x-3 p-3 z-40' >
                    <Button onClick={() => { setselectedTakeOffTab('overview') }} icon={<MenuUnfoldOutlined />} className={selectedTakeOffTab == 'overview' ? 'bg-[#7138DF] text-white font-semibold' : ''} >Overview</Button>
                    {
                      selectedPagesList && selectedPagesList?.length > 0 && selectedPagesList?.map((pg: any, index: number) => {
                        return <Button
                          className={(selectedTakeOffTab == 'page' && selectedPage?.pageId == pg?.pageId) ? 'bg-[#7138DF] text-white font-semibold' : ''}
                          onClick={() => {
                            setselectedPage(pg)
                            setselectedTakeOffTab('page')
                          }}
                          key={index} icon={<FilePdfOutlined />} >{pg?.name ? pg?.name?.slice(0, 15) : ''}
                          <span className='cursor-pointer ml-5'
                            onClick={() => {
                              const filtered = selectedPagesList?.filter((i: any) => (i?.pageId != pg?.pageId))
                              setselectedPagesList(filtered)
                            }}
                          >x</span>
                        </Button>
                      })
                    }
                    {/* <div>Overview</div>
            <div>First Page</div> */}
                  </div>
                  {selectedTakeOffTab == 'page' && <div className={`absolute bottom-0 z-40 ${showModal ? 'block' : 'hidden'}`}>
                    <ModalsWrapper
                      tool={tool}
                      setTool={setTool}
                      setModalOpen={setShowModal}
                      measurements={measurements}
                    />
                  </div>}
                  <div className="h-fit max-h-[100%] rounded-lg overflow-auto">
                    {/* {uploadFileData.map((file, index) => (
              <Draw
                key={`draw-${index}`}
                selectedTool={tool}
                scale={
                  scaleData?.[`${index + 1}`] || {
                    xScale: `1in=1in`,
                    yScale: `1in=1in`,
                    precision: '1',
                  }
                }
                depth={depth}
                color={color}
                border={border}
                unit={unit * 1.5}
                uploadFileData={file}
                pageNumber={index + 1}
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
                selectedCategory={selectedCategory}
              />
            ))} */}
                    {/* {selectedPage && selectedPage?.src && selectedPage?.width && selectedTakeOffTab == 'page' && */}
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
                      selectedCategory={selectedCategory}
                      updateMeasurements={updateMeasurements}
                      draw={draw}
                      setDraw={setDraw}
                    />}
                    {
                      selectedTakeOffTab == 'overview'
                      &&
                      <div className='w-full h-full flex justify-center items-center p-5' >
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
                                  <Image className='rounded-t-2xl' src={page?.src} width={250} height={300} alt='' />
                                  <div className='rounded-t-2xl absolute top-0 left-0 w-[100%] h-[100%] bg-slate-300 flex justify-center items-center bg-opacity-30' >
                                    <Spin />
                                  </div>
                                  <div className='py-5 px-3' >{page?.name?.slice(0, 30) ?? 'Unkonw'}</div>
                                </div>
                              </>
                            })
                          }
                        </div>
                      </div>
                    }
                    {/* } */}
                  </div>
                  {/* <DrawTable /> */}
                  {/* Second Bar to do it At Bottom */}
                  {selectedTakeOffTab == 'page' && <div className="bg-[#F2F2F2] h-[52px] flex flex-row items-center justify-center mb-10 px-4 gap-6 rounded-lg">
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
                  </div>}

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
