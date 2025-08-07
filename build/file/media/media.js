export class Media {
    constructor() {
        Object.defineProperty(this, "map", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.map = new Map();
    }
    addImage(key, mediaData) {
        this.map.set(key, mediaData);
    }
    get Array() {
        return Array.from(this.map.values());
    }
}
//# sourceMappingURL=media.js.map