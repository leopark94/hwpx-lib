import { XmlAttributeComponent } from "@file/xml-components";

export type IChangedAttributesProperties = {
    readonly id: number;
    readonly author: string;
    readonly date: string;
};

export class ChangeAttributes extends XmlAttributeComponent<IChangedAttributesProperties> {
    protected readonly xmlKeys = {
        id: "hp:id",
        author: "hp:author",
        date: "hp:date",
    };
}
