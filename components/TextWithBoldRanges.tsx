import { TextWithBoldRangesType } from '@/types/TextWithBoldRangeType';

export function TextWithBoldRanges(props: TextWithBoldRangesType) {
  const { text, boldRanges } = props;
  let currentRangeIndex = 0;

  return (
    <>
      {text.split('').map((char, index) => {
        let isBold = false;
        // Check if the current index is within the current bold range
        if (
          currentRangeIndex < boldRanges.length &&
          index >= boldRanges[currentRangeIndex][0] &&
          index <= boldRanges[currentRangeIndex][1]
        ) {
          isBold = true;
        }
        // Move to the next range if the end of the current range is reached
        if (currentRangeIndex < boldRanges.length && index === boldRanges[currentRangeIndex][1]) {
          currentRangeIndex++;
        }
        return (
          <span key={index} style={{ fontWeight: isBold ? 'bold' : 'normal' }}>
            {char}
          </span>
        );
      })}
    </>
  );
}
