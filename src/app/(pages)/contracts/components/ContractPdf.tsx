import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { PdfContractMode, ToolState } from '../types';
import { usePDFJS } from '@/app/hooks/usePdf';
import DroppableArea from './DroppableArea';
import DraggableItem from './DraggableItem';
import { StandardToolItem } from './standard-tools-items';
import SenaryHeading from '@/app/component/headings/senaryHeading';
import DraggableTool from './DraggableTool';
import CustomButton from '@/app/component/customButton/button';
import { ICrmContract } from '@/app/interfaces/crm/crm-contract.interface';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { toast } from 'react-toastify';

type Props = {
  mode: PdfContractMode;
  pdfFile: string;
  contract: ICrmContract;
  tools: ToolState[];
  setTools: React.Dispatch<React.SetStateAction<ToolState[]>>;
  color?: string;
};

export const ContractPdf = forwardRef<{ handleAction: () => void }, Props>(
  ({ mode, pdfFile, tools, setTools, contract, color = "#007ab6" }, ref) => {
    // const [activePage, setActivePage] = useState<null | number>(1)
    // const canvasRefs = useRef<HTMLCanvasElement[]>([]);
    const { PDFJs } = usePDFJS(async () => { });
    const containerRef = useRef<HTMLDivElement>(null);
    const pdfContainerRef = useRef<HTMLDivElement>(null);
    const [selectedTool, setSelectedTool] = useState<ToolState | null>(null);

    // const callback = useMemoizedFn((entry) => {
    //     if (entry.isIntersecting) {
    //         setActivePage(parseInt(entry.target.getAttribute("id")!));
    //     }
    // });

    // useInViewport(canvasRefs.current, {
    //     callback: callback,
    //     root: () => containerRef.current,
    // })

    useImperativeHandle(ref, () => ({
      handleAction: () => handleDownload(),
    }));

    useEffect(() => {
      loadPdf();
    }, [PDFJs]);

    async function loadPdf() {
      if (PDFJs) {
        try {
          const pdf = await PDFJs.getDocument(pdfFile).promise;

          for (let index = 1; index <= pdf.numPages; index++) {
            const page = await pdf.getPage(index);
            const viewport = page.getViewport({ scale: 1.5 });

            const canvas = document.createElement('canvas');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            canvas.id = `${index}`;
            canvas.dataset.pageNo = index.toString();

            const context = canvas.getContext('2d')!;
            const renderContext = {
              canvasContext: context!,
              viewport: viewport,
            };
            // canvasRefs.current.push(canvas);

            await page.render(renderContext).promise;

            // Add id to the canvas
            const textCanvas = document.createElement('canvas');
            textCanvas.height = viewport.height;
            textCanvas.width = viewport.width;
            const textContext = textCanvas.getContext('2d')!;
            textContext.font = '16px Arial';
            textContext.fillStyle = 'black';
            textContext.fillText(`Schesti-Contract-ID: ${contract._id}`, 30, 30);

            // Overlay the text canvas on the main canvas
            context.drawImage(textCanvas, 0, 0);
            if (containerRef.current) {
              containerRef.current.appendChild(canvas);
            }
          }
        } catch (error) {
          toast.error("Unable to load the pdf")
        }
      }
    }

    function getXAndY(offset: { x: number; y: number }) {
      const containerRect = containerRef.current!.getBoundingClientRect();
      const scrollTop = containerRef.current!.scrollTop;
      const scrollLeft = containerRef.current!.scrollLeft;

      const x = offset.x - containerRect.left + scrollLeft;
      const y = offset.y - containerRect.top + scrollTop;
      return { x, y };
    }

    function handleRemoveTool(item: ToolState) {
      setTools((prev) => prev.filter((tool) => tool.id !== item.id));
    }

    function handleItemClick(item: ToolState) {
      if (mode === 'add-values') {
        setSelectedTool(item);
      }
    }

    function handleCloseModal() {
      setSelectedTool(null);
    }

    function handleValueChange(item: ToolState, shouldClose: boolean = true,) {
      if (mode === 'add-values') {
        if (shouldClose) {
          setSelectedTool(null);
        } else {
          setSelectedTool(item);
        }
        setTools((prev) => {
          return prev.map((tool) => {
            return tool.id === item.id ? item : tool;
          });
        });
      }
    }

    function handleDownload() {
      const container = containerRef.current!;
      container.style.height = 'auto'; // Temporarily expand the container

      html2canvas(container, { useCORS: true }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = pdf.internal.pageSize.getWidth();
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let positionY = 0;
        const pageHeight = pdf.internal.pageSize.height;

        while (positionY < imgHeight) {
          pdf.addImage(imgData, 'PNG', 0, -positionY, imgWidth, imgHeight);
          positionY += pageHeight;
          if (positionY < imgHeight) {
            pdf.addPage();
          }
        }
        pdf.save(`${contract.title}.pdf`);

        // Restore the original height
        container.style.height = ''; // Remove inline style to revert to original
      });
    }

    return (
      <div>
        <div className="flex gap-6 ">
          <div className="w-[950px]" ref={pdfContainerRef}>
            <DroppableArea
              onDrop={function (item, offset) {
                if ('type' in item) {
                  const { x, y } = getXAndY(offset);
                  setTools((prev) => [
                    ...prev,
                    {
                      tool: item.type,
                      position: { x, y },
                      id: Math.random().toString(36).slice(0, 20),
                    },
                  ]);
                } else {
                  setTools((prev) => {
                    return prev.map((tool) => {
                      const { x, y } = getXAndY(offset);
                      return tool.id === item.id
                        ? { ...tool, position: { x, y } }
                        : tool;
                    });
                  });
                }
              }}
            >
              <div
                id="container"
                ref={containerRef}
                className="rounded-md relative h-[calc(100vh-150px)] overflow-y-scroll"
              >
                {tools.map((item) => {
                  return mode === 'add-values' ? (
                    <StandardToolItem
                      onClick={() => handleItemClick(item)}
                      onClose={handleCloseModal}
                      selectedTool={selectedTool}
                      onChange={handleValueChange}
                      mode={mode}
                      item={item}
                      key={item.id}
                      contract={contract}
                      color={color}
                    />
                  ) : mode === 'edit-fields' ? (
                    <DraggableItem type={item.tool} key={item.id} data={item}>
                      <StandardToolItem
                        selectedTool={null}
                        color={color}
                        mode={mode}
                        item={item}
                        key={item.id}
                        onDelete={() => handleRemoveTool(item)}
                        contract={contract}
                      />
                    </DraggableItem>
                  ) : mode === 'view-fields' || mode === 'view-values' ? (
                    <StandardToolItem
                      color={color}
                      onClick={() => { }}
                      onClose={() => { }}
                      selectedTool={selectedTool}
                      onChange={() => { }}
                      mode={mode}
                      item={item}
                      key={item.id}
                      contract={contract}
                    />
                  ) : null;
                })}
              </div>
            </DroppableArea>
          </div>
          {mode === 'edit-fields' ? (
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

              <DraggableTool type="comment">
                <CustomButton
                  text="Comments"
                  className="!bg-schestiLightPrimary !border-schestiLightPrimary !text-schestiPrimaryBlack"
                  icon="/comment.svg"
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
          ) : null}
        </div>
        {/* <div ref={containerRef} className="border border-black"></div> */}
      </div>
    );
  }
);

ContractPdf.displayName = 'ContractPdf';
