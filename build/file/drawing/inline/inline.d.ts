import { IMediaData, IMediaDataTransformation } from "@file/media";
import { XmlComponent } from "@file/xml-components";
import { DocPropertiesOptions } from "./../doc-properties/doc-properties";
import { OutlineOptions } from "./graphic/graphic-data/pic/shape-properties/outline/outline";
interface InlineOptions {
    readonly mediaData: IMediaData;
    readonly transform: IMediaDataTransformation;
    readonly docProperties?: DocPropertiesOptions;
    readonly outline?: OutlineOptions;
}
export declare const createInline: ({ mediaData, transform, docProperties, outline }: InlineOptions) => XmlComponent;
export {};
