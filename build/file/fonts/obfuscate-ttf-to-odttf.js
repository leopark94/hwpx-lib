const obfuscatedStartOffset = 0;
const obfuscatedEndOffset = 32;
const guidSize = 32;
export const obfuscate = (buf, fontKey) => {
    const guid = fontKey.replace(/-/g, "");
    if (guid.length !== guidSize) {
        throw new Error(`Error: Cannot extract GUID from font filename: ${fontKey}`);
    }
    const hexStrings = guid.replace(/(..)/g, "$1 ").trim().split(" ");
    const hexNumbers = hexStrings.map((hexString) => parseInt(hexString, 16));
    hexNumbers.reverse();
    const bytesToObfuscate = buf.slice(obfuscatedStartOffset, obfuscatedEndOffset);
    const obfuscatedBytes = bytesToObfuscate.map((byte, i) => byte ^ hexNumbers[i % hexNumbers.length]);
    const out = new Uint8Array(obfuscatedStartOffset + obfuscatedBytes.length + Math.max(0, buf.length - obfuscatedEndOffset));
    out.set(buf.slice(0, obfuscatedStartOffset));
    out.set(obfuscatedBytes, obfuscatedStartOffset);
    out.set(buf.slice(obfuscatedEndOffset), obfuscatedStartOffset + obfuscatedBytes.length);
    return out;
};
//# sourceMappingURL=obfuscate-ttf-to-odttf.js.map