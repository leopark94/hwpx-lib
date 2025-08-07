import { BuilderElement } from "@file/xml-components";
import { createTextboxContent } from "../texbox-content/textbox-content";
export const createVmlTextbox = ({ style, children, inset }) => new BuilderElement({
    name: "v:textbox",
    attributes: {
        style: {
            key: "style",
            value: style,
        },
        insetMode: {
            key: "insetmode",
            value: inset ? "custom" : "auto",
        },
        inset: {
            key: "inset",
            value: inset ? `${inset.left}, ${inset.top}, ${inset.right}, ${inset.bottom}` : undefined,
        },
    },
    children: [createTextboxContent({ children })],
});
//# sourceMappingURL=vml-texbox.js.map