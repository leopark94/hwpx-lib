import { XmlComponent } from "@file/xml-components";
type MathBracketPropertiesOptions = {
    readonly characters?: {
        readonly beginningCharacter: string;
        readonly endingCharacter: string;
    };
};
export declare const createMathBracketProperties: ({ characters }: MathBracketPropertiesOptions) => XmlComponent;
export {};
