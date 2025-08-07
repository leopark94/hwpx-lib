import { IMediaData, IMediaDataTransformation } from "@file/media";
import { XmlComponent } from "@file/xml-components";
import { IDrawingOptions } from "../drawing";
export declare class Anchor extends XmlComponent {
    constructor({ mediaData, transform, drawingOptions, }: {
        readonly mediaData: IMediaData;
        readonly transform: IMediaDataTransformation;
        readonly drawingOptions: IDrawingOptions;
    });
}
