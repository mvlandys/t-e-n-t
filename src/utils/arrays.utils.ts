/**
 * Shuffle Array
 * @param array 
 * @returns array
 */
const shuffleArray = (array: any[]): any[] => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

/**
 * Chunk array into smaller pieces
 * @param array 
 * @param chunkSize 
 * @returns 
 */
const chunkArray = (array: any[], chunkSize: number): any[][] => {
    const R = [];
    for (let i = 0, len = array.length; i < len; i += chunkSize) {
        R.push(array.slice(i, i + chunkSize));
    }
    return R;
}

/**
 * Map an array by key
 * @param key 
 * @param array 
 * @returns 
 */
const mapByKey = (key: string, array: any[]): { [key: string]: any } => {
    const mapped: any = {};

    for (const k in array) {
        const item = array[k];
        mapped[item[key]] = item;
    }

    return mapped;
}

export { shuffleArray, chunkArray, mapByKey }