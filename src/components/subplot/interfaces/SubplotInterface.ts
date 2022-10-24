import {ComponentModelInterface} from "../../../api/componentManager/interfaces/ComponentModelInterface";
import {PlotsInterface} from "../../../services/plots/interfaces/PlotsInterface";
import {SubplotDataInterface} from "./SubplotDataInterface";

export interface SubplotInterface extends ComponentModelInterface, PlotsInterface, SubplotDataInterface {

}
