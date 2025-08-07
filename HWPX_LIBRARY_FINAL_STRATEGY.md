# 🚀 HWPX 라이브러리 최종 전략 문서

## 📋 프로젝트 목표
**DOCX 라이브러리를 기반으로 한 HWPX(한글) 파일 포맷 지원 라이브러리 구축**

## ⚠️ 중요 원칙
1. **모든 import는 `"hwpx"`를 사용** - DOCX가 아닌 HWPX 라이브러리임을 명확히
2. **File 클래스 사용** - Document가 아닌 File 클래스가 메인 엔트리포인트
3. **한글 고유 포맷 지원** - HWPX만의 특별한 구조와 속성 구현

## 🎯 현재 상태 (Phase 1 완료)

### ✅ 완료된 작업
- XmlComponent.root 접근 방식 수정
- TextRun 텍스트 추출 구현
- Table 기본 구조 처리
- 디버깅 로그 추가

### ⚠️ 남은 이슈
- section0.xml 조기 종료 문제
- 전체 내용이 포함되지 않음
- 스타일 속성 미지원

## 📂 프로젝트 구조

```
hwpx-lib/
├── src/
│   ├── export/
│   │   └── packer/
│   │       ├── hwpx-compiler-base.ts    # 핵심 컴파일 로직
│   │       ├── hwpx-main-compiler.ts    # 메인 HWPX 생성
│   │       └── hwpx-template-compiler.ts # 템플릿 기반 생성
│   ├── file/
│   │   ├── file.ts                      # File 클래스 (메인)
│   │   ├── document/                    # 문서 구조
│   │   ├── paragraph/                   # 문단 처리
│   │   └── table/                       # 테이블 처리
│   └── index.ts                         # 메인 export
├── demo/
│   └── 100-hwpx-basic.ts               # HWPX 테스트 데모
└── package.json                         # name: "hwpx"
```

## 🔧 핵심 수정 사항

### 1. Package.json
```json
{
  "name": "hwpx",
  "version": "1.0.0",
  "description": "Generate HWPX files with JavaScript and TypeScript"
}
```

### 2. Import 구조
```typescript
// ✅ 올바른 사용법
import { File, Paragraph, TextRun, Table } from "hwpx";

// ❌ 잘못된 사용법
import { Document } from "docx";  // 절대 사용 금지!
```

### 3. 기본 사용 예제
```typescript
import { File, Paragraph, TextRun, Packer } from "hwpx";

const doc = new File({
    sections: [{
        properties: {},
        children: [
            new Paragraph({
                children: [
                    new TextRun("한글 HWPX 문서"),
                ],
            }),
        ]
    }]
});

Packer.toBuffer(doc).then(buffer => {
    fs.writeFileSync("output.hwpx", buffer);
});
```

## 🎨 HWPX 고유 특징

### 네임스페이스
- `hp:` - paragraph (문단)
- `hs:` - section (섹션)
- `hh:` - head (헤더/스타일)
- `hc:` - core (코어 속성)
- `ha:` - app (애플리케이션)

### 고유 ID 체계
- 시작값: 2147483648
- 순차 증가

### 필수 요소
- `linesegarray` - 모든 문단에 필수
- `charPrIDRef` - 문자 스타일 참조
- `paraPrIDRef` - 문단 스타일 참조

## 📈 Phase 2 계획

### 즉시 수정 필요
1. **_compileSection 수정**
   - 전체 Body 내용 포함
   - XML 조기 종료 문제 해결

2. **스타일 지원**
   - Bold, Italic, Underline
   - Font size, color
   - Alignment (left, center, right, justify)

3. **이미지 처리**
   - Bindata 폴더 구조
   - 이미지 참조 방식

### 중장기 계획
1. **고급 테이블**
   - 병합 셀
   - 테이블 스타일
   - 중첩 테이블

2. **문서 요소**
   - 머리글/바닥글
   - 페이지 번호
   - 목차

3. **한글 특화 기능**
   - 한자 변환
   - 글자 모양
   - 문단 번호

## 🧪 테스트 전략

### 단위 테스트
```bash
# 기본 텍스트
npm run test:text

# 테이블
npm run test:table

# 스타일
npm run test:style
```

### 통합 테스트
```bash
# 전체 문서 생성
npm run test:integration

# 한컴오피스 호환성
npm run test:compatibility
```

## 📝 커밋 규칙

### 형식
```
feat: HWPX 기능 추가
fix: HWPX 버그 수정
docs: HWPX 문서 업데이트
test: HWPX 테스트 추가
refactor: HWPX 코드 개선
```

### 예시
```bash
git commit -m "feat: HWPX 텍스트 스타일 지원 추가

- Bold, Italic, Underline 구현
- Font size 변환 로직
- Color 속성 매핑

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

## ⚡ Quick Start

### 설치
```bash
npm install hwpx
```

### 사용
```typescript
import { File, Paragraph, TextRun, Packer } from "hwpx";

// 문서 생성
const doc = new File({
    sections: [{
        children: [
            new Paragraph({
                children: [new TextRun("Hello HWPX!")],
            }),
        ],
    }],
});

// 파일 저장
const buffer = await Packer.toBuffer(doc);
fs.writeFileSync("hello.hwpx", buffer);
```

## 🚨 주의사항

1. **절대 "docx" import 사용 금지**
2. **Document 클래스 대신 File 클래스 사용**
3. **HWPX 고유 속성 유지**
4. **한글 인코딩 UTF-8 필수**

## 📊 진행 상황

```
Phase 1: ████████░░ 80% 완료
Phase 2: ░░░░░░░░░░ 0% 대기
Phase 3: ░░░░░░░░░░ 0% 계획
```

## 🎯 최종 목표

**2025년 2월까지 완전한 HWPX 라이브러리 구축**
- NPM 패키지 배포
- 한컴오피스 100% 호환
- TypeScript 완전 지원
- 종합 문서화

## 📞 연락처

문제 발생 시:
- GitHub Issues: https://github.com/[repo]/hwpx-lib/issues
- Email: [email]

---

**이 문서는 HWPX 라이브러리의 공식 전략 문서입니다.**
**모든 개발자는 이 가이드라인을 따라야 합니다.**

Last Updated: 2025-01-07