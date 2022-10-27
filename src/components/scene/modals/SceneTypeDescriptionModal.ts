import {Component, MarkdownRenderer} from "obsidian";
import {AbstractModal} from "../../../managers/modalsManager/abstracts/AbstractModal";

interface SceneTypeInformation {
	title: string,
	description: string,
	isActive: boolean,
}

const sceneTypeDescription: SceneTypeInformation[] = [
	{title: 'Action',
		description: '*The player characters DO something*\n' +
			'An **Action** scene type is a scene in which the player characters need to **DO** something.' + '' +
			'From building, to searching or studying, this type of scene requires the player characters to be active.',
		isActive: true},
	{title: 'Combat',
		description: '*The player characters fight*\n' +
			'A **Combat** scene type is a scene in which the player characters engage in a fight.',
		isActive: true},
	{title: 'Encounter',
		description: '*The player characters meet someone*\n' +
			'An **Encounter** scene type is a scene in which the player characters have a social encounter with '+
		'one or more NPCs. These type of scenes are usually for social gatherings, to receive information, but they do ' +
		'not include the player characters having to obtain something: for that there is the **Social Combat** type od scenes',
		isActive: true},
	{title: 'Exposition',
		description: '*The storyteller introduce a change of scenery*\n' +
			'An **Exposition** scene type is a storyteller-lead scene in which the storyteller present something ' +
		'to the player characters. These type of scenes are generally short in duration and are very useful to introduce ' +
		'a change.',
		isActive: false},
	{title: 'Investigation',
		description: '*The player characters obtain information from the surrounding environment*\n' +
			'An **Investigation** scene type is a scene in which the player characters must obtain some information ' +
		'from the surrounding environment. These type of scenes are similar to the **Social Combat**, but do not include ' +
		'NPCs from which to collect the information, hence are less social and more active',
		isActive: true},
	{title: 'Planning',
		description: '*The player characters decide what to do next*\n' +
			'A **Planning** scene type is a player character-lead scene in which the player characters ' +
		'plan how to move and take a decision. Often, these type of scenes are focussed on decisions alone.',
		isActive: false},
	{title: 'Preparation',
		description: '*The player characters prepare what they need to do something*\n' +
			'A **Praparation** scene type is a player character-lead scene in which the player characters ' +
		'do something after having gone through a **Planning**, as the **Preparation** scenes should not include decisions.' +
		'The difference with an **Action** scene is that thhe **Preparation** scenes are mainly driven by the player ' +
		'characters, while the **Action** ones include external involvement.',
		isActive: false},
	{title: 'Recap',
		description: '*The player characters discuss amongst themselves*\n' +
			'A **Recap** scene type is a player character-lead scene in which the player characters recap something '+
		'they have done. THe scene is similar to the **Planning**, but does not involve any type of decision process.',
		isActive: false},
	{title: 'Social Combat',
		description: '*The player characters obtain information from an NPC*\n' +
			'A **Social Combat** scene type is a scene in which the player characters must obtain something from ' +
		'an NPC through a discussion. The goal is to `win the argument` adn it is normally performed through persuasion, intimidation or fast talk.',
		isActive: true},
];

export class SceneTypeDescriptionModal extends AbstractModal {
	private _sceneTypeDescriptionsEl: HTMLDivElement;

	onOpen() {
		super.onOpen();
		const {contentEl} = this;
		contentEl.empty();
		contentEl.addClass('rpgm-modal');

		this._sceneTypeDescriptionsEl = contentEl.createDiv({cls: 'rpgm-modal-scene-descriptions'});
		this._sceneTypeDescriptionsEl.createEl('h1', {text: 'SceneModel Types'});

		sceneTypeDescription.forEach((sceneTypeInformation: SceneTypeInformation) => {
			this._displaySceneTypeInformation(sceneTypeInformation);
		});
	}

	private _displaySceneTypeInformation(
		sceneTypeInformation: SceneTypeInformation,
	): void {
		const descriptionContainerEl = this._sceneTypeDescriptionsEl.createDiv('description-container');
		descriptionContainerEl.createEl('h2', {text: sceneTypeInformation.title});

		const descriptionEl = descriptionContainerEl.createDiv();
		descriptionContainerEl.createSpan({text: 'This is ' + (sceneTypeInformation.isActive ? ''  : 'NOT ') + 'an "active" type of scene'});

		MarkdownRenderer.renderMarkdown(
			sceneTypeInformation.description,
			descriptionEl,
			'',
			null as unknown as Component,
		);
	}

	onClose() {
		super.onClose();
	}
}
