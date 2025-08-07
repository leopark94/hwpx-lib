import { beforeEach, describe, expect, it } from "vitest";

import { Formatter } from "@export/formatter";

import { Document } from "./document";

describe("Document", () => {
    let document: Document;

    beforeEach(() => {
        document = new Document({ background: {} });
    });

    describe("#constructor()", () => {
        it("should create valid JSON", () => {
            const tree = new Formatter().format(document);

            expect(tree).to.deep.equal({
                "hml:document": [
                    {
                        _attr: {
                            "xmlns:ha": "http://www.hancom.co.kr/hwpml/2011/app",
                            "xmlns:hp": "http://www.hancom.co.kr/hwpml/2011/paragraph",
                            "xmlns:hp10": "http://www.hancom.co.kr/hwpml/2016/paragraph",
                            "xmlns:hs": "http://www.hancom.co.kr/hwpml/2011/section",
                            "xmlns:hc": "http://www.hancom.co.kr/hwpml/2011/core",
                            "xmlns:hh": "http://www.hancom.co.kr/hwpml/2011/head",
                            "xmlns:hm": "http://www.hancom.co.kr/hwpml/2011/master-page",
                            "xmlns:hml": "http://www.hancom.co.kr/hwpml/2011/root",
                        },
                    },
                    {
                        "w:background": {
                            _attr: {},
                        },
                    },
                    { "hs:sec": {} },
                ],
            });
        });
    });
});
