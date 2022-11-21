import {ElementDataInterface} from "../../interfaces/ElementDataInterface";
import {ModelInterface} from "../../../modelsManager/interfaces/ModelInterface";
import {IndexInterface} from "../../../../services/indexService/interfaces/IndexInterface";

export interface ModelSelectorElementDataInterface extends ElementDataInterface {
	values: {
		index: IndexInterface|undefined,
		list: ModelInterface[],
	};
}
