import { LineRuleType } from "@file/paragraph";
import { UnderlineType } from "@file/paragraph/run/underline";
import { StyleForCharacter } from "./character-style";
import { StyleForParagraph } from "./paragraph-style";
export class HeadingStyle extends StyleForParagraph {
    constructor(options) {
        super(Object.assign({ basedOn: "Normal", next: "Normal", quickFormat: true }, options));
    }
}
export class TitleStyle extends HeadingStyle {
    constructor(options) {
        super(Object.assign({ id: "Title", name: "Title" }, options));
    }
}
export class Heading1Style extends HeadingStyle {
    constructor(options) {
        super(Object.assign({ id: "Heading1", name: "Heading 1" }, options));
    }
}
export class Heading2Style extends HeadingStyle {
    constructor(options) {
        super(Object.assign({ id: "Heading2", name: "Heading 2" }, options));
    }
}
export class Heading3Style extends HeadingStyle {
    constructor(options) {
        super(Object.assign({ id: "Heading3", name: "Heading 3" }, options));
    }
}
export class Heading4Style extends HeadingStyle {
    constructor(options) {
        super(Object.assign({ id: "Heading4", name: "Heading 4" }, options));
    }
}
export class Heading5Style extends HeadingStyle {
    constructor(options) {
        super(Object.assign({ id: "Heading5", name: "Heading 5" }, options));
    }
}
export class Heading6Style extends HeadingStyle {
    constructor(options) {
        super(Object.assign({ id: "Heading6", name: "Heading 6" }, options));
    }
}
export class StrongStyle extends HeadingStyle {
    constructor(options) {
        super(Object.assign({ id: "Strong", name: "Strong" }, options));
    }
}
export class ListParagraph extends StyleForParagraph {
    constructor(options) {
        super(Object.assign({ id: "ListParagraph", name: "List Paragraph", basedOn: "Normal", quickFormat: true }, options));
    }
}
export class FootnoteText extends StyleForParagraph {
    constructor(options) {
        super(Object.assign({ id: "FootnoteText", name: "footnote text", link: "FootnoteTextChar", basedOn: "Normal", uiPriority: 99, semiHidden: true, unhideWhenUsed: true, paragraph: {
                spacing: {
                    after: 0,
                    line: 240,
                    lineRule: LineRuleType.AUTO,
                },
            }, run: {
                size: 20,
            } }, options));
    }
}
export class FootnoteReferenceStyle extends StyleForCharacter {
    constructor(options) {
        super(Object.assign({ id: "FootnoteReference", name: "footnote reference", basedOn: "DefaultParagraphFont", semiHidden: true, run: {
                superScript: true,
            } }, options));
    }
}
export class FootnoteTextChar extends StyleForCharacter {
    constructor(options) {
        super(Object.assign({ id: "FootnoteTextChar", name: "Footnote Text Char", basedOn: "DefaultParagraphFont", link: "FootnoteText", semiHidden: true, run: {
                size: 20,
            } }, options));
    }
}
export class HyperlinkStyle extends StyleForCharacter {
    constructor(options) {
        super(Object.assign({ id: "Hyperlink", name: "Hyperlink", basedOn: "DefaultParagraphFont", run: {
                color: "0563C1",
                underline: {
                    type: UnderlineType.SINGLE,
                },
            } }, options));
    }
}
//# sourceMappingURL=default-styles.js.map