'use client'
import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const IndexPage = () => {
    const htmlRef = useRef<HTMLDivElement>(null);

    const generatePdf = async () => {
        if (htmlRef.current) {
            const canvas = await html2canvas(htmlRef.current);
            const pdf = new jsPDF();
            pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
            pdf.save("output.pdf");
        }
    };

    return (
        <div>
            <div ref={htmlRef}>
                <h1>Hello World!</h1>
                <p>This is an example HTML page.</p>
            </div>
            <button onClick={generatePdf}>Generate PDF</button>
        </div>
    );
};

export default IndexPage;