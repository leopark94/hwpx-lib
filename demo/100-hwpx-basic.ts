/**
 * HWPX 기본 생성 테스트
 */
const { Document, Paragraph, TextRun, Table, TableRow, TableCell, Packer } = require("../lib");
const fs = require("fs");

const doc = new Document({});

// 문서에 내용 추가
doc.add(
    new Paragraph({
        children: [
            new TextRun({
                text: "HWPX 변환 테스트 문서",
                size: 28,
                bold: true,
            }),
        ],
        alignment: "center",
    }),
);

doc.add(
    new Paragraph({
        children: [
            new TextRun({
                text: "이것은 한글 HWPX 형식으로 변환된 문서입니다.",
            }),
        ],
    }),
);

doc.add(
    new Table({
        rows: [
            new TableRow({
                children: [
                    new TableCell({
                        children: [new Paragraph({ children: [new TextRun("항목")] })],
                    }),
                    new TableCell({
                        children: [new Paragraph({ children: [new TextRun("내용")] })],
                    }),
                ],
            }),
            new TableRow({
                children: [
                    new TableCell({
                        children: [new Paragraph({ children: [new TextRun("테스트")] })],
                    }),
                    new TableCell({
                        children: [new Paragraph({ children: [new TextRun("성공")] })],
                    }),
                ],
            }),
        ],
    }),
);

// HWPX로 저장
Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("demo/100-hwpx-basic.hwpx", buffer);
    console.log("✅ HWPX 파일 생성 완료: 100-hwpx-basic.hwpx");
});
