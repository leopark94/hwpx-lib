# 🚀 HWPX 라이브러리 개선 전략

## 📋 현재 상태 분석

### 확인된 구조
1. **Document** → Body → root[] (실제 요소들)
2. **Body.root[]** 배열에 Paragraph, Table 등이 저장됨
3. **XmlComponent** 기반 클래스 구조

### 핵심 문제
```typescript
// 현재 잘못된 코드 (hwpx-compiler-base.ts:296)
for (const child of body["root"]) {  // ❌ body["root"] 접근 불가
```

## 🎯 즉시 수정 사항

### 1단계: _compileBody 메서드 수정
```typescript
protected _compileBody(documentWrapper: DocumentWrapper): string {
    let xml = "";
    const document = documentWrapper.View;
    const body = document.Body;
    
    // ✅ 올바른 접근: Body 클래스의 root 속성
    // Body는 XmlComponent를 상속받고, root는 protected 속성
    const bodyRoot = (body as any).root;  // 임시 해결책
    
    for (const child of bodyRoot) {
        if (child instanceof Paragraph) {
            xml += this._compileParagraph(child);
        } else if (child instanceof Table) {
            xml += this._compileTable(child);
        }
    }
    
    return xml;
}
```

### 2단계: Paragraph 텍스트 추출 구현
```typescript
protected _compileParagraph(paragraph: Paragraph): string {
    const elementId = this.nextElementId++;
    let runXml = "";
    
    // Paragraph의 root 접근
    const paragraphRoot = (paragraph as any).root;
    
    for (const child of paragraphRoot) {
        // TextRun 처리
        if (child.constructor.name === "TextRun" || child.rootKey === "hp:t") {
            const text = child.root?.[0] || "";  // 실제 텍스트 추출
            if (text) {
                const escapedText = this._escapeXmlText(text);
                runXml += `<hp:run charPrIDRef="0">
                    <hp:t>${escapedText}</hp:t>
                </hp:run>`;
            }
        }
    }
    
    // 빈 문단 처리
    if (!runXml) {
        runXml = '<hp:run charPrIDRef="0"><hp:t></hp:t></hp:run>';
    }
    
    const linesegArray = `<hp:linesegarray>
        <hp:lineseg textpos="0" vertpos="0" vertsize="2400" 
                    textheight="2400" baseline="2040" spacing="480" 
                    horzpos="0" horzsize="42520" flags="393216"/>
    </hp:linesegarray>`;
    
    return `<hp:p id="${elementId}" paraPrIDRef="0" styleIDRef="0" 
                  pageBreak="0" columnBreak="0" merged="0">
        ${runXml}
        ${linesegArray}
    </hp:p>`;
}
```

### 3단계: Table 구현
```typescript
protected _compileTable(table: Table): string {
    const tableId = this.nextElementId++;
    const tableRoot = (table as any).root;
    
    let rowsXml = "";
    let rowCount = 0;
    let colCount = 0;
    
    // TableRow 처리
    for (const row of tableRoot) {
        if (row.constructor.name === "TableRow") {
            rowCount++;
            const rowXml = this._compileTableRow(row);
            rowsXml += rowXml;
            
            // 컬럼 수 계산
            const rowRoot = (row as any).root;
            colCount = Math.max(colCount, rowRoot.length);
        }
    }
    
    return `<hp:tbl id="${tableId}" zOrder="0" numberingType="TABLE" 
                    textWrap="TOP_AND_BOTTOM" textFlow="BOTH_SIDES" 
                    lock="0" dropcapstyle="None" pageBreak="CELL" 
                    repeatHeader="1" rowCnt="${rowCount}" colCnt="${colCount}" 
                    cellSpacing="0" borderFillIDRef="1" noAdjust="0">
        <hp:sz width="47630" widthRelTo="ABSOLUTE" 
               height="${rowCount * 3000}" heightRelTo="ABSOLUTE" protect="0"/>
        <hp:pos treatAsChar="1" affectLSpacing="0" flowWithText="1" 
                allowOverlap="0" holdAnchorAndSO="0" vertRelTo="PARA" 
                horzRelTo="PARA" vertPos="0" horzPos="0" 
                vertOffset="0" horzOffset="0"/>
        <hp:outMargin left="0" right="0" top="0" bottom="0"/>
        ${rowsXml}
    </hp:tbl>`;
}

protected _compileTableRow(row: any): string {
    const rowRoot = row.root;
    let cellsXml = "";
    let colIndex = 0;
    
    for (const cell of rowRoot) {
        if (cell.constructor.name === "TableCell") {
            cellsXml += this._compileTableCell(cell, colIndex++);
        }
    }
    
    return `<hp:tr>
        <hp:sz height="3000" heightRelTo="ABSOLUTE"/>
        ${cellsXml}
    </hp:tr>`;
}

protected _compileTableCell(cell: any, colIndex: number): string {
    const cellRoot = cell.root;
    let contentXml = "";
    
    // 셀 내의 Paragraph 처리
    for (const child of cellRoot) {
        if (child instanceof Paragraph) {
            contentXml += this._compileParagraph(child);
        }
    }
    
    return `<hp:tc>
        <hp:cellAddr colAddr="${colIndex}" rowAddr="0"/>
        <hp:cellSpan colSpan="1" rowSpan="1"/>
        <hp:cellSz width="${47630 / 4}" height="3000"/>
        <hp:cellMargin left="510" right="510" top="141" bottom="141"/>
        <hp:subList>
            ${contentXml}
        </hp:subList>
    </hp:tc>`;
}
```

## 📁 수정할 파일

### 즉시 수정 (Phase 1)
1. **hwpx-compiler-base.ts** - _compileBody, _compileParagraph, _compileTable 메서드

### 추가 개선 (Phase 2)
1. **TextRun 지원** - 볼드, 이탤릭, 크기 등 스타일
2. **이미지 처리** - Bindata 폴더에 이미지 저장
3. **스타일 매핑** - DOCX 스타일을 HWPX 스타일로 변환

## 🧪 테스트 계획

### 단계별 테스트
1. **기본 텍스트**: 단순 문단만 있는 문서
2. **여러 문단**: 3-4개 문단 문서
3. **테이블**: 2x2 테이블 포함 문서
4. **혼합**: 텍스트 + 테이블 문서

### 검증 방법
```bash
# 1. 테스트 실행
node demo/100-hwpx-basic.js

# 2. XML 확인
unzip -p demo/100-hwpx-basic.hwpx Contents/section0.xml | xmllint --format -

# 3. 한컴오피스에서 열기
open demo/100-hwpx-basic.hwpx
```

## 📊 예상 결과

### Phase 1 완료 시
- ✅ 기본 텍스트 표시
- ✅ 여러 문단 지원
- ✅ 간단한 테이블 표시
- ⚠️ 스타일 미지원

### Phase 2 완료 시
- ✅ 텍스트 스타일 (볼드, 이탤릭 등)
- ✅ 이미지 삽입
- ✅ 정렬, 들여쓰기
- ✅ 테이블 스타일

## 🚀 실행 계획

### 오늘 (Phase 1)
1. ✅ 문제 분석 완료
2. ⏳ hwpx-compiler-base.ts 수정
3. ⏳ 기본 테스트 실행
4. ⏳ 결과 검증

### 내일 (Phase 2)
1. TextRun 스타일 구현
2. 이미지 처리
3. 고급 테스트

## 💡 핵심 인사이트

### HWPX vs DOCX 주요 차이
1. **네임스페이스**: `w:` → `hp:`, `hh:`, `hs:` 등
2. **구조**: section 기반 vs body 직접 포함
3. **ID 체계**: 2147483648부터 시작하는 고유 ID
4. **linesegarray**: HWPX 특유의 레이아웃 정보

### 성공 요인
1. **실제 HWPX 분석 데이터** 활용 (203개 파일)
2. **DOCX 라이브러리 구조** 이해
3. **점진적 구현** - 기본부터 시작

## ✅ 체크리스트

- [x] 문제 원인 파악
- [x] Document/Body 구조 이해
- [x] 개선 전략 수립
- [ ] Phase 1 구현
- [ ] 테스트 및 검증
- [ ] Phase 2 계획
- [ ] 문서화