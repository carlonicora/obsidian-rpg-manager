import {SceneInterface} from "../../../components/scene/interfaces/SceneInterface";

export interface SceneFeedbackServiceInterface {
	openFeedback(scene: SceneInterface): Promise<void>;
}
