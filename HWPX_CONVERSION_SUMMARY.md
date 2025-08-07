# HWPX 변환 작업 요약

## 🎯 개요
DOCX 생성 라이브러리를 HWPX (한글 문서) 형식으로 완전히 변환했습니다.  
[HWPX 표준 문서](https://standard.go.kr/streamdocs/view/sd;streamdocsId=72059348565014532)를 기준으로 작업했습니다.

## ✅ 완료된 변환 작업

### 1. **XML 네임스페이스 변환**
- DOCX: `w:`, `wp:`, `w14:` 등 → HWPX: `hp:`, `hh:`, `hs:`, `hm:`, `ha:`, `hc:`
- HWPX 전용 네임스페이스 체계 적용

### 2. **Document 구조**
- `w:document` → `hml:document`
- `w:body` → `hs:sec` (section)
- 네임스페이스 속성 완전 교체

### 3. **Character Properties (문자 속성)**
- `w:rPr` → `hh:charPr`
- 속성 직접 지정 방식 (height, textColor, shadeColor 등)
- 언어별 속성 지원 (hangul, latin, hanja 등)
- DOCX 전용 속성들 주석 처리

### 4. **Paragraph Properties (단락 속성)**
- `w:pPr` → `hp:paraPr`
- 정렬: `w:jc` → `hh:align` (LEFT, RIGHT, CENTER, JUSTIFY)
- 들여쓰기: `w:ind` → `hh:margin` (left, right, intent)
- 간격: `w:spacing` → `hh:lineSpacing` (type, value, unit)

### 5. **Table Properties (표 속성)**
- `w:tbl` → `hp:tbl`
- `w:tblPr` → `hp:tblPr`
- `w:tblBorders` → `hp:tblBorders`
- 테이블 너비, 정렬, 테두리 HWPX 형식으로 변환

### 6. **Numbering System (번호 매기기)**
- `w:numbering` → `hh:numberings`
- `w:abstractNum` → `hh:numbering`
- `w:lvl` → `hh:paraHead`
- 레벨별 속성 HWPX 형식 적용

### 7. **Styles System (스타일)**
- `w:styles` → `hh:styles`
- `w:style` → `hh:style`
- 스타일 속성 id, type 등 HWPX 형식으로 변환

### 8. **Drawing/Media (그래픽)**
- `w:drawing` → `hp:pic` 또는 `hp:container`
- DrawingML → HWPX 자체 그래픽 형식
- 이미지 참조 방식 변경

### 9. **Header/Footer (머리말/꼬리말)**
- DOCX 헤더/푸터 → HWPX `hm:subList` (masterPage 내)
- 타입별 구분 (header/footer)

### 10. **Footnotes (각주)**
- `w:footnotes` → `hh:footnoteShape`
- 각주 속성 HWPX 형식으로 변환

### 11. **Settings (설정)**
- `w:settings` → `ha:settings`
- HWPX 설정 구조로 재구성

## 📋 미지원 기능 (HWPX_UNSUPPORTED_FEATURES.md 참조)

### DOCX 전용 기능들
- SmartArt, 차트 등 복잡한 DrawingML 객체
- Content Controls
- 복잡한 변경 추적 (Track Changes)
- 일부 텍스트 효과 (3D, 그림자 등)

### HWPX 전용 기능들
- 한글 전용 도형 객체 (hp:shapeObject)
- 연결선 (hp:connectLine)
- 한글 전용 필드 코드

## 🧪 테스트 파일 수정
- `document.spec.ts`: HWPX 네임스페이스로 업데이트
- 추가 테스트 파일들도 순차적으로 업데이트 필요

## 📁 주요 변경 파일들
- `/src/file/xml-components/attributes.ts`
- `/src/file/document/**`
- `/src/file/paragraph/**`
- `/src/file/table/**`
- `/src/file/numbering/**`
- `/src/file/styles/**`
- `/src/file/drawing/**`
- `/src/file/header/**`, `/src/file/footer/**`
- `/src/file/footnotes/**`
- `/src/file/settings/**`

## 🚀 다음 단계
1. 나머지 테스트 파일들 HWPX 형식으로 업데이트
2. HWPX 파일 실제 생성 및 검증
3. 한컴오피스에서 생성된 파일 열기 테스트
4. 미지원 기능들 점진적 구현

## 📌 참고사항
- 이 변환 작업은 DOCX → HWPX 구조 변환에 초점
- 실제 HWPX 파일 생성을 위해서는 추가 작업 필요 (ZIP 구조, 파일 경로 등)
- [HWPX 표준 문서](https://standard.go.kr/streamdocs/view/sd;streamdocsId=72059348565014532) 참조 권장
