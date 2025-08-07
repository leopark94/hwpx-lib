# HWPX 변환 시 미지원 기능 문서

## 개요
이 문서는 DOCX에서 HWPX로 변환 시 지원하지 못하는 기능들을 정리한 것입니다.

## Character Properties (RunProperties) 미지원 기능

### 1. DOCX 전용 속성들 (HWPX에서 지원 안 됨)
- **w:caps** - 대문자 변환
- **w:smallCaps** - 작은 대문자
- **w:dstrike** - 더블 취소선 (HWPX는 단일 취소선만 지원)
- **w:emboss** - 양각 효과
- **w:imprint** - 음각 효과
- **w:shadow** - 그림자 효과 (부분 지원 - HWPX는 hh:shadow로 구현 필요)
- **w:outline** - 문자 외곽선 (부분 지원 - HWPX는 hh:outline으로 구현 필요)
- **w:rtl** - 오른쪽에서 왼쪽 텍스트
- **w:effect** - 텍스트 애니메이션 효과
- **w:em** - 강조 표시
- **w:cs**, **w:bCs**, **w:iCs** - 복잡한 스크립트 관련 속성
- **w:specVanish** - 특수 숨김 텍스트
- **w:position** - 문자 위치 (부분 지원 - hh:offset으로 매핑했지만 단위 변환 필요)

### 2. HWPX 전용 속성들 (DOCX에서 대응 안 됨)
- **symMark** - 기호 표시
- **useFontSpace** - 폰트 간격 사용
- **relSz** - 상대 크기 (현재 기본값 100으로 고정)
- **fontRef의 hanja, japanese** - 한자/일본어별 폰트 지정

### 3. 부분 지원 기능들
1. **폰트 처리**
   - DOCX: 폰트 이름 직접 지정
   - HWPX: 폰트 인덱스 사용 (현재 모두 "1"로 고정)
   - TODO: 폰트 테이블 매핑 구현 필요

2. **색상 처리**
   - DOCX: w:color 요소로 처리
   - HWPX: charPr의 textColor 속성으로 처리
   - 구현 완료

3. **하이라이트 처리**
   - DOCX: w:highlight 요소로 처리, 색상 이름 사용
   - HWPX: charPr의 shadeColor 속성으로 처리
   - 색상 이름 매핑 필요 (yellow → #FFFF00 등)

4. **언더라인 처리**
   - DOCX: w:u의 val 속성
   - HWPX: hh:underline의 type, shape, color 속성
   - shape는 항상 "SOLID"로 고정됨

5. **크기 단위 변환**
   - DOCX: 1/2 pt 단위
   - HWPX: 1/100 pt 단위
   - 변환 구현 완료

## 구현 제한사항

### 1. 폰트 인덱스 매핑
현재 모든 폰트를 인덱스 "1"로 고정하고 있습니다. 실제로는:
- header.xml의 fontFace 테이블을 읽어서 매핑해야 함
- 폰트 이름 → 인덱스 변환 테이블 구축 필요

### 2. 테두리 참조
- borderFillIDRef 속성이 있지만 현재 구현 안 됨
- BorderFill 테이블 관리 필요

### 3. 그림자/외곽선 효과
- HWPX는 hh:shadow, hh:outline 요소를 지원하지만 미구현
- 추가 구현 필요

## 향후 개선사항

1. **폰트 테이블 관리자 구현**
   ```typescript
   class FontTableManager {
       private fontMap: Map<string, string>;
       
       getFontIndex(fontName: string): string {
           // 폰트 이름을 인덱스로 변환
       }
   }
   ```

2. **색상 이름 매핑**
   ```typescript
   const highlightColorMap = {
       "yellow": "#FFFF00",
       "green": "#00FF00",
       // ...
   };
   ```

3. **BorderFill 테이블 관리**
   - 문자 테두리 효과 구현
   - borderFillIDRef 참조 관리

## Paragraph Properties 미지원 기능

### 1. DOCX 전용 속성들 (HWPX에서 지원 안 됨)
- **w:contextualSpacing** - 맥락적 간격
- **w:mirrorIndents** - 들여쓰기 미러링
- **w:bidi** - 양방향 텍스트 (부분 지원 - hh:bidi로 매핑)
- **w:widowControl** - 고아/과부 제어 (HWPX는 breakSetting[@widowOrphan]으로 처리)
- **w:autoSpaceDE**, **w:autoSpaceDN** - 동아시아 타이포그래피 (HWPX는 hh:autoSpacing으로 처리)
- **w:wordWrap** - 단어 나눔 (HWPX는 breakSetting으로 처리)
- **w:kinsoku** - 금칙 처리
- **w:suppressLineNumbers** - 줄 번호 숨김
- **w:overflowPunct** - 구두점 오버플로우

### 2. HWPX 전용 속성들 (DOCX에서 대응 안 됨)
- **condense** - 압축
- **fontLineHeight** - 폰트 줄 높이
- **snapToGrid** - 격자에 맞춤
- **checked** - 체크 상태
- **heading** - 제목 스타일 (HWPX 특유 방식)
- **breakSetting** - 줄바꿈 설정 (HWPX 특유의 복잡한 설정)

### 3. 부분 지원 기능들
1. **정렬 변환**
   - DOCX: left/right/center/both 등
   - HWPX: LEFT/RIGHT/CENTER/JUSTIFY/DISTRIBUTE
   - 구현 완료 (대문자로 변환)

2. **간격 처리**
   - DOCX: w:spacing의 before/after/line
   - HWPX: hh:margin의 prev/next와 hh:lineSpacing 분리
   - 구현 완료

3. **들여쓰기 처리**
   - DOCX: w:ind의 firstLine/hanging
   - HWPX: hh:margin의 intent (음수는 내어쓰기)
   - 구현 완료

## Table Properties 미지원 기능

### 1. DOCX 전용 속성들 (HWPX에서 지원 안 됨)
- **w:tblStyle** - 테이블 스타일
- **w:tblInd** - 테이블 들여쓰기 (부분 지원)
- **w:tblLook** - 테이블 모양
- **w:tblCellMar** - 셀 마진
- **w:tblLayout** - 테이블 레이아웃 (부분 지원)
- **w:tblStyleRowBandSize** - 행 밴드 크기
- **w:tblStyleColBandSize** - 열 밴드 크기
- **w:tblCaption** - 테이블 캡션
- **w:tblDescription** - 테이블 설명

### 2. HWPX 전용 속성들 (DOCX에서 대응 안 됨)
- **zOrder** - Z-순서
- **numberingType** - 번호 유형
- **borderFillIDRef** - 테두리 채우기 참조

### 3. 부분 지원 기능들
1. **테두리 처리**
   - 기본 테두리는 지원
   - 복잡한 테두리 스타일은 제한적

2. **너비 처리**
   - 기본 너비 설정 지원
   - 복잡한 너비 계산은 제한적

## 테스트 필요 항목

1. 다양한 폰트 사용 시 인덱스 매핑
2. 특수 문자 효과 (양각, 음각, 그림자)
3. 복잡한 언더라인 스타일
4. 동아시아 언어별 폰트 지정
5. 문자 간격 및 위치 조정
6. 단락 정렬 및 간격 설정
7. 테이블 레이아웃 및 테두리
8. 들여쓰기 및 내어쓰기
9. 줄 간격 설정
10. 테이블 셀 병합 및 분할
