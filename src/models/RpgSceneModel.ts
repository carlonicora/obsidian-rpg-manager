import {AbstractModel} from "../abstracts/AbstractModel";
import {CharacterData, CharacterList} from "../data/CharacterData";
import {RpgViewFactory, viewType} from "../factories/RpgViewFactory";
import {LocationData, LocationList} from "../data/LocationData";
import {SceneData} from "../data/SceneData";
import {ClueData, ClueList} from "../data/ClueData";
import {SessionData} from "../data/SessionData";
import {AdventureData} from "../data/AdventureData";
import {DataObject} from "obsidian-dataview";
import {GenericDataListInterface} from "../interfaces/DataInterfaces";

export class RpgSceneModel extends AbstractModel {
	private outlinks: DataObject[];

	public async render() {
		this.outlinks = [];
		await this.readOutlinks();

		this.sceneNavigator();
		this.characterList();
		this.locationList();
		this.clueList();
	}
	
	private async sceneNavigator(
	) {
		const current = this.dv.current();
		
		if (
			current != undefined &&
			current.ids != undefined &&
			current.ids.scene != undefined &&
			current.ids.session != undefined
		) {
			const sessions = this.dv.pages("#session")
				.where(session =>
					session.file.folder !== "Templates" &&
					session.ids != undefined &&
					session.ids?.session != undefined &&
					session.ids?.session === current?.ids?.session
				);

			const session = sessions != undefined && sessions.length === 1 ? sessions[0] : null;

			const adventures = this.dv.pages("#adventure")
				.where(adventure =>
					adventure.file.folder !== "Templates" &&
					adventure.ids !== undefined &&
					adventure.ids.adventure === session.ids.adventure
				);
			const adventure = adventures != undefined && adventures.length === 1 ? adventures[0] : null;

			const previousScenes = this.dv.pages("#scene")
				.where(scene =>
					scene.file.folder !== "Templates" &&
					scene.ids != undefined &&
					scene.ids.session === current?.ids.session &&
					scene.ids.scene === current?.ids.scene - 1
				);
			const previousScene = previousScenes != undefined && previousScenes.length === 1 ? previousScenes[0] : null;

			const nextScenes = this.dv.pages("#scene")
				.where(scene =>
					scene.file.folder !== "Templates" &&
					scene.ids != undefined &&
					scene.ids.session === current?.ids.session &&
					scene.ids.scene === current?.ids.scene + 1
				);
			const nextScene = nextScenes != undefined && nextScenes.length === 1 ? nextScenes[0] : null;

			const data = new SceneData(
				this.functions,
				current,
				(session != undefined ? new SessionData(this.functions, session) : null),
				(adventure != undefined ? new AdventureData(this.functions, adventure) : null),
				(previousScene != undefined ? new SceneData(this.functions, previousScene) : null),
				(nextScene != undefined ? new SceneData(this.functions, nextScene) : null),
				this.campaign,
			)

			const view = RpgViewFactory.createSingle(viewType.SceneNavigator, this.dv);
			view.render(data);
		}
	}

	private readOutlinks(
	) : void
	{
		const current = this.dv.current();

		if (current != undefined){
			current.file.outlinks.forEach((file: Record<string,any>) => {
				const page = this.dv.page(file.path);
				if (page != undefined) {
					this.outlinks.push(page);
				}
			});
		}
	}

	private isAlreadyPresent(
		list: GenericDataListInterface,
		element: DataObject,
	): boolean
	{
		let response = false;

		list.elements.forEach((existingElement) => {
			if (element.file.name === existingElement.name){
				response = true;
				return true;
			}
		});

		return response;
	}

	private async characterList(
	) {
		const data = new CharacterList(this.campaign);

		const current = this.dv.current();
		if (
			current !== undefined &&
			current.relationships?.characters != null
		) {
			const characters = this.dv.pages("#character")
				.where(page =>
					page.file.folder !== "Templates" &&
					current.relationships?.characters[page.file.name] !== undefined
				);

			characters.forEach((character) => {
				data.add(
					new CharacterData(
						this.functions,
						character,
						this.campaign,
						current.relationships?.characters[character.file.name],
					)
				)
			});

			this.outlinks.forEach((character) => {
				if (
					(
						character.tags.indexOf('character/npc') !== -1 ||
						character.tags.indexOf('character/pc') !== -1
					) &&
					!this.isAlreadyPresent(data, character)
				){
					data.add(
						new CharacterData(
							this.functions,
							character,
							this.campaign,
							'_info in description_'
						)
					)
				}
			});

			this.writeData(data, viewType.CharacterList);
		}
	}

	private async locationList(
	) {
		const data = new LocationList(this.campaign);

		const current = this.dv.current();
		if (
			current !== undefined
		) {
			if (current.relationships?.locations != null) {
				const locations = this.dv.pages("#location")
					.where(location =>
						location.file.folder !== "Templates" &&
						current.relationships?.locations[location.file.name] !== undefined
					);

				locations.forEach((location) => {
					data.add(
						new LocationData(
							this.functions,
							location,
							current.relationships?.locations[location.file.name],
						)
					)
				});
			}

			this.outlinks.forEach((location) => {
				if (
					location.tags.indexOf('location') !== -1 &&
					!this.isAlreadyPresent(data, location)
				){
					data.add(
						new LocationData(
							this.functions,
							location,
							'_info in description_'
						)
					)
				}
			});

			this.writeData(data, viewType.LocationList);
		}
	}

	private async clueList(
	) {
		const data = new ClueList(this.campaign);

		const current = this.dv.current();
		if (current !== undefined) {
			const clues = this.dv.pages("#clue")
				.where(page =>
					page.file.folder !== "Templates" &&
					current.relationships?.clues != undefined &&
					current.relationships?.clues[page.file.name] !== undefined
				);

			clues.forEach((clue) => {
				data.add(
					new ClueData(
						this.functions,
						clue,
						current.relationships?.clues[clue.file.name],
					)
				)
			});

			this.outlinks.forEach((clue) => {
				if (
					clue.tags.indexOf('clue') !== -1 &&
					!this.isAlreadyPresent(data, clue)
				){
					data.add(
						new ClueData(
							this.functions,
							clue,
							'_info in description_'
						)
					)
				}
			});

			this.writeData(data, viewType.ClueList);
		}
	}
}
