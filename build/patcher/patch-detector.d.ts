import { InputDataType } from "./from-docx";
interface PatchDetectorOptions {
    readonly data: InputDataType;
}
export declare const patchDetector: ({ data }: PatchDetectorOptions) => Promise<readonly string[]>;
export {};
