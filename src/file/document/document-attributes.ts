import { AttributeMap, XmlAttributeComponent } from "@file/xml-components";

/* cSpell:disable */
// HWPX 네임스페이스
export const DocumentAttributeNamespaces = {
    ha: "http://www.hancom.co.kr/hwpml/2011/app",
    hp: "http://www.hancom.co.kr/hwpml/2011/paragraph",
    hp10: "http://www.hancom.co.kr/hwpml/2016/paragraph",
    hs: "http://www.hancom.co.kr/hwpml/2011/section",
    hc: "http://www.hancom.co.kr/hwpml/2011/core",
    hh: "http://www.hancom.co.kr/hwpml/2011/head",
    hm: "http://www.hancom.co.kr/hwpml/2011/master-page",
    hml: "http://www.hancom.co.kr/hwpml/2011/root",
};
/* cSpell:enable */

export type DocumentAttributeNamespace = keyof typeof DocumentAttributeNamespaces;

export type IDocumentAttributesProperties = Partial<Record<DocumentAttributeNamespace, string>> & {
    readonly Ignorable?: string;
};

export class DocumentAttributes extends XmlAttributeComponent<IDocumentAttributesProperties> {
    protected readonly xmlKeys = {
        Ignorable: "mc:Ignorable",
        ...Object.fromEntries(Object.keys(DocumentAttributeNamespaces).map((key) => [key, `xmlns:${key}`])),
    } as AttributeMap<IDocumentAttributesProperties>;

    public constructor(ns: readonly DocumentAttributeNamespace[], Ignorable?: string) {
        super({ Ignorable, ...Object.fromEntries(ns.map((n) => [n, DocumentAttributeNamespaces[n]])) });
    }
}
