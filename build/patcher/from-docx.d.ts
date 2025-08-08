/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
import JSZip from "jszip";
import { FileChild } from "@file/file-child";
import { ParagraphChild } from "@file/paragraph";
import { OutputByType, OutputType } from "@util/output-type";
export type InputDataType = Buffer | string | number[] | Uint8Array | ArrayBuffer | Blob | NodeJS.ReadableStream | JSZip;
export declare const PatchType: {
    readonly DOCUMENT: "file";
    readonly PARAGRAPH: "paragraph";
};
interface ParagraphPatch {
    readonly type: typeof PatchType.PARAGRAPH;
    readonly children: readonly ParagraphChild[];
}
interface FilePatch {
    readonly type: typeof PatchType.DOCUMENT;
    readonly children: readonly FileChild[];
}
export type IPatch = ParagraphPatch | FilePatch;
export type PatchDocumentOutputType = OutputType;
export interface PatchDocumentOptions<T extends PatchDocumentOutputType = PatchDocumentOutputType> {
    readonly outputType: T;
    readonly data: InputDataType;
    readonly patches: Readonly<Record<string, IPatch>>;
    readonly keepOriginalStyles?: boolean;
    readonly placeholderDelimiters?: Readonly<{
        readonly start: string;
        readonly end: string;
    }>;
    readonly recursive?: boolean;
}
export declare const patchDocument: <T extends keyof OutputByType = keyof OutputByType>({ outputType, data, patches, keepOriginalStyles, placeholderDelimiters, recursive, }: PatchDocumentOptions<T>) => Promise<OutputByType[T]>;
export {};
