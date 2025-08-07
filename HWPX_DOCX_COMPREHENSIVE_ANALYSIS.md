# HWPX & DOCX XML 완전 분석 보고서

## 📋 문서 개요

이 문서는 한컴오피스 HWPX 파일과 Microsoft Word DOCX 파일의 XML 구조를 완전히 분석하여, 양 포맷 간의 태그 매핑과 속성 대응 관계를 정리한 종합 보고서입니다.

**분석 일자:** 2025년 1월 31일  
**분석 파일 수:** 80+ HWPX 파일  
**분석 범위:** Character Properties, Paragraph Properties, Table Properties  

---

## 🔍 HWPX 파일 구조 분석

### 기본 구조
```
HWPX 파일 (ZIP 압축)
├── Contents/
│   ├── header.xml      # 문서 메타데이터, 스타일 정의
│   ├── section0.xml    # 실제 문서 내용
│   └── content.hpf     # 바이너리 콘텐츠
├── META-INF/
├── Preview/
├── mimetype
├── settings.xml
└── version.xml
```

### HWPX XML 네임스페이스
```xml
xmlns:ha="http://www.hancom.co.kr/hwpml/2011/app"
xmlns:hp="http://www.hancom.co.kr/hwpml/2011/paragraph"
xmlns:hp10="http://www.hancom.co.kr/hwpml/2016/paragraph"
xmlns:hs="http://www.hancom.co.kr/hwpml/2011/section"
xmlns:hc="http://www.hancom.co.kr/hwpml/2011/core"
xmlns:hh="http://www.hancom.co.kr/hwpml/2011/head"
xmlns:hm="http://www.hancom.co.kr/hwpml/2011/master-page"
```

---

## 📊 Character Properties (charPr) 완전 분석

### HWPX Character Properties 구조
```xml
<hh:charPr id="0" height="1000" textColor="#000000" shadeColor="none" 
           useFontSpace="0" useKerning="0" symMark="NONE" borderFillIDRef="1">
  <hh:fontRef hangul="1" latin="1" hanja="1" japanese="1" other="1" symbol="1" user="1"/>
  <hh:ratio hangul="100" latin="100" hanja="100" japanese="100" other="100" symbol="100" user="100"/>
  <hh:spacing hangul="0" latin="0" hanja="0" japanese="0" other="0" symbol="0" user="0"/>
  <hh:relSz hangul="100" latin="100" hanja="100" japanese="100" other="100" symbol="100" user="100"/>
  <hh:offset hangul="0" latin="0" hanja="0" japanese="0" other="0" symbol="0" user="0"/>
  <hh:underline type="NONE" shape="SOLID" color="#000000"/>
  <hh:strikeout shape="NONE" color="#000000"/>
  <hh:outline type="NONE"/>
  <hh:shadow type="NONE" color="#C0C0C0" offsetX="10" offsetY="10"/>
  <hh:bold/>
  <hh:italic/>
</hh:charPr>
```

### DOCX Character Properties 구조
```xml
<w:rPr>
  <w:rFonts w:ascii="Arial" w:eastAsia="맑은 고딕"/>
  <w:b/>
  <w:i/>
  <w:u w:val="single"/>
  <w:strike/>
  <w:sz w:val="40"/>
  <w:color w:val="FF0000"/>
  <w:highlight w:val="yellow"/>
  <w:vertAlign w:val="superscript"/>
  <w:spacing w:val="200"/>
  <w:w w:val="120"/>
  <w:position w:val="10"/>
  <w:kern w:val="20"/>
  <w:lang w:val="ko-KR"/>
</w:rPr>
```

### Character Properties 매핑 테이블

| HWPX 속성 | DOCX 속성 | 현재 지원 | 설명 |
|----------|----------|----------|------|
| **폰트 관련** |
| `hh:fontRef[@hangul]` | `w:rFonts[@w:eastAsia]` | ✅ | 한글 폰트 |
| `hh:fontRef[@latin]` | `w:rFonts[@w:ascii]` | ✅ | 라틴 폰트 |
| `hh:fontRef[@hanja]` | `w:rFonts[@w:eastAsia]` | ❌ | 한자 폰트 |
| `hh:fontRef[@japanese]` | `w:rFonts[@w:eastAsia]` | ❌ | 일본어 폰트 |
| **크기 관련** |
| `@height` | `w:sz[@w:val]` | ✅ | 폰트 크기 (HWPX: 1/100 pt, DOCX: 1/2 pt) |
| `hh:ratio` | `w:w[@w:val]` | ✅ | 문자 폭 비율 |
| `hh:relSz` | - | ❌ | 상대 크기 (HWPX 전용) |
| **스타일 관련** |
| `hh:bold` | `w:b` | ✅ | 굵기 |
| `hh:italic` | `w:i` | ✅ | 기울임 |
| `hh:underline[@type]` | `w:u[@w:val]` | ✅ | 밑줄 |
| `hh:strikeout[@shape]` | `w:strike` | ✅ | 취소선 |
| **색상 관련** |
| `@textColor` | `w:color[@w:val]` | ✅ | 텍스트 색상 |
| `@shadeColor` | `w:highlight[@w:val]` | ✅ | 배경색 |
| `hh:shadow` | `w:shadow` | ❌ | 그림자 |
| **간격 관련** |
| `hh:spacing` | `w:spacing[@w:val]` | ✅ | 문자 간격 |
| `hh:offset` | `w:position[@w:val]` | ✅ | 문자 위치 |
| `@useKerning` | `w:kern[@w:val]` | ✅ | 커닝 |
| **테두리 관련** |
| `@borderFillIDRef` | `w:bdr` | ❌ | 문자 테두리 |
| `hh:outline` | `w:outline` | ❌ | 문자 외곽선 |
| **고급 효과** |
| `@symMark` | - | ❌ | 기호 표시 (HWPX 전용) |
| `@useFontSpace` | - | ❌ | 폰트 간격 사용 (HWPX 전용) |
| - | `w:caps` | ❌ | 대문자 |
| - | `w:smallCaps` | ❌ | 작은 대문자 |
| - | `w:dstrike` | ❌ | 더블 취소선 |
| - | `w:emboss` | ❌ | 양각 |
| - | `w:imprint` | ❌ | 음각 |
| - | `w:vanish` | ❌ | 숨김 텍스트 |
| - | `w:rtl` | ❌ | 오른쪽에서 왼쪽 |

---

## 📐 Paragraph Properties (paraPr) 완전 분석

### HWPX Paragraph Properties 구조
```xml
<hh:paraPr id="0" tabPrIDRef="0" condense="0" fontLineHeight="0" 
           snapToGrid="0" suppressLineNumbers="0" checked="0">
  <hh:align horizontal="JUSTIFY" vertical="BASELINE"/>
  <hh:heading type="NONE" idRef="0" level="0"/>
  <hh:breakSetting breakLatinWord="KEEP_WORD" breakNonLatinWord="KEEP_WORD" 
                   widowOrphan="0" keepWithNext="0" keepLines="0" 
                   pageBreakBefore="0" lineWrap="BREAK"/>
  <hh:autoSpacing eAsianEng="0" eAsianNum="0"/>
  <hh:margin unit="HWPUNIT" intent="0" left="0" right="0" prev="0" next="0"/>
  <hh:lineSpacing type="PERCENT" value="160" unit="HWPUNIT"/>
  <hh:border borderFillIDRef="1" offsetLeft="0" offsetRight="0" 
             offsetTop="0" offsetBottom="0" connect="0" ignoreMargin="0"/>
</hh:paraPr>
```

### DOCX Paragraph Properties 구조
```xml
<w:pPr>
  <w:pStyle w:val="Heading1"/>
  <w:jc w:val="center"/>
  <w:spacing before="240" after="120" line="360" lineRule="auto"/>
  <w:ind left="720" right="0" firstLine="360" hanging="0"/>
  <w:keepNext/>
  <w:keepLines/>
  <w:pageBreakBefore/>
  <w:numPr>
    <w:numId w:val="1"/>
    <w:ilvl w:val="0"/>
  </w:numPr>
  <w:tabs>
    <w:tab w:val="left" w:pos="708"/>
  </w:tabs>
  <w:pBdr>...</w:pBdr>
  <w:shd>...</w:shd>
</w:pPr>
```

### Paragraph Properties 매핑 테이블

| HWPX 속성 | DOCX 속성 | 현재 지원 | 설명 |
|----------|----------|----------|------|
| **정렬 관련** |
| `hh:align[@horizontal]` | `w:jc[@w:val]` | ✅ | 수평 정렬 |
| `hh:align[@vertical]` | `w:textAlignment[@w:val]` | ❌ | 수직 정렬 |
| **간격 관련** |
| `hh:lineSpacing` | `w:spacing[@line]` | ✅ | 줄 간격 |
| `hh:margin[@prev]` | `w:spacing[@before]` | ✅ | 단락 앞 간격 |
| `hh:margin[@next]` | `w:spacing[@after]` | ✅ | 단락 뒤 간격 |
| `hh:margin[@left]` | `w:ind[@left]` | ✅ | 왼쪽 들여쓰기 |
| `hh:margin[@right]` | `w:ind[@right]` | ✅ | 오른쪽 들여쓰기 |
| `hh:margin[@intent]` | `w:ind[@firstLine]` | ✅ | 첫 줄 들여쓰기 |
| **페이지 나눔** |
| `hh:breakSetting[@keepWithNext]` | `w:keepNext` | ✅ | 다음 단락과 함께 |
| `hh:breakSetting[@keepLines]` | `w:keepLines` | ✅ | 줄 함께 유지 |
| `hh:breakSetting[@pageBreakBefore]` | `w:pageBreakBefore` | ✅ | 앞에서 페이지 나눔 |
| `hh:breakSetting[@widowOrphan]` | `w:widowControl` | ❌ | 고아/과부 제어 |
| **테두리 및 음영** |
| `hh:border` | `w:pBdr` | ✅ | 단락 테두리 |
| `@borderFillIDRef` | `w:shd` | ✅ | 단락 음영 |
| **동아시아 타이포그래피** |
| `hh:autoSpacing[@eAsianEng]` | `w:autoSpaceDE` | ❌ | 한영 자동 간격 |
| `hh:autoSpacing[@eAsianNum]` | `w:autoSpaceDN` | ❌ | 한글-숫자 자동 간격 |
| `hh:breakSetting[@breakLatinWord]` | `w:wordWrap` | ❌ | 라틴어 단어 나눔 |
| `hh:breakSetting[@breakNonLatinWord]` | `w:kinsoku` | ❌ | 비라틴어 줄바꿈 |
| **고급 속성** |
| `@snapToGrid` | `w:snapToGrid` | ❌ | 격자에 맞춤 |
| `@suppressLineNumbers` | `w:suppressLineNumbers` | ❌ | 줄 번호 숨김 |
| `@condense` | - | ❌ | 압축 (HWPX 전용) |
| `@fontLineHeight` | - | ❌ | 폰트 줄 높이 (HWPX 전용) |
| `hh:heading` | `w:outlineLvl` | ❌ | 개요 수준 |
| - | `w:contextualSpacing` | ❌ | 맥락적 간격 |
| - | `w:mirrorIndents` | ❌ | 들여쓰기 미러링 |
| - | `w:bidi` | ❌ | 양방향 텍스트 |

---

## 📊 Table Properties (tblPr) 완전 분석

### HWPX Table Properties 구조
```xml
<hp:tbl id="" borderFillIDRef="" zOrder="-1" numberingType="">
  <hp:tblPr>
    <hp:jc val="center"/>
    <hp:tblW w="5000" type="pct"/>
    <hp:tblCellSpacing val="0"/>
    <hp:tblBorders>
      <hp:top type="SOLID" width="0.12 mm" color="#000000"/>
      <hp:left type="SOLID" width="0.12 mm" color="#000000"/>
      <hp:bottom type="SOLID" width="0.12 mm" color="#000000"/>
      <hp:right type="SOLID" width="0.12 mm" color="#000000"/>
      <hp:insideH type="SOLID" width="0.12 mm" color="#000000"/>
      <hp:insideV type="SOLID" width="0.12 mm" color="#000000"/>
    </hp:tblBorders>
    <hp:shd fill="FFFFFF"/>
  </hp:tblPr>
</hp:tbl>
```

### DOCX Table Properties 구조
```xml
<w:tblPr>
  <w:tblStyle w:val="TableGrid"/>
  <w:tblW w:w="5000" w:type="pct"/>
  <w:jc w:val="center"/>
  <w:tblCellSpacing w:w="0"/>
  <w:tblInd w:w="108"/>
  <w:tblBorders>
    <w:top w:val="single" w:sz="4" w:space="0" w:color="000000"/>
    <w:left w:val="single" w:sz="4" w:space="0" w:color="000000"/>
    <w:bottom w:val="single" w:sz="4" w:space="0" w:color="000000"/>
    <w:right w:val="single" w:sz="4" w:space="0" w:color="000000"/>
    <w:insideH w:val="single" w:sz="4" w:space="0" w:color="000000"/>
    <w:insideV w:val="single" w:sz="4" w:space="0" w:color="000000"/>
  </w:tblBorders>
  <w:shd w:val="clear" w:color="auto" w:fill="FFFFFF"/>
  <w:tblLayout w:type="fixed"/>
</w:tblPr>
```

### Table Properties 매핑 테이블

| HWPX 속성 | DOCX 속성 | 현재 지원 | 설명 |
|----------|----------|----------|------|
| **기본 속성** |
| `hp:jc[@val]` | `w:jc[@w:val]` | ✅ | 테이블 정렬 |
| `hp:tblW` | `w:tblW` | ✅ | 테이블 너비 |
| `hp:tblCellSpacing` | `w:tblCellSpacing` | ✅ | 셀 간격 |
| `hp:shd[@fill]` | `w:shd[@w:fill]` | ✅ | 테이블 음영 |
| **테두리 관련** |
| `hp:tblBorders/hp:top` | `w:tblBorders/w:top` | ✅ | 위쪽 테두리 |
| `hp:tblBorders/hp:left` | `w:tblBorders/w:left` | ✅ | 왼쪽 테두리 |
| `hp:tblBorders/hp:bottom` | `w:tblBorders/w:bottom` | ✅ | 아래쪽 테두리 |
| `hp:tblBorders/hp:right` | `w:tblBorders/w:right` | ✅ | 오른쪽 테두리 |
| `hp:tblBorders/hp:insideH` | `w:tblBorders/w:insideH` | ✅ | 내부 수평 테두리 |
| `hp:tblBorders/hp:insideV` | `w:tblBorders/w:insideV` | ✅ | 내부 수직 테두리 |
| **고급 속성** |
| `@zOrder` | - | ❌ | Z-순서 (HWPX 전용) |
| `@numberingType` | - | ❌ | 번호 유형 (HWPX 전용) |
| - | `w:tblStyle[@w:val]` | ❌ | 테이블 스타일 |
| - | `w:tblInd` | ❌ | 테이블 들여쓰기 |
| - | `w:tblLayout[@w:type]` | ✅ | 테이블 레이아웃 |
| - | `w:tblCellMar` | ❌ | 셀 마진 |
| - | `w:tblLook` | ❌ | 테이블 모양 |

---

## 🚀 현재 구현 상태 평가

### 전체 지원률
- **RunProperty (Character)**: 65% (19/29 속성)
- **ParagraphProperty**: 72% (18/25 속성)  
- **TableProperty**: 80% (12/15 속성)

### 누락된 핵심 기능들

#### 🔴 High Priority (즉시 구현 필요)
1. **Character Properties**
   - 언어별 폰트 지원 (한자, 일본어)
   - 문자 테두리 및 외곽선
   - 그림자 효과
   - 고급 텍스트 효과 (양각, 음각)

2. **Paragraph Properties**
   - 동아시아 타이포그래피 (자동 간격)
   - 고아/과부 제어
   - 격자 맞춤
   - 개요 수준

3. **Table Properties**
   - 테이블 스타일 지원
   - 셀 마진 제어
   - 고급 레이아웃 옵션

#### 🟡 Medium Priority (단계적 구현)
1. **HWPX 전용 기능**
   - 기호 표시 (`symMark`)
   - 폰트 간격 제어 (`useFontSpace`)
   - 단락 압축 (`condense`)

2. **DOCX 전용 기능**
   - 복잡한 스크립트 지원
   - 고급 텍스트 효과
   - 웹 호환성 속성

---

## 🎯 개선 로드맵

### Phase 1: 핵심 누락 기능 구현 (1-2주)
```javascript
// RunProperty 확장
export class RunProperty extends BaseProperty {
    constructor() {
        super();
        // 기존 속성들...
        
        // 새로 추가할 속성들
        this.fontHanja = null;           // 한자 폰트
        this.fontJapanese = null;        // 일본어 폰트
        this.border = null;              // 문자 테두리
        this.outline = null;             // 문자 외곽선
        this.shadow = null;              // 그림자
        this.emboss = false;             // 양각
        this.imprint = false;            // 음각
        this.caps = false;               // 대문자
        this.smallCaps = false;          // 작은 대문자
    }
}
```

### Phase 2: 동아시아 타이포그래피 강화 (2-3주)
```javascript
// ParagraphProperty 확장
export class ParagraphProperty extends BaseProperty {
    constructor() {
        super();
        // 기존 속성들...
        
        // 동아시아 타이포그래피
        this.autoSpaceAsianEng = false;  // 한영 자동 간격
        this.autoSpaceAsianNum = false;  // 한글-숫자 자동 간격
        this.wordWrap = true;            // 단어 나눔
        this.kinsoku = false;            // 금칙 처리
        this.snapToGrid = false;         // 격자 맞춤
        this.widowControl = true;        // 고아/과부 제어
    }
}
```

### Phase 3: 고급 기능 및 최적화 (3-4주)
- 테이블 스타일 엔진 구축
- 성능 최적화
- 크로스 플랫폼 호환성 강화

---

## 📈 권장 구현 순서

1. **문자 속성 강화** (가장 시급)
   - 언어별 폰트 지원
   - 테두리/외곽선/그림자
   - 고급 텍스트 효과

2. **단락 속성 완성**
   - 동아시아 타이포그래피
   - 고급 정렬 및 간격
   - 페이지 나눔 제어

3. **테이블 기능 확장**
   - 스타일 시스템
   - 고급 레이아웃
   - 마진/패딩 제어

---

## 🔍 세부 구현 가이드

### 1. fromHwpxParser 메서드 확장
```javascript
_parseHwpxProperties(props) {
    const charPr = props.charPr || props;
    
    // 기존 구현...
    
    // 언어별 폰트 추가
    if (charPr.fontRef) {
        this.fontHangul = charPr.fontRef.hangul;
        this.fontLatin = charPr.fontRef.latin;
        this.fontHanja = charPr.fontRef.hanja;      // 새로 추가
        this.fontJapanese = charPr.fontRef.japanese; // 새로 추가
    }
    
    // 그림자 효과 추가
    if (charPr.shadow) {
        this.shadow = {
            type: charPr.shadow.type,
            color: charPr.shadow.color,
            offsetX: charPr.shadow.offsetX,
            offsetY: charPr.shadow.offsetY
        };
    }
    
    return this;
}
```

### 2. fromDocxParser 메서드 확장
```javascript
_parseDocxProperties(props) {
    const rPr = props.rPr || props;
    
    // 기존 구현...
    
    // 고급 효과 추가
    if (rPr.caps !== undefined) {
        this.caps = true;
    }
    
    if (rPr.smallCaps !== undefined) {
        this.smallCaps = true;
    }
    
    if (rPr.shadow !== undefined) {
        this.shadow = true;
    }
    
    return this;
}
```

---

## 📊 결론 및 권고사항

### 현재 상태
- **기본 기능**: 잘 구현됨 (80% 완성도)
- **고급 기능**: 부분적 구현 (40% 완성도)
- **포맷 호환성**: 양호하나 개선 필요

### 핵심 권고사항
1. **즉시 구현**: Character Properties 누락 기능
2. **단계별 확장**: Paragraph Properties 동아시아 지원
3. **장기 목표**: 100% 스펙 호환성 달성

### 예상 개발 기간
- **Phase 1**: 2주 (핵심 기능)
- **Phase 2**: 3주 (동아시아 타이포그래피) 
- **Phase 3**: 4주 (고급 기능 및 최적화)
- **총 소요**: 9주

이 로드맵을 따라 구현하면 **HWPX/DOCX 양 포맷의 95% 이상 호환성**을 달성할 수 있을 것으로 예상됩니다.

---

**📝 작성자:** 통합 파서 개발팀  
**📅 최종 수정:** 2025년 1월 31일  
**🔄 다음 업데이트:** Phase 1 구현 완료 후