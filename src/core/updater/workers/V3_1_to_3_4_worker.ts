import {AbstractDatabaseWorker} from "../abstracts/AbstractDatabaseWorker";
import {DatabaseUpdateWorkerInterface} from "../interfaces/DatabaseUpdateWorkerInterface";
import {DatabaseUpdaterReporterInterface} from "../interfaces/DatabaseUpdaterReporterInterface";
import {CachedMetadata, parseYaml, SectionCache, stringifyYaml, TFile} from "obsidian";
import {ComponentType} from "../../enums/ComponentType";
import {LoggerService} from "../../../services/loggerService/LoggerService";
import {LogMessageType} from "../../../services/loggerService/enums/LogMessageType";
import {CampaignSetting} from "../../../components/campaign/enums/CampaignSetting";
import {randomUUID} from "crypto";
import {YamlService} from "../../../services/yamlService/YamlService";

interface UpdaterComponentInterface {
	originalContent: string,
	originalID: string,
	originalDataContent?: string,
	originalData?: any,
	type: ComponentType,
	campaignSettings: CampaignSetting
	campaignId: number,
	adventureId?: number,
	actId?: number,
	sceneId?: number,
	sessionId?: number,
	newIndex?: UpdaterComponentNewInterface,
}

interface UpdaterComponentNewInterface{
	type: ComponentType,
	campaignSettings: CampaignSetting,
	id: string,
	campaignId: string,
	parentId?: string,
	positionInParent: number,
}

export class V3_1_to_3_4_worker extends AbstractDatabaseWorker implements DatabaseUpdateWorkerInterface {
	private _fileElements: Map<TFile, UpdaterComponentInterface|undefined>;
	private _elements: UpdaterComponentInterface[];
	private _files: TFile[];

	get from(): string {
		return '3.1';
	}

	get to(): string {
		return '3.4';
	}

	public async run(
		reporter: DatabaseUpdaterReporterInterface|undefined=undefined,
	): Promise<void> {
		this._elements = [];
		this._fileElements = new Map<TFile, UpdaterComponentInterface|undefined>();
		this.api.service(LoggerService).warning(LogMessageType.Updater, 'Updating RPG Manager from v3.1 to v3.4');

		await this._loadElements();

		if (reporter !== undefined) {
			reporter.refreshFileCount();
			reporter.setFileCount(this._fileElements.size);
		}

		await this._updateCampaigns();

		for (let filesIndex=0; filesIndex<this._files.length; filesIndex++) {
			const file: TFile = this._files[filesIndex];
			const elementInformation = this._fileElements.get(file);

			if (elementInformation === undefined){
				await reporter?.addFileUpdated();
			} else {
				let newIndex: string = stringifyYaml(elementInformation.newIndex);
				newIndex = '### DO NOT EDIT MANUALLY IF NOT INSTRUCTED TO DO SO ###\n' + newIndex;

				let newFileContent = await elementInformation.originalContent.replace(elementInformation.originalID, newIndex);
				if (elementInformation.originalDataContent !== undefined && elementInformation.originalData != undefined)
					newFileContent = await newFileContent.replace(elementInformation.originalDataContent, this.api.service(YamlService).stringify(elementInformation.originalData));

				if (newFileContent !== elementInformation.originalContent)
					await this.api.app.vault.modify(file, newFileContent);

				await reporter?.addFileUpdated();
			}
		}
	}

	private async _updateCampaigns(
	): Promise<void> {
		const campaigns: UpdaterComponentInterface[] = this._elements.filter((component: UpdaterComponentInterface) =>
			component.type === ComponentType.Campaign
		);

		for (let index=0; index<campaigns.length; index++){
			const id = randomUUID();
			const newComponentId: UpdaterComponentNewInterface = {
				type: campaigns[index].type,
				campaignSettings: campaigns[index].campaignSettings,
				id: id,
				campaignId: id,
				parentId: id,
				positionInParent: 1,
			};

			campaigns[index].newIndex = newComponentId;

			await this._updateSessions(campaigns[index]);
			await this._updateAdventures(campaigns[index]);
			await this._updateRemaining(campaigns[index]);

			if (
				campaigns[index].originalData.data.currentAdventureId !== undefined &&
				campaigns[index].originalData.data.currentAdventureId !== '' &&
				campaigns[index].originalData.data.currentAdventureId.toString().indexOf('/') !== -1
			) {
				let adventureIndex: string|undefined = undefined;

				let currentAdventureId: string = campaigns[index].originalData.data.currentAdventureId;
				if (currentAdventureId.indexOf('-') !== -1){
					currentAdventureId = currentAdventureId.substring(currentAdventureId.lastIndexOf('-') + 1);
					[, adventureIndex] = currentAdventureId.split('/');
				} else {
					[, , adventureIndex] = currentAdventureId.split('/');
				}


				if (adventureIndex !== undefined) {
					const adventureIndexId: number = +adventureIndex;
					const adventures: UpdaterComponentInterface[] = this._elements.filter((component: UpdaterComponentInterface) =>
						component.type === ComponentType.Adventure &&
						component.campaignId === campaigns[index].campaignId &&
						component.adventureId === adventureIndexId
					);

					if (adventures.length === 1 && adventures[0].newIndex !== undefined)
						campaigns[index].originalData.data.currentAdventureId = adventures[0].newIndex.id;

				}
			}

			if (
				campaigns[index].originalData.data.currentActId !== undefined &&
				campaigns[index].originalData.data.currentActId !== '' &&
				campaigns[index].originalData.data.currentActId.toString().indexOf('/') !== -1
			) {
				let adventureIndex: string|undefined = undefined;
				let actIndex: string|undefined = undefined;

				let currentActId: string = campaigns[index].originalData.data.currentActId;
				if (currentActId.indexOf('-') !== -1){
					currentActId = currentActId.substring(currentActId.lastIndexOf('-') + 1);
					[, adventureIndex, actIndex] = currentActId.split('/');
				} else {
					[,, adventureIndex, actIndex] = currentActId.split('/');
				}


				if (adventureIndex !== undefined && actIndex !== undefined) {
					const adventureIndexId: number = +adventureIndex;
					const actIndexId: number = +actIndex;
					const acts: UpdaterComponentInterface[] = this._elements.filter((component: UpdaterComponentInterface) =>
						component.type === ComponentType.Act &&
						component.campaignId === campaigns[index].campaignId &&
						component.adventureId === adventureIndexId &&
						component.actId === actIndexId
					);

					if (acts.length === 1 && acts[0].newIndex !== undefined)
						campaigns[index].originalData.data.currentActId = acts[0].newIndex.id;

				}
			}

			if (
				campaigns[index].originalData.data.currentSessionId !== undefined &&
				campaigns[index].originalData.data.currentSessionId !== '' &&
				campaigns[index].originalData.data.currentSessionId.toString().indexOf('/') !== -1
			) {
				let sessionIndex: string|undefined = undefined;

				let currentSessionId: string = campaigns[index].originalData.data.currentSessionId;
				if (currentSessionId.indexOf('-') !== -1){
					currentSessionId = currentSessionId.substring(currentSessionId.lastIndexOf('-') + 1);
					[, sessionIndex] = currentSessionId.split('/');
				} else {
					[,,sessionIndex] = currentSessionId.split('/');
				}


				if (sessionIndex !== undefined) {
					const sessionIndexId: number = +sessionIndex;
					const sessions: UpdaterComponentInterface[] = this._elements.filter((component: UpdaterComponentInterface) =>
						component.type === ComponentType.Session &&
						component.campaignId === campaigns[index].campaignId &&
						component.sessionId === sessionIndexId
					);

					if (sessions.length === 1 && sessions[0].newIndex !== undefined)
						campaigns[index].originalData.data.currentSessionId = sessions[0].newIndex.id;

				}
			}
		}
	}

	private async _updateAdventures(
		campaign: UpdaterComponentInterface,
	): Promise<void> {
		if (campaign.newIndex === undefined)
			return;

		const adventures: UpdaterComponentInterface[] = this._elements.filter((component: UpdaterComponentInterface) =>
			component.type === ComponentType.Adventure &&
			component.campaignId === campaign.campaignId
		).sort((a: UpdaterComponentInterface, b:UpdaterComponentInterface) => {
			if (a.adventureId === undefined)
				return -1;

			if (b.adventureId === undefined)
				return +1;

			if (a.adventureId > b.adventureId)
				return +1;

			if (a.adventureId < b.adventureId)
				return -1;

			return 0;
		});

		for (let index=0; index<adventures.length; index++){
			const newComponentId: UpdaterComponentNewInterface = {
				type: adventures[index].type,
				campaignSettings: adventures[index].campaignSettings,
				id: randomUUID(),
				campaignId: campaign.newIndex.campaignId,
				parentId: campaign.newIndex.campaignId,
				positionInParent: index+1,
			};
			adventures[index].newIndex = newComponentId;

			await this._updateActs(adventures[index]);
		}
	}

	private async _updateActs(
		adventure: UpdaterComponentInterface,
	): Promise<void> {
		if (adventure.newIndex === undefined)
			return;

		const acts: UpdaterComponentInterface[] = this._elements.filter((component: UpdaterComponentInterface) =>
			component.type === ComponentType.Act &&
			component.campaignId === adventure.campaignId &&
			component.adventureId === adventure.adventureId
		).sort((a: UpdaterComponentInterface, b:UpdaterComponentInterface) => {
			if (a.actId === undefined)
				return -1;

			if (b.actId === undefined)
				return +1;

			if (a.actId > b.actId)
				return +1;

			if (a.actId < b.actId)
				return -1;

			return 0;
		});

		for (let index=0; index<acts.length; index++){
			const newComponentId: UpdaterComponentNewInterface = {
				type: acts[index].type,
				campaignSettings: acts[index].campaignSettings,
				id: randomUUID(),
				campaignId: adventure.newIndex.campaignId,
				parentId: adventure.newIndex.id,
				positionInParent: index+1,
			};
			acts[index].newIndex = newComponentId;

			await this._updateScenes(acts[index]);
		}
	}

	private async _updateScenes(
		act: UpdaterComponentInterface,
	): Promise<void> {
		if (act.newIndex === undefined)
			return;

		const scenes: UpdaterComponentInterface[] = this._elements.filter((component: UpdaterComponentInterface) =>
			component.type === ComponentType.Scene &&
			component.campaignId === act.campaignId &&
			component.adventureId === act.adventureId &&
			component.actId === act.actId
		).sort((a: UpdaterComponentInterface, b:UpdaterComponentInterface) => {
			if (a.sceneId === undefined)
				return -1;

			if (b.sceneId === undefined)
				return +1;

			if (a.sceneId > b.sceneId)
				return +1;

			if (a.sceneId < b.sceneId)
				return -1;

			return 0;
		});

		for (let index=0; index<scenes.length; index++) {
			if (scenes[index].originalData.data.sessionId !== undefined && scenes[index].originalData.data.sessionId !== '' && scenes[index].originalData.data.sessionId.toString().indexOf('/') !== -1) {
				const [, sessionIndex] = scenes[index].originalData.data.sessionId.split('/');

				const sessions: UpdaterComponentInterface[] = this._elements.filter((component: UpdaterComponentInterface) =>
					component.type === ComponentType.Session &&
					component.campaignId === act.campaignId &&
					component.sessionId === +sessionIndex
				);


				if (sessions.length === 1 && sessions[0].newIndex !== undefined) {
					scenes[index].originalData.data.sessionId = sessions[0].newIndex.id;
					scenes[index].originalData.data.positionInSession = index + 1;
				}
			}

			const newComponentId: UpdaterComponentNewInterface = {
				type: scenes[index].type,
				campaignSettings: scenes[index].campaignSettings,
				id: randomUUID(),
				campaignId: act.newIndex.campaignId,
				parentId: act.newIndex.id,
				positionInParent: index+1,
			};
			scenes[index].newIndex = newComponentId;
		}
	}

	private async _updateSessions(
		campaign: UpdaterComponentInterface,
	): Promise<void> {
		if (campaign.newIndex === undefined)
			return;

		const sessions: UpdaterComponentInterface[] = this._elements.filter((component: UpdaterComponentInterface) =>
			component.type === ComponentType.Session &&
			component.campaignId === campaign.campaignId
		).sort((a: UpdaterComponentInterface, b:UpdaterComponentInterface) => {
			if (a.sessionId === undefined)
				return -1;

			if (b.sessionId === undefined)
				return +1;

			if (a.sessionId > b.sessionId)
				return +1;

			if (a.sessionId < b.sessionId)
				return -1;

			return 0;
		});

		for (let index=0; index<sessions.length; index++){
			const newComponentId: UpdaterComponentNewInterface = {
				type: sessions[index].type,
				campaignSettings: sessions[index].campaignSettings,
				id: randomUUID(),
				campaignId: campaign.newIndex.campaignId,
				parentId: campaign.newIndex.campaignId,
				positionInParent: index+1,
			};
			sessions[index].newIndex = newComponentId;
		}
	}

	private async _updateRemaining(
		campaign: UpdaterComponentInterface,
	): Promise<void> {
		if (campaign.newIndex === undefined)
			return;

		const elements: UpdaterComponentInterface[] = this._elements.filter((component: UpdaterComponentInterface) =>
			component.type !== ComponentType.Campaign &&
			component.type !== ComponentType.Adventure &&
			component.type !== ComponentType.Act &&
			component.type !== ComponentType.Scene &&
			component.type !== ComponentType.Session &&
			component.campaignId === campaign.campaignId
		);

		for (let index=0; index<elements.length; index++){
			const newComponentId: UpdaterComponentNewInterface = {
				type: elements[index].type,
				campaignSettings: elements[index].campaignSettings,
				id: randomUUID(),
				campaignId: campaign.newIndex.campaignId,
				parentId: campaign.newIndex.campaignId,
				positionInParent: 1,
			};
			elements[index].newIndex = newComponentId;
		}
	}

	private async _loadElements(
	): Promise<void> {
		this._files = await this.api.app.vault.getMarkdownFiles();

		for (let filesIndex=0; filesIndex<this._files.length; filesIndex++) {
			const file: TFile = this._files[filesIndex];
			const cachedMetadata: CachedMetadata | null = this.api.app.metadataCache.getFileCache(file);

			if (cachedMetadata == null || cachedMetadata.sections == null) {
				this._fileElements.set(file, undefined);
				continue;
			}

			const fileContent = await this.api.app.vault.read(file);
			const fileContentArray = fileContent.split('\n');
			let updaterComponent: UpdaterComponentInterface|undefined = undefined;
			let data: any|undefined = undefined;
			let dataContent: string|undefined = undefined;

			for (let index=0; index<(cachedMetadata.sections.length ?? 0); index++){
				const section: SectionCache = cachedMetadata.sections[index];

				if (section.type === 'code' && fileContentArray[section.position.start.line] === '```RpgManagerData'){
					dataContent = '';
					for (let index=section.position.start.line+1; index<section.position.end.line; index++){
						dataContent += fileContentArray[index] + '\n';
					}
					data = parseYaml(dataContent);
				}

				if (section.type === 'code' && fileContentArray[section.position.start.line] === '```RpgManagerID'){
					let indexID = '';
					for (let index=section.position.start.line+1; index<section.position.end.line; index++){
						indexID += fileContentArray[index] + '\n';
					}
					const indexData = parseYaml(indexID);

					if (indexData.id === undefined || indexData.checksum === undefined) {
						this._fileElements.set(file, undefined);
						continue;
					} else {
						const [type, campaignSettings, ids] = indexData.id.split('-');

						let campaignId = 0;
						let adventureId: number|undefined;
						let actId: number|undefined;
						let sceneId: number|undefined;
						let sessionId: number|undefined;

						switch (+type){
							case ComponentType.Scene:
								[campaignId, adventureId, actId, sceneId] = ids.split('/');
								break;
							case ComponentType.Act:
								[campaignId, adventureId, actId] = ids.split('/');
								break;
							case ComponentType.Adventure:
								[campaignId, adventureId] = ids.split('/');
								break;
							case ComponentType.Session:
								[campaignId, sessionId] = ids.split('/');
								break;
							default:
								campaignId = ids;
								break;
						}

						updaterComponent = {
							originalContent: fileContent,
							originalID: indexID,
							type: +type,
							campaignSettings: +campaignSettings,
							campaignId: +campaignId,
							adventureId: adventureId !== undefined ? +adventureId : undefined,
							actId: actId !== undefined ? +actId : undefined,
							sceneId: sceneId !== undefined ? +sceneId : undefined,
							sessionId: sessionId !== undefined ? +sessionId : undefined,
						};

						this._elements.push(updaterComponent);
						this._fileElements.set(file, updaterComponent);
					}
				}
			}

			if (updaterComponent !== undefined && data !== undefined && dataContent !== undefined){
				updaterComponent.originalData = data;
				updaterComponent.originalDataContent = dataContent;
			}
		}
	}
}
