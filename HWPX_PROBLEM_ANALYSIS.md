# 🔍 HWPX 파일 빈 내용 문제 원인 분석

## 📋 문제 요약
생성된 HWPX 파일을 열면 내용이 표시되지 않는 문제

## 🎯 근본 원인 분석

### 1. **_compileBody 메서드의 불완전한 구현**
`hwpx-compiler-base.ts`의 293-308줄에서:

```typescript
protected _compileBody(documentWrapper: DocumentWrapper): string {
    let xml = "";
    const document = documentWrapper.View;
    const body = document.Body;
    
    for (const child of body["root"]) {  // ⚠️ 문제: body["root"] 접근 방식
        if (child instanceof Paragraph) {
            xml += this._compileParagraph(child);
        } else if (child instanceof Table) {
            xml += this._compileTable(child);
        }
    }
    return xml;
}
```

**문제점:**
- `body["root"]`가 실제로 존재하지 않거나 빈 배열
- DocumentWrapper의 구조가 DOCX 라이브러리와 다름
- 실제 문서 내용이 다른 속성에 저장되어 있을 가능성

### 2. **_compileParagraph 메서드의 하드코딩**
310-339줄에서:

```typescript
protected _compileParagraph(paragraph: Paragraph): string {
    // ...
    const text = "텍스트"; // ⚠️ 문제: 하드코딩된 텍스트
    // ...
}
```

**문제점:**
- 실제 Paragraph 객체의 텍스트를 추출하지 않음
- 모든 문단이 "텍스트"라는 동일한 내용으로 변환됨

### 3. **테이블 내용 누락**
341-352줄에서:

```typescript
protected _compileTable(table: Table): string {
    // 테이블 구조만 생성, 실제 셀 내용은 처리하지 않음
    return `<hp:tbl ...>...</hp:tbl>`;
}
```

**문제점:**
- TableRow와 TableCell 처리 로직 없음
- 테이블 내부 텍스트가 전혀 포함되지 않음

## 🛠️ 해결 방안

### 1. **DocumentWrapper 구조 분석 및 수정**
```typescript
// 올바른 접근 방식 확인 필요
const sections = documentWrapper.Document.Body.Sections;
for (const section of sections) {
    for (const child of section.Children) {
        // 실제 자식 요소 처리
    }
}
```

### 2. **Paragraph 텍스트 추출 구현**
```typescript
protected _compileParagraph(paragraph: Paragraph): string {
    let runXml = "";
    
    // paragraph.root를 통해 실제 TextRun 접근
    for (const child of paragraph.root) {
        if (child.type === "text-run") {
            const text = child.text || "";
            const escapedText = this._escapeXmlText(text);
            runXml += `<hp:run charPrIDRef="0">
                <hp:t>${escapedText}</hp:t>
            </hp:run>`;
        }
    }
    // ...
}
```

### 3. **Table 완전 구현**
```typescript
protected _compileTable(table: Table): string {
    let rowsXml = "";
    
    for (const row of table.root) {
        if (row.type === "table-row") {
            rowsXml += this._compileTableRow(row);
        }
    }
    
    return `<hp:tbl ...>${rowsXml}</hp:tbl>`;
}

protected _compileTableRow(row: TableRow): string {
    let cellsXml = "";
    
    for (const cell of row.root) {
        if (cell.type === "table-cell") {
            cellsXml += this._compileTableCell(cell);
        }
    }
    
    return `<hp:tr>${cellsXml}</hp:tr>`;
}
```

## 📊 영향 범위

### 고쳐야 할 파일들:
1. `hwpx-compiler-base.ts` - 핵심 컴파일 로직
2. `document-wrapper.ts` - 문서 구조 접근 방식
3. `paragraph.ts` - 문단 데이터 구조
4. `table.ts` - 테이블 데이터 구조

### 추가 필요 기능:
1. TextRun 실제 텍스트 추출
2. 스타일 속성 매핑
3. 이미지/미디어 처리
4. 번호 매기기/불릿 리스트

## 🚀 즉시 실행 가능한 개선

### Step 1: 디버깅을 위한 로그 추가
```typescript
protected _compileBody(documentWrapper: DocumentWrapper): string {
    console.log("DocumentWrapper structure:", documentWrapper);
    console.log("Document:", documentWrapper.Document);
    console.log("Body:", documentWrapper.Document?.Body);
    // ...
}
```

### Step 2: 실제 구조 파악 후 수정
실제 DocumentWrapper 객체의 구조를 확인하고 올바른 접근 경로 설정

### Step 3: 최소 동작 버전 구현
텍스트만이라도 정상적으로 표시되도록 수정

## 📈 우선순위

1. **긴급**: _compileBody 메서드 수정 - 문서 내용 접근
2. **높음**: _compileParagraph 실제 텍스트 추출
3. **중간**: Table 구조 완전 구현
4. **낮음**: 스타일 및 포맷팅 지원

## ✅ 검증 방법

1. 간단한 텍스트만 있는 문서 테스트
2. 생성된 section0.xml 파일 직접 확인
3. 한컴오피스에서 열어서 확인
4. XML 유효성 검사

## 🎯 예상 결과
이 수정을 완료하면:
- 기본 텍스트가 정상 표시됨
- 테이블 구조와 내용이 표시됨
- 기본적인 문서 변환이 가능해짐