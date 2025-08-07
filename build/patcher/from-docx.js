var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import JSZip from "jszip";
import { js2xml } from "xml-js";
import { ImageReplacer } from "@export/packer/image-replacer";
import { DocumentAttributeNamespaces } from "@file/document";
import { Media } from "@file/media";
import { ConcreteHyperlink, ExternalHyperlink } from "@file/paragraph";
import { TargetModeType } from "@file/relationships/relationship/relationship";
import { uniqueId } from "@util/convenience-functions";
import { appendContentType } from "./content-types-manager";
import { appendRelationship, getNextRelationshipIndex } from "./relationship-manager";
import { replacer } from "./replacer";
import { toJson } from "./util";
export const PatchType = {
    DOCUMENT: "file",
    PARAGRAPH: "paragraph",
};
const imageReplacer = new ImageReplacer();
const UTF16LE = new Uint8Array([0xff, 0xfe]);
const UTF16BE = new Uint8Array([0xfe, 0xff]);
const compareByteArrays = (a, b) => {
    if (a.length !== b.length) {
        return false;
    }
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
};
export const patchDocument = ({ outputType, data, patches, keepOriginalStyles, placeholderDelimiters = { start: "{{", end: "}}" }, recursive = true, }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const zipContent = data instanceof JSZip ? data : yield JSZip.loadAsync(data);
    const contexts = new Map();
    const file = {
        Media: new Media(),
    };
    const map = new Map();
    const imageRelationshipAdditions = [];
    const hyperlinkRelationshipAdditions = [];
    let hasMedia = false;
    const binaryContentMap = new Map();
    for (const [key, value] of Object.entries(zipContent.files)) {
        const binaryValue = yield value.async("uint8array");
        const startBytes = binaryValue.slice(0, 2);
        if (compareByteArrays(startBytes, UTF16LE) || compareByteArrays(startBytes, UTF16BE)) {
            binaryContentMap.set(key, binaryValue);
            continue;
        }
        if (!key.endsWith(".xml") && !key.endsWith(".rels")) {
            binaryContentMap.set(key, binaryValue);
            continue;
        }
        const json = toJson(yield value.async("text"));
        if (key === "word/document.xml") {
            const document = (_a = json.elements) === null || _a === void 0 ? void 0 : _a.find((i) => i.name === "hml:document");
            if (document && document.attributes) {
                for (const ns of ["mc", "wp", "r", "w15", "m"]) {
                    document.attributes[`xmlns:${ns}`] = DocumentAttributeNamespaces[ns];
                }
                document.attributes["mc:Ignorable"] = `${document.attributes["mc:Ignorable"] || ""} w15`.trim();
            }
        }
        if (key.startsWith("word/") && !key.endsWith(".xml.rels")) {
            const context = {
                file,
                viewWrapper: {
                    Relationships: {
                        createRelationship: (linkId, _, target, __) => {
                            hyperlinkRelationshipAdditions.push({
                                key,
                                hyperlink: {
                                    id: linkId,
                                    link: target,
                                },
                            });
                        },
                    },
                },
                stack: [],
            };
            contexts.set(key, context);
            if (!(placeholderDelimiters === null || placeholderDelimiters === void 0 ? void 0 : placeholderDelimiters.start.trim()) || !(placeholderDelimiters === null || placeholderDelimiters === void 0 ? void 0 : placeholderDelimiters.end.trim())) {
                throw new Error("Both start and end delimiters must be non-empty strings.");
            }
            const { start, end } = placeholderDelimiters;
            for (const [patchKey, patchValue] of Object.entries(patches)) {
                const patchText = `${start}${patchKey}${end}`;
                while (true) {
                    const { didFindOccurrence } = replacer({
                        json,
                        patch: Object.assign(Object.assign({}, patchValue), { children: patchValue.children.map((element) => {
                                if (element instanceof ExternalHyperlink) {
                                    const concreteHyperlink = new ConcreteHyperlink(element.options.children, uniqueId());
                                    hyperlinkRelationshipAdditions.push({
                                        key,
                                        hyperlink: {
                                            id: concreteHyperlink.linkId,
                                            link: element.options.link,
                                        },
                                    });
                                    return concreteHyperlink;
                                }
                                else {
                                    return element;
                                }
                            }) }),
                        patchText,
                        context,
                        keepOriginalStyles,
                    });
                    if (!recursive || !didFindOccurrence) {
                        break;
                    }
                }
            }
            const mediaDatas = imageReplacer.getMediaData(JSON.stringify(json), context.file.Media);
            if (mediaDatas.length > 0) {
                hasMedia = true;
                imageRelationshipAdditions.push({
                    key,
                    mediaDatas,
                });
            }
        }
        map.set(key, json);
    }
    for (const { key, mediaDatas } of imageRelationshipAdditions) {
        const relationshipKey = `word/_rels/${key.split("/").pop()}.rels`;
        const relationshipsJson = (_b = map.get(relationshipKey)) !== null && _b !== void 0 ? _b : createRelationshipFile();
        map.set(relationshipKey, relationshipsJson);
        const index = getNextRelationshipIndex(relationshipsJson);
        const newJson = imageReplacer.replace(JSON.stringify(map.get(key)), mediaDatas, index);
        map.set(key, JSON.parse(newJson));
        for (let i = 0; i < mediaDatas.length; i++) {
            const { fileName } = mediaDatas[i];
            appendRelationship(relationshipsJson, index + i, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image", `media/${fileName}`);
        }
    }
    for (const { key, hyperlink } of hyperlinkRelationshipAdditions) {
        const relationshipKey = `word/_rels/${key.split("/").pop()}.rels`;
        const relationshipsJson = (_c = map.get(relationshipKey)) !== null && _c !== void 0 ? _c : createRelationshipFile();
        map.set(relationshipKey, relationshipsJson);
        appendRelationship(relationshipsJson, hyperlink.id, "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink", hyperlink.link, TargetModeType.EXTERNAL);
    }
    if (hasMedia) {
        const contentTypesJson = map.get("[Content_Types].xml");
        if (!contentTypesJson) {
            throw new Error("Could not find content types file");
        }
        appendContentType(contentTypesJson, "image/png", "png");
        appendContentType(contentTypesJson, "image/jpeg", "jpeg");
        appendContentType(contentTypesJson, "image/jpeg", "jpg");
        appendContentType(contentTypesJson, "image/bmp", "bmp");
        appendContentType(contentTypesJson, "image/gif", "gif");
        appendContentType(contentTypesJson, "image/svg+xml", "svg");
    }
    const zip = new JSZip();
    for (const [key, value] of map) {
        const output = toXml(value);
        zip.file(key, output);
    }
    for (const [key, value] of binaryContentMap) {
        zip.file(key, value);
    }
    for (const { data: stream, fileName } of file.Media.Array) {
        zip.file(`word/media/${fileName}`, stream);
    }
    return zip.generateAsync({
        type: outputType,
        mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        compression: "DEFLATE",
    });
});
const toXml = (jsonObj) => {
    const output = js2xml(jsonObj, {
        attributeValueFn: (str) => String(str)
            .replace(/&(?!amp;|lt;|gt;|quot;|apos;)/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&apos;"),
    });
    return output;
};
const createRelationshipFile = () => ({
    declaration: {
        attributes: {
            version: "1.0",
            encoding: "UTF-8",
            standalone: "yes",
        },
    },
    elements: [
        {
            type: "element",
            name: "Relationships",
            attributes: {
                xmlns: "http://schemas.openxmlformats.org/package/2006/relationships",
            },
            elements: [],
        },
    ],
});
//# sourceMappingURL=from-docx.js.map