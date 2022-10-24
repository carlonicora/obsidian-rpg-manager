import {ComponentModelInterface} from "../../../api/componentManager/interfaces/ComponentModelInterface";
import {PlotsInterface} from "../../../services/plots/interfaces/PlotsInterface";
import {AdventureDataInterface} from "./AdventureDataInterface";

export interface AdventureInterface extends ComponentModelInterface, PlotsInterface, AdventureDataInterface{
}
