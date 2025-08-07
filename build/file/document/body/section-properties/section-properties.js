import { VerticalAlignElement } from "@file/vertical-align";
import { OnOffElement, XmlComponent } from "@file/xml-components";
import { Columns } from "./properties/columns";
import { createDocumentGrid } from "./properties/doc-grid";
import { HeaderFooterReference, HeaderFooterReferenceType, HeaderFooterType } from "./properties/header-footer-reference";
import { createLineNumberType } from "./properties/line-number";
import { PageBorders } from "./properties/page-borders";
import { PageMargin } from "./properties/page-margin";
import { PageNumberType } from "./properties/page-number";
import { PageOrientation, createPageSize } from "./properties/page-size";
import { PageTextDirection } from "./properties/page-text-direction";
import { Type } from "./properties/section-type";
export const sectionMarginDefaults = {
    TOP: 1440,
    RIGHT: 1440,
    BOTTOM: 1440,
    LEFT: 1440,
    HEADER: 708,
    FOOTER: 708,
    GUTTER: 0,
};
export const sectionPageSizeDefaults = {
    WIDTH: 11906,
    HEIGHT: 16838,
    ORIENTATION: PageOrientation.PORTRAIT,
};
export class SectionProperties extends XmlComponent {
    constructor({ page: { size: { width = sectionPageSizeDefaults.WIDTH, height = sectionPageSizeDefaults.HEIGHT, orientation = sectionPageSizeDefaults.ORIENTATION, } = {}, margin: { top = sectionMarginDefaults.TOP, right = sectionMarginDefaults.RIGHT, bottom = sectionMarginDefaults.BOTTOM, left = sectionMarginDefaults.LEFT, header = sectionMarginDefaults.HEADER, footer = sectionMarginDefaults.FOOTER, gutter = sectionMarginDefaults.GUTTER, } = {}, pageNumbers = {}, borders, textDirection, } = {}, grid: { linePitch = 360, charSpace, type: gridType } = {}, headerWrapperGroup = {}, footerWrapperGroup = {}, lineNumbers, titlePage, verticalAlign, column, type, } = {}) {
        super("hs:sectPr");
        this.addHeaderFooterGroup(HeaderFooterType.HEADER, headerWrapperGroup);
        this.addHeaderFooterGroup(HeaderFooterType.FOOTER, footerWrapperGroup);
        if (type) {
            this.root.push(new Type(type));
        }
        this.root.push(createPageSize({ width, height, orientation }));
        this.root.push(new PageMargin(top, right, bottom, left, header, footer, gutter));
        if (borders) {
            this.root.push(new PageBorders(borders));
        }
        if (lineNumbers) {
            this.root.push(createLineNumberType(lineNumbers));
        }
        this.root.push(new PageNumberType(pageNumbers));
        if (column) {
            this.root.push(new Columns(column));
        }
        if (verticalAlign) {
            this.root.push(new VerticalAlignElement(verticalAlign));
        }
        if (titlePage !== undefined) {
            this.root.push(new OnOffElement("hs:titlePage", titlePage));
        }
        if (textDirection) {
            this.root.push(new PageTextDirection(textDirection));
        }
        this.root.push(createDocumentGrid({ linePitch, charSpace, type: gridType }));
    }
    addHeaderFooterGroup(type, group) {
        if (group.default) {
            this.root.push(new HeaderFooterReference(type, {
                type: HeaderFooterReferenceType.DEFAULT,
                id: group.default.View.ReferenceId,
            }));
        }
        if (group.first) {
            this.root.push(new HeaderFooterReference(type, {
                type: HeaderFooterReferenceType.FIRST,
                id: group.first.View.ReferenceId,
            }));
        }
        if (group.even) {
            this.root.push(new HeaderFooterReference(type, {
                type: HeaderFooterReferenceType.EVEN,
                id: group.even.View.ReferenceId,
            }));
        }
    }
}
//# sourceMappingURL=section-properties.js.map