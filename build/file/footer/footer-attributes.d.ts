import { XmlAttributeComponent } from "@file/xml-components";
export declare class FooterAttributes extends XmlAttributeComponent<{
    readonly type?: string;
    readonly id?: string;
    readonly width?: number;
    readonly height?: number;
    readonly textWrap?: boolean;
    readonly numberingRestartLocation?: string;
}> {
    protected readonly xmlKeys: {
        type: string;
        id: string;
        width: string;
        height: string;
        textWrap: string;
        numberingRestartLocation: string;
    };
}
