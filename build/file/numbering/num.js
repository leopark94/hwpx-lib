import { Attributes, XmlAttributeComponent, XmlComponent } from "@file/xml-components";
import { decimalNumber } from "@util/values";
class AbstractNumId extends XmlComponent {
    constructor(value) {
        super("w:abstractNumId");
        this.root.push(new Attributes({
            val: value,
        }));
    }
}
class NumAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: { numId: "hp:numId" }
        });
    }
}
export class ConcreteNumbering extends XmlComponent {
    constructor(options) {
        super("w:num");
        Object.defineProperty(this, "numId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "reference", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "instance", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.numId = options.numId;
        this.reference = options.reference;
        this.instance = options.instance;
        this.root.push(new NumAttributes({
            numId: decimalNumber(options.numId),
        }));
        this.root.push(new AbstractNumId(decimalNumber(options.abstractNumId)));
        if (options.overrideLevels && options.overrideLevels.length) {
            for (const level of options.overrideLevels) {
                this.root.push(new LevelOverride(level.num, level.start));
            }
        }
    }
}
class LevelOverrideAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: { ilvl: "hp:level" }
        });
    }
}
export class LevelOverride extends XmlComponent {
    constructor(levelNum, start) {
        super("w:lvlOverride");
        this.root.push(new LevelOverrideAttributes({ ilvl: levelNum }));
        if (start !== undefined) {
            this.root.push(new StartOverride(start));
        }
    }
}
class StartOverrideAttributes extends XmlAttributeComponent {
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
class StartOverride extends XmlComponent {
    constructor(start) {
        super("w:startOverride");
        this.root.push(new StartOverrideAttributes({ val: start }));
    }
}
//# sourceMappingURL=num.js.map