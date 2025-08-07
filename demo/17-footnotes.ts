// HWPX 호환 각주 예제 (각주 기능은 HWPX에서 지원되지 않음)

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
                            text: "각주 기능은 HWPX에서 지원되지 않습니다",
                            bold: true,
                            size: 24,
                        }),
                    ],
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "대신 일반 텍스트로 각주 내용을 표현할 수 있습니다:",
                            size: 20,
                        }),
                    ],
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "본문 내용입니다. 각주 대신 일반 텍스트로 설명을 추가합니다.",
                            size: 20,
                        }),
                    ],
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "참고: 각주 내용은 여기에 일반 텍스트로 표시됩니다.",
                            size: 16,
                            italic: true,
                        }),
                    ],
                }),
            ],
        },
    ],
});

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("demo/17-footnotes.hwpx", buffer);
    console.log("✅ HWPX 파일 생성 완료: demo/17-footnotes.hwpx");
});
