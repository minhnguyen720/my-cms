import { User } from "@/interfaces/User";
import { useForm } from "@mantine/form";

function useUserFormValidate(userData: User) {
  const VALIDATE_MESSAGE = {
    INVALID_EMAIL: "Invalid email",
    EXCEED_FIELD_LENGTH: "Your input exceeds the allowed length",
    INVALID_UPPERCASE: "This field cannot contain any uppercase character",
  };
  const BIO_LENGTH_MAX: number = 100;
  const FIELD_LENGTH_MAX: number = 60;
  const FIELD_LENGTH_MIN: number = 0;

  const REGEX = {
    EMAIL: /^\S+@\S+$/,
    NO_UPPER: /^[a-z0-9_\-]+$/,
  };

  const form = useForm({
    initialValues: {
      email: userData.email,
      name: userData.name,
      userName: userData.username,
      password: userData.password,
      bio: userData.bio,
    },

    validate: {
      email: (value) =>
        regexCheck(value, REGEX.EMAIL) ? null : VALIDATE_MESSAGE.INVALID_EMAIL,
      name: (value) =>
        lengthCheck(value, FIELD_LENGTH_MAX)
          ? null
          : VALIDATE_MESSAGE.EXCEED_FIELD_LENGTH,
      userName: (value) =>
        (lengthCheck(value, FIELD_LENGTH_MAX)
          ? null
          : VALIDATE_MESSAGE.EXCEED_FIELD_LENGTH) &&
        regexCheck(value, REGEX.NO_UPPER)
          ? VALIDATE_MESSAGE.INVALID_UPPERCASE
          : null,
      bio: (value) =>
        value && lengthCheck(value, BIO_LENGTH_MAX)
          ? null
          : VALIDATE_MESSAGE.EXCEED_FIELD_LENGTH,
    },
  });

  const lengthCheck = (value: string, max: number) => {
    if (value.length <= max && value.length >= FIELD_LENGTH_MIN) return true;
    else return false;
  };

  const regexCheck = (value: string, regex: RegExp) => {
    return regex.test(value);
  };

  return { form };
}

export default useUserFormValidate;
