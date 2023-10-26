import { Nullable } from "@/lib/core/types";
import { Phrase } from "@/lib/core/dictionary";
import { Data } from "@/lib/core/data";
import { dict } from "./dictionary";

export const Validators = {
  regex: (pattern: RegExp, errorMessage: Phrase) => {
    return (value?: string) => {
      if (value?.match(pattern)) {
        return {
          valid: true,
          message: undefined,
        };
      } else {
        return {
          valid: false,
          message: errorMessage,
        };
      }
    };
  },
  maxLength: (maxLength: number) => {
    return (value?: string) => {
      if ((value?.length || 0) <= maxLength) {
        return { valid: true, message: undefined };
      } else {
        return {
          valid: false,
          message: dict.builders.maxLengthError(maxLength),
        };
      }
    };
  },
  minLength: (minLength: number) => {
    return (value?: string) => {
      if ((value?.length || 0) >= minLength) {
        return { valid: true, message: undefined };
      }
      return {
        valid: false,
        message: dict.builders.minLengthError(minLength),
      };
    };
  },
  minValue: <D extends Data>(minValue: D) => {
    return (value: Nullable<D>) => {
      if ((value || 0) > minValue) {
        return { valid: true, message: undefined };
      } else {
        return {
          valid: false,
          message: dict.builders.minValueError(minValue),
        };
      }
    };
  },

  maxValue: <D extends Data>(maxValue: D) => {
    return (value: Nullable<D>) => {
      if ((value || 0) < maxValue) {
        return { valid: true, message: undefined };
      } else {
        return {
          valid: false,
          message: dict.builders.maxValueError(maxValue),
        };
      }
    };
  },
  required: (value: Nullable<any>) => {
    if (value) {
      return {
        valid: true,
      };
    } else {
      return {
        valid: false,
        message: dict.phrases.requiredField,
      };
    }
  },
  phoneNumber: () =>
    Validators.regex(/^09[0-9]{9}$/, dict.phrases.wrongPhoneNumberMessage),
  numeric: () => Validators.regex(/^\d+$/, dict.builders.minLengthError(1)),

  floatingNumeric: () =>
    Validators.regex(
      /^?[0-9]+([.][0-9]+)?$/,
      dict.phrases.wrongFloatingMessage
    ), //TODO ADD SUPPORT OF + and -
  email: () =>
    Validators.regex(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      dict.phrases.wrongEmailMessage
    ),
  // url: ValidatorFactory.regex(
  //   /^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$/
  //   dict.phrases.wrongPhoneNumberMessage
  // ),
  password: (value?: string) => {
    let message: Phrase[] = [];
    if ((value?.length || 0) < 6) {
      message.push(dict.builders.minLengthError(6));
    }
    if ((value?.length || 0) > 20) {
      message.push(dict.builders.maxLengthError(20));
    }
    if (!value?.match(/[a-zA-Z]/)) {
      message.push(dict.phrases.passwordCharsetError);
    }
    if (!value?.match(/[0-9]/)) {
      message.push(dict.phrases.passwordNumberError);
    }
    return {
      valid: message.length === 0,
      message,
    };
  },
};
