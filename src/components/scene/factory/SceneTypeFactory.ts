import {AbstractFactory} from "../../../../REFACTOR/abstracts/AbstractFactory";
import {SceneTypeFactoryInterface} from "./interfaces/SceneTypeFactoryInterface";
import {SceneType} from "../enums/SceneType";

export class SceneTypeFactory extends AbstractFactory implements SceneTypeFactoryInterface {
	createReadableSceneType(
		type: SceneType,
	): string {
		return SceneType[type].toString().toLowerCase();
	}

	createSceneType(
		readableContentType: string,
	): SceneType {
		readableContentType = readableContentType[0].toUpperCase() + readableContentType.substring(1).toLowerCase();
		readableContentType = readableContentType.replaceAll('combat', 'Combat');

		return SceneType[readableContentType as keyof typeof SceneType];
	}
}
