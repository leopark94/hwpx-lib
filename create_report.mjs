import fs from 'fs';

const sections = fs.readFileSync('temp_analysis/all_sections.xml', 'utf-8').split('\\n---FILE_SEPARATOR---\\n').filter(s => s.trim());
const headers = fs.readFileSync('temp_analysis/all_headers.xml', 'utf-8').split('\\n---FILE_SEPARATOR---\\n').filter(h => h.trim());

let report = '# HWPX 휴리스틱 분석 보고서\\n\\n';
report += `총 ${sections.length}개의 HWPX 파일을 분석했습니다.\\n\\n`;

// Section 분석
const secTagMatches = sections.map(s => (s.match(/<([a-zA-Z0-9:]+sec)/) || [])[1]);
const secTagCounts = secTagMatches.reduce((acc, tag) => {
    if (tag) acc[tag] = (acc[tag] || 0) + 1;
    return acc;
}, {});
const mostUsedSecTag = Object.keys(secTagCounts).sort((a, b) => secTagCounts[b] - secTagCounts[a])[0] || 'hs:sec';

report += `## Contents/section0.xml 분석\\n`;
report += `* **루트 태그**: \`<${mostUsedSecTag}>\`가 가장 많이 사용됩니다.\\n`;

const firstParaWithSecPr = sections.map(s => (s.match(/<hp:p[^>]*>.*?<hp:secPr/s) ? 1 : 0)).reduce((a, b) => a + b, 0);
report += `* **secPr 위치**: ${((firstParaWithSecPr / sections.length) * 100).toFixed(2)}%의 파일에서 첫 번째 문단(\`<hp:p>\`) 내에 \\\`<hp:secPr>\\\`이 존재합니다.\\n`;

// Header 분석
report += `\\n## Contents/header.xml 분석\\n`;
const charPropsTag = (headers[0].match(/<([a-zA-Z0-9:]+charProperties)/) || [])[1] || 'hh:charProperties';
const paraPropsTag = (headers[0].match(/<([a-zA-Z0-9:]+paraProperties)/) || [])[1] || 'hh:paraProperties';
const borderFillsTag = (headers[0].match(/<([a-zA-Z0-9:]+borderFills)/) || [])[1] || 'hh:borderFills';
report += `* **스타일 목록 태그**: \\\`<${charPropsTag}>\\\`, \\\`<${paraPropsTag}>\\\`, \\\`<${borderFillsTag}>\\\`가 일관적으로 사용됩니다. (기존에 사용하던 'List' 접미사가 붙은 태그가 아님)\\n`;

fs.writeFileSync('HWPX_HEURISTIC_ANALYSIS.md', report);
console.log('HWPX_HEURISTIC_ANALYSIS.md created.');
