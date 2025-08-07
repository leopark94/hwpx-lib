import { AttributeMap, XmlAttributeComponent } from "@file/xml-components";
export declare const DocxAttributeNamespaces: {
    wpc: string;
    mc: string;
    o: string;
    r: string;
    m: string;
    v: string;
    wp14: string;
    wp: string;
    w10: string;
    w: string;
    w14: string;
    w15: string;
    wpg: string;
    wpi: string;
    wne: string;
    wps: string;
    cp: string;
    dc: string;
    dcterms: string;
    dcmitype: string;
    xsi: string;
    cx: string;
    cx1: string;
    cx2: string;
    cx3: string;
    cx4: string;
    cx5: string;
    cx6: string;
    cx7: string;
    cx8: string;
    aink: string;
    am3d: string;
    w16cex: string;
    w16cid: string;
    w16: string;
    w16sdtdh: string;
    w16se: string;
};
export declare const DocumentAttributeNamespaces: {
    ha: string;
    hp: string;
    hp10: string;
    hs: string;
    hc: string;
    hh: string;
    hm: string;
    hml: string;
};
export type DocumentAttributeNamespace = keyof typeof DocumentAttributeNamespaces;
export type IDocumentAttributesProperties = Partial<Record<DocumentAttributeNamespace, string>> & {
    readonly Ignorable?: string;
};
export declare class DocumentAttributes extends XmlAttributeComponent<IDocumentAttributesProperties> {
    protected readonly xmlKeys: AttributeMap<IDocumentAttributesProperties>;
    constructor(ns: readonly DocumentAttributeNamespace[], Ignorable?: string);
}
