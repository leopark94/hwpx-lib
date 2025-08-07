import fs from 'fs';
import { execSync } from 'child_process';

// HWPX에서 지원하지 않는 기능들을 사용하는 파일들
const incompatibleFiles = [
    'demo/55-math.ts',           // Math 기능 미지원
    'demo/35-hyperlinks.ts',     // ExternalHyperlink 미지원
    'demo/17-footnotes.ts',      // FootnoteReferenceRun 미지원
    'demo/18-image-from-buffer.ts', // ImageRun 미지원
    'demo/43-images-to-table-cell-2.ts', // ImageRun 미지원
    'demo/36-image-to-table-cell.ts', // ImageRun 미지원
    'demo/96-template-document.ts', // ImageRun, ExternalHyperlink 미지원
];

console.log(`HWPX 호환성 문제가 있는 ${incompatibleFiles.length}개 파일을 수정합니다...`);

for (const file of incompatibleFiles) {
    try {
        const content = fs.readFileSync(file, 'utf8');
        
        // Math 관련 import 제거
        let newContent = content.replace(
            /import \{[\s\S]*?Math[\s\S]*?\} from "hwpx";/g,
            'import { Document, Packer, Paragraph, TextRun } from "hwpx";'
        );
        
        // ExternalHyperlink 제거
        newContent = newContent.replace(
            /import \{[\s\S]*?ExternalHyperlink[\s\S]*?\} from "hwpx";/g,
            'import { Document, Packer, Paragraph, TextRun } from "hwpx";'
        );
        
        // FootnoteReferenceRun 제거
        newContent = newContent.replace(
            /import \{[\s\S]*?FootnoteReferenceRun[\s\S]*?\} from "hwpx";/g,
            'import { Document, Packer, Paragraph, TextRun } from "hwpx";'
        );
        
        // ImageRun 제거
        newContent = newContent.replace(
            /import \{[\s\S]*?ImageRun[\s\S]*?\} from "hwpx";/g,
            'import { Document, Packer, Paragraph, TextRun } from "hwpx";'
        );
        
        // Math 관련 코드를 일반 텍스트로 변경
        newContent = newContent.replace(
            /new Math\(\{[\s\S]*?\}\)/g,
            'new TextRun("수식 기능은 HWPX에서 지원되지 않습니다")'
        );
        
        // ExternalHyperlink를 일반 텍스트로 변경
        newContent = newContent.replace(
            /new ExternalHyperlink\(\{[\s\S]*?children: \[([\s\S]*?)\][\s\S]*?\}\)/g,
            '$1'
        );
        
        // FootnoteReferenceRun 제거
        newContent = newContent.replace(
            /new FootnoteReferenceRun\(\d+\)/g,
            ''
        );
        
        // ImageRun을 일반 텍스트로 변경
        newContent = newContent.replace(
            /new ImageRun\(\{[\s\S]*?\}\)/g,
            'new TextRun("[이미지]")'
        );
        
        // 파일 덮어쓰기
        fs.writeFileSync(file, newContent);
        
        console.log(`✅ ${file} HWPX 호환성 수정 완료`);
        
    } catch (error) {
        console.error(`❌ ${file} 수정 실패:`, error.message);
    }
}

console.log('\nHWPX 호환성 수정 완료!');
