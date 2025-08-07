import { xml2js } from "xml-js";
import { XmlAttributeComponent, XmlComponent } from "@file/xml-components";
export const convertToXmlComponent = (element) => {
    switch (element.type) {
        case undefined:
        case "element":
            const xmlComponent = new ImportedXmlComponent(element.name, element.attributes);
            const childElements = element.elements || [];
            for (const childElm of childElements) {
                const child = convertToXmlComponent(childElm);
                if (child !== undefined) {
                    xmlComponent.push(child);
                }
            }
            return xmlComponent;
        case "text":
            return element.text;
        default:
            return undefined;
    }
};
class ImportedXmlComponentAttributes extends XmlAttributeComponent {
}
export class ImportedXmlComponent extends XmlComponent {
    static fromXmlString(importedContent) {
        const xmlObj = xml2js(importedContent, { compact: false });
        return convertToXmlComponent(xmlObj);
    }
    constructor(rootKey, _attr) {
        super(rootKey);
        if (_attr) {
            this.root.push(new ImportedXmlComponentAttributes(_attr));
        }
    }
    push(xmlComponent) {
        this.root.push(xmlComponent);
    }
}
export class ImportedRootElementAttributes extends XmlComponent {
    constructor(_attr) {
        super("");
        Object.defineProperty(this, "_attr", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: _attr
        });
    }
    prepForXml(_) {
        return {
            _attr: this._attr,
        };
    }
}
//# sourceMappingURL=imported-xml-component.js.map