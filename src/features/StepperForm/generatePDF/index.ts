import { FieldValues } from "react-hook-form";
import Handlebars from "handlebars";
import { getVariableKeys } from "../../RichEditor/Plugin/MentionsVariable";

const generatePDF = (data: FieldValues, doc: { name: string; id: number }) => {
  const htmlTemp = data[doc.name];
  const template = Handlebars.compile(htmlTemp);

  const docVariables = getVariableKeys(doc.id);

  const variablesObj: Record<string, string> = docVariables.reduce(
    (acc, item: { key: string; value: { key: string; value: string } }) => {
      acc[item.key] = data[item.value.key][item.value.value];
      return acc;
    },
    {}
  );

  const docHtml = generatePDFWithTemplate(template(variablesObj));
  return savePDF(docHtml, doc.name);
};

const generatePDFWithTemplate = (html: string) => {
  return `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PDF</title>
  </head>
  <body>
  ${html}
  </body>
</html>
  `;
};

const savePDF = async (htmlTemplate: string, fileName: string) => {
  const html2pdf = (await import("html2pdf.js")).default;

  const options = {
    filename: `${fileName}.pdf`,
    margin: 20,
    image: { type: "jpeg", quality: 3 },
    jsPDF: { unit: "mm", format: "A4" },
    pagebreak: { mode: "auto" },
  };

  html2pdf()
    .from(htmlTemplate)
    .set(options)
    .toPdf()
    .get("pdf")
    .then((pdf) => {
      let totalPage = pdf.internal.getNumberOfPages();

      for (let i = 1; i <= totalPage; i++) {
        pdf.setPage(i);
        pdf.setFontSize(10);
        pdf.setFontSize(10);
        const text = "Page - " + i + " of " + totalPage;
        const textWidth =
          pdf.getStringUnitWidth(text) * pdf.internal.getFontSize();
        const textHeight = pdf.internal.getLineHeight();
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const x = pageWidth - textWidth + 20;
        const y = pageHeight - textHeight - 0;
        pdf.text(text, x, y);
      }
    })
    .save();
};

export default generatePDF;
