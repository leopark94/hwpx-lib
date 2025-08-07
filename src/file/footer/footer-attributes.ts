import { XmlAttributeComponent } from "@file/xml-components";

// HWPX Footer 속성
export class FooterAttributes extends XmlAttributeComponent<{
    readonly type?: string;
    readonly id?: string;
    readonly width?: number;
    readonly height?: number;
    readonly textWrap?: boolean;
    readonly numberingRestartLocation?: string;
}> {
    protected readonly xmlKeys = {
        type: "type",
        id: "id",
        width: "width",
        height: "height",
        textWrap: "textWrap",
        numberingRestartLocation: "numberingRestartLocation",
    };
}
