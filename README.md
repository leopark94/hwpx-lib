<p align="center">
    <img alt="clippy the assistant" src="http://i60.tinypic.com/339pvtt.png">
</p>

<p align="center">
    Generate .docx files with JS/TS very easily, written in TS.
</p>

---

[![NPM version][npm-image]][npm-url]
[![Downloads per month][downloads-image]][downloads-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Known Vulnerabilities][snky-image]][snky-url]
[![Chat on Gitter][gitter-image]][gitter-url]
[![code style: prettier][prettier-image]][prettier-url]
[![PRs Welcome][pr-image]][pr-url]

# docx

## Install

```sh
$ npm install --save docx
```

## Demo

Press `endpoint` on the `RunKit` website:

![RunKit Instructions](https://user-images.githubusercontent.com/2917613/38582539-f84311b6-3d07-11e8-90db-5885ae02c3c4.png)

* https://runkit.com/dolanmiu/docx-demo1 - Simple paragraph and text
* https://runkit.com/dolanmiu/docx-demo2 - Advanced Paragraphs and text
* https://runkit.com/dolanmiu/docx-demo3 - Bullet points
* https://runkit.com/dolanmiu/docx-demo4 - Simple table
* https://runkit.com/dolanmiu/docx-demo5 - Images
* https://runkit.com/dolanmiu/docx-demo6 - Margins
* https://runkit.com/dolanmiu/docx-demo7 - Landscape
* https://runkit.com/dolanmiu/docx-demo8/1.0.1 - Header and Footer
* https://runkit.com/dolanmiu/docx-demo10 - **My CV generated with docx**

#### Run demos locally:

```sh
$ npm run demo
```

This command will run the demo selector app in the `demo` folder. It will prompt you to select a demo number, which will run a demo from that folder.

## Guide

Please refer to [the Wiki](https://github.com/dolanmiu/docx/wiki) for details on how to use this library, examples and much more!

Full documentation can be found here: [http://dolanmiu.github.io/docx/index.html](http://dolanmiu.github.io/docx/index.html)

## Simple Usage

```js
// Used to create docx files
var docx = require("docx");

// Create document
var doc = new docx.Document();

// Add some content in the document
var paragraph = new docx.Paragraph("Some cool text here.");
// Add more text into the paragraph if you wish
paragraph.addRun(new docx.TextRun("Lorem Ipsum Foo Bar"));
doc.addParagraph(paragraph);

// Used to export the file into a .docx file
var exporter = new docx.LocalPacker(doc);

// Or use the express packer to make the file downloadable.
// res is express' Response object
var exporter = new docx.ExpressPacker(doc, res);

exporter.pack("My First Document");
// If you want to export it as a .pdf file instead
exporter.packPdf("My First Document");

// done! A file called 'My First Document.docx'
// will be in your file system if you used LocalPacker
// Or it will start downloading if you are using Express
```

## Examples

Check [the Wiki](https://github.com/dolanmiu/docx/wiki/Examples) for examples.

# Contributing

Read the contribution guidelines [here](https://github.com/dolanmiu/docx/wiki/Contributing-Guidelines).

---

Made with 💖

Huge thanks to [@felipeochoa](https://github.com/felipeochoa) for awesome contributions to this project

[npm-image]: https://badge.fury.io/js/docx.svg
[npm-url]: https://npmjs.org/package/docx
[downloads-image]: https://img.shields.io/npm/dm/docx.svg
[downloads-url]: https://npmjs.org/package/docx
[travis-image]: https://travis-ci.org/dolanmiu/docx.svg?branch=master
[travis-url]: https://travis-ci.org/dolanmiu/docx
[daviddm-image]: https://david-dm.org/dolanmiu/docx.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/dolanmiu/docx
[snky-image]: https://snyk.io/test/github/dolanmiu/docx/badge.svg
[snky-url]: https://snyk.io/test/github/dolanmiu/docx
[gitter-image]: https://badges.gitter.im/dolanmiu/docx.svg
[gitter-url]: https://gitter.im/docx-lib/Lobby
[prettier-image]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg
[prettier-url]: https://github.com/prettier/prettier
[pr-image]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg
[pr-url]: http://makeapullrequest.com
