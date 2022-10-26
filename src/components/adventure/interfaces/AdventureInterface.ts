import {ModelInterface} from "../../../api/modelsManager/interfaces/ModelInterface";
import {PlotsInterface} from "../../../services/plots/interfaces/PlotsInterface";
import {AdventureDataInterface} from "./AdventureDataInterface";

export interface AdventureInterface extends ModelInterface, PlotsInterface, AdventureDataInterface{
}
