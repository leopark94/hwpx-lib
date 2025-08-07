import { IMediaData, IMediaDataTransformation } from "@file/media";
import { XmlComponent } from "@file/xml-components";
import { OutlineOptions } from "./shape-properties/outline/outline";
export declare class Pic extends XmlComponent {
    constructor({ mediaData, transform, outline, }: {
        readonly mediaData: IMediaData;
        readonly transform: IMediaDataTransformation;
        readonly outline?: OutlineOptions;
    });
}
