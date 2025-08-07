# 📝 HWPX Library

<p align="center">
    <img src="./logo/logo-animate.svg" width="100%" height="300" alt="HWPX Library Logo">
</p>

<p align="center">
    쉽고 빠르게 .hwpx (한글) 파일을 JavaScript/TypeScript로 생성하세요. Node.js와 브라우저에서 모두 작동합니다.
</p>

---

[![NPM version][npm-image]][npm-url]
[![Downloads per month][downloads-image]][downloads-url]
[![GitHub Action Workflow Status][github-actions-workflow-image]][github-actions-workflow-url]
[![Known Vulnerabilities][snky-image]][snky-url]
[![PRs Welcome][pr-image]][pr-url]

## 🚀 특징

- ✅ **한글(HWPX) 파일 생성** - 한컴오피스 한글 형식 지원
- ✅ **TypeScript 지원** - 완벽한 타입 정의
- ✅ **간단한 API** - 직관적이고 선언적인 API
- ✅ **Node.js & 브라우저** - 모든 환경에서 작동
- ✅ **경량** - 최소한의 의존성

## 📦 설치

```bash
npm install hwpx
```

또는

```bash
yarn add hwpx
```

## 🎯 빠른 시작

### 기본 사용법

```typescript
import { File, Paragraph, TextRun, Packer } from "hwpx";
import * as fs from "fs";

// HWPX 문서 생성
const doc = new File({
    sections: [{
        properties: {},
        children: [
            new Paragraph({
                children: [
                    new TextRun({
                        text: "안녕하세요, HWPX!",
                        size: 28,
                        bold: true,
                    }),
                ],
                alignment: "center",
            }),
            new Paragraph({
                children: [
                    new TextRun("이것은 한글 HWPX 형식으로 생성된 문서입니다."),
                ],
            }),
        ],
    }],
});

// 파일로 저장
Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("output.hwpx", buffer);
    console.log("✅ HWPX 파일이 생성되었습니다!");
});
```

### 테이블 추가

```typescript
import { Table, TableRow, TableCell } from "hwpx";

const table = new Table({
    rows: [
        new TableRow({
            children: [
                new TableCell({
                    children: [new Paragraph({ children: [new TextRun("항목")] })],
                }),
                new TableCell({
                    children: [new Paragraph({ children: [new TextRun("내용")] })],
                }),
            ],
        }),
        new TableRow({
            children: [
                new TableCell({
                    children: [new Paragraph({ children: [new TextRun("HWPX")] })],
                }),
                new TableCell({
                    children: [new Paragraph({ children: [new TextRun("한글 문서 형식")] })],
                }),
            ],
        }),
    ],
});
```

## 📚 문서화

자세한 사용법과 API 문서는 [문서 사이트](https://hwpx.js.org/)를 참조하세요.

## 🎨 데모

### 브라우저

- [기본 예제](https://codepen.io/hwpx/basic)
- [Angular 예제](https://stackblitz.com/edit/angular-hwpx)
- [React 예제](https://stackblitz.com/edit/react-hwpx)
- [Vue.js 예제](https://stackblitz.com/edit/vuejs-hwpx)

### Node.js

```bash
# 데모 실행
npm run demo

# 특정 데모 실행
npx tsx demo/100-hwpx-basic.ts
```

## 🏗️ 프로젝트 구조

```
hwpx-lib/
├── src/                  # 소스 코드
│   ├── export/          # HWPX 변환 및 생성
│   ├── file/            # 파일 구조 클래스
│   └── util/            # 유틸리티 함수
├── demo/                # 데모 파일
└── docs/                # 문서화
```

## 🔧 개발

### 빌드

```bash
npm run build
```

### 테스트

```bash
npm test
```

### 린트

```bash
npm run lint
```

## 🤝 기여

기여를 환영합니다! [기여 가이드라인](CONTRIBUTING.md)을 참조하세요.

## 📄 라이선스

MIT License - 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 🙏 감사의 말

이 프로젝트는 오픈소스 커뮤니티의 도움으로 만들어졌습니다.

## 📞 지원

- **이슈**: [GitHub Issues](https://github.com/yourusername/hwpx-lib/issues)
- **토론**: [GitHub Discussions](https://github.com/yourusername/hwpx-lib/discussions)

---

Made with ❤️ for the Korean document community

[npm-image]: https://badge.fury.io/js/hwpx.svg
[npm-url]: https://npmjs.org/package/hwpx
[downloads-image]: https://img.shields.io/npm/dm/hwpx.svg
[downloads-url]: https://npmjs.org/package/hwpx
[github-actions-workflow-image]: https://github.com/yourusername/hwpx-lib/workflows/Default/badge.svg
[github-actions-workflow-url]: https://github.com/yourusername/hwpx-lib/actions
[snky-image]: https://snyk.io/test/github/yourusername/hwpx-lib/badge.svg
[snky-url]: https://snyk.io/test/github/yourusername/hwpx-lib
[pr-image]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg
[pr-url]: http://makeapullrequest.com