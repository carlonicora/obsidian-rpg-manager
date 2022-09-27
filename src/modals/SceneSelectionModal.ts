import {AbstractRpgManagerModal} from "../abstracts/AbstractRpgManagerModal";
import {App, TAbstractFile, TFile} from "obsidian";
import {ComponentType} from "../enums/ComponentType";
import {SceneInterface} from "../interfaces/components/SceneInterface";
import {SessionInterface} from "../interfaces/components/SessionInterface";
import {SorterComparisonElement} from "../database/SorterComparisonElement";
import {InfoLog, LogMessageType} from "../helpers/Logger";

export class SceneSelectionModal extends AbstractRpgManagerModal {
	private availableScenes:Array<SceneInterface>;
	private scenesEls: Array<HTMLInputElement>;

	constructor(
		app: App,
		private session: SessionInterface,
	) {
		super(app);

		this.scenesEls = [];

		this.availableScenes = this.database.read<SceneInterface>(
			(scene: SceneInterface) =>
				scene.id.type === ComponentType.Scene &&
				scene.id.campaignId === session.id.campaignId &&
				(scene.sessionId === undefined || scene.sessionId === session.sessionId),
		).sort(this.factories.sorter.create<SceneInterface>([
			new SorterComparisonElement((scene: SceneInterface) => scene.id.adventureId),
			new SorterComparisonElement((scene: SceneInterface) => scene.id.actId),
			new SorterComparisonElement((scene: SceneInterface) => scene.id.sceneId),
		]));
	}

	onOpen() {
		super.onOpen();

		const {contentEl} = this;
		contentEl.empty();
		contentEl.addClass('rpgm-modal');

		contentEl.createEl('h2', {text: 'Scene Selector'});
		contentEl.createEl('p', {text: 'Select the scenes to add to the session "' + this.session.name + '"'});
		const sessionContainerEl = contentEl.createDiv();

		this.availableScenes.forEach((scene: SceneInterface) => {
			const checkboxDiv = sessionContainerEl.createDiv();
			const checkbox = checkboxDiv.createEl('input');
			checkbox.type = 'checkbox';
			checkbox.value = scene.path;
			checkbox.id = scene.name;

			if (scene.sessionId === this.session.sessionId) checkbox.checked = true;

			this.scenesEls.push(checkbox);

			const checkboxLabel = checkboxDiv.createEl('label', {text: scene.name});
			checkboxLabel.htmlFor = scene.name;
		});

		const scenesSelectionButtonEl = contentEl.createEl('button', {text: 'Add selected scenes to session "' + this.session.name + '"'});
		scenesSelectionButtonEl.addEventListener("click", () => {
			new InfoLog(LogMessageType.SessionSceneLink, 'Initialising scene update from session');
			return this.addScenes()
				.then(() => {
					new InfoLog(LogMessageType.SessionSceneLink, 'Scenes Updated');
					this.session.reload();
					new InfoLog(LogMessageType.SessionSceneLink, 'Session reloaded', this.session);
					this.session.loadHierarchy(this.database)
						.then(() => {
							new InfoLog(LogMessageType.SessionSceneLink, 'Session hierarchy reloaded', this.session);
							this.database.refreshRelationships(this.session)
								.then(() => {
									new InfoLog(LogMessageType.SessionSceneLink, 'Database relastionships refreshed', this.session);
									return;
								});
							return;
						});
					return;
				})
				.then(() => {
					new InfoLog(LogMessageType.SessionSceneLink, 'Scene/Session association complete', this.session);
					this.app.workspace.trigger("rpgmanager:refresh-views");
					this.close();
					return;
				});
		});
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();

		super.onClose();
	}

	private async addScenes(
	): Promise<void> {
		for (let index=0; index<this.scenesEls.length; index++){
			const file: TAbstractFile|null = this.app.vault.getAbstractFileByPath(this.scenesEls[index].value);

			if (file != null && file instanceof TFile){
				new InfoLog(LogMessageType.SessionSceneLink, 'Scene file found', file);
				const map: Map<string, string> = new Map<string, string>();
				map.set('session', this.scenesEls[index].checked === true ? this.session.sessionId.toString() : '');

				new InfoLog(LogMessageType.SessionSceneLink, 'Updating scene session frontmatter', file);
				await this.factories.frontmatter.update(file, map);

				new InfoLog(LogMessageType.SessionSceneLink, 'Scene session frontmatter updated', file);
			}
		}

		return;
	}
}
