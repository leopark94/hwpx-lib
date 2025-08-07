import { BuilderElement } from "@file/xml-components";
import { createRegularFont } from "./create-regular-font";
export const createFontTable = (fonts) => new BuilderElement({
    name: "hh:fonts",
    attributes: {
        mc: { key: "xmlns:mc", value: "http://schemas.openxmlformats.org/markup-compatibility/2006" },
        r: { key: "xmlns:r", value: "http://schemas.openxmlformats.org/officeDocument/2006/relationships" },
        w: { key: "xmlns:w", value: "http://schemas.openxmlformats.org/wordprocessingml/2006/main" },
        w14: { key: "xmlns:w14", value: "http://schemas.microsoft.com/office/word/2010/wordml" },
        w15: { key: "xmlns:w15", value: "http://schemas.microsoft.com/office/word/2012/wordml" },
        w16cex: { key: "xmlns:w16cex", value: "http://schemas.microsoft.com/office/word/2018/wordml/cex" },
        w16cid: { key: "xmlns:w16cid", value: "http://schemas.microsoft.com/office/word/2016/wordml/cid" },
        w16: { key: "xmlns:w16", value: "http://schemas.microsoft.com/office/word/2018/wordml" },
        w16sdtdh: { key: "xmlns:w16sdtdh", value: "http://schemas.microsoft.com/office/word/2020/wordml/sdtdatahash" },
        w16se: { key: "xmlns:w16se", value: "http://schemas.microsoft.com/office/word/2015/wordml/symex" },
        Ignorable: { key: "mc:Ignorable", value: "w14 w15 w16se w16cid w16 w16cex w16sdtdh" },
    },
    children: fonts.map((font, i) => createRegularFont({
        name: font.name,
        index: i + 1,
        fontKey: font.fontKey,
    })),
});
//# sourceMappingURL=font-table.js.map