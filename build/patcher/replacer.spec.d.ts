export declare const MOCK_JSON: {
    elements: {
        type: string;
        name: string;
        elements: ({
            type: string;
            name: string;
            attributes: {
                "w14:paraId": string;
                "w14:textId": string;
                "hp:rsidR": string;
                "w:rsidRDefault": string;
            };
            elements: ({
                type: string;
                name: string;
                elements: {
                    type: string;
                    name: string;
                    attributes: {
                        "hp:val": string;
                    };
                }[];
                attributes?: undefined;
            } | {
                type: string;
                name: string;
                elements: {
                    type: string;
                    name: string;
                    elements: {
                        type: string;
                        text: string;
                    }[];
                }[];
                attributes?: undefined;
            } | {
                type: string;
                name: string;
                attributes: {
                    "hp:rsidR": string;
                };
                elements: {
                    type: string;
                    name: string;
                    elements: {
                        type: string;
                        text: string;
                    }[];
                }[];
            })[];
        } | {
            type: string;
            name: string;
            elements: {
                type: string;
                name: string;
                elements: ({
                    type: string;
                    name: string;
                    elements: {
                        type: string;
                        name: string;
                        attributes: {
                            "hp:val": string;
                        };
                    }[];
                } | {
                    type: string;
                    name: string;
                    elements: {
                        type: string;
                        text: string;
                    }[];
                } | {
                    type: string;
                    name: string;
                    elements?: undefined;
                })[];
            }[];
            attributes?: undefined;
        })[];
    }[];
};
