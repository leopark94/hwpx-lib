/**
 * HWPX 기본 생성 테스트
 */
const { File } = require("../lib/file/file");
const { DocumentWrapper } = require("../lib/file/document-wrapper");
const { Paragraph } = require("../lib/file/paragraph");
const { TextRun } = require("../lib/file/paragraph/run");
const { Table, TableRow, TableCell } = require("../lib/file/table");
const { HwpxMainCompiler } = require("../lib/export/packer/hwpx-main-compiler");
const fs = require("fs");

// Document 생성
const doc = new DocumentWrapper({});

// 문서에 내용 추가
doc.View.add(
    new Paragraph({
        children: [
            new TextRun({
                text: "HWPX 변환 테스트 문서",
                size: 28,
                bold: true,
            }),
        ],
        alignment: "center",
    })
);

doc.View.add(
    new Paragraph({
        children: [
            new TextRun({
                text: "이것은 한글 HWPX 형식으로 변환된 문서입니다.",
            }),
        ],
    })
);

doc.View.add(
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
    })
);

// File 객체 생성
const file = new File({
    Document: doc,
});

// HWPX로 변환
const compiler = new HwpxMainCompiler();
const zip = compiler.compile(file);

// 파일로 저장
zip.generateAsync({ type: "nodebuffer" }).then((buffer) => {
    fs.writeFileSync("demo/100-hwpx-basic.hwpx", buffer);
    console.log("✅ HWPX 파일 생성 완료: 100-hwpx-basic.hwpx");
});
