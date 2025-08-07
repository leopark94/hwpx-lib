const createLsdException = (
    name: string,
    uiPriority?: number,
    qFormat?: number,
    semiHidden?: number,
    unhideWhenUsed?: number,
): readonly object[] => {
    "use strict";

    return [
        {
            _attr: {
                "hh:name": name,
                "hh:uiPriority": uiPriority,
                "hh:qFormat": qFormat,
                "hh:semiHidden": semiHidden,
                "hh:unhideWhenUsed": unhideWhenUsed,
            },
        },
    ];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DefaultStyle = (): Record<string, any> => {
    const style = {
        "hh:styles": [
            {
                _attr: {
                    "xmlns:mc": "http://schemas.openxmlformats.org/markup-compatibility/2006",
                    "xmlns:r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
                    "xmlns:w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
                    "xmlns:w14": "http://schemas.microsoft.com/office/word/2010/wordml",
                    "xmlns:w15": "http://schemas.microsoft.com/office/word/2012/wordml",
                    "mc:Ignorable": "w14 w15",
                },
            },
            {
                "hh:docDefaults": [
                    {
                        "hh:rPrDefault": [
                            {
                                "hp:charPr": [
                                    {
                                        "hp:fontRef": [
                                            {
                                                _attr: {
                                                    "w:asciiTheme": "minorHAnsi",
                                                    "w:eastAsiaTheme": "minorHAnsi",
                                                    "w:hAnsiTheme": "minorHAnsi",
                                                    "w:cstheme": "minorBidi",
                                                },
                                            },
                                        ],
                                    },
                                    {
                                        "hp:height": [
                                            {
                                                _attr: {
                                                    "hp:val": "22",
                                                },
                                            },
                                        ],
                                    },
                                    {
                                        "w:szCs": [
                                            {
                                                _attr: {
                                                    "hp:val": "22",
                                                },
                                            },
                                        ],
                                    },
                                    {
                                        "hp:language": [
                                            {
                                                _attr: {
                                                    "hp:val": "en-GB",
                                                    "hp:eastAsia": "en-US",
                                                    "hs:bidi": "ar-SA",
                                                },
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        "hh:pPrDefault": [
                            {
                                "hp:paraPr": [
                                    {
                                        "hp:lineSpacing": [
                                            {
                                                _attr: {
                                                    "w:after": "160",
                                                    "w:line": "259",
                                                    "w:lineRule": "auto",
                                                },
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                "hh:latentStyles": [
                    {
                        _attr: {
                            "w:defLockedState": "0",
                            "w:defUIPriority": "99",
                            "w:defSemiHidden": "0",
                            "w:defUnhideWhenUsed": "0",
                            "w:defQFormat": "0",
                            "w:count": "371",
                        },
                    },
                    {
                        "hh:lsdException": createLsdException("Normal", 0, 1),
                    },
                    {
                        "hh:lsdException": createLsdException("heading 1", 9, 1, 1, 1),
                    },
                    {
                        "hh:lsdException": createLsdException("heading 2", 9, 1, 1, 1),
                    },
                    {
                        "hh:lsdException": createLsdException("heading 3", 9, 1, 1, 1),
                    },
                    {
                        "hh:lsdException": createLsdException("heading 4", 9, 1, 1, 1),
                    },
                    {
                        "hh:lsdException": createLsdException("heading 5", 9, 1, 1, 1),
                    },
                    {
                        "hh:lsdException": createLsdException("heading 6", 9, 1, 1, 1),
                    },
                    {
                        "hh:lsdException": createLsdException("heading 7", 9, 1, 1, 1),
                    },
                    {
                        "hh:lsdException": createLsdException("heading 8", 9, 1, 1, 1),
                    },
                    {
                        "hh:lsdException": createLsdException("heading 9", 9, 1, 1, 1),
                    },
                    {
                        "hh:lsdException": createLsdException("index 1", undefined, undefined, 1, 1),
                    },
                    {
                        "hh:lsdException": createLsdException("index 2", undefined, undefined, 1, 1),
                    },
                    {
                        "hh:lsdException": createLsdException("index 3", undefined, undefined, 1, 1),
                    },
                    {
                        "hh:lsdException": createLsdException("index 4", undefined, undefined, 1, 1),
                    },
                    {
                        "hh:lsdException": createLsdException("index 5", undefined, undefined, 1, 1),
                    },
                    {
                        "hh:lsdException": createLsdException("index 6", undefined, undefined, 1, 1),
                    },
                    {
                        "hh:lsdException": createLsdException("index 7", undefined, undefined, 1, 1),
                    },
                    {
                        "hh:lsdException": createLsdException("index 8", undefined, undefined, 1, 1),
                    },
                    {
                        "hh:lsdException": createLsdException("index 9", undefined, undefined, 1, 1),
                    },
                    {
                        "hh:lsdException": createLsdException("toc 1", 39, undefined, 1, 1),
                    },
                    {
                        "hh:lsdException": createLsdException("toc 2", 39, undefined, 1, 1),
                    },
                    {
                        "hh:lsdException": createLsdException("toc 3", 39, undefined, 1, 1),
                    },
                    {
                        "hh:lsdException": createLsdException("toc 4", 39, undefined, 1, 1),
                    },
                    {
                        "hh:lsdException": createLsdException("toc 5", 39, undefined, 1, 1),
                    },
                    {
                        "hh:lsdException": createLsdException("toc 6", 39, undefined, 1, 1),
                    },
                    {
                        "hh:lsdException": createLsdException("toc 7", 39, undefined, 1, 1),
                    },
                    {
                        "hh:lsdException": createLsdException("toc 8", 39, undefined, 1, 1),
                    },
                    {
                        "hh:lsdException": createLsdException("toc 9", 39, undefined, 1, 1),
                    },
                    {
                        "hh:lsdException": createLsdException("Normal Indent", undefined, undefined, 1, 1),
                    },
                    {
                        "hh:lsdException": createLsdException("footnote text", undefined, undefined, 1, 1),
                    },
                ],
            },
        ],
    };

    return style;
};
