import { BASE_URL, deleteData, fetchData, postData } from "../utils/api";
import { defaultSideEffects } from "../utils/helper";
import { SideEffectsProps } from "./userServices";

export const createContent = async (payload: { data: any, projectId: string }, sideEffects: SideEffectsProps = defaultSideEffects) => {
    const url = BASE_URL + `content/project/${payload.projectId}/create`;

    const { onSuccess, onError } = sideEffects;

    try {
        const result = await postData(url, payload.data);
        console.log("Post response:", result);
        onSuccess?.(result?.content);
    } catch (error) {
        onError?.(error);
        console.log("Error posting data:", error);
    }
}

export const fetchContentsByProjectId = async (projectId: string, sideEffects: SideEffectsProps = defaultSideEffects) => {

    const { onSuccess, onError } = sideEffects;

    const url = BASE_URL + `content/project/${projectId}`

    try {
        const result = await fetchData(url);
        console.log("Get response:", result);
        onSuccess?.(result?.data?.contents);
    } catch (error) {
        onError?.(error);
        console.log("Error fetching data:", error);
    }
}

export const fetchContentsByContentId = async (payload: { projectId: string; contentId: string }, sideEffects: SideEffectsProps = defaultSideEffects) => {
    const { onSuccess, onError } = sideEffects;

    const { projectId, contentId } = payload;

    const url = BASE_URL + `content/project/${projectId}/${contentId}`;

    try {
        const result = await fetchData(url);
        console.log("Get response:", result);
        onSuccess?.(result?.data?.content);
    } catch (error) {
        onError?.(error);
        console.log("Error Fetching data:", error);
    }
}

export const updateContent = async (payload: { data: any, projectId: string, contentId: string }, sideEffects: SideEffectsProps = defaultSideEffects) => {
    const url = BASE_URL + `content/project/${payload.projectId}/${payload.contentId}`;

    const { onSuccess, onError } = sideEffects;

    try {
        const result = await postData(url, payload.data);
        console.log("Post response:", result);
        onSuccess?.(result?.data);
    } catch (error) {
        onError?.(error);
        console.log("Error posting data:", error);
    }
}

export const deleteContent = async (payload: { projectId: string, contentId: string }, sideEffects: SideEffectsProps = defaultSideEffects) => {
    const { onSuccess, onError } = sideEffects;

    const url = BASE_URL + `content/project/${payload.projectId}/${payload.contentId}`;
    try {
        const result = await deleteData(url);
        console.log("Delete response:", result);
        onSuccess?.(result);
    } catch (error) {
        onError?.(error);
        console.log("Error deleting data:", error);
    }
}
