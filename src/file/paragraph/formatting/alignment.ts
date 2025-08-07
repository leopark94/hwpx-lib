// http://officeopenxml.com/WPalignment.php
// http://officeopenxml.com/WPtableAlignment.php
// http://www.datypic.com/sc/ooxml/t-w_ST_Jc.html
import { XmlAttributeComponent, XmlComponent } from "@file/xml-components";

// <xsd:simpleType name="ST_Jc">
//     <xsd:restriction base="xsd:string">
//         <xsd:enumeration value="start"/>
//         <xsd:enumeration value="center"/>
//         <xsd:enumeration value="end"/>
//         <xsd:enumeration value="both"/>
//         <xsd:enumeration value="mediumKashida"/>
//         <xsd:enumeration value="distribute"/>
//         <xsd:enumeration value="numTab"/>
//         <xsd:enumeration value="highKashida"/>
//         <xsd:enumeration value="lowKashida"/>
//         <xsd:enumeration value="thaiDistribute"/>
//         <xsd:enumeration value="left"/>
//         <xsd:enumeration value="right"/>
//     </xsd:restriction>
// </xsd:simpleType>

export const AlignmentType = {
    /** Align Start */
    START: "start",
    /** Align Center */
    CENTER: "center",
    /** End */
    END: "end",
    /** Justified */
    BOTH: "both",
    /** Medium Kashida Length */
    MEDIUM_KASHIDA: "mediumKashida",
    /** Distribute All Characters Equally */
    DISTRIBUTE: "distribute",
    /** Align to List Tab */
    NUM_TAB: "numTab",
    /** Widest Kashida Length */
    HIGH_KASHIDA: "highKashida",
    /** Low Kashida Length */
    LOW_KASHIDA: "lowKashida",
    /** Thai Language Justification */
    THAI_DISTRIBUTE: "thaiDistribute",
    /** Align Left */
    LEFT: "left",
    /** Align Right */
    RIGHT: "right",
    /** Justified */
    JUSTIFIED: "both",
} as const;

// HWPX에서는 horizontal과 vertical 속성으로 분리
export class AlignmentAttributes extends XmlAttributeComponent<{
    readonly horizontal?: (typeof AlignmentType)[keyof typeof AlignmentType];
    readonly vertical?: string;
}> {
    protected readonly xmlKeys = {
        horizontal: "horizontal",
        vertical: "vertical",
    };
}

export class Alignment extends XmlComponent {
    public constructor(type: (typeof AlignmentType)[keyof typeof AlignmentType]) {
        super("hh:align");
        // HWPX 형식에 맞게 변환
        let horizontal: string = type;
        if (type === AlignmentType.LEFT || type === AlignmentType.START) {
            horizontal = "LEFT";
        } else if (type === AlignmentType.RIGHT || type === AlignmentType.END) {
            horizontal = "RIGHT";
        } else if (type === AlignmentType.CENTER) {
            horizontal = "CENTER";
        } else if (type === AlignmentType.BOTH || type === AlignmentType.JUSTIFIED) {
            horizontal = "JUSTIFY";
        } else if (type === AlignmentType.DISTRIBUTE) {
            horizontal = "DISTRIBUTE";
        }

        this.root.push(
            new AlignmentAttributes({
                horizontal: horizontal,
                vertical: "BASELINE",
            }),
        );
    }
}
