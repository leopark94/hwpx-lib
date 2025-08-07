import { Attributes, NextAttributeComponent, XmlComponent } from "@file/xml-components";
import { hpsMeasureValue } from "@util/values";
export class OnOffElement extends XmlComponent {
    constructor(name, val = true) {
        super(name);
        if (val !== true) {
            this.root.push(new Attributes({ val }));
        }
    }
}
export class HpsMeasureElement extends XmlComponent {
    constructor(name, val) {
        super(name);
        this.root.push(new Attributes({ val: hpsMeasureValue(val) }));
    }
}
export class EmptyElement extends XmlComponent {
}
export class StringValueElement extends XmlComponent {
    constructor(name, val) {
        super(name);
        this.root.push(new Attributes({ val }));
    }
}
export const createStringElement = (name, value) => new BuilderElement({
    name,
    attributes: {
        value: { key: "hp:val", value },
    },
});
export class NumberValueElement extends XmlComponent {
    constructor(name, val) {
        super(name);
        this.root.push(new Attributes({ val }));
    }
}
export class StringEnumValueElement extends XmlComponent {
    constructor(name, val) {
        super(name);
        this.root.push(new Attributes({ val }));
    }
}
export class StringContainer extends XmlComponent {
    constructor(name, val) {
        super(name);
        this.root.push(val);
    }
}
export class BuilderElement extends XmlComponent {
    constructor({ name, attributes, children, }) {
        super(name);
        if (attributes) {
            this.root.push(new NextAttributeComponent(attributes));
        }
        if (children) {
            this.root.push(...children);
        }
    }
}
//# sourceMappingURL=simple-elements.js.map