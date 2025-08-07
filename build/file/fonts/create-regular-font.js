import { createFont } from "./font";
export const createRegularFont = ({ name, index, fontKey, characterSet, }) => createFont({
    name,
    sig: {
        usb0: "E0002AFF",
        usb1: "C000247B",
        usb2: "00000009",
        usb3: "00000000",
        csb0: "000001FF",
        csb1: "00000000",
    },
    charset: characterSet,
    family: "auto",
    pitch: "variable",
    embedRegular: {
        fontKey,
        id: `rId${index}`,
    },
});
//# sourceMappingURL=create-regular-font.js.map