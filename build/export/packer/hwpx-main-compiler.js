import JSZip from "jszip";
import { HwpxCompilerBase } from "./hwpx-compiler-base";
export class HwpxMainCompiler extends HwpxCompilerBase {
    constructor() {
        super();
    }
    compile(file, prettifyType, overrides = []) {
        const zip = new JSZip();
        zip.file("mimetype", "application/hwp+zip", { compression: "STORE" });
        const versionXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>
<hv:HCFVersion xmlns:hv="http://www.hancom.co.kr/hwpml/2011/version" tagetApplication="WORDPROCESSOR" major="5" minor="1" micro="1" buildNumber="0" os="10" xmlVersion="1.5" application="Hancom Office Hangul" appVersion="12.30.0.5708"/>`;
        zip.file("version.xml", versionXml);
        const containerXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<container xmlns="urn:oasis:names:tc:opendocument:xmlns:container" version="1.0">
    <rootfiles>
        <rootfile full-path="Contents/content.hpf" media-type="application/hwp+zip"/>
    </rootfiles>
</container>`;
        zip.folder("META-INF").file("container.xml", containerXml);
        const manifestXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0">
    <manifest:file-entry manifest:media-type="application/hwp+zip" manifest:full-path="/"/>
    <manifest:file-entry manifest:media-type="application/xml" manifest:full-path="version.xml"/>
    <manifest:file-entry manifest:media-type="application/xml" manifest:full-path="settings.xml"/>
    <manifest:file-entry manifest:media-type="application/xml" manifest:full-path="Contents/content.hpf"/>
    <manifest:file-entry manifest:media-type="application/xml" manifest:full-path="Contents/header.xml"/>
    <manifest:file-entry manifest:media-type="application/xml" manifest:full-path="Contents/section0.xml"/>
</manifest:manifest>`;
        zip.folder("META-INF").file("manifest.xml", manifestXml);
        zip.folder("META-INF").file("container.rdf", `<?xml version="1.0" encoding="UTF-8"?>
<RDF:RDF xmlns:RDF="http://www.w3.org/1999/02/22-rdf-syntax-ns#"/>`);
        const contentHpf = `<?xml version="1.0" encoding="UTF-8" standalone="no" ?>
<hpf:contents xmlns:hpf="http://www.hancom.co.kr/schema/2011/hpf">
<hpf:header>header.xml</hpf:header>
<hpf:section src="section0.xml"/>
</hpf:contents>`;
        zip.folder("Contents").file("content.hpf", contentHpf);
        const headerXml = this.compileHeader(file);
        zip.folder("Contents").file("header.xml", headerXml);
        const sectionXml = this.compileSection(file.Document);
        zip.folder("Contents").file("section0.xml", sectionXml);
        const settingsXml = this._generateSettings();
        zip.file("settings.xml", settingsXml);
        const previewText = this._extractPreviewText(file.Document);
        zip.folder("Preview").file("PrvText.txt", previewText);
        for (const imageData of file.Media.Array) {
            zip.folder("Contents").folder("Bindata").file(imageData.fileName, imageData.data);
        }
        return zip;
    }
}
//# sourceMappingURL=hwpx-main-compiler.js.map