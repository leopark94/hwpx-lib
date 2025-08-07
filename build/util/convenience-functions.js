import hash from "hash.js";
import { customAlphabet, nanoid } from "nanoid/non-secure";
export const convertMillimetersToTwip = (millimeters) => Math.floor((millimeters / 25.4) * 72 * 20);
export const convertInchesToTwip = (inches) => Math.floor(inches * 72 * 20);
export const uniqueNumericIdCreator = (initial = 0) => {
    let currentCount = initial;
    return () => ++currentCount;
};
export const abstractNumUniqueNumericIdGen = () => uniqueNumericIdCreator();
export const concreteNumUniqueNumericIdGen = () => uniqueNumericIdCreator(1);
export const docPropertiesUniqueNumericIdGen = () => uniqueNumericIdCreator();
export const bookmarkUniqueNumericIdGen = () => uniqueNumericIdCreator();
export const uniqueId = () => nanoid().toLowerCase();
export const hashedId = (data) => hash
    .sha1()
    .update(data instanceof ArrayBuffer ? new Uint8Array(data) : data)
    .digest("hex");
const generateUuidPart = (count) => customAlphabet("1234567890abcdef", count)();
export const uniqueUuid = () => `${generateUuidPart(8)}-${generateUuidPart(4)}-${generateUuidPart(4)}-${generateUuidPart(4)}-${generateUuidPart(12)}`;
//# sourceMappingURL=convenience-functions.js.map