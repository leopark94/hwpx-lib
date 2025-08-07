// HWPX 호환 하이퍼링크 예제 (하이퍼링크 기능은 HWPX에서 지원되지 않음)

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
                            text: "하이퍼링크 기능은 HWPX에서 지원되지 않습니다",
                            bold: true,
                            size: 24,
                        }),
                    ],
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "대신 일반 텍스트로 링크를 표현할 수 있습니다:",
                            size: 20,
                        }),
                    ],
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "웹사이트: http://www.example.com",
                            size: 20,
                        }),
                    ],
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "구글: http://www.google.com",
                            size: 20,
                        }),
                    ],
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "참고: HWPX에서는 하이퍼링크 대신 일반 텍스트로 URL을 표시합니다.",
                            size: 16,
                        }),
                    ],
                }),
            ],
        },
    ],
});

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("demo/35-hyperlinks.hwpx", buffer);
    console.log("✅ HWPX 파일 생성 완료: demo/35-hyperlinks.hwpx");
});
