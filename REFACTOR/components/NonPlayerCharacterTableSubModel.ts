import {CharacterTableSubModel} from "./CharacterTableSubModel";
import {RpgManagerAdvancedSettingsListsInterface} from "../../src/settings/RpgManagerSettingsInterface";

export class NonPlayerCharacterTableSubModel extends CharacterTableSubModel {
	protected advancedSettings: RpgManagerAdvancedSettingsListsInterface = this.settings.advanced.Agnostic.NonPlayerCharacterList;
}
