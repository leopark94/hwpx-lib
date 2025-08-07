import { DocumentDefaults } from "./defaults";
import { FootnoteReferenceStyle, FootnoteText, FootnoteTextChar, Heading1Style, Heading2Style, Heading3Style, Heading4Style, Heading5Style, Heading6Style, HyperlinkStyle, ListParagraph, StrongStyle, TitleStyle, } from "./style";
import { DocumentAttributes } from "../document/document-attributes";
export class DefaultStylesFactory {
    newInstance(options = {}) {
        var _a;
        const documentAttributes = new DocumentAttributes(["mc", "r", "w", "w14", "w15"], "w14 w15");
        return {
            initialStyles: documentAttributes,
            importedStyles: [
                new DocumentDefaults((_a = options.document) !== null && _a !== void 0 ? _a : {}),
                new TitleStyle(Object.assign({ run: {
                        size: 56,
                    } }, options.title)),
                new Heading1Style(Object.assign({ run: {
                        color: "2E74B5",
                        size: 32,
                    } }, options.heading1)),
                new Heading2Style(Object.assign({ run: {
                        color: "2E74B5",
                        size: 26,
                    } }, options.heading2)),
                new Heading3Style(Object.assign({ run: {
                        color: "1F4D78",
                        size: 24,
                    } }, options.heading3)),
                new Heading4Style(Object.assign({ run: {
                        color: "2E74B5",
                        italics: true,
                    } }, options.heading4)),
                new Heading5Style(Object.assign({ run: {
                        color: "2E74B5",
                    } }, options.heading5)),
                new Heading6Style(Object.assign({ run: {
                        color: "1F4D78",
                    } }, options.heading6)),
                new StrongStyle(Object.assign({ run: {
                        bold: true,
                    } }, options.strong)),
                new ListParagraph(options.listParagraph || {}),
                new HyperlinkStyle(options.hyperlink || {}),
                new FootnoteReferenceStyle(options.footnoteReference || {}),
                new FootnoteText(options.footnoteText || {}),
                new FootnoteTextChar(options.footnoteTextChar || {}),
            ],
        };
    }
}
//# sourceMappingURL=factory.js.map