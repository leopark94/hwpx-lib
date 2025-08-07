export const decimalNumber = (val) => {
    if (isNaN(val)) {
        throw new Error(`Invalid value '${val}' specified. Must be an integer.`);
    }
    return Math.floor(val);
};
export const unsignedDecimalNumber = (val) => {
    const value = decimalNumber(val);
    if (value < 0) {
        throw new Error(`Invalid value '${val}' specified. Must be a positive integer.`);
    }
    return value;
};
const hexBinary = (val, length) => {
    const expectedLength = length * 2;
    if (val.length !== expectedLength || isNaN(Number(`0x${val}`))) {
        throw new Error(`Invalid hex value '${val}'. Expected ${expectedLength} digit hex value`);
    }
    return val;
};
export const longHexNumber = (val) => hexBinary(val, 4);
export const shortHexNumber = (val) => hexBinary(val, 2);
export const uCharHexNumber = (val) => hexBinary(val, 1);
export const universalMeasureValue = (val) => {
    const unit = val.slice(-2);
    const amount = val.substring(0, val.length - 2);
    return `${Number(amount)}${unit}`;
};
export const positiveUniversalMeasureValue = (val) => {
    const value = universalMeasureValue(val);
    if (parseFloat(value) < 0) {
        throw new Error(`Invalid value '${value}' specified. Expected a positive number.`);
    }
    return value;
};
export const hexColorValue = (val) => {
    if (val === "auto") {
        return val;
    }
    const color = val.charAt(0) === "#" ? val.substring(1) : val;
    return hexBinary(color, 3);
};
export const signedTwipsMeasureValue = (val) => typeof val === "string" ? universalMeasureValue(val) : decimalNumber(val);
export const hpsMeasureValue = (val) => typeof val === "string" ? positiveUniversalMeasureValue(val) : unsignedDecimalNumber(val);
export const signedHpsMeasureValue = (val) => typeof val === "string" ? universalMeasureValue(val) : decimalNumber(val);
export const twipsMeasureValue = (val) => typeof val === "string" ? positiveUniversalMeasureValue(val) : unsignedDecimalNumber(val);
export const percentageValue = (val) => {
    const percent = val.substring(0, val.length - 1);
    return `${Number(percent)}%`;
};
export const measurementOrPercentValue = (val) => {
    if (typeof val === "number") {
        return decimalNumber(val);
    }
    if (val.slice(-1) === "%") {
        return percentageValue(val);
    }
    return universalMeasureValue(val);
};
export const eighthPointMeasureValue = unsignedDecimalNumber;
export const pointMeasureValue = unsignedDecimalNumber;
export const dateTimeValue = (val) => val.toISOString();
//# sourceMappingURL=values.js.map