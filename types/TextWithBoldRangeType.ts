import Fuse from 'fuse.js';

export type TextWithBoldRangesType = {
  text: string;
  boldRanges: Fuse.RangeTuple[];
};
