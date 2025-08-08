import { XmlComponent } from "@file/xml-components";
import { PositiveUniversalMeasure } from "@util/values";
interface IColumnAttributes {
    readonly width: number | PositiveUniversalMeasure;
    readonly space?: number | PositiveUniversalMeasure;
}
export declare class Column extends XmlComponent {
    constructor({ width, space }: IColumnAttributes);
}
export {};
