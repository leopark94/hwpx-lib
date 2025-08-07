import { XmlAttributeComponent, XmlComponent } from "@file/xml-components";
export class CompatibilitySettingAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                version: "ha:version",
                name: "ha:name",
                uri: "ha:uri",
            }
        });
    }
}
export class CompatibilitySetting extends XmlComponent {
    constructor(version) {
        super("ha:compatSetting");
        this.root.push(new CompatibilitySettingAttributes({
            version,
            uri: "http://schemas.microsoft.com/office/word",
            name: "compatibilityMode",
        }));
    }
}
//# sourceMappingURL=compatibility-setting.js.map