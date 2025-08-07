import { XmlComponent } from "@file/xml-components";
export type IFontAttributesProperties = {
    readonly ascii?: string;
    readonly cs?: string;
    readonly eastAsia?: string;
    readonly hAnsi?: string;
    readonly hint?: string;
    readonly hangul?: string;
    readonly latin?: string;
    readonly hanja?: string;
    readonly japanese?: string;
    readonly other?: string;
    readonly symbol?: string;
    readonly user?: string;
};
export declare class RunFonts extends XmlComponent {
    constructor(name: string, hint?: string);
    constructor(attrs: string | IFontAttributesProperties);
}
