import { XmlComponent } from "@file/xml-components";
import { StyleForCharacter, StyleForParagraph } from "./style";
export class Styles extends XmlComponent {
    constructor(options) {
        super("hh:styles");
        if (options.initialStyles) {
            this.root.push(options.initialStyles);
        }
        if (options.importedStyles) {
            for (const style of options.importedStyles) {
                this.root.push(style);
            }
        }
        if (options.paragraphStyles) {
            for (const style of options.paragraphStyles) {
                this.root.push(new StyleForParagraph(style));
            }
        }
        if (options.characterStyles) {
            for (const style of options.characterStyles) {
                this.root.push(new StyleForCharacter(style));
            }
        }
    }
}
//# sourceMappingURL=styles.js.map