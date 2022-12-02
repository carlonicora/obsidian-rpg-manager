import {ElementDataInterface} from "../../../../../managers/viewsManager/interfaces/ElementDataInterface";
import {Pronoun} from "../../../../../services/pronounService/enums/Pronoun";

export interface PronounElementInterface extends ElementDataInterface {
	values: Pronoun,
}
