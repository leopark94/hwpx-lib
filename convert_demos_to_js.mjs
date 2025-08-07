import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// 모든 -hwpx.ts 파일 찾기
const hwpxFiles = execSync('find demo -name "*-hwpx.ts"', { encoding: 'utf8' })
    .trim()
    .split('\n')
    .filter(f => f);

console.log(`총 ${hwpxFiles.length}개의 HWPX 데모 파일을 JavaScript로 변환합니다...`);

let successCount = 0;
let errorCount = 0;

for (const file of hwpxFiles) {
    try {
        const content = fs.readFileSync(file, 'utf8');
        
        // TypeScript를 JavaScript로 변환
        let newContent = content
            .replace(/import \* as fs from "fs";/g, 'const fs = require("fs");')
            .replace(/import \{ Document, Paragraph, TextRun, Table, TableRow, TableCell, Packer \} from "\.\.\/lib";/g, 'const { Document, Paragraph, TextRun, Table, TableRow, TableCell, Packer } = require("../lib");')
            .replace(/import \{.*\} from "\.\.\/lib";/g, 'const { Document, Paragraph, TextRun, Table, TableRow, TableCell, Packer } = require("../lib");')
            .replace(/interface .*\{[\s\S]*?\}/g, '') // interface 제거
            .replace(/readonly /g, '') // readonly 제거
            .replace(/: [^;]+;/g, ';') // 타입 제거
            .replace(/\?/g, '') // optional 제거
            .replace(/const /g, 'const ') // const 유지
            .replace(/let /g, 'let ') // let 유지
            .replace(/class /g, 'class ') // class 유지
            .replace(/public /g, '') // public 제거
            .replace(/private /g, '') // private 제거
            .replace(/protected /g, ''); // protected 제거
        
        // 파일명 변경
        const newFileName = file.replace('.ts', '.js');
        
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
