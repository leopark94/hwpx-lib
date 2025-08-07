import { BuilderElement } from "@file/xml-components";
import { DocProperties } from "./../doc-properties/doc-properties";
import { createEffectExtent } from "./../effect-extent/effect-extent";
import { createExtent } from "./../extent/extent";
import { createGraphicFrameProperties } from "./../graphic-frame/graphic-frame-properties";
import { Graphic } from "./../inline/graphic";
export const createInline = ({ mediaData, transform, docProperties, outline }) => {
    var _a, _b, _c, _d;
    return new BuilderElement({
        name: "wp:inline",
        attributes: {
            distanceTop: {
                key: "distT",
                value: 0,
            },
            distanceBottom: {
                key: "distB",
                value: 0,
            },
            distanceLeft: {
                key: "distL",
                value: 0,
            },
            distanceRight: {
                key: "distR",
                value: 0,
            },
        },
        children: [
            createExtent({ x: transform.emus.x, y: transform.emus.y }),
            createEffectExtent(outline
                ? {
                    top: ((_a = outline.width) !== null && _a !== void 0 ? _a : 9525) * 2,
                    right: ((_b = outline.width) !== null && _b !== void 0 ? _b : 9525) * 2,
                    bottom: ((_c = outline.width) !== null && _c !== void 0 ? _c : 9525) * 2,
                    left: ((_d = outline.width) !== null && _d !== void 0 ? _d : 9525) * 2,
                }
                : { top: 0, right: 0, bottom: 0, left: 0 }),
            new DocProperties(docProperties),
            createGraphicFrameProperties(),
            new Graphic({ mediaData, transform, outline }),
        ],
    });
};
//# sourceMappingURL=inline.js.map