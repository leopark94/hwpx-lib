import { StringContainer, XmlAttributeComponent, XmlComponent } from "@file/xml-components";
import { dateTimeValue } from "@util/values";
import { DocumentAttributes } from "../document/document-attributes";
export class CoreProperties extends XmlComponent {
    constructor(options) {
        super("cp:coreProperties");
        this.root.push(new DocumentAttributes(["cp", "dc", "dcterms", "dcmitype", "xsi"]));
        if (options.title) {
            this.root.push(new StringContainer("dc:title", options.title));
        }
        if (options.subject) {
            this.root.push(new StringContainer("dc:subject", options.subject));
        }
        if (options.creator) {
            this.root.push(new StringContainer("dc:creator", options.creator));
        }
        if (options.keywords) {
            this.root.push(new StringContainer("cp:keywords", options.keywords));
        }
        if (options.description) {
            this.root.push(new StringContainer("dc:description", options.description));
        }
        if (options.lastModifiedBy) {
            this.root.push(new StringContainer("cp:lastModifiedBy", options.lastModifiedBy));
        }
        if (options.revision) {
            this.root.push(new StringContainer("cp:revision", String(options.revision)));
        }
        this.root.push(new TimestampElement("dcterms:created"));
        this.root.push(new TimestampElement("dcterms:modified"));
    }
}
class TimestampElementProperties extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: { type: "xsi:type" }
        });
    }
}
class TimestampElement extends XmlComponent {
    constructor(name) {
        super(name);
        this.root.push(new TimestampElementProperties({
            type: "dcterms:W3CDTF",
        }));
        this.root.push(dateTimeValue(new Date()));
    }
}
//# sourceMappingURL=properties.js.map