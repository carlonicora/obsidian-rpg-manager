import {ModelInterface} from "../../../managers/modelsManager/interfaces/ModelInterface";
import {PlotsInterface} from "../../../services/plotsServices/interfaces/PlotsInterface";
import {SubplotDataInterface} from "./SubplotDataInterface";

export interface SubplotInterface extends ModelInterface, PlotsInterface, SubplotDataInterface {

}
