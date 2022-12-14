import {ModelInterface} from "../../../managers/modelsManager/interfaces/ModelInterface";
import {AdventureInterface} from "../../adventure/interfaces/AdventureInterface";
import {PlotsInterface} from "../../../services/plotsService/interfaces/PlotsInterface";
import {ActDataInterface} from "./ActDataInterface";

export interface ActInterface extends ModelInterface, PlotsInterface, ActDataInterface {
	get adventure(): AdventureInterface;
	get previousAct(): ActInterface|null;
	get nextAct(): ActInterface|null;
}
