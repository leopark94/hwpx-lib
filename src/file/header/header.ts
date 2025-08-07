// http://officeopenxml.com/WPheaders.php
import { InitializableXmlComponent, XmlComponent } from "@file/xml-components";

import { Paragraph } from "../paragraph";
import { Table } from "../table";
import { HeaderAttributes } from "./header-attributes";

export class Header extends InitializableXmlComponent {
    private readonly refId: number;

    public constructor(referenceNumber: number, initContent?: XmlComponent) {
        // HWPX에서는 masterPage 내의 subList로 처리
        super("hm:subList", initContent);

        this.refId = referenceNumber;
        if (!initContent) {
            // HWPX에서는 네임스페이스 선언 불필요
            this.root.push(
                new HeaderAttributes({
                    type: "header", // HWPX에서는 type으로 구분
                    id: referenceNumber.toString(),
                }),
            );
        }
    }

    public get ReferenceId(): number {
        return this.refId;
    }

    public add(item: Paragraph | Table): void {
        this.root.push(item);
    }
}
