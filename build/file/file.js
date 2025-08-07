import { AppProperties } from "./app-properties/app-properties";
import { ContentTypes } from "./content-types/content-types";
import { CoreProperties } from "./core-properties";
import { CustomProperties } from "./custom-properties";
import { HeaderFooterReferenceType } from "./document/body/section-properties";
import { DocumentWrapper } from "./document-wrapper";
import { FontWrapper } from "./fonts/font-wrapper";
import { FooterWrapper } from "./footer-wrapper";
import { FootnotesWrapper } from "./footnotes-wrapper";
import { HeaderWrapper } from "./header-wrapper";
import { Media } from "./media";
import { Numbering } from "./numbering";
import { Comments } from "./paragraph/run/comment-run";
import { Relationships } from "./relationships";
import { Settings } from "./settings";
import { Styles } from "./styles";
import { ExternalStylesFactory } from "./styles/external-styles-factory";
import { DefaultStylesFactory } from "./styles/factory";
export class File {
    constructor(options) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        Object.defineProperty(this, "currentRelationshipId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1
        });
        Object.defineProperty(this, "documentWrapper", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "headers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "footers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "coreProperties", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "numbering", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "media", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "fileRelationships", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "footnotesWrapper", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "settings", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "contentTypes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "customProperties", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "appProperties", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "styles", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "comments", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "fontWrapper", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.coreProperties = new CoreProperties(Object.assign(Object.assign({}, options), { creator: (_a = options.creator) !== null && _a !== void 0 ? _a : "Un-named", revision: (_b = options.revision) !== null && _b !== void 0 ? _b : 1, lastModifiedBy: (_c = options.lastModifiedBy) !== null && _c !== void 0 ? _c : "Un-named" }));
        this.numbering = new Numbering(options.numbering ? options.numbering : { config: [] });
        this.comments = new Comments((_d = options.comments) !== null && _d !== void 0 ? _d : { children: [] });
        this.fileRelationships = new Relationships();
        this.customProperties = new CustomProperties((_e = options.customProperties) !== null && _e !== void 0 ? _e : []);
        this.appProperties = new AppProperties();
        this.footnotesWrapper = new FootnotesWrapper();
        this.contentTypes = new ContentTypes();
        this.documentWrapper = new DocumentWrapper({ background: options.background });
        this.settings = new Settings({
            compatibilityModeVersion: options.compatabilityModeVersion,
            compatibility: options.compatibility,
            evenAndOddHeaders: options.evenAndOddHeaderAndFooters ? true : false,
            trackRevisions: (_f = options.features) === null || _f === void 0 ? void 0 : _f.trackRevisions,
            updateFields: (_g = options.features) === null || _g === void 0 ? void 0 : _g.updateFields,
            defaultTabStop: options.defaultTabStop,
            hyphenation: {
                autoHyphenation: (_h = options.hyphenation) === null || _h === void 0 ? void 0 : _h.autoHyphenation,
                hyphenationZone: (_j = options.hyphenation) === null || _j === void 0 ? void 0 : _j.hyphenationZone,
                consecutiveHyphenLimit: (_k = options.hyphenation) === null || _k === void 0 ? void 0 : _k.consecutiveHyphenLimit,
                doNotHyphenateCaps: (_l = options.hyphenation) === null || _l === void 0 ? void 0 : _l.doNotHyphenateCaps,
            },
        });
        this.media = new Media();
        if (options.externalStyles !== undefined) {
            const stylesFactory = new ExternalStylesFactory();
            this.styles = stylesFactory.newInstance(options.externalStyles);
        }
        else if (options.styles) {
            const stylesFactory = new DefaultStylesFactory();
            const defaultStyles = stylesFactory.newInstance(options.styles.default);
            this.styles = new Styles(Object.assign(Object.assign({}, defaultStyles), options.styles));
        }
        else {
            const stylesFactory = new DefaultStylesFactory();
            this.styles = new Styles(stylesFactory.newInstance());
        }
        this.addDefaultRelationships();
        for (const section of options.sections) {
            this.addSection(section);
        }
        if (options.footnotes) {
            for (const key in options.footnotes) {
                this.footnotesWrapper.View.createFootNote(parseFloat(key), options.footnotes[key].children);
            }
        }
        this.fontWrapper = new FontWrapper((_m = options.fonts) !== null && _m !== void 0 ? _m : []);
    }
    addSection({ headers = {}, footers = {}, children, properties }) {
        this.documentWrapper.View.Body.addSection(Object.assign(Object.assign({}, properties), { headerWrapperGroup: {
                default: headers.default ? this.createHeader(headers.default) : undefined,
                first: headers.first ? this.createHeader(headers.first) : undefined,
                even: headers.even ? this.createHeader(headers.even) : undefined,
            }, footerWrapperGroup: {
                default: footers.default ? this.createFooter(footers.default) : undefined,
                first: footers.first ? this.createFooter(footers.first) : undefined,
                even: footers.even ? this.createFooter(footers.even) : undefined,
            } }));
        for (const child of children) {
            this.documentWrapper.View.add(child);
        }
    }
    createHeader(header) {
        const wrapper = new HeaderWrapper(this.media, this.currentRelationshipId++);
        for (const child of header.options.children) {
            wrapper.add(child);
        }
        this.addHeaderToDocument(wrapper);
        return wrapper;
    }
    createFooter(footer) {
        const wrapper = new FooterWrapper(this.media, this.currentRelationshipId++);
        for (const child of footer.options.children) {
            wrapper.add(child);
        }
        this.addFooterToDocument(wrapper);
        return wrapper;
    }
    addHeaderToDocument(header, type = HeaderFooterReferenceType.DEFAULT) {
        this.headers.push({ header, type });
        this.documentWrapper.Relationships.createRelationship(header.View.ReferenceId, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/header", `header${this.headers.length}.xml`);
        this.contentTypes.addHeader(this.headers.length);
    }
    addFooterToDocument(footer, type = HeaderFooterReferenceType.DEFAULT) {
        this.footers.push({ footer, type });
        this.documentWrapper.Relationships.createRelationship(footer.View.ReferenceId, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer", `footer${this.footers.length}.xml`);
        this.contentTypes.addFooter(this.footers.length);
    }
    addDefaultRelationships() {
        this.fileRelationships.createRelationship(1, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument", "word/document.xml");
        this.fileRelationships.createRelationship(2, "http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties", "docProps/core.xml");
        this.fileRelationships.createRelationship(3, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties", "docProps/app.xml");
        this.fileRelationships.createRelationship(4, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/custom-properties", "docProps/custom.xml");
        this.documentWrapper.Relationships.createRelationship(this.currentRelationshipId++, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles", "styles.xml");
        this.documentWrapper.Relationships.createRelationship(this.currentRelationshipId++, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering", "numbering.xml");
        this.documentWrapper.Relationships.createRelationship(this.currentRelationshipId++, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/footnotes", "footnotes.xml");
        this.documentWrapper.Relationships.createRelationship(this.currentRelationshipId++, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings", "settings.xml");
        this.documentWrapper.Relationships.createRelationship(this.currentRelationshipId++, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/comments", "comments.xml");
    }
    get Document() {
        return this.documentWrapper;
    }
    get Styles() {
        return this.styles;
    }
    get CoreProperties() {
        return this.coreProperties;
    }
    get Numbering() {
        return this.numbering;
    }
    get Media() {
        return this.media;
    }
    get FileRelationships() {
        return this.fileRelationships;
    }
    get Headers() {
        return this.headers.map((item) => item.header);
    }
    get Footers() {
        return this.footers.map((item) => item.footer);
    }
    get ContentTypes() {
        return this.contentTypes;
    }
    get CustomProperties() {
        return this.customProperties;
    }
    get AppProperties() {
        return this.appProperties;
    }
    get FootNotes() {
        return this.footnotesWrapper;
    }
    get Settings() {
        return this.settings;
    }
    get Comments() {
        return this.comments;
    }
    get FontTable() {
        return this.fontWrapper;
    }
}
//# sourceMappingURL=file.js.map