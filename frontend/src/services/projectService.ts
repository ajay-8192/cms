import { BASE_URL, fetchData, postData } from "../utils/api";
import { defaultSideEffects } from "../utils/helper";
import { SideEffectsProps } from "./userServices";

export const createProject = async (payload: { title: string, description: string, publish?: boolean }, sideEffects: SideEffectsProps = defaultSideEffects) => {
    const { onSuccess, onError } = sideEffects;

    const url = BASE_URL + "project/create";

    try {
        const result = await postData(url, payload);
        console.log("Post response:", result);
        onSuccess?.(result?.project);
    } catch (error) {
        onError?.(error);
        console.log("Error posting data:", error);
    }
}

export const fetchProjectDetails = async (payload: { projectId: string }, sideEffects: SideEffectsProps = defaultSideEffects) => {

    const { onSuccess, onError } = sideEffects;

    const url = BASE_URL + `project/${payload.projectId}`;

    try {
        const result = await fetchData(url);
        console.log("Post response:", result);
        onSuccess?.(result?.project);
    } catch (error) {
        onError?.(error);
        console.log("Error posting data:", error);
    }
}

export const updateProjectDetails = async (projectId: string, payload: { title: string, description: string }, sideEffects: SideEffectsProps = defaultSideEffects) => {

    const { onSuccess, onError } = sideEffects;

    const url = BASE_URL + `project/${projectId}`

    try {
        const result = await postData(url, payload);
        console.log("Post Response:", result);
        onSuccess?.(result?.project);
    } catch (error) {
        onError?.(error);
        console.log("Error updating data:", error);
    }
}
