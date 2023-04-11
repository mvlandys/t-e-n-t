import 'jest';
import { chunkArray, mapByKey, shuffleArray } from '../../src/utils/arrays.utils';

describe("Array Utils", () => {
    it('should shuffle an array', () => {
        const testArray = [1, 2, 3, 4, 5];
        const shuffled = shuffleArray(Array.from(testArray));

        expect(shuffled).toHaveLength(testArray.length);
        expect(shuffled).not.toEqual(testArray);
    });

    it('should chunk an array into smaller pieces', () => {
        const testArray = ['a', 'b', 'c', 'd'];
        const chunks = chunkArray(testArray, 2);

        expect(chunks).toHaveLength(2);
        expect(chunks[0]).toEqual(['a', 'b']);
        expect(chunks[1]).toEqual(['c', 'd']);
    });

    it('should create an mapped object using values from an array by the key specified', () => {
        const testArray = [{ k: "key-1", v: "val-1" }, { k: 'key-2', v: "val-2" }];
        const mapped = mapByKey("k", testArray);

        expect(Object.keys(mapped)).toHaveLength(2);
        expect(mapped).toHaveProperty("key-1");
        expect(mapped["key-1"]).toEqual({ k: "key-1", v: "val-1" });
        expect(mapped).toHaveProperty("key-2");
        expect(mapped["key-2"]).toEqual({ k: "key-2", v: "val-2" });
    });
});