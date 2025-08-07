import { XmlAttributeComponent } from "@file/xml-components";
export declare class FootnotesAttributes extends XmlAttributeComponent<{
    readonly id?: string;
    readonly type?: string;
    readonly place?: string;
    readonly beneathText?: boolean;
    readonly suffix?: string;
    readonly numFormat?: string;
}> {
    protected readonly xmlKeys: {
        id: string;
        type: string;
        place: string;
        beneathText: string;
        suffix: string;
        numFormat: string;
    };
}
