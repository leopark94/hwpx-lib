import { BuilderElement } from "@file/xml-components";
import { createExtentionList } from "./blip-extentions";
export const createBlip = (mediaData) => new BuilderElement({
    name: "a:blip",
    attributes: {
        embed: {
            key: "r:embed",
            value: `rId{${mediaData.type === "svg" ? mediaData.fallback.fileName : mediaData.fileName}}`,
        },
        cstate: {
            key: "cstate",
            value: "none",
        },
    },
    children: mediaData.type === "svg" ? [createExtentionList(mediaData)] : [],
});
//# sourceMappingURL=blip.js.map