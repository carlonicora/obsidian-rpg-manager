import {ComponentDataMetadataInterface} from "../../../core/interfaces/ComponentDataMetadataInterface";

export interface CharacterDataMetadataInterface extends ComponentDataMetadataInterface {
	dob?: string;
	death?: string;
	reasonOfDeath?: string;
	goals?: string;
	pronoun?: 'they' | 'she' | 'he' | 'it' | 'ae' | 'e' | 'per' | 've' | 'xe' | 'ze' | string | undefined;
}
