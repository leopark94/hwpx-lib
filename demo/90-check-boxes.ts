// Simple example to add check boxes to a document
import * as fs from "fs";
import { Document, Packer, Paragraph, TextRun, CheckBox } from "hwpx";

const doc = new Document({
    sections: [
        {
            properties: {},
            children: [
                new Paragraph({
                    children: [
                        new TextRun("Hello World"),
                        new TextRun({ break: 1 }),
                        new CheckBox(),
                        new TextRun({ break: 1 }),
                        new CheckBox({ checked: true }),
                        new TextRun({ break: 1 }),
                        new CheckBox({ checked: true, checkedState: { value: "2611" } }),
                        new TextRun({ break: 1 }),
                        new CheckBox({ checked: true, checkedState: { value: "2611", font: "MS Gothic" } }),
                        new TextRun({ break: 1 }),
                        new CheckBox({
                            checked: true,
                            checkedState: { value: "2611", font: "MS Gothic" },
                            uncheckedState: { value: "2610", font: "MS Gothic" },
                        }),
                        new TextRun({ break: 1 }),
                        new CheckBox({
                            checked: true,
                            checkedState: { value: "2611", font: "MS Gothic" },
                            uncheckedState: { value: "2610", font: "MS Gothic" },
                        }),
                        new TextRun({ text: "Are you ok?", break: 1 }),
                        new CheckBox({ checked: true, alias: "Are you ok?" }),
                    ],
                }),
            ],
        },
    ],
});

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("demo/90-check-boxes.hwpx", buffer);
    console.log("✅ HWPX 파일 생성 완료: demo/90-check-boxes.hwpx");
});
