import { LoginTypes } from "@/types/userTypes";
import { validateEmail } from "@/utils";

export const loginValidate = (data: LoginTypes) => {
  const validObj = {
    isValid: true,
    errorObj: {
      email: "",
      password: ""
    }
  };

  if (!data.email || !validateEmail(data.email)) {
    validObj.isValid = false;
    validObj.errorObj.email = data.email ? "Invalid Email" : "Email is mandotary";
  }

  if (!data.password) {
    validObj.isValid = false;
    validObj.errorObj.password = "Password Required";
  }

  return validObj;
};
