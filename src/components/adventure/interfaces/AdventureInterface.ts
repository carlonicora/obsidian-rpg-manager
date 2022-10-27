import {ModelInterface} from "../../../managers/modelsManager/interfaces/ModelInterface";
import {PlotsInterface} from "../../../services/plotsServices/oldInterfaces/PlotsInterface";
import {AdventureDataInterface} from "./AdventureDataInterface";

export interface AdventureInterface extends ModelInterface, PlotsInterface, AdventureDataInterface{
}
