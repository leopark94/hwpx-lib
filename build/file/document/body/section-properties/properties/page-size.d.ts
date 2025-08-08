import { XmlComponent } from "@file/xml-components";
import { PositiveUniversalMeasure } from "@util/values";
export declare const PageOrientation: {
    readonly PORTRAIT: "portrait";
    readonly LANDSCAPE: "landscape";
};
export interface IPageSizeAttributes {
    readonly width: number | PositiveUniversalMeasure;
    readonly height: number | PositiveUniversalMeasure;
    readonly orientation?: (typeof PageOrientation)[keyof typeof PageOrientation];
    readonly code?: number;
}
export declare const createPageSize: ({ width, height, orientation, code }: IPageSizeAttributes) => XmlComponent;
