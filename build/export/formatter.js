export class Formatter {
    format(input, context = { stack: [] }) {
        const output = input.prepForXml(context);
        if (output) {
            return output;
        }
        else {
            throw Error("XMLComponent did not format correctly");
        }
    }
}
//# sourceMappingURL=formatter.js.map