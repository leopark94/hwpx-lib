import { BuilderElement, XmlComponent } from "@file/xml-components";

// <xsd:complexType name="CT_Language">
//   <xsd:attribute name="val" type="s:ST_Lang" use="optional"/>
//   <xsd:attribute name="eastAsia" type="s:ST_Lang" use="optional"/>
//   <xsd:attribute name="bidi" type="s:ST_Lang" use="optional"/>
// </xsd:complexType>
export type ILanguageOptions = {
    readonly value?: string;
    readonly eastAsia?: string;
    readonly bidirectional?: string;
};

export const createLanguageComponent = (options: ILanguageOptions): XmlComponent =>
    new BuilderElement<{
        readonly value?: string;
        readonly eastAsia?: string;
        readonly bidirectional?: string;
    }>({
        name: "hp:language",
        attributes: {
            value: {
                key: "hp:val",
                value: options.value,
            },
            eastAsia: {
                key: "hp:eastAsia",
                value: options.eastAsia,
            },
            bidirectional: {
                key: "hs:bidi",
                value: options.bidirectional,
            },
        },
    });
