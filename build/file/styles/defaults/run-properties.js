import { RunProperties } from "@file/paragraph/run/properties";
import { XmlComponent } from "@file/xml-components";
export class RunPropertiesDefaults extends XmlComponent {
    constructor(options) {
        super("hh:rPrDefault");
        this.root.push(new RunProperties(options));
    }
}
//# sourceMappingURL=run-properties.js.map