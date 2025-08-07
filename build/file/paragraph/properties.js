import { IgnoreIfEmptyXmlComponent, OnOffElement } from "@file/xml-components";
import { RunProperties } from ".";
import { DocumentWrapper } from "../document-wrapper";
import { Shading } from "../shading";
import { Alignment } from "./formatting/alignment";
import { Border, ThematicBreak } from "./formatting/border";
import { PageBreakBefore } from "./formatting/break";
import { Indent } from "./formatting/indent";
import { Spacing } from "./formatting/spacing";
import { Style } from "./formatting/style";
import { TabStop, TabStopType } from "./formatting/tab-stop";
import { NumberProperties } from "./formatting/unordered-list";
import { WordWrap } from "./formatting/word-wrap";
import { createFrameProperties } from "./frame/frame-properties";
import { OutlineLevel } from "./links";
export class ParagraphProperties extends IgnoreIfEmptyXmlComponent {
    constructor(options) {
        var _a, _b;
        super("hh:paraPr");
        Object.defineProperty(this, "numberingReferences", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        if (!options) {
            return this;
        }
        if (options.heading) {
            this.push(new Style(options.heading));
        }
        if (options.bullet) {
            this.push(new Style("ListParagraph"));
        }
        if (options.numbering) {
            if (!options.style && !options.heading) {
                if (!options.numbering.custom) {
                    this.push(new Style("ListParagraph"));
                }
            }
        }
        if (options.style) {
            this.push(new Style(options.style));
        }
        if (options.keepNext !== undefined) {
            this.push(new OnOffElement("w:keepNext", options.keepNext));
        }
        if (options.keepLines !== undefined) {
            this.push(new OnOffElement("w:keepLines", options.keepLines));
        }
        if (options.pageBreakBefore) {
            this.push(new PageBreakBefore());
        }
        if (options.frame) {
            this.push(createFrameProperties(options.frame));
        }
        if (options.widowControl !== undefined) {
            this.push(new OnOffElement("w:widowControl", options.widowControl));
        }
        if (options.bullet) {
            this.push(new NumberProperties(1, options.bullet.level));
        }
        if (options.numbering) {
            this.numberingReferences.push({
                reference: options.numbering.reference,
                instance: (_a = options.numbering.instance) !== null && _a !== void 0 ? _a : 0,
            });
            this.push(new NumberProperties(`${options.numbering.reference}-${(_b = options.numbering.instance) !== null && _b !== void 0 ? _b : 0}`, options.numbering.level));
        }
        else if (options.numbering === false) {
            this.push(new NumberProperties(0, 0));
        }
        if (options.border) {
            this.push(new Border(options.border));
        }
        if (options.thematicBreak) {
            this.push(new ThematicBreak());
        }
        if (options.shading) {
            this.push(new Shading(options.shading));
        }
        if (options.wordWrap) {
            this.push(new WordWrap());
        }
        if (options.overflowPunctuation) {
            this.push(new OnOffElement("w:overflowPunct", options.overflowPunctuation));
        }
        const tabDefinitions = [
            ...(options.rightTabStop !== undefined ? [{ type: TabStopType.RIGHT, position: options.rightTabStop }] : []),
            ...(options.tabStops ? options.tabStops : []),
            ...(options.leftTabStop !== undefined ? [{ type: TabStopType.LEFT, position: options.leftTabStop }] : []),
        ];
        if (tabDefinitions.length > 0) {
            this.push(new TabStop(tabDefinitions));
        }
        if (options.bidirectional !== undefined) {
            this.push(new OnOffElement("hh:bidi", options.bidirectional));
        }
        if (options.spacing) {
            this.push(new Spacing(options.spacing));
        }
        if (options.indent) {
            this.push(new Indent(options.indent));
        }
        if (options.contextualSpacing !== undefined) {
            this.push(new OnOffElement("w:contextualSpacing", options.contextualSpacing));
        }
        if (options.alignment) {
            this.push(new Alignment(options.alignment));
        }
        if (options.outlineLevel !== undefined) {
            this.push(new OutlineLevel(options.outlineLevel));
        }
        if (options.suppressLineNumbers !== undefined) {
            this.push(new OnOffElement("w:suppressLineNumbers", options.suppressLineNumbers));
        }
        if (options.autoSpaceEastAsianText !== undefined) {
            this.push(new OnOffElement("w:autoSpaceDN", options.autoSpaceEastAsianText));
        }
        if (options.run) {
            this.push(new RunProperties(options.run));
        }
    }
    push(item) {
        this.root.push(item);
    }
    prepForXml(context) {
        if (context.viewWrapper instanceof DocumentWrapper) {
            for (const reference of this.numberingReferences) {
                context.file.Numbering.createConcreteNumberingInstance(reference.reference, reference.instance);
            }
        }
        return super.prepForXml(context);
    }
}
//# sourceMappingURL=properties.js.map