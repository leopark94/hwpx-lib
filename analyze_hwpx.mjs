import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const hwpxDir = 'study/hwpx';
const outputDir = 'temp_analysis';
const sectionFile = path.join(outputDir, 'all_sections.xml');
const headerFile = path.join(outputDir, 'all_headers.xml');

if (fs.existsSync(sectionFile)) fs.unlinkSync(sectionFile);
if (fs.existsSync(headerFile)) fs.unlinkSync(headerFile);

const files = fs.readdirSync(hwpxDir).filter(f => f.endsWith('.hwpx'));

console.log(`Analyzing ${files.length} HWPX files...`);

for (const file of files) {
    const filePath = path.join(hwpxDir, file);
    try {
        const sectionXml = execSync(`unzip -p "${filePath}" Contents/section0.xml`).toString();
        fs.appendFileSync(sectionFile, sectionXml + '\\n---FILE_SEPARATOR---\\n');

        const headerXml = execSync(`unzip -p "${filePath}" Contents/header.xml`).toString();
        fs.appendFileSync(headerFile, headerXml + '\\n---FILE_SEPARATOR---\\n');
    } catch (e) {
        // ignore malformed zips
    }
}

console.log('Analysis complete.');
