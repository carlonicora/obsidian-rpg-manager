import {AbstractWizardModal} from "../../../managers/modalsManager/abstracts/AbstractWizardModal";
import {WizardPartInterface} from "../../../managers/modalsManager/interfaces/WizardPartInterface";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";
import {IdInterface} from "../../idService/interfaces/IdInterface";
import {ComponentType} from "../../../core/enums/ComponentType";
import {StepIntroductionModal} from "./steps/StepIntroductionModal";
import {StepDescriptionModal} from "./steps/StepDescriptionModal";
import {StepDescriptionAndCluesModal} from "./steps/StepDescriptionAndCluesModal";
import {Component, MarkdownRenderer} from "obsidian";
import {CodeblockDomainInterface} from "../../codeblockService/interfaces/CodeblockDomainInterface";
import {CodeblockService} from "../../codeblockService/CodeblockService";
import {
	ControllerMetadataDataInterface
} from "../../../managers/controllerManager/interfaces/ControllerMetadataDataInterface";
import {WizardDataClueInterface} from "../../../managers/modalsManager/interfaces/WizardDataClueInterface";
import {
	ControllerMetadataRelationshipInterface
} from "../../../managers/controllerManager/interfaces/ControllerMetadataRelationshipInterface";
import {ModelInterface} from "../../../managers/modelsManager/interfaces/ModelInterface";
import {FileCreationService} from "../../fileCreationService/FileCreationService";
import {ActInterface} from "../../../components/act/interfaces/ActInterface";

export class ActPlotWizard extends AbstractWizardModal {
	protected steps = 8;

	private _act: ActInterface;
	private _steps: Map<number, WizardPartInterface>;

	private _youEl: HTMLDivElement;
	private _needEl: HTMLDivElement;
	private _goEl: HTMLDivElement;
	private _searchEl: HTMLDivElement;
	private _findEl: HTMLDivElement;
	private _takeEl: HTMLDivElement;
	private _returnEl: HTMLDivElement;
	private _changeEl: HTMLDivElement;

	constructor(
		api: RpgManagerApiInterface,
		private _actId: IdInterface,
	) {
		super(api);

		this._act = this.api.database.readSingle<ActInterface>(ComponentType.Act, this._actId);

		this._steps = new Map<number, WizardPartInterface>();
		this._steps.set(0, new StepIntroductionModal(
			this.api,
			this._actId,
			'Plot Creation Wizard - Act',
			`The **plot creation wizard** is a simple wizard that helps you create a more consistent plot without worrying about knowing anything about ABT or StoryCircle.
			Just follow the prompt in the next few pages and the plot will be organised for you.
			
			The plot is structured to provide an **interesting** storyline for your player characters, identifying two main goals for the act. The first goal is what they player characters believe they need; however, when they reach it, they realise the real goal is another one. THis storytelling structure create tension in the game, which is more pleasurable than a linear one.
			*Keep into consideration Luke Skywalker. When he left Tatooine, he thought he should have saved Princess Leia. However, when her saved her, he realised that the Empire has a planet killer station, the Death Star, he would have to try and destroy. The logic is the same, and in storytelling, it **works**1*
			
			Two moment in the plot of an *act* offer the possibility to identify a **clue** around which you can create a better story. The suggestion is to make your act as interesting as possible, identifying three other eleemnts (*mainly Non Player Characters and Locations*) where the player characters can learn about the clue.
			These clue generally mark a moment of passage for the player characters.`,
		));
		this._steps.set(1, new StepDescriptionModal(
			this.api,
			this._actId,
			'What\'s the initial status of the player characters?',
			'What is the current status of the player characters? Where they are in the story and what they have decided to do at the end of the previous session?',
			this._act.storyCircle.you ?? '',
		));
		this._steps.set(2, new StepDescriptionModal(
			this.api,
			this._actId,
			'What do they feel as their goal for the act?',
			'What do the player characters think they should achive in the act? This is the perceived goal.',
			this._act.storyCircle.go ?? '',
		));
		this._steps.set(3, new StepDescriptionModal(
			this.api,
			this._actId,
			'What happens when they reach their goal?',
			'What do the player characters realise when they achieve their perceived goal?',
			this._act.storyCircle.find ?? '',
		));
		this._steps.set(4, new StepDescriptionModal(
			this.api,
			this._actId,
			'What is the true goal of the act?',
			'What is the real goal of the act?',
			this._act.storyCircle.return ?? '',
		));
		this._steps.set(5, new StepDescriptionModal(
			this.api,
			this._actId,
			'What does convince the player characters to achieve their perceived goal?',
			'What happens to convince the player characters to try and achieve the perceived goal?',
			this._act.storyCircle.need ?? '',
		));
		this._steps.set(6, new StepDescriptionAndCluesModal(
			this.api,
			this._actId,
			'How can they reach their perceived goal?',
			'What clue will lead the player characters to reach their perceived goal?',
			this._act.storyCircle.search ?? '',
		));
		this._steps.set(7, new StepDescriptionAndCluesModal(
			this.api,
			this._actId,
			'When they realise the true goal of the act, how can they reach it?',
			'When they pay the price, what is the clue that will lead them to the real goal?',
			this._act.storyCircle.take ?? '',
		));
		this._steps.set(8, new StepDescriptionModal(
			this.api,
			this._actId,
			'How are they going to triump and reach the true goal of the act?',
			'How are they going to triumph?',
			this._act.storyCircle.change ?? '',
		));
	}

	protected getStepInterface(
		newStep: number
	): WizardPartInterface {
		const response: WizardPartInterface|undefined = this._steps.get(newStep);

		if (response === undefined)
			throw new Error('');

		return response;
	}

	protected async _updateRecap(
		containerEl: HTMLDivElement,
	): Promise<void> {
		if (!this.isInitialised) {
			containerEl.createDiv({cls: 'rpg-manager-wizard-main-recap-title', text: 'You'});
			this._youEl = containerEl.createDiv({cls: 'rpg-manager-wizard-main-recap-description'});
			this._youEl.addEventListener('click', () => {this.move(1);});
			containerEl.createDiv({cls: 'rpg-manager-wizard-main-recap-title', text: 'Need'});
			this._needEl = containerEl.createDiv({cls: 'rpg-manager-wizard-main-recap-description'});
			this._needEl.addEventListener('click', () => {this.move(5);});
			containerEl.createDiv({cls: 'rpg-manager-wizard-main-recap-title', text: 'Go'});
			this._goEl = containerEl.createDiv({cls: 'rpg-manager-wizard-main-recap-description'});
			this._goEl.addEventListener('click', () => {this.move(2);});
			containerEl.createDiv({cls: 'rpg-manager-wizard-main-recap-title', text: 'Search'});
			this._searchEl = containerEl.createDiv({cls: 'rpg-manager-wizard-main-recap-description'});
			this._searchEl.addEventListener('click', () => {this.move(6);});
			containerEl.createDiv({cls: 'rpg-manager-wizard-main-recap-title', text: 'Find'});
			this._findEl = containerEl.createDiv({cls: 'rpg-manager-wizard-main-recap-description'});
			this._findEl.addEventListener('click', () => {this.move(3);});
			containerEl.createDiv({cls: 'rpg-manager-wizard-main-recap-title', text: 'Take'});
			this._takeEl = containerEl.createDiv({cls: 'rpg-manager-wizard-main-recap-description'});
			this._takeEl.addEventListener('click', () => {this.move(7);});
			containerEl.createDiv({cls: 'rpg-manager-wizard-main-recap-title', text: 'Return'});
			this._returnEl = containerEl.createDiv({cls: 'rpg-manager-wizard-main-recap-description'});
			this._returnEl.addEventListener('click', () => {this.move(4);});
			containerEl.createDiv({cls: 'rpg-manager-wizard-main-recap-title', text: 'Change'});
			this._changeEl = containerEl.createDiv({cls: 'rpg-manager-wizard-main-recap-description'});
			this._changeEl.addEventListener('click', () => {this.move(8);});
		}

		this._addRecapElement(this._youEl, this._steps.get(1)?.data?.description, this._act.storyCircle.you);
		this._addRecapElement(this._needEl, this._steps.get(5)?.data?.description, this._act.storyCircle.need);
		this._addRecapElement(this._goEl, this._steps.get(2)?.data?.description, this._act.storyCircle.go);
		this._addRecapElement(this._searchEl, this._steps.get(6)?.data?.description, this._act.storyCircle.search);
		this._addRecapElement(this._findEl, this._steps.get(3)?.data?.description, this._act.storyCircle.find);
		this._addRecapElement(this._takeEl, this._steps.get(7)?.data?.description, this._act.storyCircle.take);
		this._addRecapElement(this._returnEl, this._steps.get(4)?.data?.description, this._act.storyCircle.return);
		this._addRecapElement(this._changeEl, this._steps.get(8)?.data?.description, this._act.storyCircle.change);
	}

	private _addRecapElement(
		containerEl: HTMLDivElement,
		newContent?: string,
		oldContent?: string,
	): void {
		containerEl.empty();
		let  content = (newContent ?? oldContent ?? '');

		if (content.length > 60)
			content = content.substring(0, 57) + '...';

		MarkdownRenderer.renderMarkdown(
			content,
			containerEl,
			'',
			null as unknown as Component,
		);
	}

	protected async create(
	): Promise<void> {
		const codeblockDomain: CodeblockDomainInterface|undefined = await this.api.service(CodeblockService).read(this._act.file);

		if (codeblockDomain === undefined)
			return ;

		const codeblock: ControllerMetadataDataInterface = codeblockDomain.codeblock;

		this._createClue(this._steps.get(6)?.data?.clue);
		this._createClue(this._steps.get(7)?.data?.clue);

		if (codeblock.plot === undefined)
			codeblock.plot = {
				abt: {
					need: '',
					and: '',
					but: '',
					therefore: '',
				},
				storycircle: {
					you: '',
					need: '',
					go: '',
					search: '',
					find: '',
					take: '',
					return: '',
					change: '',
				}
			};


		codeblock.plot.storycircle = {
			you: (this._steps.get(1)?.data?.description ?? this._act.storyCircle.you ?? ''),
			need: (this._steps.get(5)?.data?.description ?? this._act.storyCircle.need ?? ''),
			go: (this._steps.get(2)?.data?.description ?? this._act.storyCircle.go ?? ''),
			search: (this._steps.get(6)?.data?.description ?? this._act.storyCircle.search ?? '') + this.getClueHint(this._steps.get(6)?.data?.clue),
			find: (this._steps.get(3)?.data?.description ?? this._act.storyCircle.find ?? ''),
			take: (this._steps.get(7)?.data?.description ?? this._act.storyCircle.take ?? '') + this.getClueHint(this._steps.get(7)?.data?.clue),
			return: (this._steps.get(4)?.data?.description ?? this._act.storyCircle.return ?? ''),
			change: (this._steps.get(8)?.data?.description ?? this._act.storyCircle.change ?? ''),
		};

		this.api.service(CodeblockService).updateDomain(codeblockDomain);
		this.close();
	}

	private async _createClue(
		data: WizardDataClueInterface|undefined
	): Promise<void> {
		if (data === undefined || data.name === undefined || data.name === '')
			return undefined;

		const additionalInformation: ControllerMetadataDataInterface = {
			data: {
				synopsis: data.description ?? '',
			}
		};

		if (data.leads !== undefined && data.leads.length > 0) {
			const relationships: ControllerMetadataRelationshipInterface[] = [];

			for (let index=0; index<data.leads.length; index++) {
				const model: ModelInterface|undefined = this.api.database.readByBaseName(data.leads[index]);
				if (model !== undefined){
					const relationship: ControllerMetadataRelationshipInterface = {
						type: 'bidirectional',
						path: model.file.path,
					};

					relationships.push(relationship);
				}
			}

			additionalInformation.relationships = relationships;
		}

		this.api.service(FileCreationService).silentCreate(
			ComponentType.Clue,
			data.name,
			this._actId.campaignId,
			this._actId.adventureId,
			this._actId.id,
			undefined,
			undefined,
			additionalInformation
		);
	}
}
