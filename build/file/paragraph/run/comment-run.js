import { Relationships } from "@file/relationships";
import { XmlAttributeComponent, XmlComponent } from "@file/xml-components";
class CommentAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: { id: "hp:id", initials: "hp:initials", author: "hp:author", date: "hp:date" }
        });
    }
}
class CommentRangeAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: { id: "hp:id" }
        });
    }
}
class RootCommentsAttributes extends XmlAttributeComponent {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "xmlKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                "xmlns:cx": "xmlns:cx",
                "xmlns:cx1": "xmlns:cx1",
                "xmlns:cx2": "xmlns:cx2",
                "xmlns:cx3": "xmlns:cx3",
                "xmlns:cx4": "xmlns:cx4",
                "xmlns:cx5": "xmlns:cx5",
                "xmlns:cx6": "xmlns:cx6",
                "xmlns:cx7": "xmlns:cx7",
                "xmlns:cx8": "xmlns:cx8",
                "xmlns:mc": "xmlns:mc",
                "xmlns:aink": "xmlns:aink",
                "xmlns:am3d": "xmlns:am3d",
                "xmlns:o": "xmlns:o",
                "xmlns:r": "xmlns:r",
                "xmlns:m": "xmlns:m",
                "xmlns:v": "xmlns:v",
                "xmlns:wp14": "xmlns:wp14",
                "xmlns:wp": "xmlns:wp",
                "xmlns:w10": "xmlns:w10",
                "xmlns:w": "xmlns:w",
                "xmlns:w14": "xmlns:w14",
                "xmlns:w15": "xmlns:w15",
                "xmlns:w16cex": "xmlns:w16cex",
                "xmlns:w16cid": "xmlns:w16cid",
                "xmlns:w16": "xmlns:w16",
                "xmlns:w16sdtdh": "xmlns:w16sdtdh",
                "xmlns:w16se": "xmlns:w16se",
                "xmlns:wpg": "xmlns:wpg",
                "xmlns:wpi": "xmlns:wpi",
                "xmlns:wne": "xmlns:wne",
                "xmlns:wps": "xmlns:wps",
            }
        });
    }
}
export class CommentRangeStart extends XmlComponent {
    constructor(id) {
        super("hp:commentRangeStart");
        this.root.push(new CommentRangeAttributes({ id }));
    }
}
export class CommentRangeEnd extends XmlComponent {
    constructor(id) {
        super("hp:commentRangeEnd");
        this.root.push(new CommentRangeAttributes({ id }));
    }
}
export class CommentReference extends XmlComponent {
    constructor(id) {
        super("hp:commentReference");
        this.root.push(new CommentRangeAttributes({ id }));
    }
}
export class Comment extends XmlComponent {
    constructor({ id, initials, author, date = new Date(), children }) {
        super("w:comment");
        this.root.push(new CommentAttributes({
            id,
            initials,
            author,
            date: date.toISOString(),
        }));
        for (const child of children) {
            this.root.push(child);
        }
    }
}
export class Comments extends XmlComponent {
    constructor({ children }) {
        super("w:comments");
        Object.defineProperty(this, "relationships", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.root.push(new RootCommentsAttributes({
            "xmlns:cx": "http://schemas.microsoft.com/office/drawing/2014/chartex",
            "xmlns:cx1": "http://schemas.microsoft.com/office/drawing/2015/9/8/chartex",
            "xmlns:cx2": "http://schemas.microsoft.com/office/drawing/2015/10/21/chartex",
            "xmlns:cx3": "http://schemas.microsoft.com/office/drawing/2016/5/9/chartex",
            "xmlns:cx4": "http://schemas.microsoft.com/office/drawing/2016/5/10/chartex",
            "xmlns:cx5": "http://schemas.microsoft.com/office/drawing/2016/5/11/chartex",
            "xmlns:cx6": "http://schemas.microsoft.com/office/drawing/2016/5/12/chartex",
            "xmlns:cx7": "http://schemas.microsoft.com/office/drawing/2016/5/13/chartex",
            "xmlns:cx8": "http://schemas.microsoft.com/office/drawing/2016/5/14/chartex",
            "xmlns:mc": "http://schemas.openxmlformats.org/markup-compatibility/2006",
            "xmlns:aink": "http://schemas.microsoft.com/office/drawing/2016/ink",
            "xmlns:am3d": "http://schemas.microsoft.com/office/drawing/2017/model3d",
            "xmlns:o": "urn:schemas-microsoft-com:office:office",
            "xmlns:r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
            "xmlns:m": "http://schemas.openxmlformats.org/officeDocument/2006/math",
            "xmlns:v": "urn:schemas-microsoft-com:vml",
            "xmlns:wp14": "http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing",
            "xmlns:wp": "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing",
            "xmlns:w10": "urn:schemas-microsoft-com:office:word",
            "xmlns:w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
            "xmlns:w14": "http://schemas.microsoft.com/office/word/2010/wordml",
            "xmlns:w15": "http://schemas.microsoft.com/office/word/2012/wordml",
            "xmlns:w16cex": "http://schemas.microsoft.com/office/word/2018/wordml/cex",
            "xmlns:w16cid": "http://schemas.microsoft.com/office/word/2016/wordml/cid",
            "xmlns:w16": "http://schemas.microsoft.com/office/word/2018/wordml",
            "xmlns:w16sdtdh": "http://schemas.microsoft.com/office/word/2020/wordml/sdtdatahash",
            "xmlns:w16se": "http://schemas.microsoft.com/office/word/2015/wordml/symex",
            "xmlns:wpg": "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup",
            "xmlns:wpi": "http://schemas.microsoft.com/office/word/2010/wordprocessingInk",
            "xmlns:wne": "http://schemas.microsoft.com/office/word/2006/wordml",
            "xmlns:wps": "http://schemas.microsoft.com/office/word/2010/wordprocessingShape",
        }));
        for (const child of children) {
            this.root.push(new Comment(child));
        }
        this.relationships = new Relationships();
    }
    get Relationships() {
        return this.relationships;
    }
}
//# sourceMappingURL=comment-run.js.map