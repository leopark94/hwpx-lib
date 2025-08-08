import { XmlComponent } from "@file/xml-components";
interface MathNAryPropertiesOptions {
    readonly accent: string;
    readonly hasSuperScript: boolean;
    readonly hasSubScript: boolean;
    readonly limitLocationVal?: string;
}
export declare const createMathNAryProperties: ({ accent, hasSuperScript, hasSubScript, limitLocationVal, }: MathNAryPropertiesOptions) => XmlComponent;
export {};
