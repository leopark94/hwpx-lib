import { AlignmentType } from "@file/paragraph";
import { XmlComponent } from "@file/xml-components";
import { abstractNumUniqueNumericIdGen, concreteNumUniqueNumericIdGen, convertInchesToTwip } from "@util/convenience-functions";
import { AbstractNumbering } from "./abstract-numbering";
import { LevelFormat } from "./level";
import { ConcreteNumbering } from "./num";
export class Numbering extends XmlComponent {
    constructor(options) {
        super("hh:numberings");
        Object.defineProperty(this, "abstractNumberingMap", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        Object.defineProperty(this, "concreteNumberingMap", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        Object.defineProperty(this, "referenceConfigMap", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        Object.defineProperty(this, "abstractNumUniqueNumericId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: abstractNumUniqueNumericIdGen()
        });
        Object.defineProperty(this, "concreteNumUniqueNumericId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: concreteNumUniqueNumericIdGen()
        });
        const abstractNumbering = new AbstractNumbering(this.abstractNumUniqueNumericId(), [
            {
                level: 0,
                format: LevelFormat.BULLET,
                text: "\u25CF",
                alignment: AlignmentType.LEFT,
                style: {
                    paragraph: {
                        indent: { left: convertInchesToTwip(0.5), hanging: convertInchesToTwip(0.25) },
                    },
                },
            },
            {
                level: 1,
                format: LevelFormat.BULLET,
                text: "\u25CB",
                alignment: AlignmentType.LEFT,
                style: {
                    paragraph: {
                        indent: { left: convertInchesToTwip(1), hanging: convertInchesToTwip(0.25) },
                    },
                },
            },
            {
                level: 2,
                format: LevelFormat.BULLET,
                text: "\u25A0",
                alignment: AlignmentType.LEFT,
                style: {
                    paragraph: {
                        indent: { left: 2160, hanging: convertInchesToTwip(0.25) },
                    },
                },
            },
            {
                level: 3,
                format: LevelFormat.BULLET,
                text: "\u25CF",
                alignment: AlignmentType.LEFT,
                style: {
                    paragraph: {
                        indent: { left: 2880, hanging: convertInchesToTwip(0.25) },
                    },
                },
            },
            {
                level: 4,
                format: LevelFormat.BULLET,
                text: "\u25CB",
                alignment: AlignmentType.LEFT,
                style: {
                    paragraph: {
                        indent: { left: 3600, hanging: convertInchesToTwip(0.25) },
                    },
                },
            },
            {
                level: 5,
                format: LevelFormat.BULLET,
                text: "\u25A0",
                alignment: AlignmentType.LEFT,
                style: {
                    paragraph: {
                        indent: { left: 4320, hanging: convertInchesToTwip(0.25) },
                    },
                },
            },
            {
                level: 6,
                format: LevelFormat.BULLET,
                text: "\u25CF",
                alignment: AlignmentType.LEFT,
                style: {
                    paragraph: {
                        indent: { left: 5040, hanging: convertInchesToTwip(0.25) },
                    },
                },
            },
            {
                level: 7,
                format: LevelFormat.BULLET,
                text: "\u25CF",
                alignment: AlignmentType.LEFT,
                style: {
                    paragraph: {
                        indent: { left: 5760, hanging: convertInchesToTwip(0.25) },
                    },
                },
            },
            {
                level: 8,
                format: LevelFormat.BULLET,
                text: "\u25CF",
                alignment: AlignmentType.LEFT,
                style: {
                    paragraph: {
                        indent: { left: 6480, hanging: convertInchesToTwip(0.25) },
                    },
                },
            },
        ]);
        this.concreteNumberingMap.set("default-bullet-numbering", new ConcreteNumbering({
            numId: 1,
            abstractNumId: abstractNumbering.id,
            reference: "default-bullet-numbering",
            instance: 0,
            overrideLevels: [
                {
                    num: 0,
                    start: 1,
                },
            ],
        }));
        this.abstractNumberingMap.set("default-bullet-numbering", abstractNumbering);
        for (const con of options.config) {
            this.abstractNumberingMap.set(con.reference, new AbstractNumbering(this.abstractNumUniqueNumericId(), con.levels));
            this.referenceConfigMap.set(con.reference, con.levels);
        }
    }
    prepForXml(context) {
        for (const numbering of this.abstractNumberingMap.values()) {
            this.root.push(numbering);
        }
        for (const numbering of this.concreteNumberingMap.values()) {
            this.root.push(numbering);
        }
        return super.prepForXml(context);
    }
    createConcreteNumberingInstance(reference, instance) {
        const abstractNumbering = this.abstractNumberingMap.get(reference);
        if (!abstractNumbering) {
            return;
        }
        const fullReference = `${reference}-${instance}`;
        if (this.concreteNumberingMap.has(fullReference)) {
            return;
        }
        const referenceConfigLevels = this.referenceConfigMap.get(reference);
        const firstLevelStartNumber = referenceConfigLevels && referenceConfigLevels[0].start;
        const concreteNumberingSettings = {
            numId: this.concreteNumUniqueNumericId(),
            abstractNumId: abstractNumbering.id,
            reference,
            instance,
            overrideLevels: [
                firstLevelStartNumber && Number.isInteger(firstLevelStartNumber)
                    ? {
                        num: 0,
                        start: firstLevelStartNumber,
                    }
                    : {
                        num: 0,
                        start: 1,
                    },
            ],
        };
        this.concreteNumberingMap.set(fullReference, new ConcreteNumbering(concreteNumberingSettings));
    }
    get ConcreteNumbering() {
        return Array.from(this.concreteNumberingMap.values());
    }
    get ReferenceConfig() {
        return Array.from(this.referenceConfigMap.values());
    }
}
//# sourceMappingURL=numbering.js.map