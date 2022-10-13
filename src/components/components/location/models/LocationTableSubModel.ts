import {AbstractTableSubModel} from "../../../../models/abstracts/AbstractTableSubModel";
import {RpgManagerAdvancedSettingsListsInterface} from "../../../../settings/RpgManagerSettingsInterface";

export class LocationTableSubModel extends AbstractTableSubModel {
	protected advancedSettings: RpgManagerAdvancedSettingsListsInterface = this.settings.advanced.Agnostic.LocationList;
}
