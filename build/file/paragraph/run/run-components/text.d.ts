import { SpaceType } from "@file/shared";
import { XmlComponent } from "@file/xml-components";
type ITextOptions = {
    readonly space?: (typeof SpaceType)[keyof typeof SpaceType];
    readonly text?: string;
};
export declare class Text extends XmlComponent {
    constructor(options: string | ITextOptions);
}
export {};
