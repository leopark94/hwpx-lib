import { BorderElement } from "@file/border";
import { IgnoreIfEmptyXmlComponent, XmlAttributeComponent } from "@file/xml-components";
export const PageBorderDisplay = {
    ALL_PAGES: "allPages",
    FIRST_PAGE: "firstPage",
    NOT_FIRST_PAGE: "notFirstPage",
};
export const PageBorderOffsetFrom = {
    PAGE: "page",
    TEXT: "text",
};
export const PageBorderZOrder = {
    BACK: "back",
    FRONT: "front",
};
class PageBordersAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                display: "w:display",
                offsetFrom: "w:offsetFrom",
                zOrder: "w:zOrder",
            }
        });
    }
}
export class PageBorders extends IgnoreIfEmptyXmlComponent {
    constructor(options) {
        super("hs:pageBorders");
        if (!options) {
            return this;
        }
        if (options.pageBorders) {
            this.root.push(new PageBordersAttributes({
                display: options.pageBorders.display,
                offsetFrom: options.pageBorders.offsetFrom,
                zOrder: options.pageBorders.zOrder,
            }));
        }
        else {
            this.root.push(new PageBordersAttributes({}));
        }
        if (options.pageBorderTop) {
            this.root.push(new BorderElement("hp:top", options.pageBorderTop));
        }
        if (options.pageBorderLeft) {
            this.root.push(new BorderElement("hp:left", options.pageBorderLeft));
        }
        if (options.pageBorderBottom) {
            this.root.push(new BorderElement("hp:bottom", options.pageBorderBottom));
        }
        if (options.pageBorderRight) {
            this.root.push(new BorderElement("hp:right", options.pageBorderRight));
        }
    }
}
//# sourceMappingURL=page-borders.js.map