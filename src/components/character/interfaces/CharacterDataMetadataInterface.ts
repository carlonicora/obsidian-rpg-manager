import {ComponentDataMetadataInterface} from "../../../core/interfaces/ComponentDataMetadataInterface";

export interface CharacterDataMetadataInterface extends ComponentDataMetadataInterface {
	dob?: string | undefined;
	death?: string | undefined;
	goals?: string | undefined;
	pronoun?: 'they' | 'she' | 'he' | 'it' | 'ae' | 'e' | 'per' | 've' | 'xe' | 'ze' | string | undefined;
}
