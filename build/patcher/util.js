import xml from "xml";
import { xml2js } from "xml-js";
import { Formatter } from "@export/formatter";
import { Text } from "@file/paragraph/run/run-components/text";
const formatter = new Formatter();
export const toJson = (xmlData) => {
    const xmlObj = xml2js(xmlData, { compact: false, captureSpacesBetweenElements: true });
    return xmlObj;
};
export const createTextElementContents = (text) => {
    var _a;
    const textJson = toJson(xml(formatter.format(new Text({ text }))));
    return (_a = textJson.elements[0].elements) !== null && _a !== void 0 ? _a : [];
};
export const patchSpaceAttribute = (element) => (Object.assign(Object.assign({}, element), { attributes: {
        "xml:space": "preserve",
    } }));
export const getFirstLevelElements = (relationships, id) => { var _a, _b; return (_b = (_a = relationships.elements) === null || _a === void 0 ? void 0 : _a.filter((e) => e.name === id)[0].elements) !== null && _b !== void 0 ? _b : []; };
//# sourceMappingURL=util.js.map