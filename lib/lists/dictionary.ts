import { Dictionary } from "@/lib/dictionary";

export const dict: Dictionary = {
  phrases: {
    wrongPhoneNumberMessage: {
      fa: "لطفا ۱۱ رقم با ۰۹ وارد کنید.",
      en: "Please enter 11 digits starting with 09",
    },
    wrongEmailMessage: {
      fa: "لطفا یک ایمیل معتبر وارد کنید",
      en: "please enter vakid email",
    },
    wrongFloatingMessage: {
      fa: "لطفا یک ایمیل معتبر وارد کنید",
      en: "please enter vakid email",
    },
  },
  builders: {
    minLengthError: (minLength: number) => ({
      fa: `لطفا حداقل ${minLength} کاراکتر وارد کنید.`,
      en: `Please enter at least ${minLength} characters`,
    }),
    maxLengthError: (maxLength: number) => ({
      fa: `لطفا حداکثر ${maxLength} کاراکتر وارد کنید.`,
      en: `Please enter at last ${maxLength} characters`,
    }),
  },
};
