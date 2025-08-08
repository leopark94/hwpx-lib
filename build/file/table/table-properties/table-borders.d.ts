import { IBorderOptions } from "@file/border";
import { XmlComponent } from "@file/xml-components";
export interface ITableBordersOptions {
    readonly top?: IBorderOptions;
    readonly bottom?: IBorderOptions;
    readonly left?: IBorderOptions;
    readonly right?: IBorderOptions;
    readonly insideHorizontal?: IBorderOptions;
    readonly insideVertical?: IBorderOptions;
}
export declare class TableBorders extends XmlComponent {
    static readonly NONE: {
        top: {
            style: "none";
            size: number;
            color: string;
        };
        bottom: {
            style: "none";
            size: number;
            color: string;
        };
        left: {
            style: "none";
            size: number;
            color: string;
        };
        right: {
            style: "none";
            size: number;
            color: string;
        };
        insideHorizontal: {
            style: "none";
            size: number;
            color: string;
        };
        insideVertical: {
            style: "none";
            size: number;
            color: string;
        };
    };
    constructor(options: ITableBordersOptions);
}
