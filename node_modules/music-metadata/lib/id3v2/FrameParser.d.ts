/// <reference types="node" />
export default class FrameParser {
    static readData(b: Buffer, type: string, major: number, includeCovers: boolean): any;
    protected static fixPictureMimeType(pictureType: string): string;
    /**
     * Converts TMCL (Musician credits list) or TIPL (Involved people list)
     * @param entries
     */
    private static functionList;
    /**
     * id3v2.4 defines that multiple T* values are separated by 0x00
     * id3v2.3 defines that TCOM, TEXT, TOLY, TOPE & TPE1 values are separated by /
     * @param {number} major Major version, e.g. (4) for  id3v2.4
     * @param {string} text Concatenated tag value
     * @returns {string[]} Slitted value
     */
    private static splitValue;
    private static trimArray;
    private static readIdentifierAndData;
    private static getTextEncoding;
    private static getNullTerminatorLength;
}
