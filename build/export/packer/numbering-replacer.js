export class NumberingReplacer {
    replace(xmlData, concreteNumberings) {
        let currentXmlData = xmlData;
        for (const concreteNumbering of concreteNumberings) {
            currentXmlData = currentXmlData.replace(new RegExp(`{${concreteNumbering.reference}-${concreteNumbering.instance}}`, "g"), concreteNumbering.numId.toString());
        }
        return currentXmlData;
    }
}
//# sourceMappingURL=numbering-replacer.js.map