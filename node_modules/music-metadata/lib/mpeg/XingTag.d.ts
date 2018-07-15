/// <reference types="node" />
import * as Token from "token-types";
/**
 * Info Tag: Xing, LAME
 */
export declare const InfoTagHeaderTag: Token.StringType;
/**
 * LAME TAG value
 * Did not find any official documentation for this
 * Value e.g.: "3.98.4"
 */
export declare const LameEncoderVersion: Token.StringType;
export interface IXingInfoTag {
    headerFlags: Buffer;
    /**
     * total bit stream frames from Vbr header data
     */
    numFrames: number;
    /**
     * Actual stream size = file size - header(s) size [bytes]
     */
    streamSize: number;
    /**
     * the number of header data bytes (from original file)
     */
    vbrScale: number;
    /**
     * LAME Tag, extends the Xing header format
     * First added in LAME 3.12 for VBR
     * The modified header is also included in CBR files (effective LAME 3.94), with "Info" instead of "XING" near the beginning.
     */
    encoder: string;
    /**
     * Info tag revision
     */
    infoTagRevision: number;
    /**
     * VBR method
     */
    vbrMethod: number;
}
/**
 * Info Tag
 * Ref: http://gabriel.mp3-tech.org/mp3infotag.html
 */
export declare const XingInfoTag: Token.IGetToken<IXingInfoTag>;
