import { BuilderElement, OnOffElement, createStringElement } from "@file/xml-components";
export const CharacterSet = {
    ANSI: "00",
    DEFAULT: "01",
    SYMBOL: "02",
    MAC: "4D",
    JIS: "80",
    HANGUL: "81",
    JOHAB: "82",
    GB_2312: "86",
    CHINESEBIG5: "88",
    GREEK: "A1",
    TURKISH: "A2",
    VIETNAMESE: "A3",
    HEBREW: "B1",
    ARABIC: "B2",
    BALTIC: "BA",
    RUSSIAN: "CC",
    THAI: "DE",
    EASTEUROPE: "EE",
    OEM: "FF",
};
const createFontRelationship = ({ id, fontKey, subsetted }, name) => new BuilderElement({
    name,
    attributes: Object.assign({ id: { key: "r:id", value: id } }, (fontKey ? { fontKey: { key: "w:fontKey", value: `{${fontKey}}` } } : {})),
    children: [...(subsetted ? [new OnOffElement("w:subsetted", subsetted)] : [])],
});
export const createFont = ({ name, altName, panose1, charset, family, notTrueType, pitch, sig, embedRegular, embedBold, embedItalic, embedBoldItalic, }) => new BuilderElement({
    name: "hh:font",
    attributes: {
        name: { key: "hh:name", value: name },
    },
    children: [
        ...(altName ? [createStringElement("w:altName", altName)] : []),
        ...(panose1 ? [createStringElement("w:panose1", panose1)] : []),
        ...(charset ? [createStringElement("w:charset", charset)] : []),
        ...(family ? [createStringElement("w:family", family)] : []),
        ...(notTrueType ? [new OnOffElement("w:notTrueType", notTrueType)] : []),
        ...(pitch ? [createStringElement("w:pitch", pitch)] : []),
        ...(sig
            ? [
                new BuilderElement({
                    name: "hh:sig",
                    attributes: {
                        usb0: { key: "w:usb0", value: sig.usb0 },
                        usb1: { key: "w:usb1", value: sig.usb1 },
                        usb2: { key: "w:usb2", value: sig.usb2 },
                        usb3: { key: "w:usb3", value: sig.usb3 },
                        csb0: { key: "w:csb0", value: sig.csb0 },
                        csb1: { key: "w:csb1", value: sig.csb1 },
                    },
                }),
            ]
            : []),
        ...(embedRegular ? [createFontRelationship(embedRegular, "w:embedRegular")] : []),
        ...(embedBold ? [createFontRelationship(embedBold, "w:embedBold")] : []),
        ...(embedItalic ? [createFontRelationship(embedItalic, "w:embedItalic")] : []),
        ...(embedBoldItalic ? [createFontRelationship(embedBoldItalic, "w:embedBoldItalic")] : []),
    ],
});
//# sourceMappingURL=font.js.map