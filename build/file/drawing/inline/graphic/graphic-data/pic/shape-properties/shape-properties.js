import { XmlComponent } from "@file/xml-components";
import { Form } from "./form";
import { createNoFill } from "./outline/no-fill";
import { createOutline } from "./outline/outline";
import { PresetGeometry } from "./preset-geometry/preset-geometry";
import { ShapePropertiesAttributes } from "./shape-properties-attributes";
export class ShapeProperties extends XmlComponent {
    constructor({ outline, transform }) {
        super("pic:spPr");
        Object.defineProperty(this, "form", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.root.push(new ShapePropertiesAttributes({
            bwMode: "auto",
        }));
        this.form = new Form(transform);
        this.root.push(this.form);
        this.root.push(new PresetGeometry());
        if (outline) {
            this.root.push(createNoFill());
            this.root.push(createOutline(outline));
        }
    }
}
//# sourceMappingURL=shape-properties.js.map