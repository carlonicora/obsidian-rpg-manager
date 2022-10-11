import {ComponentInterface} from "../../../interfaces/ComponentInterface";
import {AdventureInterface} from "../../adventure/interfaces/AdventureInterface";
import {PlotsInterface} from "../../../../plots/interfaces/PlotsInterface";
import {ActDataInterface} from "./ActDataInterface";

export interface ActInterface extends ComponentInterface, PlotsInterface, ActDataInterface {
	get adventure(): AdventureInterface;
	get previousAct(): ActInterface|null;
	get nextAct(): ActInterface|null;
}
