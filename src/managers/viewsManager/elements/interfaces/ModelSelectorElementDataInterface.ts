import {ElementDataInterface} from "../../interfaces/ElementDataInterface";
import {ModelInterface} from "../../../modelsManager/interfaces/ModelInterface";
import {IdInterface} from "../../../../services/idService/interfaces/IdInterface";

export interface ModelSelectorElementDataInterface extends ElementDataInterface {
	values: {
		id: IdInterface|undefined,
		list: ModelInterface[],
	};
}
