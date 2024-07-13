import { LoginTypes } from "@/types/userTypes"
import { loginValidate } from "@/validate/userValidate"

export const userLogin = (data: LoginTypes) => {
  const validObj = loginValidate(data);

  if (!validObj.isValid) {

    return validObj;
  }

  const URL = `${process.env.API_HOST || 'http://localhost:5000/api'}/user/login`;
  
  const userDetails = fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
    credentials: 'include'
  })
    .then(response => {
      console.log('======> ');
      return response.json();
    })
    .catch(error => {
      console.error('Error:', error);
    });
  
  return userDetails;
}
