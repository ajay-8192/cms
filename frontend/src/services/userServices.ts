import { BASE_URL, fetchData, postData } from "../utils/api";
import { defaultSideEffects } from "../utils/helper";

export type SideEffectsProps = {
    onError?: (data: any) => void;
    onSuccess?: (data: any) => void;
};

export const userLogin = async (payload: { username: string, password: string }, sideEffects = defaultSideEffects ) => {

    const { onSuccess, onError } = sideEffects;

    const url = BASE_URL + "user/login";

    try {
        const result = await postData(url, { ...payload });
        console.log("Post response:", result);
        onSuccess?.(result?.userDetails);
    } catch (error) {
        onError?.(error);
        console.log("Error posting data:", error);
    }
};

export const fetchUserDetails = async (sideEffects = defaultSideEffects) => {
    const url = BASE_URL + "user/details";

    const { onSuccess, onError } = sideEffects;
    try {
        const result = await fetchData(url);
        console.log("Post response:", result);
        onSuccess?.(result?.userDetails);
    } catch (error) {
        onError?.(error);
        console.log("Error posting data:", error);
    }
}

type CreateUserType = { username: string, password: string, firstname: string, lastname: string, email: string };

export const createNewUser = async (payload: CreateUserType, sideEffects = defaultSideEffects) => {
    const url = BASE_URL + "user/create";
    const { onSuccess, onError } = sideEffects;

    try {
        const result = await postData(url, { ...payload });
        console.log("Post response:", result);
        onSuccess?.(result?.userDetails);
    } catch (error) {
        onError?.(error);
        console.log("Error posting data:", error);
    }
}

export const forgotPassword = async (payload: { email: string }, sideEffects: SideEffectsProps) => {
    const url = BASE_URL + "user/forgot-password";
    const { onSuccess, onError } = sideEffects;

    try {
        const result = await postData(url, payload);
        console.log("Post response:", result);
        onSuccess?.(result?.message)
    } catch (error) {
        onError?.(error)
        console.log("Error posting data:", error);
    }
}

type ResetPasswordPayloadTypes = {
    resetToken: string;
    password: string;
    confirmPassword: string;
}

export const passwordReset = async (payload: ResetPasswordPayloadTypes, sideEffects: SideEffectsProps = defaultSideEffects) => {
    const url = BASE_URL + "user/reset-password";
    const { onSuccess, onError } = sideEffects;

    try {
        const result = await postData(url, payload);
        console.log("Post response:", result);
        onSuccess?.(result?.message)
    } catch (error) {
        onError?.(error)
        console.log("Error posting data:", error);
    }
}

export const logoutUser = async (sideEffects: SideEffectsProps = defaultSideEffects) => {
    const url = BASE_URL + "user/logout";
    const { onSuccess, onError } = sideEffects;

    try {
        const result = await postData(url, {});
        console.log("Post response:", result);
        onSuccess?.(result?.message)
    } catch (error) {
        onError?.(error)
        console.log("Error posting data:", error);
    }
}

type UserDetailsPayload = {
    firstName: string;
    lastName: string;
    bio: string;
};
export const updateUserDetails = async (payload: UserDetailsPayload, sideEffects: SideEffectsProps = defaultSideEffects) => {
    const url = BASE_URL + "user/details";

    const { onSuccess, onError } = sideEffects;

    try {
        const result = await postData(url, payload);
        console.log("Post response:", result);
        onSuccess?.(result?.message)
    } catch (error) {
        onError?.(error)
        console.log("Error posting data:", error);
    }
}
