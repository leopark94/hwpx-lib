import { Attributes, XmlComponent } from "@file/xml-components";
export class NumberProperties extends XmlComponent {
    constructor(numberId, indentLevel) {
        super("hp:numbering");
        this.root.push(new IndentLevel(indentLevel));
        this.root.push(new NumberId(numberId));
    }
}
class IndentLevel extends XmlComponent {
    constructor(level) {
        super("hp:level");
        if (level > 9) {
            throw new Error("Level cannot be greater than 9. Read more here: https://answers.microsoft.com/en-us/msoffice/forum/all/does-word-support-more-than-9-list-levels/d130fdcd-1781-446d-8c84-c6c79124e4d7");
        }
        this.root.push(new Attributes({
            val: level,
        }));
    }
}
class NumberId extends XmlComponent {
    constructor(id) {
        super("hp:numId");
        this.root.push(new Attributes({
            val: typeof id === "string" ? `{${id}}` : id,
        }));
    }
}
//# sourceMappingURL=unordered-list.js.map