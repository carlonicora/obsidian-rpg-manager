import {App, TFile} from "obsidian";

export class RpgMetadataValidator {
	public static validate(
		app: App,
		current: Record<string, any>,
	): boolean
	{
		let response = true;

		app.vault.getFiles().forEach((file: TFile) => {
			if (file.path === current.file.path){
				const cache = app.metadataCache.getFileCache(file);

				if (cache != undefined && cache.frontmatter == undefined){
					if (
						cache.sections != undefined &&
						cache.sections[0] != undefined &&
						cache.sections[0].type === 'yaml'
					){
						response = false;
					}
				}

			}
		});

		/*
		if (response === true){
			current.file.frontmatter
		}
		*/

		return response;
	}
}
