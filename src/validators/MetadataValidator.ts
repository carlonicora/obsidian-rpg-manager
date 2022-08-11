import {App, TFile} from "obsidian";
import * as Data from '../data';
import {
	AdventureData,
	CampaignData,
	CharacterData,
	ClueData,
	EventData,
	FactionData,
	LocationData,
	SceneData, SessionData
} from "../data";

export class MetadataValidator {
	public static validate(
		app: App,
		current: Record<string, any>,
	): boolean|string
	{
		let response: boolean|string = true;

		app.vault.getFiles().forEach((file: TFile) => {
			if (file.path === current.file.path){
				const cache = app.metadataCache.getFileCache(file);

				if (cache != undefined && cache.frontmatter == undefined){
					if (
						cache.sections != undefined &&
						cache.sections[0] != undefined &&
						cache.sections[0].type === 'yaml'
					){
						response = 'Invalid Frontmatter';
					}
				}
			}
		});

		if (response === true){
			if (current.tags.indexOf('adventure') !== -1){
				response = this.validateFrontmatterElement(AdventureData.frontmatter, current.file.frontmatter);
			} else if (current.tags.indexOf('campaign') !== -1){
				response = this.validateFrontmatterElement(CampaignData.frontmatter, current.file.frontmatter);
			} else if (current.tags.indexOf('character/pc') !== -1) {
				response = this.validateFrontmatterElement(CharacterData.frontmatter['pc'], current.file.frontmatter);
			} else if (current.tags.indexOf('character/npc') !== -1) {
				response = this.validateFrontmatterElement(CharacterData.frontmatter['npc'], current.file.frontmatter);
			} else if (current.tags.indexOf('clue') !== -1) {
				response = this.validateFrontmatterElement(ClueData.frontmatter, current.file.frontmatter);
			} else if (current.tags.indexOf('event') !== -1) {
				response = this.validateFrontmatterElement(EventData.frontmatter, current.file.frontmatter);
			} else if (current.tags.indexOf('faction') !== -1) {
				response = this.validateFrontmatterElement(FactionData.frontmatter, current.file.frontmatter);
			} else if (current.tags.indexOf('location') !== -1) {
				response = this.validateFrontmatterElement(LocationData.frontmatter, current.file.frontmatter);
			} else if (current.tags.indexOf('scene') !== -1) {
				response = this.validateFrontmatterElement(SceneData.frontmatter, current.file.frontmatter);
			} else if (current.tags.indexOf('session') !== -1) {
				response = this.validateFrontmatterElement(SessionData.frontmatter, current.file.frontmatter);
			}
		}

		return response;
	}

	private static validateFrontmatterElement(
		element: object,
		frontmatter: object,
	): boolean|string
	{
		let response: boolean = true;
		let error = '';

		Object.entries(element).forEach(([key, value]) => {

			if (value === false || (frontmatter !== null && key in frontmatter)){
				if (typeof value === 'object'){
					let temporaryResponse = this.validateFrontmatterElement(value, frontmatter[key as keyof typeof frontmatter]);
					if (temporaryResponse !== true){
						error += temporaryResponse;
						response = false
					}
				}
			} else {
				error += '<li>' + key + ' missing</li>';
				response = false;
			}
		});

		return response === true ? true : error;
	}
}
