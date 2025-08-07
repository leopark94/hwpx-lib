import { XmlAttributeComponent } from "@file/xml-components";
export class AnchorAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                distT: "distT",
                distB: "distB",
                distL: "distL",
                distR: "distR",
                allowOverlap: "allowOverlap",
                behindDoc: "behindDoc",
                layoutInCell: "layoutInCell",
                locked: "locked",
                relativeHeight: "relativeHeight",
                simplePos: "simplePos",
            }
        });
    }
}
//# sourceMappingURL=anchor-attributes.js.map