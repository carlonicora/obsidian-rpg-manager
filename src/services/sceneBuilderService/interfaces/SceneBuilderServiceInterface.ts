import {ActInterface} from "../../../components/act/interfaces/ActInterface";

export interface SceneBuilderServiceInterface {
	open(
		act: ActInterface,
	): Promise<void>;
}
