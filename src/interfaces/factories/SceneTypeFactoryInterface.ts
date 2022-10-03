import {SceneType} from "../../enums/SceneType";

export interface SceneTypeFactoryInterface {
	createSceneType(
		readableContentType: string,
	): SceneType;

	createReadableSceneType(
		type: SceneType,
	): string;
}
