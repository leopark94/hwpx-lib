/// <reference types="node" />
/// <reference types="node" />
import { XmlComponent } from "@file/xml-components";
import { CharacterSet } from "./font";
import { FontOptionsWithKey } from "./font-wrapper";
export interface FontOptions {
    readonly name: string;
    readonly data: Buffer;
    readonly characterSet?: (typeof CharacterSet)[keyof typeof CharacterSet];
}
export declare const createFontTable: (fonts: readonly FontOptionsWithKey[]) => XmlComponent;
