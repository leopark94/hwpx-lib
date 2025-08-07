import { XmlAttributeComponent, XmlComponent } from "@file/xml-components";
export class TabStop extends XmlComponent {
    constructor(tabDefinitions) {
        super("hp:tabs");
        for (const tabDefinition of tabDefinitions) {
            this.root.push(new TabStopItem(tabDefinition));
        }
    }
}
export const TabStopType = {
    LEFT: "left",
    RIGHT: "right",
    CENTER: "center",
    BAR: "bar",
    CLEAR: "clear",
    DECIMAL: "decimal",
    END: "end",
    NUM: "num",
    START: "start",
};
export const LeaderType = {
    DOT: "dot",
    HYPHEN: "hyphen",
    MIDDLE_DOT: "middleDot",
    NONE: "none",
    UNDERSCORE: "underscore",
};
export const TabStopPosition = {
    MAX: 9026,
};
export class TabAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: { val: "hp:val", pos: "hp:pos", leader: "w:leader" }
        });
    }
}
export class TabStopItem extends XmlComponent {
    constructor({ type, position, leader }) {
        super("hp:tab");
        this.root.push(new TabAttributes({
            val: type,
            pos: position,
            leader: leader,
        }));
    }
}
//# sourceMappingURL=tab-stop.js.map