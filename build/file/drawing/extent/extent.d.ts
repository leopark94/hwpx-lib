import { XmlComponent } from "@file/xml-components";
interface ExtentAttributes {
    readonly x?: number;
    readonly y?: number;
}
export declare const createExtent: ({ x, y }: ExtentAttributes) => XmlComponent;
export {};
