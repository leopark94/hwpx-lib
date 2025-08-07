import { xml2js } from "xml-js";
import { ImportedRootElementAttributes, convertToXmlComponent } from "@file/xml-components";
import { Styles } from "./";
export class ExternalStylesFactory {
    newInstance(xmlData) {
        const xmlObj = xml2js(xmlData, { compact: false });
        let stylesXmlElement;
        for (const xmlElm of xmlObj.elements || []) {
            if (xmlElm.name === "hh:styles") {
                stylesXmlElement = xmlElm;
            }
        }
        if (stylesXmlElement === undefined) {
            throw new Error("can not find styles element");
        }
        const stylesElements = stylesXmlElement.elements || [];
        const importedStyle = new Styles({
            initialStyles: new ImportedRootElementAttributes(stylesXmlElement.attributes),
            importedStyles: stylesElements.map((childElm) => convertToXmlComponent(childElm)),
        });
        return importedStyle;
    }
}
//# sourceMappingURL=external-styles-factory.js.map