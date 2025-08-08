import { Element } from "xml-js";
import { IContext } from "@file/xml-components";
import { IPatch } from "./from-docx";
interface IReplacerResult {
    readonly element: Element;
    readonly didFindOccurrence: boolean;
}
export declare const replacer: ({ json, patch, patchText, context, keepOriginalStyles, }: {
    readonly json: Element;
    readonly patch: IPatch;
    readonly patchText: string;
    readonly context: IContext;
    readonly keepOriginalStyles?: boolean | undefined;
}) => IReplacerResult;
export {};
