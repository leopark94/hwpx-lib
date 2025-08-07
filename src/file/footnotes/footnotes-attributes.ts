import { XmlAttributeComponent } from "@file/xml-components";

// HWPX 각주 속성
export class FootnotesAttributes extends XmlAttributeComponent<{
    readonly id?: string;
    readonly type?: string;
    readonly place?: string;
    readonly beneathText?: boolean;
    readonly suffix?: string;
    readonly numFormat?: string;
}> {
    protected readonly xmlKeys = {
        id: "id",
        type: "type",
        place: "place",
        beneathText: "beneathText",
        suffix: "suffix",
        numFormat: "numFormat",
    };
}
