// Example of how you would create a table and add data to it
// Import from 'docx' rather than '../build' if you install from npm
import * as fs from "fs";
import { Document, Packer, Paragraph } from "../build";

const doc = new Document();

let table = doc.createTable(2, 2);

table.getCell(0, 0).addContent(new Paragraph("Hello"));
table.getRow(0).mergeCells(0, 1);

doc.createParagraph("Another table").heading2();

table = doc.createTable(2, 3);
table.getCell(0, 0).addContent(new Paragraph("World"));
table.getRow(0).mergeCells(0, 2);

doc.createParagraph("Another table").heading2();

table = doc.createTable(2, 4);
table.getCell(0, 0).addContent(new Paragraph("Foo"));

table.getCell(1, 0).addContent(new Paragraph("Bar1"));
table.getCell(1, 1).addContent(new Paragraph("Bar2"));
table.getCell(1, 2).addContent(new Paragraph("Bar3"));
table.getCell(1, 3).addContent(new Paragraph("Bar4"));

table.getRow(0).mergeCells(0, 3);

const packer = new Packer();

packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("My Document.docx", buffer);
});
