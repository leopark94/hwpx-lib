import { Stream } from "stream";

import { File } from "@file/file";
import { OutputByType, OutputType } from "@util/output-type";

import { HwpxTemplateCompiler } from "./hwpx-template-compiler";
import { IXmlifyedFile } from "./next-compiler";

/**
 * Use blanks to prettify
 */
export const PrettifyType = {
    NONE: "",
    WITH_2_BLANKS: "  ",
    WITH_4_BLANKS: "    ",

    WITH_TAB: "\t",
} as const;

const convertPrettifyType = (
    prettify?: boolean | (typeof PrettifyType)[keyof typeof PrettifyType],
): (typeof PrettifyType)[keyof typeof PrettifyType] | undefined =>
    prettify === true ? PrettifyType.WITH_2_BLANKS : prettify === false ? undefined : prettify;

export class Packer {
    public static async pack<T extends OutputType>(
        file: File,
        type: T,
        prettify?: boolean | (typeof PrettifyType)[keyof typeof PrettifyType],
        overrides: readonly IXmlifyedFile[] = [],
    ): Promise<OutputByType[T]> {
        const zip = await this.compiler.compile(file);
        return zip.generateAsync({
            type,
            mimeType: "application/hwp+zip",
            compression: "DEFLATE",
        });
    }

    public static toString(
        file: File,
        prettify?: boolean | (typeof PrettifyType)[keyof typeof PrettifyType],
        overrides: readonly IXmlifyedFile[] = [],
    ): Promise<string> {
        return Packer.pack(file, "string", prettify, overrides);
    }

    public static toBuffer(
        file: File,
        prettify?: boolean | (typeof PrettifyType)[keyof typeof PrettifyType],
        overrides: readonly IXmlifyedFile[] = [],
    ): Promise<Buffer> {
        return Packer.pack(file, "nodebuffer", prettify, overrides);
    }

    public static toBase64String(
        file: File,
        prettify?: boolean | (typeof PrettifyType)[keyof typeof PrettifyType],
        overrides: readonly IXmlifyedFile[] = [],
    ): Promise<string> {
        return Packer.pack(file, "base64", prettify, overrides);
    }

    public static toBlob(
        file: File,
        prettify?: boolean | (typeof PrettifyType)[keyof typeof PrettifyType],
        overrides: readonly IXmlifyedFile[] = [],
    ): Promise<Blob> {
        return Packer.pack(file, "blob", prettify, overrides);
    }

    public static toArrayBuffer(
        file: File,
        prettify?: boolean | (typeof PrettifyType)[keyof typeof PrettifyType],
        overrides: readonly IXmlifyedFile[] = [],
    ): Promise<ArrayBuffer> {
        return Packer.pack(file, "arraybuffer", prettify, overrides);
    }

    public static toStream(
        file: File,
        prettify?: boolean | (typeof PrettifyType)[keyof typeof PrettifyType],
        overrides: readonly IXmlifyedFile[] = [],
    ): Stream {
        const stream = new Stream();

        this.compiler.compile(file).then((zip) => {
            zip.generateAsync({
                type: "nodebuffer",
                mimeType: "application/hwp+zip",
                compression: "DEFLATE",
            }).then((z) => {
                stream.emit("data", z);
                stream.emit("end");
            });
        });

        return stream;
    }

    private static readonly compiler = new HwpxTemplateCompiler();
}
