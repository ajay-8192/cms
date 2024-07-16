import { LoginTypes, SignupTypes } from "@/types/userTypes";
import { loginValidate, signupValidate } from "@/validate/userValidate";

export const userLogin = async (data: LoginTypes): Promise<{ userDetails: { user: object }; validObj: { isValid: boolean, errorObj: any } }> => {
  const validObj = loginValidate(data);

  if (!validObj.isValid) return { validObj, userDetails: { user: {} } };

  const URL = `${process.env.API_HOST || "http://localhost:5000/api"}/user/login`;

  try {
    const userDetails = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!userDetails.ok) {
      throw new Error("Failed to fetch user details");
    }

    const userDetailsJson = await userDetails.json();

    return {
      userDetails: {
        user: userDetailsJson.user
      },
      validObj,
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      validObj: {
        ...validObj,
        isValid: false,
      },
      userDetails: { user: {} }
    };
  }
};

export const userSignup = async (data: SignupTypes): Promise<{ userDetails: { user: object }; validObj: { isValid: boolean, errorObj: any } }> => {
  const validObj = signupValidate(data);

  if (!validObj.isValid) return { validObj, userDetails: { user: {} } };

  const URL = `${process.env.API_HOST || "http://localhost:5000/api"}/user/signup`;

  try {
    const userDetails = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!userDetails.ok) {
      throw new Error("Failed to fetch user details");
    }

    const userDetailsJson = await userDetails.json();

    return {
      userDetails: {
        user: userDetailsJson.user
      },
      validObj,
    };
  } catch (error) {
    console.error("Error:", error);
  }

  return {
    validObj: {
      ...validObj,
      isValid: false,
    },
    userDetails: { user: {} }
  };
};

export const fetchUserDetails = async (
  authorization: string | undefined,
  cookie: string | undefined,
): Promise<{ userDetails: { user: object }; isLogin: boolean }> => {
  try {
    const URL = `${process.env.API_HOST || "http://localhost:5000/api"}/user/details`;
    const userDetails = await fetch(URL, {
      headers: {
        Authorizarion: authorization || "",
        Cookie: cookie || "",
      },
      credentials: "include",
    });

    if (!userDetails.ok) {
      throw new Error("Failed to fetch user details");
    }

    const userDetailsJson = await userDetails.json();

    console.log('====> ', { userDetailsJson });

    return {
      userDetails: {
        user: userDetailsJson.user
      },
      isLogin: true,
    };
  } catch (error) {
    console.error("Error:", error);
  }

  return {
    userDetails: { user: {} },
    isLogin: false,
  };
};

export const userLogout = async () => {
  try {
    const URL = `${process.env.API_HOST || "http://localhost:5000/api"}/user/logout`;

    const userLogout = await fetch(URL, {
      method: "POST",
      credentials: "include",
    });

    if (!userLogout.ok) {
      throw new Error("Failed to fetch user details");
    }

    const userLogoutJson = await userLogout.json();

    return {
      userLogoutJson: userLogoutJson,
      isLogout: true,
    };
  } catch (error) {
    console.error("Error:", error);
    return { isLogout: false };
  }
};
