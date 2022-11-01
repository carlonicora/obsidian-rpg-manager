import {DatabaseUpdateWorkerInterface} from "../interfaces/DatabaseUpdateWorkerInterface";
import {AbstractDatabaseWorker} from "../abstracts/AbstractDatabaseWorker";
import {CachedMetadata, parseYaml, SectionCache, TFile} from "obsidian";
import {ComponentType} from "../../enums/ComponentType";
import {DatabaseUpdaterReporterInterface} from "../interfaces/DatabaseUpdaterReporterInterface";
import {Md5} from "ts-md5";
import {CampaignSetting} from "../../../components/campaign/enums/CampaignSetting";
import {LoggerService} from "../../../services/loggerService/LoggerService";
import {LogMessageType} from "../../../services/loggerService/enums/LogMessageType";
import {TagService} from "../../../services/tagService/TagService";
import {YamlService} from "../../../services/yamlService/YamlService";
import {IdService} from "../../../services/idService/IdService";

export class V2_0_to_3_0_worker extends AbstractDatabaseWorker implements DatabaseUpdateWorkerInterface {
	private _campaignSettings: Map<number, CampaignSetting>;

	public async run(
		reporter: DatabaseUpdaterReporterInterface|undefined=undefined,
	): Promise<void> {
		this.api.service(LoggerService).warning(LogMessageType.Updater, 'Updating RPG Manager from v2.0 to v3.0');

		this._campaignSettings = new Map<number, CampaignSetting>();
		this._loadCampaignSettings();

		const files: TFile[] = await this.api.app.vault.getMarkdownFiles();

		if (reporter !== undefined) reporter.setFileCount(files.length);

		for (let filesIndex=0; filesIndex<files.length; filesIndex++){
			const file: TFile = files[filesIndex];

			const cachedMetadata: CachedMetadata|null = this.api.app.metadataCache.getFileCache(file);
			if (cachedMetadata == null) continue;

			if (cachedMetadata?.frontmatter?.tags == null) {
				if (reporter !== undefined) reporter.addFileUpdated();
				continue;
			}

			const tags = this.api.service(TagService).sanitiseTags(cachedMetadata?.frontmatter?.tags);
			if (tags.length === 0) {
				if (reporter !== undefined) reporter.addFileUpdated();
				continue;
			}

			let fileContent = await this.api.app.vault.read(file);

			const tagAndType = this._getTagAndType(tags);
			if (tagAndType === undefined){
				if (reporter !== undefined) reporter.addFileUpdated();
				continue;
			} else {
				if (fileContent.indexOf('```RpgManager') === -1){
					if (reporter !== undefined) reporter.addFileUpdated();
					continue;
				}
			}

			if (tagAndType.updated === true){
				fileContent = fileContent.replaceAll(tagAndType.fuzzyGuessedTag, tagAndType.tag);
			}

			const fileContentArray = await fileContent.split('\n');

			let frontmatterMetadataStartLine: number|undefined = undefined;
			let frontmatterMetadataEndLine: number|undefined = undefined;
			const frontmatterMetadata: any = cachedMetadata.frontmatter;
			let frontmatterMetadataContentArray: string[]|undefined = undefined;

			let firstCodeblockStartLine: number|undefined = undefined;
			let firstCodeblockEndLine: number|undefined = undefined;
			let firstCodeblockMetadata: any|undefined = undefined;
			let firstCodeblockMetadataType: string|undefined;
			let firstCodeblockMetadataContent: string|undefined = undefined;
			let firstCodeblockMetadataContentArray: string[]|undefined = undefined;
			let firstCodeblockNewMetadata: any|undefined=undefined;
			let firstCodeblockNewMetadataContent: string|undefined = undefined;

			let secondCodeblockMetadataStartLine: number|undefined = undefined;
			let secondCodeblockMetadataEndLine: number|undefined = undefined;
			let secondCodeblockMetadataType: string|undefined;
			let secondCodeblockNewMetadata: any|undefined=undefined;
			let secondCodeblockNewMetadataContent: string|undefined = undefined;

			let codeblock: SectionCache|undefined;
			for (let index=0; index<(cachedMetadata.sections?.length ?? 0); index++){
				codeblock = (cachedMetadata.sections !== undefined ? cachedMetadata.sections[index] : undefined);
				if (codeblock !== undefined && codeblock.type === 'yaml' && index === 0){
					frontmatterMetadataStartLine = codeblock.position.start.line;
					frontmatterMetadataEndLine = codeblock.position.end.line;
					frontmatterMetadataContentArray = fileContentArray.slice(frontmatterMetadataStartLine, frontmatterMetadataEndLine);
				} else if (codeblock !== undefined && fileContentArray[codeblock.position.start.line] === '```RpgManager'){
					if (firstCodeblockStartLine === undefined){
						firstCodeblockStartLine = codeblock.position.start.line+1;
						firstCodeblockEndLine = codeblock.position.end.line;
						if (firstCodeblockStartLine != undefined && firstCodeblockEndLine != undefined){
							firstCodeblockMetadataType = fileContentArray[firstCodeblockStartLine];
							firstCodeblockMetadataContentArray = fileContentArray.slice(firstCodeblockStartLine+1, firstCodeblockEndLine);
							firstCodeblockMetadataContentArray.slice(1);
							firstCodeblockMetadataContent = firstCodeblockMetadataContentArray.join('\n');
							firstCodeblockMetadata = parseYaml(firstCodeblockMetadataContent);
						}
					} else {
						secondCodeblockMetadataStartLine = codeblock.position.start.line+1;
						secondCodeblockMetadataEndLine = codeblock.position.end.line;
						if (secondCodeblockMetadataStartLine != undefined && secondCodeblockMetadataEndLine != undefined){
							secondCodeblockMetadataType = fileContentArray[secondCodeblockMetadataStartLine];
						}
					}
				}
			}

			let metadataRelationships: any[] = [];
			if (frontmatterMetadataContentArray !== undefined){
				metadataRelationships = await this._readRelationshipsFromFrontmatter(frontmatterMetadataContentArray);
			}
			const relationships = await this._addRelationshipsFromContent(metadataRelationships, fileContentArray);

			const dataCodeblockMetadata = this._getComponentRpgManagerDataCodeBlockMetadata(tagAndType.type);
			let dataCodeblockMetadataContent = '';

			if (firstCodeblockMetadataType !== undefined){
				firstCodeblockNewMetadata = this._getComponentRpgManagerCodeBlockMetadata(firstCodeblockMetadataType.toLowerCase());
				firstCodeblockNewMetadataContent = this.api.service(YamlService).stringify(firstCodeblockNewMetadata);

				dataCodeblockMetadataContent = await this._updateMetadata(
					tagAndType.type,
					dataCodeblockMetadata,
					frontmatterMetadata,
					firstCodeblockMetadata,
					relationships
				);
			}

			if (secondCodeblockMetadataType !== undefined){
				secondCodeblockNewMetadata = this._getComponentRpgManagerCodeBlockMetadata(secondCodeblockMetadataType.toLowerCase());
				secondCodeblockNewMetadataContent = this.api.service(YamlService).stringify(secondCodeblockNewMetadata);
			}

			if (secondCodeblockNewMetadataContent !== undefined && secondCodeblockMetadataStartLine !== undefined && secondCodeblockMetadataEndLine !== undefined){
				const listNewMetadataContentArray: string[] = secondCodeblockNewMetadataContent.split('\n');
				listNewMetadataContentArray[listNewMetadataContentArray.length - 1] = '```';
				fileContentArray.splice(secondCodeblockMetadataStartLine, secondCodeblockMetadataEndLine  - secondCodeblockMetadataStartLine + 1, ...listNewMetadataContentArray);
			}

			if (firstCodeblockNewMetadataContent !== undefined && firstCodeblockStartLine !== undefined && firstCodeblockEndLine !== undefined){
				const dataNewMetadataContentArray: string[] = firstCodeblockNewMetadataContent.split('\n');
				dataNewMetadataContentArray[dataNewMetadataContentArray.length-1] = '```';
				fileContentArray.splice(firstCodeblockStartLine, firstCodeblockEndLine - firstCodeblockStartLine + 1, ...dataNewMetadataContentArray);
			}

			if (frontmatterMetadataContentArray !== undefined && frontmatterMetadataStartLine !== undefined && frontmatterMetadataEndLine !== undefined) {
				const frontmatter: any = this._cleanFrontmatter(frontmatterMetadataContentArray);
				const frontmatterContent: string = '---\n' +
					this.api.service(YamlService).stringify(frontmatter) +
					'---\n' +
					'```RpgManagerData\n' +
					dataCodeblockMetadataContent +
					'```';

				fileContentArray.splice(frontmatterMetadataStartLine, frontmatterMetadataEndLine - frontmatterMetadataStartLine + 1, ...frontmatterContent.split('\n'));
			}

			let defaultTag = this.api.service(TagService).dataSettings.get(tagAndType.type);

			if (defaultTag !== undefined) {
				if (!defaultTag.endsWith('/')) defaultTag += '/';
				const tagIds = tagAndType.tag.substring(defaultTag.length);
				const [campaignId] = tagIds.split('/');
				let campaignSettings = this._campaignSettings.get(+campaignId);
				if (campaignSettings === undefined) campaignSettings = CampaignSetting.Agnostic;

				const validator = tagAndType.tag.substring(defaultTag.length).split('/');
				let isValidTag = true;
				for (let index=0; index<validator.length; index++){
					if (isNaN(+validator[index])) {
						isValidTag = false;
						break;
					}
				}

				if (!isValidTag) continue;

				const computedTag = tagAndType.type + '-' + campaignSettings + '-' + tagAndType.tag.substring(defaultTag.length);

				fileContentArray.push('```RpgManagerID');
				fileContentArray.push('### DO NOT EDIT MANUALLY IF NOT INSTRUCTED TO DO SO ###');
				fileContentArray.push('idService: ' + computedTag);
				fileContentArray.push('checksum: ' + Md5.hashStr(computedTag));
				fileContentArray.push('```');
			}

			fileContent = fileContentArray.join('\n');
			this.api.app.vault.modify(file, fileContent)
				.then(() => {
					const settings: any = this.api.settings;
					delete settings.campaignTag;
					delete settings.adventureTag;
					delete settings.actTag;
					delete settings.sceneTag;
					delete settings.sessionTag;
					delete settings.subplotTag;
					delete settings.npcTag;
					delete settings.pcTag;
					delete settings.clueTag;
					delete settings.eventTag;
					delete settings.locationTag;
					delete settings.factionTag;
					delete settings.musicTag;
					this.api.plugin.updateSettings(settings, false);

					if (reporter !== undefined) reporter.addFileUpdated();
				});
		}
	}

	private _getTagAndType(
		tags: string[],
	): {tag: string, fuzzyGuessedTag: string, type: ComponentType, updated: boolean}|undefined{
		let type: ComponentType|undefined = undefined;
		let tag = this.api.service(TagService).getTag(tags);

		if (tag === undefined) {
			const fuzzyGuessedTag = this.api.service(TagService).fuzzyTagsGuesser(tags);
			if (fuzzyGuessedTag === undefined) return undefined;

			tag = this.api.service(TagService).dataSettings.get(fuzzyGuessedTag.type);
			if (tag === undefined) return undefined;

			type = fuzzyGuessedTag.type;

			let parameterCount = 1;
			switch (type) {
				case ComponentType.Adventure:
				case ComponentType.Session:
					parameterCount = 2;
					break;
				case ComponentType.Act:
					parameterCount = 3;
					break;
				case ComponentType.Scene:
					parameterCount = 4;
					break;
			}
			const tagElements: string[] = fuzzyGuessedTag.tag.split('/');
			const remainingTagElements = tagElements.slice(tagElements.length - parameterCount);
			if (!tag.endsWith('/')) tag += '/';
			tag += remainingTagElements.join('/');

			return {tag: tag, fuzzyGuessedTag: fuzzyGuessedTag.tag, type: type, updated: true};
		}

		type = this.api.service(TagService).getDataType(tag);
		if (type === undefined) return undefined;

		return {tag: tag, fuzzyGuessedTag: tag, type: type, updated: false};
	}

	private _cleanFrontmatter(
		frontmatterMetadataContentArray: string[],
	): any {
		let frontmatterContent = '';
		for (let index=0; index<frontmatterMetadataContentArray.length; index++){
			if (!frontmatterMetadataContentArray[index].trimStart().startsWith('[[') && frontmatterMetadataContentArray[index].trim() !== ''){
				frontmatterContent += frontmatterMetadataContentArray[index] + '\n';
			}
		}

		const frontmatter: any = parseYaml(frontmatterContent);

		if (frontmatter.tags !== undefined){
			for (let index = frontmatter.tags.length - 1; index >= 0 ; index--) {
				if (this.api.service(TagService).isRpgManagerTag(frontmatter.tags[index])){
					frontmatter.tags.splice(index, 1);
				}
			}
		} else {
			frontmatter.tags = [];
		}

		if (frontmatter.alias == undefined) frontmatter.alias = [];

		if (frontmatter.settings !== undefined) delete(frontmatter.settings);
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
		if (frontmatter.pronoun !== undefined) delete(frontmatter.pronoun);

		return frontmatter;
	}

	private _readRelationshipsFromFrontmatter(
		frontmatterMetadataContentArray: string[],
	): any[] {
		const response: any[] = [];
		let fileContentArray: string[] = [];

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
				if (line.startsWith('"') && line.endsWith('"')) line = line.substring(1, line.length -1);

				fileContentArray = [...fileContentArray, ...this._readContentRelationships(line)];

				const path = this._getPathFromBasename(basename);

				if (path !== undefined && !this._pathExistsInRelationships(path, response)) {
					const newRelationship = {
						type: 'bidirectional',
						path: path,
						description: line
					};
					response.push(newRelationship);
				}
			}
		}

		return this._addRelationshipsFromContent(response, fileContentArray);
	}

	private _readContentRelationships(
		content: string,
	): string[] {
		const response: string[] = [];

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
		frontmatterRelationships: any[],
		fileContentArray: string[],
	): any[] {
		for (let index=0; index<fileContentArray.length; index++){
			const path = this._getPathFromBasename(fileContentArray[index]);
			if (path === undefined) continue;

			if (!this._pathExistsInRelationships(path, frontmatterRelationships)){
				const newRelationship = {
					type: 'bidirectional',
					path: path,
					isInContent: true,
				};
				frontmatterRelationships.push(newRelationship);
			}
		}

		return frontmatterRelationships;
	}

	private _pathExistsInRelationships(
		path: string,
		relationships: any[],
	): boolean {
		const existingRelationships: any[] = relationships.filter((relationship: any) => relationship.path === path);
		if (existingRelationships.length !== 1) return false;

		return true;
	}

	private _getPathFromBasename(
		basename: string,
	): string|undefined {
		const files: TFile[] = this.api.app.vault.getMarkdownFiles().filter((file: TFile) => file.basename === basename);
		if (files.length !== 1) return undefined;

		return files[0].path;
	}

	private _updateMetadata(
		type: ComponentType,
		metadata: any,
		frontmatterMetadata: any,
		codeblockMetadata: any,
		relationships: any[],
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

				if (codeblockMetadata?.action != undefined) metadata.data.action = codeblockMetadata.action;
				if (codeblockMetadata?.trigger != undefined) metadata.data.trigger = codeblockMetadata.trigger;

				if (codeblockMetadata?.durations !== undefined && codeblockMetadata?.duration){
					metadata.data.duration = codeblockMetadata.duration;
					metadata.data.durations = codeblockMetadata.durations;
				} else {
					if (frontmatterMetadata?.time != undefined && frontmatterMetadata?.time?.start != undefined && frontmatterMetadata?.time?.end != undefined) {
						this._addDurations(
							frontmatterMetadata.time.start,
							frontmatterMetadata.time.end,
							metadata,
						);
					}

					if (frontmatterMetadata.times != undefined && frontmatterMetadata.times?.start != undefined && frontmatterMetadata.times?.end != undefined) {
						this._addDurations(
							frontmatterMetadata.times.start,
							frontmatterMetadata.times.end,
							metadata,
						);
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

		let response: string = this.api.service(YamlService).stringify(metadata);
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
				const durations: string[] = [];
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

	private _getComponentRpgManagerDataCodeBlockMetadata(
		type: ComponentType,
	): any {
		switch (type){
			case ComponentType.Campaign:
				return {
					plot: {abt: {need: '', and: '', but: '', therefore: '',}, storycircle: {you: '', need: '', go: '', search: '', find: '', take: '', return: '', change: '',}},
					data: {date: '', synopsis: '', image: '', complete: true, currentAdventureId: '', currentActId: '', currentSessionId: ''},
				};
			case ComponentType.Adventure:
				return {
					plot: {abt: {need: '', and: '', but: '', therefore: '',}, storycircle: {you: '', need: '', go: '', search: '', find: '', take: '', return: '', change: '',}},
					data: {synopsis: '', complete: false,},
				};
			case ComponentType.Act:
				return {
					plot: {abt: {need: '', and: '', but: '', therefore: '',}, storycircle: {you: '', need: '', go: '', search: '', find: '', take: '', return: '', change: '',}},
					data: {synopsis: '', image: '', complete: false, abtStage: ''},
					relationships: [],
				};
			case ComponentType.Scene:
				return {
					data: {synopsis: '', image: '', complete: false, sessionId: 0, action: '', trigger: '', date: '', sceneType: '', isActedUpon: false, duration: 0, durations: [], storyCircleStage: ''},
					relationships: [],
				};
			case ComponentType.Session:
				return {
					data: {synopsis: '', image: '', complete: false, irl: undefined, abtStage: undefined},
					relationships: [],
				};
			case ComponentType.Subplot:
				return {
					plot: {abt: {need: '', and: '', but: '', therefore: '',}, storycircle: {you: '', need: '', go: '', search: '', find: '', take: '', return: '', change: '',}},
					data: {synopsis: '', image: '', complete: false},
					relationships: [],
				};
			case ComponentType.Character:
				return {
					data: {synopsis: '', image: '', complete: false, dob: '', death: '', goals: '', pronoun: ''},
					relationships: [],
				};
			case ComponentType.Clue:
				return {
					data: {synopsis: '', image: '', complete: false, found: false},
					relationships: [],
				};
			case ComponentType.Event:
				return {
					data: {synopsis: '', image: '', complete: false, date: ''},
					relationships: [],
				};
			case ComponentType.Faction:
				return {
					data: {synopsis: '', image: '', complete: false},
					relationships: [],
				};
			case ComponentType.Location:
				return {
					data: {synopsis: '', image: '', complete: false, address: ''},
					relationships: [],
				};
			case ComponentType.Music:
				return {
					data: {synopsis: '', image: '', complete: false, url: ''},
					relationships: [],
				};
			case ComponentType.NonPlayerCharacter:
				return {
					data: {synopsis: '', image: '', death: '', dob: '', goals: '', pronoun: '', complete: false},
					relationships: [],
				};
		}
	}

	private _getComponentRpgManagerCodeBlockMetadata(
		codeBlockType: 'campaignnavigation' | 'campaign' | 'adventurenavigation' | 'adventure' | 'scenenavigation' | 'scene' | 'actnavigation' | 'act' | 'sessionnavigation' | 'session' |
			'subplot' | 'pc' | 'clue' | 'event' | 'faction' | 'location' | 'music' | 'npc' | string,
	): any {
		switch (codeBlockType){
			case 'campaignnavigation':
				return {
					models: {header: true},
				};
			case 'campaign':
				return {
					models: {lists: {pcs: {relationship: 'hierarchy'}, subplots: {relationship: 'hierarchy'}, adventures: {relationship: 'hierarchy'}, acts: {relationship: 'hierarchy'}, sessions: {relationship: 'hierarchy'}, events: {relationship: 'hierarchy'}, npcs: {relationship: 'hierarchy'}}}
				};
			case 'adventurenavigation':
				return {
					models: {header: true},
				};
			case 'adventure':
				return {
					models: {lists: {acts: {relationship: 'hierarchy'}}}
				};
			case 'actnavigation':
				return {
					models: {header: true},
				};
			case 'act':
				return {
					models: {lists: {scenes: {relationship: 'hierarchy'}, pcs: {relationship: 'unidirectional'}, npcs: {relationship: 'unidirectional'}, clues: {relationship: 'unidirectional'}, locations: {relationship: 'unidirectional'}, factions: {relationship: 'unidirectional'}}}
				};
			case 'scenenavigation':
				return {
					models: {header: true},
				};
			case 'scene':
				return {
					models: {lists: {musics: {relationship: 'unidirectional',}, pcs: {relationship: 'unidirectional',}, npcs: {relationship: 'unidirectional',}, factions: {relationship: 'unidirectional',}, clues: {relationship: 'unidirectional',}, locations: {relationship: 'unidirectional',}, events: {relationship: 'unidirectional',},}}
				};
			case 'sessionnavigation':
				return {
					models: {header: true, lists: {scenes: {relationship: "hierarchy",},}},
				};
			case 'session':
				return {
					models: {lists: {subplots: {relationship: "hierarchy",}, musics: {relationship: "hierarchy",}, pcs: {relationship: "hierarchy",}, npcs: {relationship: "hierarchy",}, factions: {relationship: "hierarchy",}, clues: {relationship: "hierarchy",}, locations: {relationship: "hierarchy",}, events: {relationship: "hierarchy",},}}
				};
			case 'subplot':
				return {
					models: {header: true, lists: {events: {}, clues: {}, factions: {}, npcs: {}, locations: {},}},
				};
			case 'pc':
				return {
					models: {header: true, lists: {pcs: {relationship: "unidirectional",}, npcs: {relationship: "unidirectional",}, factions: {}, locations: {},}},
				};
			case 'clue':
				return {
					models: {header: true, lists: {subplots: {}, pcs: {}, npcs: {}, locations: {}, clues: {}, events: {},}},
				};
			case 'event':
				return {
					models: {header: true, lists: {subplots: {}, pcs: {}, npcs: {}, clues: {}, locations: {},}},
				};
			case 'faction':
				return {
					models: {header: true, lists: {pcs: {}, npcs: {}, locations: {}, subplots: {}}},
				};
			case 'location':
				return {
					models: {header: true, lists: {pcs: {}, npcs: {}, events: {}, clues: {}, locations: [{relationship: "parent", title: "Inside"}, {relationship: "child", title: "Contains"}],}},
				};
			case 'music':
				return {
					models: {header: true, lists: {musics: [{relationship: "parent", title: "Part of playlists"}, {relationship: "child", title: "Songs",}]}},
				};
			case 'npc':
				return {
					models: {header: true, lists: {subplots: {}, pcs: {relationship: "unidirectional",}, npcs: {relationship: "unidirectional",}, factions: {}, locations: {}, events: {}, clues: {},}},
				};
		}
	}

	private _loadCampaignSettings(
	): void {
		this.api.app.vault.getMarkdownFiles().forEach((file: TFile) => {
			const metadata: CachedMetadata|null = this.api.app.metadataCache.getFileCache(file);
			if (metadata?.frontmatter?.tags != null) {
				const tags = this.api.service(TagService).sanitiseTags(metadata.frontmatter.tags);
				if (tags.length === 0) return;

				const tagAndType = this._getTagAndType(tags);
				if (tagAndType !== undefined){
					if (tagAndType.type === ComponentType.Campaign){
						const id = this.api.service(IdService).createFromTag(tagAndType.tag);
						try {
							const settings = metadata?.frontmatter?.settings != undefined ?
								CampaignSetting[metadata.frontmatter.settings as keyof typeof CampaignSetting] :
								CampaignSetting.Agnostic;
							this._campaignSettings.set(id.campaignId, settings);
						} catch (e) {
							//No need to trap the errors here
						}
					}
				}
			}
		});
	}
}
