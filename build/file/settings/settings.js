import { NumberValueElement, OnOffElement, XmlAttributeComponent, XmlComponent } from "@file/xml-components";
import { Compatibility } from "./compatibility";
export class SettingsAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                wpc: "xmlns:wpc",
                mc: "xmlns:mc",
                o: "xmlns:o",
                r: "xmlns:r",
                m: "xmlns:m",
                v: "xmlns:v",
                wp14: "xmlns:wp14",
                wp: "xmlns:wp",
                w10: "xmlns:w10",
                w: "xmlns:w",
                w14: "xmlns:w14",
                w15: "xmlns:w15",
                wpg: "xmlns:wpg",
                wpi: "xmlns:wpi",
                wne: "xmlns:wne",
                wps: "xmlns:wps",
                Ignorable: "mc:Ignorable",
            }
        });
    }
}
export class Settings extends XmlComponent {
    constructor(options) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        super("ha:settings");
        this.root.push(new OnOffElement("ha:displayBackgroundShape", true));
        if (options.trackRevisions !== undefined) {
            this.root.push(new OnOffElement("ha:trackRevisions", options.trackRevisions));
        }
        if (options.evenAndOddHeaders !== undefined) {
            this.root.push(new OnOffElement("ha:evenAndOddHeaders", options.evenAndOddHeaders));
        }
        if (options.updateFields !== undefined) {
            this.root.push(new OnOffElement("ha:updateFields", options.updateFields));
        }
        if (options.defaultTabStop !== undefined) {
            this.root.push(new NumberValueElement("ha:defaultTabStop", options.defaultTabStop));
        }
        if (((_a = options.hyphenation) === null || _a === void 0 ? void 0 : _a.autoHyphenation) !== undefined) {
            this.root.push(new OnOffElement("ha:autoHyphenation", options.hyphenation.autoHyphenation));
        }
        if (((_b = options.hyphenation) === null || _b === void 0 ? void 0 : _b.hyphenationZone) !== undefined) {
            this.root.push(new NumberValueElement("ha:hyphenationZone", options.hyphenation.hyphenationZone));
        }
        if (((_c = options.hyphenation) === null || _c === void 0 ? void 0 : _c.consecutiveHyphenLimit) !== undefined) {
            this.root.push(new NumberValueElement("ha:consecutiveHyphenLimit", options.hyphenation.consecutiveHyphenLimit));
        }
        if (((_d = options.hyphenation) === null || _d === void 0 ? void 0 : _d.doNotHyphenateCaps) !== undefined) {
            this.root.push(new OnOffElement("ha:doNotHyphenateCaps", options.hyphenation.doNotHyphenateCaps));
        }
        this.root.push(new Compatibility(Object.assign(Object.assign({}, ((_e = options.compatibility) !== null && _e !== void 0 ? _e : {})), { version: (_h = (_g = (_f = options.compatibility) === null || _f === void 0 ? void 0 : _f.version) !== null && _g !== void 0 ? _g : options.compatibilityModeVersion) !== null && _h !== void 0 ? _h : 15 })));
    }
}
//# sourceMappingURL=settings.js.map