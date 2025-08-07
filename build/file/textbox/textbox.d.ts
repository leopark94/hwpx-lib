import { FileChild } from "@file/file-child";
import { IParagraphOptions } from "@file/paragraph";
import { VmlShapeStyle } from "./shape/shape";
type ITextboxOptions = Omit<IParagraphOptions, "style"> & {
    readonly style?: VmlShapeStyle;
};
export declare class Textbox extends FileChild {
    constructor({ style, children, ...rest }: ITextboxOptions);
}
export {};
