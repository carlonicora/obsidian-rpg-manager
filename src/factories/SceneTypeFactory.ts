import {AbstractFactory} from "../abstracts/AbstractFactory";
import {SceneTypeFactoryInterface} from "../interfaces/factories/SceneTypeFactoryInterface";
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
		readableContentType = readableContentType.toLowerCase().replaceAll('combat', 'Combat');
		return SceneType[readableContentType as keyof typeof SceneType];
	}

}
