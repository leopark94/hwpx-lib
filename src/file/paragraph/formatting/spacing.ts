// http://officeopenxml.com/WPspacing.php
import { XmlAttributeComponent, XmlComponent } from "@file/xml-components";

export const LineRuleType = {
    AT_LEAST: "atLeast",
    EXACTLY: "exactly",
    EXACT: "exact",
    AUTO: "auto",
} as const;

export type ISpacingProperties = {
    readonly after?: number;
    readonly before?: number;
    readonly line?: number;
    readonly lineRule?: (typeof LineRuleType)[keyof typeof LineRuleType];
    readonly beforeAutoSpacing?: boolean;
    readonly afterAutoSpacing?: boolean;
};

// HWPX에서는 lineSpacing에 type과 value 속성 사용
class LineSpacingAttributes extends XmlAttributeComponent<{
    readonly type?: string;
    readonly value?: string;
    readonly unit?: string;
}> {
    protected readonly xmlKeys = {
        type: "type",
        value: "value",
        unit: "unit",
    };
}

export class Spacing extends XmlComponent {
    public constructor(options: ISpacingProperties) {
        super("hh:lineSpacing");

        // HWPX 형식으로 변환
        if (options.line !== undefined) {
            let type = "PERCENT";
            const value = options.line.toString();

            if (options.lineRule === LineRuleType.EXACTLY || options.lineRule === LineRuleType.EXACT) {
                type = "FIXED";
            } else if (options.lineRule === LineRuleType.AT_LEAST) {
                type = "AT_LEAST";
            }

            this.root.push(
                new LineSpacingAttributes({
                    type: type,
                    value: value,
                    unit: "HWPUNIT",
                }),
            );
        }
    }
}
