import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// 모든 .ts 파일 찾기 (hwpx가 포함되지 않은 것들)
const demoFiles = execSync('find demo -name "*.ts" -not -name "*hwpx*"', { encoding: 'utf8' })
    .trim()
    .split('\n')
    .filter(f => f);

console.log(`총 ${demoFiles.length}개의 데모 파일을 HWPX로 변환합니다...`);

let successCount = 0;
let errorCount = 0;

for (const file of demoFiles) {
    try {
        const content = fs.readFileSync(file, 'utf8');
        
        // DOCX import를 HWPX import로 변경
        let newContent = content
            .replace(/from "docx"/g, 'from "../lib"')
            .replace(/import.*docx.*/g, 'import { Document, Paragraph, TextRun, Table, TableRow, TableCell, Packer } from "../lib";')
            .replace(/import \* as fs from "fs";/g, 'import * as fs from "fs";')
            .replace(/import \{.*\} from "docx";/g, 'import { Document, Paragraph, TextRun, Table, TableRow, TableCell, Packer } from "../lib";');
        
        // Packer.toBuffer 호출을 HWPX로 변경
        newContent = newContent.replace(
            /Packer\.toBuffer\(doc\)\.then\(\(buffer\) => \{[\s\S]*?fs\.writeFileSync\([^)]+\)[\s\S]*?\}\);/g,
            'Packer.toBuffer(doc).then((buffer) => {\n    fs.writeFileSync("' + file.replace('.ts', '.hwpx') + '", buffer);\n    console.log("✅ HWPX 파일 생성 완료: ' + path.basename(file).replace('.ts', '.hwpx') + '");\n});'
        );
        
        // 파일명 변경
        const newFileName = file.replace('.ts', '-hwpx.ts');
        
        // 새 파일 저장
        fs.writeFileSync(newFileName, newContent);
        
        console.log(`✅ ${path.basename(file)} → ${path.basename(newFileName)}`);
        successCount++;
        
    } catch (error) {
        console.error(`❌ ${file} 변환 실패:`, error.message);
        errorCount++;
    }
}

console.log(`\n변환 완료!`);
console.log(`✅ 성공: ${successCount}개`);
console.log(`❌ 실패: ${errorCount}개`);
