import {ComponentType} from "../../../core/enums/ComponentType";
import {RpgManagerSettingsInterface} from "../../../settings/RpgManagerSettingsInterface";

export interface TagServiceInterface {
	sanitiseTags(
		tags: string|string[]|undefined,
	): string[];

	getDataType(
		tag: string,
	): ComponentType|undefined;

	hasRpgManagerTags(
		tags: string[],
	): boolean;

	isRpgManagerTag(
		tag: string,
	): boolean;

	getId(
		type: ComponentType,
		tag: string,
	): string|undefined;

	getTag(
		tags: string[],
	): string|undefined;

	fuzzyTagGuesser(
		tag: string
	): {tag: string, type: ComponentType}|undefined;

	fuzzyTagsGuesser(
		tags: string[],
	): {tag: string, type: ComponentType}|undefined;

	getTemplateDataType(
		tags: string[]|null,
	): ComponentType|undefined;
}
