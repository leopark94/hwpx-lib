import { XmlComponent } from "@file/xml-components";
export class InitializableXmlComponent extends XmlComponent {
    constructor(rootKey, initComponent) {
        super(rootKey);
        if (initComponent) {
            this.root = initComponent.root;
        }
    }
}
//# sourceMappingURL=initializable-xml-component.js.map