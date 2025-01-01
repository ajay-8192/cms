import { BASE_URL, postData } from "../utils/api";
import { defaultSideEffects } from "../utils/helper";
import { SideEffectsProps } from "./userServices";

export const createContent = async (payload: { data: any, projectId: string }, sideEffects: SideEffectsProps = defaultSideEffects) => {
    const url = BASE_URL + `content/${payload.projectId}/create`;

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
