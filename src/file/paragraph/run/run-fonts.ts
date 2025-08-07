import { XmlAttributeComponent, XmlComponent } from "@file/xml-components";

export type IFontAttributesProperties = {
    readonly ascii?: string;
    readonly cs?: string;
    readonly eastAsia?: string;
    readonly hAnsi?: string;
    readonly hint?: string;
    // HWPX specific
    readonly hangul?: string;
    readonly latin?: string;
    readonly hanja?: string;
    readonly japanese?: string;
    readonly other?: string;
    readonly symbol?: string;
    readonly user?: string;
};

class RunFontAttributes extends XmlAttributeComponent<IFontAttributesProperties> {
    protected readonly xmlKeys = {
        // DOCX compatibility
        ascii: "w:ascii",
        cs: "w:cs",
        eastAsia: "w:eastAsia",
        hAnsi: "w:hAnsi",
        hint: "w:hint",
        // HWPX specific
        hangul: "hangul",
        latin: "latin",
        hanja: "hanja",
        japanese: "japanese",
        other: "other",
        symbol: "symbol",
        user: "user",
    };
}

export class RunFonts extends XmlComponent {
    public constructor(name: string, hint?: string);
    public constructor(attrs: string | IFontAttributesProperties);
    public constructor(nameOrAttrs: string | IFontAttributesProperties, hint?: string) {
        super("hh:fontRef");
        if (typeof nameOrAttrs === "string") {
            // use public constructor(name: string, hint?: string);
            const name = nameOrAttrs;
            // HWPX uses font indices instead of names
            // For now, we'll use "1" as default font index
            this.root.push(
                new RunFontAttributes({
                    // HWPX format uses indices
                    hangul: "1",
                    latin: "1",
                    hanja: "1",
                    japanese: "1",
                    other: "1",
                    symbol: "1",
                    user: "1",
                }),
            );
        } else {
            // use public constructor(attrs: IRunFontAttributesProperties);
            const attrs = nameOrAttrs;
            this.root.push(new RunFontAttributes(attrs));
        }
    }
}
