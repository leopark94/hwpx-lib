import { XmlComponent } from "@file/xml-components";
export type ILanguageOptions = {
    readonly value?: string;
    readonly eastAsia?: string;
    readonly bidirectional?: string;
};
export declare const createLanguageComponent: (options: ILanguageOptions) => XmlComponent;
