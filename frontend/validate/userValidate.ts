import { LoginTypes, SignupTypes } from "@/types/userTypes";
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

export const signupValidate = (data: SignupTypes) => {
  const validObj = {
    isValid: true,
    errorObj: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  };

  if (!data.name) {
    validObj.isValid = false;
    validObj.errorObj.name = "Name Required";
  }

  if (!data.email || !validateEmail(data.email)) {
    validObj.isValid = false;
    validObj.errorObj.email = data.email ? "Invalid Email" : "Email is mandotary";
  }

  if (!data.password) {
    validObj.isValid = false;
    validObj.errorObj.password = "Password Required";
  }

  if (!data.confirmPassword) {
    validObj.isValid = false;
    validObj.errorObj.confirmPassword = "Confirm Password Required";
  }

  if (data.password && data.confirmPassword && data.password !== data.confirmPassword) {
    validObj.isValid = false;
    validObj.errorObj.confirmPassword = "Confirm Password Not Matching";
  }

  console.log('===========> validObj', { validObj });

  return validObj;
};
