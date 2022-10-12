import {CharacterTableSubModel} from "./CharacterTableSubModel";
import {RpgManagerAdvancedSettingsListsInterface} from "../../../../settings/RpgManagerSettingsInterface";

export class NonPlayerCharacterTableSubModel extends CharacterTableSubModel {
	protected advancedSettings: RpgManagerAdvancedSettingsListsInterface = this.settings.advanced.Agnostic.NonPlayerCharacterList;
}
