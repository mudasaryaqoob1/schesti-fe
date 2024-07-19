/* eslint-disable import/no-unresolved */
'use client';
import { withAuth } from "@/app/hoc/withAuth"
import { usePDFJS } from "@/app/hooks/usePdf";
import { useEffect, useRef, useState } from "react";
// import { uniqueId } from "lodash";
// import { useInViewport, useMemoizedFn } from "ahooks";
import SenaryHeading from "@/app/component/headings/senaryHeading";
import CustomButton from "@/app/component/customButton/button";
import DraggableTool from "../components/DraggableTool";
import DroppableArea from "../components/DroppableArea";
import DraggableItem from "../components/DraggableItem";
import { ToolState } from "../types";
import { StandardToolItem } from "../components/standard-tools-items";



function EditContractDocumentPage() {
    const [pdfFile,] = useState("/agreement.pdf");
    // const [activePage, setActivePage] = useState<null | number>(1)
    const canvasRefs = useRef<HTMLCanvasElement[]>([]);
    const [tools, setTools] = useState<ToolState[]>([]);
    const { PDFJs } = usePDFJS(async () => { });
    const containerRef = useRef<HTMLDivElement>(null);

    // const callback = useMemoizedFn((entry) => {
    //     if (entry.isIntersecting) {
    //         setActivePage(parseInt(entry.target.getAttribute("id")!));
    //     }
    // });

    // useInViewport(canvasRefs.current, {
    //     callback: callback,
    //     root: () => containerRef.current,
    // })

    useEffect(() => {
        loadPdf();
    }, [PDFJs,]);



    async function loadPdf() {
        if (PDFJs) {

            const pdf = await PDFJs.getDocument(pdfFile).promise;

            for (let index = 1; index <= pdf.numPages; index++) {
                const page = await pdf.getPage(index);
                const viewport = page.getViewport({ scale: 1.5 });

                const canvas = document.createElement('canvas');
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                canvas.id = `${index}`;
                canvas.dataset.pageNo = index.toString();

                const context = canvas.getContext('2d');
                const renderContext = {
                    canvasContext: context!,
                    viewport: viewport,
                };
                canvasRefs.current.push(canvas);

                await page.render(renderContext).promise;

                if (containerRef.current && !!canvasRefs.current.find(canv => canv.getAttribute("id") === `${index}`)) {
                    containerRef.current.appendChild(canvas);
                }
            }
        }

    }

    function getXAndY(offset: { x: number, y: number }) {

        const containerRect = containerRef.current!.getBoundingClientRect();
        const scrollTop = containerRef.current!.scrollTop;
        const scrollLeft = containerRef.current!.scrollLeft;

        const x = offset.x - containerRect.left + scrollLeft;
        const y = offset.y - containerRect.top + scrollTop;
        return { x, y };
    }

    return <div className="mt-6 space-y-2 !pb-[39px]  mx-4 ">

        <div className="flex gap-6 ">
            <div className="w-[950px]">
                <DroppableArea onDrop={function (item, offset) {
                    if ("type" in item) {
                        const { x, y } = getXAndY(offset);
                        setTools((prev) => [...prev, { tool: item.type, position: { x, y }, id: Math.random().toString(36).slice(0, 9) }])
                    } else {
                        setTools((prev) => {
                            return prev.map((tool) => {
                                const { x, y } = getXAndY(offset);
                                return tool.id === item.id ? { ...tool, position: { x, y } } : tool
                            })
                        });
                    }
                }}>
                    <div id="container" ref={containerRef} className="rounded-md relative h-[calc(100vh-150px)] overflow-y-scroll">
                        {tools.map((item) => {
                            return <DraggableItem type={item.tool} key={item.id} data={item} mode="edit-fields">

                                <StandardToolItem mode="edit-fields" item={item} key={item.id} />
                            </DraggableItem>
                        })}
                    </div>
                </DroppableArea>
            </div>
            <div className="flex flex-col space-y-3 rounded-md bg-white h-fit p-4 ">
                <SenaryHeading
                    title="Standard Tools"
                    className="text-xl  font-semibold"
                />
                <DraggableTool type="signature">
                    <CustomButton
                        text="Signature"
                        className="!bg-schestiLightPrimary !border-schestiLightPrimary !text-schestiPrimaryBlack"
                        icon="/signature.svg"
                        iconwidth={16}
                        iconheight={16}

                    />
                </DraggableTool>

                <DraggableTool type="initials">
                    <CustomButton
                        text="Initials"
                        className="!bg-schestiLightPrimary !border-schestiLightPrimary !text-schestiPrimaryBlack"
                        icon="/initials.svg"
                        iconwidth={16}
                        iconheight={16}

                    />
                </DraggableTool>

                <DraggableTool type="stamp">
                    <CustomButton
                        text="Stamp"
                        className="!bg-schestiLightPrimary !border-schestiLightPrimary !text-schestiPrimaryBlack"
                        icon="/stamp.svg"
                        iconwidth={16}
                        iconheight={16}

                    />
                </DraggableTool>

                <DraggableTool type="date">
                    <CustomButton
                        text="Date"
                        className="!bg-schestiLightPrimary !border-schestiLightPrimary !text-schestiPrimaryBlack"
                        icon="/date.svg"
                        iconwidth={16}
                        iconheight={16}
                    />
                </DraggableTool>
            </div>
        </div>
        {/* <div ref={containerRef} className="border border-black"></div> */}
    </div>
}

export default withAuth(EditContractDocumentPage)
