import { hashedId } from "@util/convenience-functions";
import { Drawing } from "../../drawing";
import { Run } from "../run";
const convertDataURIToBinary = (dataURI) => {
    if (typeof atob === "function") {
        const BASE64_MARKER = ";base64,";
        const base64Index = dataURI.indexOf(BASE64_MARKER);
        const base64IndexWithOffset = base64Index === -1 ? 0 : base64Index + BASE64_MARKER.length;
        return new Uint8Array(atob(dataURI.substring(base64IndexWithOffset))
            .split("")
            .map((c) => c.charCodeAt(0)));
    }
    else {
        const b = require("buf" + "fer");
        return new b.Buffer(dataURI, "base64");
    }
};
const standardizeData = (data) => typeof data === "string" ? convertDataURIToBinary(data) : data;
const createImageData = (options, key) => ({
    data: standardizeData(options.data),
    fileName: key,
    transformation: {
        pixels: {
            x: Math.round(options.transformation.width),
            y: Math.round(options.transformation.height),
        },
        emus: {
            x: Math.round(options.transformation.width * 9525),
            y: Math.round(options.transformation.height * 9525),
        },
        flip: options.transformation.flip,
        rotation: options.transformation.rotation ? options.transformation.rotation * 60000 : undefined,
    },
});
export class ImageRun extends Run {
    constructor(options) {
        super({});
        Object.defineProperty(this, "imageData", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const hash = hashedId(options.data);
        const key = `${hash}.${options.type}`;
        this.imageData =
            options.type === "svg"
                ? Object.assign(Object.assign({ type: options.type }, createImageData(options, key)), { fallback: Object.assign({ type: options.fallback.type }, createImageData(Object.assign(Object.assign({}, options.fallback), { transformation: options.transformation }), `${hashedId(options.fallback.data)}.${options.fallback.type}`)) }) : Object.assign({ type: options.type }, createImageData(options, key));
        const drawing = new Drawing(this.imageData, {
            floating: options.floating,
            docProperties: options.altText,
            outline: options.outline,
        });
        this.root.push(drawing);
    }
    prepForXml(context) {
        context.file.Media.addImage(this.imageData.fileName, this.imageData);
        if (this.imageData.type === "svg") {
            context.file.Media.addImage(this.imageData.fallback.fileName, this.imageData.fallback);
        }
        return super.prepForXml(context);
    }
}
//# sourceMappingURL=image-run.js.map