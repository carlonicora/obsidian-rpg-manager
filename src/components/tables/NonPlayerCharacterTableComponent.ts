import {CharacterTableComponent} from "./CharacterTableComponent";
import {RpgManagerAdvancedSettingsListsInterface} from "../../settings/RpgManagerSettingsInterface";

export class NonPlayerCharacterTableComponent  extends CharacterTableComponent {
	protected advancedSettings: RpgManagerAdvancedSettingsListsInterface = this.settings.advanced.Agnostic.NonPlayerCharacterList;
}
