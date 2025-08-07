import { XmlAttributeComponent, XmlComponent } from "@file/xml-components";

export type ILatentStyleExceptionAttributesProperties = {
    readonly name?: string;
    readonly uiPriority?: string;
    readonly qFormat?: string;
    readonly semiHidden?: string;
    readonly unhideWhenUsed?: string;
};

export class LatentStyleExceptionAttributes extends XmlAttributeComponent<ILatentStyleExceptionAttributesProperties> {
    protected readonly xmlKeys = {
        name: "hh:name",
        uiPriority: "hh:uiPriority",
        qFormat: "hh:qFormat",
        semiHidden: "hh:semiHidden",
        unhideWhenUsed: "hh:unhideWhenUsed",
    };
}

export class LatentStyleException extends XmlComponent {
    public constructor(attributes: ILatentStyleExceptionAttributesProperties) {
        super("hh:lsdException");
        this.root.push(new LatentStyleExceptionAttributes(attributes));
    }
}
