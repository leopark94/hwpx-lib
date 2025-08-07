import { IViewWrapper } from "@file/document-wrapper";
import { Relationships } from "@file/relationships";
import { XmlComponent } from "@file/xml-components";
import { FontOptions } from "./font-table";
export type FontOptionsWithKey = FontOptions & {
    readonly fontKey: string;
};
export declare class FontWrapper implements IViewWrapper {
    readonly options: readonly FontOptions[];
    private readonly fontTable;
    private readonly relationships;
    readonly fontOptionsWithKey: readonly FontOptionsWithKey[];
    constructor(options: readonly FontOptions[]);
    get View(): XmlComponent;
    get Relationships(): Relationships;
}
