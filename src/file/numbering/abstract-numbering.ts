import { XmlAttributeComponent, XmlComponent } from "@file/xml-components";
import { decimalNumber } from "@util/values";

import { ILevelsOptions, Level } from "./level";
import { MultiLevelType } from "./multi-level-type";

// <xsd:complexType name="CT_AbstractNum">
// <xsd:sequence>
//   <xsd:element name="nsid" type="CT_LongHexNumber" minOccurs="0"/>
//   <xsd:element name="multiLevelType" type="CT_MultiLevelType" minOccurs="0"/>
//   <xsd:element name="tmpl" type="CT_LongHexNumber" minOccurs="0"/>
//   <xsd:element name="name" type="CT_String" minOccurs="0"/>
//   <xsd:element name="styleLink" type="CT_String" minOccurs="0"/>
//   <xsd:element name="numStyleLink" type="CT_String" minOccurs="0"/>
//   <xsd:element name="lvl" type="CT_Lvl" minOccurs="0" maxOccurs="9"/>
// </xsd:sequence>
// <xsd:attribute name="abstractNumId" type="ST_DecimalNumber" use="required"/>
// </xsd:complexType>

// <xsd:attribute name="restartNumberingAfterBreak" type="w12:ST_OnOff"/>
// https://docs.microsoft.com/en-us/openspecs/office_standards/ms-docx/cbddeff8-01aa-4486-a48e-6a83dede4f13
class AbstractNumberingAttributes extends XmlAttributeComponent<{
    readonly id: string;
    readonly type?: string;
}> {
    protected readonly xmlKeys = {
        id: "id",
        type: "type",
    };
}

export class AbstractNumbering extends XmlComponent {
    public readonly id: number;

    public constructor(id: number, levelOptions: readonly ILevelsOptions[]) {
        super("hh:numbering");
        this.root.push(
            new AbstractNumberingAttributes({
                id: id.toString(),
                type: "bullet", // HWPX default
            }),
        );
        // HWPX에서는 MultiLevelType 대신 type 속성 사용
        this.id = id;

        for (const option of levelOptions) {
            this.root.push(new Level(option));
        }
    }
}
