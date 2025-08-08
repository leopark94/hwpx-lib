import { XmlComponent } from "@file/xml-components";
interface MathBracketPropertiesOptions {
    readonly characters?: {
        readonly beginningCharacter: string;
        readonly endingCharacter: string;
    };
}
export declare const createMathBracketProperties: ({ characters }: MathBracketPropertiesOptions) => XmlComponent;
export {};
