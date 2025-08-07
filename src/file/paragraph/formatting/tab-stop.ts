// http://officeopenxml.com/WPtab.php
import { XmlAttributeComponent, XmlComponent } from "@file/xml-components";

export type TabStopDefinition = {
    readonly type: (typeof TabStopType)[keyof typeof TabStopType];
    readonly position: number | (typeof TabStopPosition)[keyof typeof TabStopPosition];
    readonly leader?: (typeof LeaderType)[keyof typeof LeaderType];
};

export class TabStop extends XmlComponent {
    public constructor(tabDefinitions: readonly TabStopDefinition[]) {
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
} as const;

export const LeaderType = {
    DOT: "dot",
    HYPHEN: "hyphen",

    MIDDLE_DOT: "middleDot",
    NONE: "none",
    UNDERSCORE: "underscore",
} as const;

export const TabStopPosition = {
    MAX: 9026,
} as const;

export class TabAttributes extends XmlAttributeComponent<{
    readonly val: (typeof TabStopType)[keyof typeof TabStopType];
    readonly pos: string | number;
    readonly leader?: (typeof LeaderType)[keyof typeof LeaderType];
}> {
    protected readonly xmlKeys = { val: "hp:val", pos: "hp:pos", leader: "w:leader" };
}

export class TabStopItem extends XmlComponent {
    public constructor({ type, position, leader }: TabStopDefinition) {
        super("hp:tab");
        this.root.push(
            new TabAttributes({
                val: type,
                pos: position,
                leader: leader,
            }),
        );
    }
}
