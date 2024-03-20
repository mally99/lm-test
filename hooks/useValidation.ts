import { consts } from '@/assets/consts';
import { ErrorsType, ValidationType } from '@/types/ValidationType';

export const useValidation = (props: ValidationType) => {
  const { checkboxValue, textValue } = props;

  const checkboxError = checkboxValue ? undefined : consts.checkboxError;
  const lengthError = textValue.length < 4 ? consts.minLengthError : textValue.length > 8 ? consts.maxLengthError : '';
  const latinError = /^[a-zA-Z]+$/.test(textValue) ? '' : consts.latinLettersError;
  const inputError =
    !lengthError && !latinError
      ? undefined
      : `${consts.inputError} ${lengthError} ${lengthError && latinError && ','} ${latinError}`;

  return { checkboxError, inputError } as ErrorsType;
};
