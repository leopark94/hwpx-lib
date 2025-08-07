// HWPX 호환 수식 예제 (수식 기능은 HWPX에서 지원되지 않음)

import * as fs from "fs";
import { Document, Packer, Paragraph, TextRun } from "hwpx";

const doc = new Document({
    sections: [
        {
            properties: {},
            children: [
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "수식 기능은 HWPX에서 지원되지 않습니다",
                            bold: true,
                            size: 24,
                        }),
                    ],
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "대신 일반 텍스트로 수식을 표현할 수 있습니다:",
                            size: 20,
                        }),
                    ],
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "2 + 2 = 4",
                            size: 20,
                        }),
                    ],
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "1/2 = 0.5",
                            size: 20,
                        }),
                    ],
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "√2 ≈ 1.414",
                            size: 20,
                        }),
                    ],
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "∑(i=1 to 10) i = 55",
                            size: 20,
                        }),
                    ],
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "∫x²dx = x³/3 + C",
                            size: 20,
                        }),
                    ],
                }),
            ],
        },
    ],
});

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("demo/55-math.hwpx", buffer);
    console.log("✅ HWPX 파일 생성 완료: demo/55-math.hwpx");
});
