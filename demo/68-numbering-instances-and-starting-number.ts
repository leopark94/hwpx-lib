import * as fs from "fs";
import { Document, Packer, Paragraph, LevelFormat } from "hwpx";

const doc = new Document({
    numbering: {
        config: [
            {
                reference: "ref1",
                levels: [
                    {
                        level: 0,
                        format: LevelFormat.DECIMAL,
                        text: "%1",
                        start: 10,
                    },
                ],
            },
            {
                reference: "ref2",
                levels: [
                    {
                        level: 0,
                        format: LevelFormat.DECIMAL,
                        text: "%1",
                    },
                ],
            },
        ],
    },
    sections: [
        {
            children: [
                new Paragraph({
                    text: "REF1 - inst:0 - lvl:0",
                    numbering: {
                        reference: "ref1",
                        instance: 0,
                        level: 0,
                    },
                }),
                new Paragraph({
                    text: "REF1 - inst:0 - lvl:0",
                    numbering: {
                        reference: "ref1",
                        instance: 0,
                        level: 0,
                    },
                }),
                new Paragraph({
                    text: "REF1 - inst:1 - lvl:0",
                    numbering: {
                        reference: "ref1",
                        instance: 1,
                        level: 0,
                    },
                }),
                new Paragraph({
                    text: "REF1 - inst:1 - lvl:0",
                    numbering: {
                        reference: "ref1",
                        instance: 1,
                        level: 0,
                    },
                }),
                new Paragraph({
                    text: "REF2 - inst:0 - lvl:0",
                    numbering: {
                        reference: "ref2",
                        instance: 1,
                        level: 0,
                    },
                }),
                new Paragraph({
                    text: "REF2 - inst:0 - lvl:0",
                    numbering: {
                        reference: "ref2",
                        instance: 1,
                        level: 0,
                    },
                }),
            ],
        },
    ],
});

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("demo/68-numbering-instances-and-starting-number.hwpx", buffer);
    console.log("✅ HWPX 파일 생성 완료: demo/68-numbering-instances-and-starting-number.hwpx");
});
