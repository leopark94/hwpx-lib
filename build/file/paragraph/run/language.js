import { BuilderElement } from "@file/xml-components";
export const createLanguageComponent = (options) => new BuilderElement({
    name: "hp:language",
    attributes: {
        value: {
            key: "hp:val",
            value: options.value,
        },
        eastAsia: {
            key: "hp:eastAsia",
            value: options.eastAsia,
        },
        bidirectional: {
            key: "hs:bidi",
            value: options.bidirectional,
        },
    },
});
//# sourceMappingURL=language.js.map