import {ComponentMetadataInterface} from "./ComponentMetadataInterface";
import {Pronoun} from "../../../enums/Pronoun";

export interface CharacterMetadataInterface extends ComponentMetadataInterface {
	dob?: string | undefined;
	death?: string | undefined;
	goals?: string | undefined;
	pronoun?: Pronoun | undefined;
}
