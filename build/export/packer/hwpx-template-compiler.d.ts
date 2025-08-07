import JSZip from "jszip";
import { File } from "@file/file";
export declare class HwpxTemplateCompiler {
    private nextElementId;
    private nextCharPrId;
    private nextParaPrId;
    private nextBorderFillId;
    private charPrStyles;
    private paraPrStyles;
    private borderFillStyles;
    private readonly namespaces;
    private static readonly EMPTY_TEMPLATE_BASE64;
    constructor();
    compile(file: File): Promise<JSZip>;
    compileFromScratch(file: File): JSZip;
    private _initializeStyles;
    private _generateHeader;
    private _generateSection;
    private _generateFirstParagraph;
    private _generateSettings;
    private _compileBody;
    private _compileParagraph;
    private _compileTable;
    private _compileTableRow;
    private _compileTableCell;
    private _escapeXmlText;
    private _extractPreviewText;
}
