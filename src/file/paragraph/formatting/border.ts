// http://officeopenxml.com/WPborders.php
import { BorderElement, BorderStyle, IBorderOptions } from "@file/border";
import { IgnoreIfEmptyXmlComponent, XmlComponent } from "@file/xml-components";

export type IBordersOptions = {
    readonly top?: IBorderOptions;
    readonly bottom?: IBorderOptions;
    readonly left?: IBorderOptions;
    readonly right?: IBorderOptions;
};

export class Border extends IgnoreIfEmptyXmlComponent {
    public constructor(options: IBordersOptions) {
        super("hp:border");

        if (options.top) {
            this.root.push(new BorderElement("hp:top", options.top));
        }

        if (options.bottom) {
            this.root.push(new BorderElement("hp:bottom", options.bottom));
        }

        if (options.left) {
            this.root.push(new BorderElement("hp:left", options.left));
        }

        if (options.right) {
            this.root.push(new BorderElement("hp:right", options.right));
        }
    }
}

export class ThematicBreak extends XmlComponent {
    public constructor() {
        super("hp:border");
        const bottom = new BorderElement("hp:bottom", {
            color: "auto",
            space: 1,
            style: BorderStyle.SINGLE,
            size: 6,
        });
        this.root.push(bottom);
    }
}
