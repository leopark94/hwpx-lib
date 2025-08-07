import { NextAttributeComponent, XmlComponent } from "@file/xml-components";
import { PositiveUniversalMeasure, UniversalMeasure, signedTwipsMeasureValue, twipsMeasureValue } from "@util/values";

// <xsd:complexType name="CT_PageMar">
//     <xsd:attribute name="top" type="ST_SignedTwipsMeasure" use="required"/>
//     <xsd:attribute name="right" type="s:ST_TwipsMeasure" use="required"/>
//     <xsd:attribute name="bottom" type="ST_SignedTwipsMeasure" use="required"/>
//     <xsd:attribute name="left" type="s:ST_TwipsMeasure" use="required"/>
//     <xsd:attribute name="header" type="s:ST_TwipsMeasure" use="required"/>
//     <xsd:attribute name="footer" type="s:ST_TwipsMeasure" use="required"/>
//     <xsd:attribute name="gutter" type="s:ST_TwipsMeasure" use="required"/>
// </xsd:complexType>
export type IPageMarginAttributes = {
    readonly top?: number | UniversalMeasure;
    readonly right?: number | PositiveUniversalMeasure;
    readonly bottom?: number | UniversalMeasure;
    readonly left?: number | PositiveUniversalMeasure;
    readonly header?: number | PositiveUniversalMeasure;
    readonly footer?: number | PositiveUniversalMeasure;
    readonly gutter?: number | PositiveUniversalMeasure;
};

export class PageMargin extends XmlComponent {
    public constructor(
        top: number | UniversalMeasure,
        right: number | PositiveUniversalMeasure,
        bottom: number | UniversalMeasure,
        left: number | PositiveUniversalMeasure,
        header: number | PositiveUniversalMeasure,
        footer: number | PositiveUniversalMeasure,
        gutter: number | PositiveUniversalMeasure,
    ) {
        super("hs:pageMargin");
        this.root.push(
            new NextAttributeComponent<IPageMarginAttributes>({
                top: { key: "hp:top", value: signedTwipsMeasureValue(top) },
                right: { key: "hp:right", value: twipsMeasureValue(right) },
                bottom: { key: "hp:bottom", value: signedTwipsMeasureValue(bottom) },
                left: { key: "hp:left", value: twipsMeasureValue(left) },
                header: { key: "hp:header", value: twipsMeasureValue(header) },
                footer: { key: "hp:footer", value: twipsMeasureValue(footer) },
                gutter: { key: "hp:gutter", value: twipsMeasureValue(gutter) },
            }),
        );
    }
}
