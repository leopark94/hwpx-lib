import { BorderElement } from "@file/border";
import { IgnoreIfEmptyXmlComponent, XmlAttributeComponent, XmlComponent } from "@file/xml-components";
import { decimalNumber } from "@util/values";
export class TableCellBorders extends IgnoreIfEmptyXmlComponent {
    constructor(options) {
        super("hp:tcBorders");
        if (options.top) {
            this.root.push(new BorderElement("hp:top", options.top));
        }
        if (options.start) {
            this.root.push(new BorderElement("w:start", options.start));
        }
        if (options.left) {
            this.root.push(new BorderElement("hp:left", options.left));
        }
        if (options.bottom) {
            this.root.push(new BorderElement("hp:bottom", options.bottom));
        }
        if (options.end) {
            this.root.push(new BorderElement("w:end", options.end));
        }
        if (options.right) {
            this.root.push(new BorderElement("hp:right", options.right));
        }
    }
}
class GridSpanAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: { val: "hp:val" }
        });
    }
}
export class GridSpan extends XmlComponent {
    constructor(value) {
        super("w:gridSpan");
        this.root.push(new GridSpanAttributes({
            val: decimalNumber(value),
        }));
    }
}
export const VerticalMergeType = {
    CONTINUE: "continue",
    RESTART: "restart",
};
class VerticalMergeAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: { val: "hp:val" }
        });
    }
}
export class VerticalMerge extends XmlComponent {
    constructor(value) {
        super("w:vMerge");
        this.root.push(new VerticalMergeAttributes({
            val: value,
        }));
    }
}
export const TextDirection = {
    BOTTOM_TO_TOP_LEFT_TO_RIGHT: "btLr",
    LEFT_TO_RIGHT_TOP_TO_BOTTOM: "lrTb",
    TOP_TO_BOTTOM_RIGHT_TO_LEFT: "tbRl",
};
class TDirectionAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: { val: "hp:val" }
        });
    }
}
export class TDirection extends XmlComponent {
    constructor(value) {
        super("hs:textDirection");
        this.root.push(new TDirectionAttributes({
            val: value,
        }));
    }
}
//# sourceMappingURL=table-cell-components.js.map