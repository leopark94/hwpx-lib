import { NextAttributeComponent, XmlComponent } from "@file/xml-components";
export const PositionalTabAlignment = {
    LEFT: "left",
    CENTER: "center",
    RIGHT: "right",
};
export const PositionalTabRelativeTo = {
    MARGIN: "margin",
    INDENT: "indent",
};
export const PositionalTabLeader = {
    NONE: "none",
    DOT: "dot",
    HYPHEN: "hyphen",
    UNDERSCORE: "underscore",
    MIDDLE_DOT: "middleDot",
};
export class PositionalTab extends XmlComponent {
    constructor(options) {
        super("hp:ptab");
        this.root.push(new NextAttributeComponent({
            alignment: {
                key: "w:alignment",
                value: options.alignment,
            },
            relativeTo: {
                key: "w:relativeTo",
                value: options.relativeTo,
            },
            leader: {
                key: "w:leader",
                value: options.leader,
            },
        }));
    }
}
//# sourceMappingURL=positional-tab.js.map