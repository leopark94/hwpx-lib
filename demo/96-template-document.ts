// Patch a document with patches

import * as fs from "fs";
import { Document, Packer, Paragraph, TextRun } from "hwpx";

patchDocument({
    outputType: "nodebuffer",
    data: fs.readFileSync("demo/assets/simple-template-4.docx"),
    patches: {
        name: {
            type: PatchType.PARAGRAPH,
            children: [new TextRun("Sir. "), new TextRun("John Doe"), new TextRun("(The Conqueror)")],
        },
        table_heading_1: {
            type: PatchType.PARAGRAPH,
            children: [new TextRun("Heading wow!")],
        },
        item_1: {
            type: PatchType.PARAGRAPH,
            children: [
                new TextRun("#657"),
                
                        new TextRun({
                            text: "BBC News Link",
                        }),
                    ,
            ],
        },
        paragraph_replace: {
            type: PatchType.DOCUMENT,
            children: [
                new Paragraph("Lorem ipsum paragraph"),
                new Paragraph("Another paragraph"),
                new Paragraph({
                    children: [
                        new TextRun("This is a "),
                        
                                new TextRun({
                                    text: "Google Link",
                                }),
                            ,
                        new TextRun("[이미지]"),
                    ],
                }),
            ],
        },
        header_adjective: {
            type: PatchType.PARAGRAPH,
            children: [new TextRun("Delightful Header")],
        },
        footer_text: {
            type: PatchType.PARAGRAPH,
            children: [
                new TextRun("replaced just as"),
                new TextRun(" well"),
                
                        new TextRun({
                            text: "BBC News Link",
                        }),
                    ,
            ],
        },
        image_test: {
            type: PatchType.PARAGRAPH,
            children: [
                new TextRun("[이미지]"),
            ],
        },
        table: {
            type: PatchType.DOCUMENT,
            children: [
                new Table({
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({
                                    children: [new Paragraph({}), new Paragraph({})],
                                    verticalAlign: VerticalAlignTable.CENTER,
                                }),
                                new TableCell({
                                    children: [new Paragraph({}), new Paragraph({})],
                                    verticalAlign: VerticalAlignTable.CENTER,
                                }),
                                new TableCell({
                                    children: [new Paragraph({ text: "bottom to top" }), new Paragraph({})],
                                    textDirection: TextDirection.BOTTOM_TO_TOP_LEFT_TO_RIGHT,
                                }),
                                new TableCell({
                                    children: [new Paragraph({ text: "top to bottom" }), new Paragraph({})],
                                    textDirection: TextDirection.TOP_TO_BOTTOM_RIGHT_TO_LEFT,
                                }),
                            ],
                        }),
                        new TableRow({
                            children: [
                                new TableCell({
                                    children: [
                                        new Paragraph({
                                            text: "Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah",
                                            heading: HeadingLevel.HEADING_1,
                                        }),
                                    ],
                                }),
                                new TableCell({
                                    children: [
                                        new Paragraph({
                                            text: "This text should be in the middle of the cell",
                                        }),
                                    ],
                                    verticalAlign: VerticalAlignTable.CENTER,
                                }),
                                new TableCell({
                                    children: [
                                        new Paragraph({
                                            text: "Text above should be vertical from bottom to top",
                                        }),
                                    ],
                                    verticalAlign: VerticalAlignTable.CENTER,
                                }),
                                new TableCell({
                                    children: [
                                        new Paragraph({
                                            text: "Text above should be vertical from top to bottom",
                                        }),
                                    ],
                                    verticalAlign: VerticalAlignTable.CENTER,
                                }),
                            ],
                        }),
                    ],
                }),
            ],
        },
    },
    placeholderDelimiters: { start: "<<", end: ">>" },
}).then((doc) => {
    fs.writeFileSync("My Document.docx", doc);
});
