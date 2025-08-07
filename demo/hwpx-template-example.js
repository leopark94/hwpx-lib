/**
 * HWPX 템플릿 기반 변환 예제
 * 
 * 이 예제는 템플릿 기반으로 HWPX 파일을 생성하는 방법을 보여줍니다.
 * 핵심 원리:
 * 1. 기존 템플릿 파일의 구조를 유지
 * 2. section0.xml만 수정하여 콘텐츠 교체
 * 3. 템플릿의 기존 스타일 ID 활용
 */

import JSZip from 'jszip';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateHwpxExample() {
    try {
        console.log('🎯 HWPX 템플릿 기반 변환 예제 시작...\n');
        
        // 템플릿 파일 읽기
        const templatePath = path.join(__dirname, '../templates/empty_template.hwpx');
        const templateData = await fs.readFile(templatePath);
        
        // ZIP 로드
        const zip = new JSZip();
        const templateZip = await zip.loadAsync(templateData);
        
        // section0.xml 생성 - 템플릿과 동일한 구조 사용
        const sectionXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>
<hml:sec xmlns:hml="http://www.hancom.co.kr/hwpml/2011/document" xmlns:hp="http://www.hancom.co.kr/hwpml/2011/paragraph" xmlns:hc="http://www.hancom.co.kr/hwpml/2011/core" xmlns:ha="http://www.hancom.co.kr/hwpml/2011/app" xmlns:hs="http://www.hancom.co.kr/hwpml/2011/section" xmlns:hh="http://www.hancom.co.kr/hwpml/2011/head" xmlns:hhs="http://www.hancom.co.kr/hwpml/2011/history" xmlns:hpf="http://www.hancom.co.kr/schema/2011/hpf" xmlns:hwpunitchar="http://www.hancom.co.kr/hwpml/2016/HwpUnitChar" xmlns:ooxmlchart="http://www.hancom.co.kr/hwpml/2016/ooxmlchart" xmlns:epub="http://www.idpf.org/2007/ops" xmlns:config="urn:oasis:names:tc:opendocument:xmlns:config:1.0" xmlns:hp10="http://www.hancom.co.kr/hwpml/2016/paragraph" xmlns:hm="http://www.hancom.co.kr/hwpml/2011/master-page" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:opf="http://www.idpf.org/2007/opf" id="0" textDirection="HORIZONTAL" spaceColumns="1" columnGap="4252">
  <hp:p id="0" paraPrIDRef="0" styleIDRef="0" pageBreak="0" columnBreak="0" merged="0">
    <hp:run charPrIDRef="4">
      <hp:t>HWPX 변환 성공!</hp:t>
    </hp:run>
    <hp:linesegarray>
      <hp:lineseg textpos="0" vertpos="0" vertsize="2000" textheight="2000" baseline="1700" spacing="1200" horzpos="0" horzsize="45352" flags="393216"/>
    </hp:linesegarray>
  </hp:p>
  <hp:p id="0" paraPrIDRef="0" styleIDRef="0" pageBreak="0" columnBreak="0" merged="0">
    <hp:run charPrIDRef="0">
      <hp:t>이 문서는 hwpx-lib를 사용하여 생성되었습니다.</hp:t>
    </hp:run>
    <hp:linesegarray>
      <hp:lineseg textpos="0" vertpos="3200" vertsize="1200" textheight="1200" baseline="1020" spacing="720" horzpos="0" horzsize="45352" flags="393216"/>
    </hp:linesegarray>
  </hp:p>
  <hp:p id="0" paraPrIDRef="0" styleIDRef="0" pageBreak="0" columnBreak="0" merged="0">
    <hp:run charPrIDRef="0">
      <hp:t> </hp:t>
    </hp:run>
    <hp:linesegarray>
      <hp:lineseg textpos="0" vertpos="5520" vertsize="1200" textheight="1200" baseline="1020" spacing="720" horzpos="0" horzsize="45352" flags="393216"/>
    </hp:linesegarray>
  </hp:p>
  <hp:p id="0" paraPrIDRef="0" styleIDRef="0" pageBreak="0" columnBreak="0" merged="0">
    <hp:run charPrIDRef="1">
      <hp:t>주요 특징:</hp:t>
    </hp:run>
    <hp:linesegarray>
      <hp:lineseg textpos="0" vertpos="7840" vertsize="1200" textheight="1200" baseline="1020" spacing="720" horzpos="0" horzsize="45352" flags="393216"/>
    </hp:linesegarray>
  </hp:p>
  <hp:p id="0" paraPrIDRef="0" styleIDRef="0" pageBreak="0" columnBreak="0" merged="0">
    <hp:run charPrIDRef="0">
      <hp:t>• 템플릿 기반 접근으로 안정적인 HWPX 생성</hp:t>
    </hp:run>
    <hp:linesegarray>
      <hp:lineseg textpos="0" vertpos="10160" vertsize="1200" textheight="1200" baseline="1020" spacing="720" horzpos="0" horzsize="45352" flags="393216"/>
    </hp:linesegarray>
  </hp:p>
  <hp:p id="0" paraPrIDRef="0" styleIDRef="0" pageBreak="0" columnBreak="0" merged="0">
    <hp:run charPrIDRef="0">
      <hp:t>• 기존 스타일 ID 활용으로 호환성 보장</hp:t>
    </hp:run>
    <hp:linesegarray>
      <hp:lineseg textpos="0" vertpos="12480" vertsize="1200" textheight="1200" baseline="1020" spacing="720" horzpos="0" horzsize="45352" flags="393216"/>
    </hp:linesegarray>
  </hp:p>
  <hp:p id="0" paraPrIDRef="0" styleIDRef="0" pageBreak="0" columnBreak="0" merged="0">
    <hp:run charPrIDRef="0">
      <hp:t>• 한글 프로그램에서 완벽하게 열림</hp:t>
    </hp:run>
    <hp:linesegarray>
      <hp:lineseg textpos="0" vertpos="14800" vertsize="1200" textheight="1200" baseline="1020" spacing="720" horzpos="0" horzsize="45352" flags="393216"/>
    </hp:linesegarray>
  </hp:p>
</hml:sec>`;
        
        // section0.xml 교체
        templateZip.file('Contents/section0.xml', sectionXml);
        
        // Preview 텍스트 업데이트
        const previewText = `HWPX 변환 성공!
이 문서는 hwpx-lib를 사용하여 생성되었습니다.

주요 특징:
• 템플릿 기반 접근으로 안정적인 HWPX 생성
• 기존 스타일 ID 활용으로 호환성 보장
• 한글 프로그램에서 완벽하게 열림`;
        
        templateZip.file('Preview/PrvText.txt', previewText);
        
        // 새 HWPX 파일 생성
        const content = await templateZip.generateAsync({ type: 'nodebuffer' });
        const outputPath = path.join(__dirname, 'example.hwpx');
        await fs.writeFile(outputPath, content);
        
        console.log('✅ HWPX 파일 생성 완료:', outputPath);
        
        const stats = await fs.stat(outputPath);
        console.log(`📦 파일 크기: ${Math.round(stats.size / 1024)}KB`);
        
        console.log('\n💡 템플릿 스타일 ID 매핑:');
        console.log('   charPrIDRef="0" - 기본 텍스트 (10pt)');
        console.log('   charPrIDRef="1" - 기본 텍스트 (10pt)');
        console.log('   charPrIDRef="4" - 큰 텍스트 (20pt)');
        console.log('   paraPrIDRef="0" - 기본 문단');
        
        console.log('\n📌 한글에서 생성된 파일을 열어보세요!');
        
    } catch (error) {
        console.error('❌ HWPX 생성 실패:', error);
    }
}

// 실행
generateHwpxExample();
