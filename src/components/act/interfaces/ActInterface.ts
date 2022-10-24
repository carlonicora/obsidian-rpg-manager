import {ComponentModelInterface} from "../../../api/componentManager/interfaces/ComponentModelInterface";
import {AdventureInterface} from "../../adventure/interfaces/AdventureInterface";
import {PlotsInterface} from "../../../services/plots/interfaces/PlotsInterface";
import {ActDataInterface} from "./ActDataInterface";

export interface ActInterface extends ComponentModelInterface, PlotsInterface, ActDataInterface {
	get adventure(): AdventureInterface;
	get previousAct(): ActInterface|null;
	get nextAct(): ActInterface|null;
}
