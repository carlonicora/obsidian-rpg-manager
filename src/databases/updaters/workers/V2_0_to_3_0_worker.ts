import {DatabaseUpdateWorkerInterface} from "../interfaces/DatabaseUpdateWorkerInterface";
import {AbstractDatabaseWorker} from "../abstracts/AbstractDatabaseWorker";
import {LogMessageType} from "../../../loggers/enums/LogMessageType";
import {CachedMetadata, parseYaml, SectionCache, stringifyYaml, TFile} from "obsidian";
import {ComponentType} from "../../enums/ComponentType";
import {DatabaseUpdaterReporterInterface} from "../interfaces/DatabaseUpdaterReporterInterface";

export class V2_0_to_3_0_worker extends AbstractDatabaseWorker implements DatabaseUpdateWorkerInterface {
	public async run(
		reporter: DatabaseUpdaterReporterInterface|undefined=undefined,
	): Promise<void> {
		this.factories.logger.warning(LogMessageType.Updater, 'Updating RPG Manager from v2.0 to v3.0');

		const files: Array<TFile> = await this.app.vault.getMarkdownFiles();

		if (reporter !== undefined) reporter.setFileCount(files.length);

		for (let filesIndex=0; filesIndex<files.length; filesIndex++){
			// Read file and metadata
			const file: TFile = files[filesIndex];

			let fileContent = await this.app.vault.read(file);
			const fileContentArray = await fileContent.split('\n');

			const cachedMetadata: CachedMetadata|null = this.app.metadataCache.getFileCache(file);
			if (cachedMetadata == null) continue;

			if (cachedMetadata?.frontmatter?.tags == null) {
				if (reporter !== undefined) reporter.addFileUpdated();
				continue;
			}

			const tags = this.tagHelper.sanitiseTags(cachedMetadata?.frontmatter?.tags);
			if (tags.length === 0) {
				if (reporter !== undefined) reporter.addFileUpdated();
				continue;
			}

			const tag = this.tagHelper.getTag(tags);
			if (tag === undefined) {
				if (reporter !== undefined) reporter.addFileUpdated();
				continue;
			}

			const type = this.tagHelper.getDataType(tag);
			if (type === undefined) {
				if (reporter !== undefined) reporter.addFileUpdated();
				continue;
			}

			let frontmatterMetadataStartLine: number|undefined = undefined;
			let frontmatterMetadataEndLine: number|undefined = undefined;
			const frontmatterMetadata: any = cachedMetadata.frontmatter;
			let frontmatterMetadataContentArray: Array<string>|undefined = undefined;

			let dataMetadataStartLine: number|undefined = undefined;
			let dataMetadataEndLine: number|undefined = undefined;
			let dataMetadata: any|undefined = undefined;
			let dataMetadataType: string|undefined;
			let dataMetadataContent: string|undefined = undefined;
			let dataMetadataContentArray: Array<string>|undefined = undefined;
			let dataNewMetadata: any|undefined=undefined;
			let dataNewMetadataContent: string|undefined = undefined;

			let listMetadataStartLine: number|undefined = undefined;
			let listMetadataEndLine: number|undefined = undefined;
			let listMetadataType: string|undefined;
			let listNewMetadata: any|undefined=undefined;
			let listNewMetadataContent: string|undefined = undefined;

			let codeblock: SectionCache|undefined;
			for (let index=0; index<(cachedMetadata.sections?.length ?? 0); index++){
				codeblock = (cachedMetadata.sections !== undefined ? cachedMetadata.sections[index] : undefined);
				if (codeblock !== undefined && codeblock.type === 'yaml' && index === 0){
					//  Read frontmatter
					frontmatterMetadataStartLine = codeblock.position.start.line;
					frontmatterMetadataEndLine = codeblock.position.end.line;
					frontmatterMetadataContentArray = fileContentArray.slice(frontmatterMetadataStartLine, frontmatterMetadataEndLine);
				} else if (codeblock !== undefined && fileContentArray[codeblock.position.start.line] === '```RpgManager'){
					if (dataMetadataStartLine === undefined){
						// Read codeblock data structure
						dataMetadataStartLine = codeblock.position.start.line+1;
						dataMetadataEndLine = codeblock.position.end.line;
						if (dataMetadataStartLine != undefined && dataMetadataEndLine != undefined){
							dataMetadataType = fileContentArray[dataMetadataStartLine];
							dataMetadataContentArray = fileContentArray.slice(dataMetadataStartLine+1, dataMetadataEndLine)
							dataMetadataContentArray.slice(1);
							dataMetadataContent = dataMetadataContentArray.join('\n');
							dataMetadata = parseYaml(dataMetadataContent);
						}
					} else {
						// Maybe read codeblock linkonly structure
						listMetadataStartLine = codeblock.position.start.line+1;
						listMetadataEndLine = codeblock.position.end.line;
						if (listMetadataStartLine != undefined && listMetadataEndLine != undefined){
							listMetadataType = fileContentArray[listMetadataStartLine];
						}
					}
				}
			}

			//LOAD RELATIONSHIPS FROM METADATA
			let metadataRelationships: Array<any> = [];
			if (frontmatterMetadataContentArray !== undefined){
				// Read frontmatter relationships
				metadataRelationships = await this._readRelationshipsFromFrontmatter(frontmatterMetadataContentArray);
			}
			// Read content relationships
			const relationships = await this._addRelationshipsFromContent(metadataRelationships, fileContentArray);

			if (dataMetadataType !== undefined){
				// Update codeblock data with frontmatter metadata
				// Add relationships to codeblockdata
				dataNewMetadata = this._getControllerMetadata(dataMetadataType.toLowerCase());
				dataNewMetadataContent = await this._updateMetadata(type, dataNewMetadata, frontmatterMetadata, dataMetadata, relationships);
			}

			if (listMetadataType !== undefined){
				listNewMetadata = this._getControllerMetadata(listMetadataType.toLowerCase());
				listNewMetadataContent = stringifyYaml(listNewMetadata);
			}

			if (listNewMetadataContent !== undefined && listMetadataStartLine !== undefined && listMetadataEndLine !== undefined){
				// Maybe replace codeblock linkonly
				const listNewMetadataContentArray: Array<string> = listNewMetadataContent.split('\n');
				listNewMetadataContentArray[listNewMetadataContentArray.length - 1] = '```';
				fileContentArray.splice(listMetadataStartLine, listMetadataEndLine  - listMetadataStartLine + 1, ...listNewMetadataContentArray)
			}

			if (dataNewMetadataContent !== undefined && dataMetadataStartLine !== undefined && dataMetadataEndLine !== undefined){
				// Replace codeblock data
				const dataNewMetadataContentArray: Array<string> = dataNewMetadataContent.split('\n');
				dataNewMetadataContentArray[dataNewMetadataContentArray.length-1] = '```';
				fileContentArray.splice(dataMetadataStartLine, dataMetadataEndLine - dataMetadataStartLine + 1, ...dataNewMetadataContentArray)
			}

			if (frontmatterMetadataContentArray !== undefined && frontmatterMetadataStartLine !== undefined && frontmatterMetadataEndLine !== undefined) {
				// Cleanup frontmatter
				const frontmatter: any = this._cleanFrontmatter(frontmatterMetadataContentArray);
				const frontmatterContent: string = '---\n' + stringifyYaml(frontmatter) + '---';
				// Replace frontmatter
				fileContentArray.splice(frontmatterMetadataStartLine, frontmatterMetadataEndLine - frontmatterMetadataStartLine + 1, ...frontmatterContent.split('\n'))
			}

			// Save file
			fileContent = fileContentArray.join('\n');
			this.app.vault.modify(file, fileContent)
				.then(() => {
					if (reporter !== undefined) reporter.addFileUpdated();
				});
		}
	}

	private _cleanFrontmatter(
		frontmatterMetadataContentArray: Array<string>,
	): any {
		let frontmatterContent = '';
		for (let index=0; index<frontmatterMetadataContentArray.length; index++){
			if (!frontmatterMetadataContentArray[index].trimStart().startsWith('[[') && frontmatterMetadataContentArray[index].trim() !== ''){
				frontmatterContent += frontmatterMetadataContentArray[index] + '\n';
			}
		}

		const frontmatter: any = parseYaml(frontmatterContent);

		if (frontmatter.completed !== undefined) delete(frontmatter.completed);
		if (frontmatter.synopsis !== undefined) delete(frontmatter.synopsis);
		if (frontmatter.image !== undefined) delete(frontmatter.image);
		if (frontmatter.abt !== undefined) delete(frontmatter.abt);
		if (frontmatter.dates !== undefined) delete(frontmatter.dates);
		if (frontmatter.times !== undefined) delete(frontmatter.times);
		if (frontmatter.time !== undefined) delete(frontmatter.time);
		if (frontmatter.relationships !== undefined) delete(frontmatter.relationships);
		if (frontmatter.address !== undefined) delete(frontmatter.address);
		if (frontmatter.url !== undefined) delete(frontmatter.url);
		if (frontmatter.goals !== undefined) delete(frontmatter.goals);
		if (frontmatter.session !== undefined) delete(frontmatter.session);
		if (frontmatter.action !== undefined) delete(frontmatter.action);
		if (frontmatter.storycircle !== undefined) delete(frontmatter.storycircle);
		if (frontmatter.sceneType !== undefined) delete(frontmatter.sceneType);
		if (frontmatter.date !== undefined) delete(frontmatter.date);

		return frontmatter;
	}

	private _readRelationshipsFromFrontmatter(
		frontmatterMetadataContentArray: Array<string>,
	): Array<any> {
		const response: Array<any> = [];
		let fileContentArray: Array<string> = [];

		for (let index=0; index<frontmatterMetadataContentArray.length; index++){
			const frontmatterLine: string = frontmatterMetadataContentArray[index];
			if (frontmatterLine.trimStart().startsWith('[[')){
				let line = frontmatterLine;

				line = line.substring(line.indexOf('[[') + 2);
				const endLinkIndex = line.indexOf(']]');
				if (endLinkIndex === -1) continue;

				const nameAndAlias = line.substring(0, endLinkIndex);
				const aliasIndex = nameAndAlias.indexOf('|');
				let basename: string;
				if (aliasIndex === -1){
					basename = nameAndAlias;
				} else {
					basename = nameAndAlias.substring(0, aliasIndex);
				}

				line = line.substring(line.indexOf(']]') + 3).trimStart();
				if (line === '""') line = '';
				if (line.startsWith('"') && line.endsWith('"')) line = line.substring(1, line.length -1)

				fileContentArray = [...fileContentArray, ...this._readContentRelationships(line)];

				const path = this._getPathFromBasename(basename);

				if (path !== undefined && !this._pathExistsInRelationships(path, response)) {
					const newRelationship = {
						type: 'biunivocal',
						path: path,
						description: line
					}
					response.push(newRelationship);
				}
			}
		}

		return this._addRelationshipsFromContent(response, fileContentArray);
	}

	private _readContentRelationships(
		content: string,
	): Array<string> {
		const response: Array<string> = [];

		let indexStart: number = content.indexOf('[[');

		while (indexStart !== -1) {
			content = content.substring(indexStart + 2);
			const endLinkIndex = content.indexOf(']]');
			if (endLinkIndex === -1) break;

			const nameAndAlias = content.substring(0, endLinkIndex);
			content = content.substring(endLinkIndex+2);

			const aliasIndex = nameAndAlias.indexOf('|');
			let basename: string;
			if (aliasIndex === -1){
				basename = nameAndAlias;
			} else {
				basename = nameAndAlias.substring(0, aliasIndex);
			}

			response.push(basename);

			indexStart = content.indexOf('[[');
		}

		return response;
	}

	private _addRelationshipsFromContent(
		frontmatterRelationships: Array<any>,
		fileContentArray: Array<string>,
	): Array<any> {
		for (let index=0; index<fileContentArray.length; index++){
			const path = this._getPathFromBasename(fileContentArray[index]);
			if (path === undefined) continue;

			if (!this._pathExistsInRelationships(path, frontmatterRelationships)){
				const newRelationship = {
					type: 'biunivocal',
					path: path,
					isInContent: true,
				}
				frontmatterRelationships.push(newRelationship);
			}
		}

		return frontmatterRelationships;
	}

	private _pathExistsInRelationships(
		path: string,
		relationships: Array<any>,
	): boolean {
		const existingRelationships: Array<any> = relationships.filter((relationship: any) => relationship.path === path);
		if (existingRelationships.length !== 1) return false;

		return true;
	}

	private _getPathFromBasename(
		basename: string,
	): string|undefined {
		const files: Array<TFile> = this.app.vault.getMarkdownFiles().filter((file: TFile) => file.basename === basename);
		if (files.length !== 1) return undefined;

		return files[0].path;
	}

	private _updateMetadata(
		type: ComponentType,
		metadata: any,
		frontmatterMetadata: any,
		codeblockMetadata: any,
		relationships: Array<any>,
	): string {
		switch (type) {
			case ComponentType.Campaign:
				if (frontmatterMetadata?.dates?.current != undefined) metadata.data.date = frontmatterMetadata.dates.current;
				break;
			case ComponentType.Act:
				if (frontmatterMetadata?.abt != undefined) metadata.data.abtStage = frontmatterMetadata.abt;
				break;
			case ComponentType.Scene:
				if (frontmatterMetadata?.sceneType != undefined) metadata.data.sceneType = frontmatterMetadata.sceneType;
				if (frontmatterMetadata?.storycircle != undefined) metadata.data.storyCircleStage = frontmatterMetadata.storycircle;
				if (frontmatterMetadata?.isActedUpon != undefined) metadata.data.isActedUpon = frontmatterMetadata.isActedUpon;
				if (frontmatterMetadata?.action != undefined) metadata.data.action = frontmatterMetadata.action;
				if (frontmatterMetadata?.date != undefined) metadata.data.date = frontmatterMetadata.date;
				if (frontmatterMetadata?.session != undefined) metadata.data.sessionId = frontmatterMetadata.session;

				if (codeblockMetadata?.action != undefined) metadata.data.action = frontmatterMetadata.action;
				if (codeblockMetadata?.trigger != undefined) metadata.data.trigger = frontmatterMetadata.trigger;

				if (codeblockMetadata?.durations !== undefined && codeblockMetadata?.duration){
					metadata.data.duration = codeblockMetadata.duration;
					metadata.data.durations = codeblockMetadata.durations;
				} else {
					if (frontmatterMetadata?.time != undefined && frontmatterMetadata?.time?.start != undefined && frontmatterMetadata?.time?.end != undefined) {
						this._addDurations(
							frontmatterMetadata.time.start,
							frontmatterMetadata.time.end,
							metadata,
						)
					}

					if (frontmatterMetadata.times != undefined && frontmatterMetadata.times?.start != undefined && frontmatterMetadata.times?.end != undefined) {
						this._addDurations(
							frontmatterMetadata.times.start,
							frontmatterMetadata.times.end,
							metadata,
						)
					}
				}
				break;
			case ComponentType.Session:
				if (frontmatterMetadata?.dates?.irl != undefined) metadata.data.irl = frontmatterMetadata.dates.irl;
				if (frontmatterMetadata?.abt != undefined) metadata.data.abtStage = frontmatterMetadata.abt;
				break;
			case ComponentType.Character:
				if (frontmatterMetadata?.dates?.dob != undefined) metadata.data.dob = frontmatterMetadata.dates.dob;
				if (frontmatterMetadata?.dates?.death != undefined) metadata.data.death = frontmatterMetadata.dates.death;
				if (frontmatterMetadata?.pronoun != undefined) metadata.data.pronoun = frontmatterMetadata.pronoun;
				break;
			case ComponentType.Clue:
				if (frontmatterMetadata?.dates?.found != undefined) metadata.data.found = frontmatterMetadata.dates.found;
				break;
			case ComponentType.Event:
				if (frontmatterMetadata?.dates?.event != undefined) metadata.data.date = frontmatterMetadata.dates.event;
				break;
			case ComponentType.Location:
				if (frontmatterMetadata?.address != undefined) metadata.data.date = frontmatterMetadata.address;
				break;
			case ComponentType.Music:
				if (frontmatterMetadata?.url != undefined) metadata.data.date = frontmatterMetadata.url;
				break;
			case ComponentType.NonPlayerCharacter:
				if (frontmatterMetadata?.dates?.dob != undefined) metadata.data.dob = frontmatterMetadata.dates.dob;
				if (frontmatterMetadata?.dates?.death != undefined) metadata.data.death = frontmatterMetadata.dates.death;
				if (frontmatterMetadata?.pronoun != undefined) metadata.data.pronoun = frontmatterMetadata.dates.pronoun;
				if (frontmatterMetadata?.goals != undefined) metadata.data.pronoun = frontmatterMetadata.goals;
				break;
		}

		if (codeblockMetadata?.abt != undefined && metadata.plot != undefined) metadata.plot.abt = codeblockMetadata.abt;
		if (codeblockMetadata?.storycircle != undefined && metadata.plot != undefined) metadata.plot.storycircle = codeblockMetadata.storycircle;

		if (frontmatterMetadata?.complete !== undefined || frontmatterMetadata?.completed !== undefined ){
			if (frontmatterMetadata?.complete !== undefined && frontmatterMetadata.complete === false ){
				metadata.data.complete = false;
			} else if (frontmatterMetadata?.completed !== undefined && frontmatterMetadata.completed === false ){
				metadata.data.complete = false;
			}
		} else {
			delete (metadata.data.complete);
		}
		if (frontmatterMetadata?.synopsis != undefined) metadata.data.synopsis = frontmatterMetadata.synopsis;
		if (frontmatterMetadata?.image != undefined) metadata.data.image = frontmatterMetadata.image;

		if (relationships.length > 0) metadata.relationships = relationships;

		let response: string = stringifyYaml(metadata);
		response = response
			.replaceAll('0,', ',')
			.replaceAll("'',", ',')
			.replaceAll('{},', ',')
			.replaceAll('"",', ',');

		return response;
	}

	private _addDurations(
		start: string,
		end: string,
		metadata: any,
	): void {
		const indexOfStartT = start.indexOf('T');
		const indexOfEndT = end.indexOf('T');

		if (indexOfStartT !== -1 && indexOfEndT !== -1){
			const [startHour, startMinute] = start.substring(indexOfStartT + 1).split(':');
			const [endHour, endMinute] = end.substring(indexOfEndT + 1).split(':');
			const startTime:number = (+startHour) * 60 + (+startMinute);
			let endTime:number = (+endHour) * 60 + (+endMinute);
			if (startTime > endTime) endTime += 24*60;
			const duration: number = (endTime-startTime) * 60;

			if (duration !== undefined && duration > 0){
				const durations: Array<string> = [];
				metadata.data.durations = [];
				let singleDuration = '0';
				singleDuration += '-';
				singleDuration += duration.toString();
				durations.push('' + singleDuration);
				metadata.data.durations = durations;
				metadata.data.duration = duration;
			}
		}
	}

	private _getControllerMetadata(
		codeBlockType: 'campaignnavigation' | 'campaign' | 'adventurenavigation' | 'adventure' | 'scenenavigation' | 'scene' | 'actnavigation' | 'act' | 'sessionnavigation' | 'session' |
			'subplot' | 'pc' | 'clue' | 'event' | 'faction' | 'location' | 'music' | 'npc' | string,
	): any {
		switch (codeBlockType){
			case 'campaignnavigation':
				return {
					models: {header: true},
					plot: {abt: {need: '', and: '', but: '', therefore: '',}, storycircle: {you: '', need: '', go: '', search: '', find: '', take: '', return: '', change: '',}},
					data: {date: '', synopsis: '', image: '', complete: '', currentAdventureId: '', currentActId: '', currentSessionId: ''},
				}
			case 'campaign':
				return {
					models: {lists: {pcs: {relationship: 'hierarchy'}, subplots: {relationship: 'hierarchy'}, adventures: {relationship: 'hierarchy'}, acts: {relationship: 'hierarchy'}, sessions: {relationship: 'hierarchy'}, events: {relationship: 'hierarchy'}, npcs: {relationship: 'hierarchy'}}}
				}
			case 'adventurenavigation':
				return {
					models: {header: true},
					plot: {abt: {need: '', and: '', but: '', therefore: '',}, storycircle: {you: '', need: '', go: '', search: '', find: '', take: '', return: '', change: '',}},
					data: {synopsis: '', complete: '',},
					relationships: [],
				}
			case 'adventure':
				return {
					models: {lists: {acts: {relationship: 'hierarchy'}}}
				}
			case 'actnavigation':
				return {
					models: {header: true},
					plot: {abt: {need: '', and: '', but: '', therefore: '',}, storycircle: {you: '', need: '', go: '', search: '', find: '', take: '', return: '', change: '',}},
					data: {synopsis: '', image: '', complete: '', abtStage: ''},
					relationships: [],
				}
			case 'act':
				return {
					models: {lists: {scenes: {relationship: 'hierarchy'}, pcs: {relationship: 'univocal'}, npcs: {relationship: 'univocal'}, clues: {relationship: 'univocal'}, locations: {relationship: 'univocal'}, factions: {relationship: 'univocal'}}}
				}
			case 'scenenavigation':
				return {
					models: {header: true},
					data: {synopsis: '', image: '', complete: '', sessionId: 0, action: '', trigger: '', date: '', sceneType: '', isActedUpon: false, duration: 0, durations: [], storyCircleStage: ''},
					relationships: [],
				}
			case 'scene':
				return {
					models: {lists: {musics: {relationship: 'univocal',}, pcs: {relationship: 'univocal',}, npcs: {relationship: 'univocal',}, factions: {relationship: 'univocal',}, clues: {relationship: 'univocal',}, locations: {relationship: 'univocal',}, events: {relationship: 'univocal',},}}
				}
			case 'sessionnavigation':
				return {
					models: {header: true, lists: {scenes: {relationship: "hierarchy",},}},
					data: {synopsis: '', image: '', complete: '', irl: undefined, abtStage: undefined},
					relationships: [],
				}
			case 'session':
				return {
					models: {lists: {subplots: {relationship: "hierarchy",}, musics: {relationship: "hierarchy",}, pcs: {relationship: "hierarchy",}, npcs: {relationship: "hierarchy",}, factions: {relationship: "hierarchy",}, clues: {relationship: "hierarchy",}, locations: {relationship: "hierarchy",}, events: {relationship: "hierarchy",},}}
				}
			case 'subplot':
				return {
					models: {header: true, lists: {events: {}, clues: {}, factions: {}, npcs: {}, locations: {},}},
					plot: {abt: {need: '', and: '', but: '', therefore: '',}, storycircle: {you: '', need: '', go: '', search: '', find: '', take: '', return: '', change: '',}},
					data: {synopsis: '', image: '', complete: ''},
					relationships: [],
				}
			case 'pc':
				return {
					models: {header: true, lists: {pcs: {relationship: "univocal",}, npcs: {relationship: "univocal",}, factions: {}, locations: {},}},
					data: {synopsis: '', image: '', complete: '', dob: '', death: '', goals: '', pronoun: ''},
					relationships: [],
				}
			case 'clue':
				return {
					models: {header: true, lists: {subplots: {}, pcs: {}, npcs: {}, locations: {}, clues: {}, events: {},}},
					data: {synopsis: '', image: '', complete: '', found: false},
					relationships: [],
				}
			case 'event':
				return {
					models: {header: true, lists: {subplots: {}, pcs: {}, npcs: {}, clues: {}, locations: {},}},
					data: {synopsis: '', image: '', complete: '', date: ''},
					relationships: [],
				}
			case 'faction':
				return {
					models: {header: true, lists: {pcs: {}, npcs: {}, locations: {}, subplots: {}}},
					data: {synopsis: '', image: '', complete: ''},
					relationships: [],
				}
			case 'location':
				return {
					models: {header: true, lists: {pcs: {}, npcs: {}, events: {}, clues: {}, locations: [{relationship: "parent", title: "Inside"}, {relationship: "child", title: "Contains"}],}},
					data: {synopsis: '', image: '', complete: '', address: ''},
					relationships: [],
				}
			case 'music':
				return {
					models: {header: true, lists: {musics: [{relationship: "parent", title: "Part of playlists"}, {relationship: "child", title: "Songs",}]}},
					data: {synopsis: '', image: '', complete: '', url: ''},
					relationships: [],
				}
			case 'npc':
				return {
					models: {header: true, lists: {subplots: {}, pcs: {relationship: "univocal",}, npcs: {relationship: "univocal",}, factions: {}, locations: {}, events: {}, clues: {},}},
					data: {synopsis: '', image: '', death: '', dob: '', goals: '', pronoun: '', complete: ''},
					relationships: [],
				}
		}
	}
}
