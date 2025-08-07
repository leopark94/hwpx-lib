// http://officeopenxml.com/WPalignment.php
// http://officeopenxml.com/WPtableAlignment.php
import { XmlAttributeComponent, XmlComponent } from "@file/xml-components";

export class WordWrapAttributes extends XmlAttributeComponent<{ readonly val: 0 }> {
    protected readonly xmlKeys = { val: "hp:val" };
}

export class WordWrap extends XmlComponent {
    public constructor() {
        super("hp:wordWrap");
        this.root.push(new WordWrapAttributes({ val: 0 }));
    }
}
