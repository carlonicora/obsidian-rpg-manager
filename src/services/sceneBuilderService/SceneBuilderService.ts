import {AbstractService} from "../../managers/servicesManager/abstracts/AbstractService";
import {SceneBuilderServiceInterface} from "./interfaces/SceneBuilderServiceInterface";
import {ServiceInterface} from "../../managers/servicesManager/interfaces/ServiceInterface";
import {ActInterface} from "../../components/act/interfaces/ActInterface";
import {SceneBuilderModal} from "./modals/SceneBuilderModal";

export class SceneBuilderService extends AbstractService implements SceneBuilderServiceInterface, ServiceInterface {
	public async open(
		act: ActInterface,
	): Promise<void> {
		new SceneBuilderModal(this.api, act).open();
	}
}
