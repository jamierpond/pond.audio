/** Extracts the title from the first heading or falls back to a formatted filename */
export declare function extractTitle(content: string, path: string): string;
/** Strips the first heading from content (to avoid duplicate titles) */
export declare function stripTitle(content: string): string;
/** Extracts the first paragraph as a summary/description */
export declare function extractDescription(content: string): string;
/** Check if a file path is a markdown file */
export declare function isMarkdownFile(path: string): boolean;
//# sourceMappingURL=utils.d.ts.map
