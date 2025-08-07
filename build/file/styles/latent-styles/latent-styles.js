import { XmlComponent } from "@file/xml-components";
export class LatentStyles extends XmlComponent {
    constructor(latentException) {
        super("hh:latentStyles");
        if (latentException) {
            this.root.push(latentException);
        }
    }
}
//# sourceMappingURL=latent-styles.js.map