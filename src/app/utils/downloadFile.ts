import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const downloadFile = (url: string, name: string) => {
  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    });
};


export function handleDownloadPdfFromRef(ref: React.MutableRefObject<HTMLDivElement | undefined>, filename: string, isScrollable = true) {
  const container = ref.current!;
  if (isScrollable) {
    container.style.height = 'auto'; // Temporarily expand the container
  }

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
    pdf.save(`${filename}.pdf`);

    if (isScrollable) {
      // Restore the original height
      container.style.height = ''; // Remove inline style to revert to original
    }

  });
}