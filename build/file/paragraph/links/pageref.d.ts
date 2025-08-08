import { Run } from "../run";
export interface IPageReferenceOptions {
    readonly hyperlink?: boolean;
    readonly useRelativePosition?: boolean;
}
export declare class PageReference extends Run {
    constructor(bookmarkId: string, options?: IPageReferenceOptions);
}
