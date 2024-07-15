import { LoginTypes, SignupTypes } from "@/types/userTypes"
import { loginValidate, signupValidate } from "@/validate/userValidate"

export const userLogin = async (data: LoginTypes) => {
  const validObj = loginValidate(data);

  if (!validObj.isValid) return { validObj };

  const URL = `${process.env.API_HOST || 'http://localhost:5000/api'}/user/login`;
  
  try {
    const userDetails = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      credentials: 'include'
    });
  
    if (!userDetails.ok) {
      throw new Error('Failed to fetch user details');
    }
  
    const userDetailsJson = await userDetails.json();

    return {
      userDetails: userDetailsJson,
      validObj
    }
  } catch (error) {
    console.error('Error:', error);
    return {
      validObj: {
        ...validObj,
        isValid: false
      }
    }
  }

};

export const userSignup = async (data: SignupTypes) => {
  const validObj = signupValidate(data);

  if (!validObj.isValid) return { validObj };

  const URL = `${process.env.API_HOST || 'http://localhost:5000/api'}/user/signup`;
  
  try {
    const userDetails = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      credentials: 'include'
    });
  
    if (!userDetails.ok) {
      throw new Error('Failed to fetch user details');
    }
  
    const userDetailsJson = await userDetails.json();

    return {
      userDetails: userDetailsJson,
      validObj
    }
  } catch (error) {
    console.error('Error:', error);
  }
  
  return {
    validObj: {
      ...validObj,
      isValid: false
    }
  }
};

export const fetchUserDetails = async (authorization: string | undefined, cookie: string | undefined) => {
  
  try {
    const URL = `${process.env.API_HOST || 'http://localhost:5000/api'}/user/details`;
    const userDetails = await fetch(URL, {
      headers: {
        'Authorizarion': authorization || '',
        'Cookie': cookie || ''
      },
      credentials: 'include'
    });
  
    if (!userDetails.ok) {
      throw new Error('Failed to fetch user details');
    }
  
    const userDetailsJson = await userDetails.json();

    return {
      userDetails: userDetailsJson,
      isLogin: true
    }
  } catch (error) {
    console.error('Error:', error);
  }

  return {
    isLogin: false
  };
};