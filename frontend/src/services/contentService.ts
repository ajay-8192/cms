import { BASE_URL, fetchData, postData } from "../utils/api";
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
