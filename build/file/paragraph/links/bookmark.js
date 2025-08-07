import { XmlComponent } from "@file/xml-components";
import { bookmarkUniqueNumericIdGen } from "@util/convenience-functions";
import { BookmarkEndAttributes, BookmarkStartAttributes } from "./bookmark-attributes";
export class Bookmark {
    constructor(options) {
        Object.defineProperty(this, "bookmarkUniqueNumericId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: bookmarkUniqueNumericIdGen()
        });
        Object.defineProperty(this, "start", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "children", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "end", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const linkId = this.bookmarkUniqueNumericId();
        this.start = new BookmarkStart(options.id, linkId);
        this.children = options.children;
        this.end = new BookmarkEnd(linkId);
    }
}
export class BookmarkStart extends XmlComponent {
    constructor(id, linkId) {
        super("hp:bookmarkStart");
        const attributes = new BookmarkStartAttributes({
            name: id,
            id: linkId,
        });
        this.root.push(attributes);
    }
}
export class BookmarkEnd extends XmlComponent {
    constructor(linkId) {
        super("hp:bookmarkEnd");
        const attributes = new BookmarkEndAttributes({
            id: linkId,
        });
        this.root.push(attributes);
    }
}
//# sourceMappingURL=bookmark.js.map