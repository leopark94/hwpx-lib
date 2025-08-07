/**
 * Packer를 사용한 HWPX 생성 테스트
 */
import { Document, Paragraph, TextRun, Packer } from "../lib/index.js";
import fs from "fs";

async function testPacker() {
    try {
        // 문서 생성
        const doc = new Document({
            sections: [{
                properties: {},
                children: [
                    new Paragraph({
                        children: [
                            new TextRun("HWPX 템플릿 기반 변환 테스트"),
                        ],
                    }),
                    new Paragraph({
                        children: [
                            new TextRun("이 문서는 빈 템플릿을 기반으로 생성되었습니다."),
                        ],
                    }),
                ],
            }],
        });
        
        // HWPX로 변환
        const buffer = await Packer.toBuffer(doc);
        fs.writeFileSync("demo/test-template.hwpx", buffer);
        console.log("✅ 템플릿 기반 HWPX 파일 생성 완료: test-template.hwpx");
        
        // 생성된 파일 크기 확인
        const stats = fs.statSync("demo/test-template.hwpx");
        console.log(`📦 파일 크기: ${Math.round(stats.size / 1024)}KB`);
        
    } catch (error) {
        console.error("❌ HWPX 생성 실패:", error);
        console.error(error.stack);
    }
}

testPacker().catch(console.error);
