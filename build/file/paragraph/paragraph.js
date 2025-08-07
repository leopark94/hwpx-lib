import { FileChild } from "@file/file-child";
import { uniqueId } from "@util/convenience-functions";
import { TargetModeType } from "../relationships/relationship/relationship";
import { Bookmark, ConcreteHyperlink, ExternalHyperlink } from "./links";
import { ParagraphProperties } from "./properties";
import { TextRun } from "./run";
export class Paragraph extends FileChild {
    constructor(options) {
        super("hp:p");
        Object.defineProperty(this, "properties", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        if (typeof options === "string") {
            this.properties = new ParagraphProperties({});
            this.root.push(this.properties);
            this.root.push(new TextRun(options));
            return this;
        }
        this.properties = new ParagraphProperties(options);
        this.root.push(this.properties);
        if (options.text) {
            this.root.push(new TextRun(options.text));
        }
        if (options.children) {
            for (const child of options.children) {
                if (child instanceof Bookmark) {
                    this.root.push(child.start);
                    for (const textRun of child.children) {
                        this.root.push(textRun);
                    }
                    this.root.push(child.end);
                    continue;
                }
                this.root.push(child);
            }
        }
    }
    prepForXml(context) {
        for (const element of this.root) {
            if (element instanceof ExternalHyperlink) {
                const index = this.root.indexOf(element);
                const concreteHyperlink = new ConcreteHyperlink(element.options.children, uniqueId());
                context.viewWrapper.Relationships.createRelationship(concreteHyperlink.linkId, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink", element.options.link, TargetModeType.EXTERNAL);
                this.root[index] = concreteHyperlink;
            }
        }
        return super.prepForXml(context);
    }
    addRunToFront(run) {
        this.root.splice(1, 0, run);
        return this;
    }
}
//# sourceMappingURL=paragraph.js.map