import React from 'react';
import { render } from '@testing-library/react';
import { TextWithBoldRanges } from '@/components/TextWithBoldRanges';
import Fuse from 'fuse.js';

describe('TextWithBoldRanges', () => {
  it('renders text with correct bold ranges', () => {
    const text = 'This is a test text';
    const boldRanges = [
      [0, 3],
      [8, 11],
    ];
    const { container } = render(<TextWithBoldRanges text={text} boldRanges={boldRanges as Fuse.RangeTuple[]} />);

    const spans = container.querySelectorAll('span');
    expect(spans.length).toBe(text.length);

    spans.forEach((span, index) => {
      const isBold = boldRanges.some((range) => index >= range[0] && index <= range[1]);
      expect(span.style.fontWeight).toBe(isBold ? 'bold' : 'normal');
    });
  });

  it('renders text with no bold ranges', () => {
    const text = 'This is a test text';
    const boldRanges: Array<[number, number]> = [];
    const { container } = render(<TextWithBoldRanges text={text} boldRanges={boldRanges} />);

    const spans = container.querySelectorAll('span');
    expect(spans.length).toBe(text.length);

    spans.forEach((span) => {
      expect(span.style.fontWeight).toBe('normal');
    });
  });

  it('renders text with single bold range', () => {
    const text = 'This is a test text';
    const boldRanges: Array<[number, number]> = [[5, 7]];
    const { container } = render(<TextWithBoldRanges text={text} boldRanges={boldRanges} />);

    const spans = container.querySelectorAll('span');
    expect(spans.length).toBe(text.length);

    spans.forEach((span, index) => {
      const isBold = boldRanges.some((range) => index >= range[0] && index <= range[1]);
      expect(span.style.fontWeight).toBe(isBold ? 'bold' : 'normal');
    });
  });
});
