// HWPX checkbox symbol element
import { XmlAttributeComponent, XmlComponent } from "@file/xml-components";
import { shortHexNumber } from "@util/values";

class CheckboxSymbolAttributes extends XmlAttributeComponent<{
    readonly val?: string | number | boolean;
    readonly symbolfont?: string;
}> {
    protected readonly xmlKeys = {
        val: "hp:val",
        symbolfont: "hp:font",
    };
}

export class CheckBoxSymbolElement extends XmlComponent {
    public constructor(name: string, val: string, font?: string) {
        super(name);
        if (font) {
            this.root.push(new CheckboxSymbolAttributes({ val: shortHexNumber(val), symbolfont: font }));
        } else {
            this.root.push(new CheckboxSymbolAttributes({ val }));
        }
    }
}
