import {AbstractView} from "../../../abstracts/AbstractView";
import {HeaderResponseInterface} from "../../../interfaces/response/HeaderResponseInterface";
import {Pronoun} from "../../../enums/Pronoun";
import {Component, MarkdownRenderer} from "obsidian";

export class HeaderView extends AbstractView {
	render(
		container: HTMLElement,
		data: HeaderResponseInterface,
	): void {
		const crs = container.createDiv({cls: 'rpgm-header-info'});
		const crsTitle = crs.createDiv({cls: 'title'});
		data.link.fillContent(crsTitle, this.sourcePath);

		const crsContainer = crs.createDiv({cls: 'container'});

		const crsInfo = crsContainer.createDiv({cls: 'info'});

		if (data.clueFound != null) {
			crsInfo.createDiv({cls: 'longTitle', text: 'Clue:'});
			const crsClue = crsInfo.createDiv({cls: 'longtext'});
			data.clueFound.fillContent(crsClue, this.sourcePath);
		}

		crsInfo.createDiv({cls: 'longTitle', text: 'Synopsis'});
		const crsSynopsis = crsInfo.createDiv({cls: 'longtext'});
		data.synopsis.fillContent(crsSynopsis, this.sourcePath);


		if (data.pronoun != null) {
			const crsPronoun = crsInfo.createDiv({cls: 'short'});
			crsPronoun.createDiv({cls: 'shortTitle', text: 'Pronoun'});
			crsPronoun.createDiv({cls: 'shortText', text: Pronoun[data.pronoun]});
			crsPronoun.createDiv({cls: 'reset'});
		}

		if (data.age != null || data.death != null) {
			const crsStatus = crsInfo.createDiv({cls: 'short'});
			crsStatus.createDiv({cls: 'shortTitle', text: 'Status'});
			crsStatus.createDiv({cls: 'shortText', text: data.death ? 'Dead' : 'Alive'});
			crsStatus.createDiv({cls: 'reset'});
		}

		if (data.death != null){
			let death = data.death.toDateString();
			if (data.age != null){
				death += ' at age ' + data.age;
			}
			const crsDeath = crsInfo.createDiv({cls: 'short'});
			crsDeath.createDiv({cls: 'shortTitle', text: 'Death'});
			crsDeath.createDiv({cls: 'shortText', text: death});
			crsDeath.createDiv({cls: 'reset'});
		} else if (data.age != null) {
			const crsAge = crsInfo.createDiv({cls: 'short'});
			crsAge.createDiv({cls: 'shortTitle', text: 'Age'});
			crsAge.createDiv({cls: 'shortText', text: data.age.toString()});
			crsAge.createDiv({cls: 'reset'});
		}

		if (data.date != null) {
			const crsDate = crsInfo.createDiv({cls: 'short'});
			crsDate.createDiv({cls: 'shortTitle', text: 'Date'});
			crsDate.createDiv({cls: 'shortText', text: data.date.toDateString()});
			crsDate.createDiv({cls: 'reset'});
		}

		if (data.address != null) {
			const crsAge = crsInfo.createDiv({cls: 'short'});
			crsAge.createDiv({cls: 'shortTitle', text: 'Address'});
			crsAge.createDiv({cls: 'shortText', text: data.address});
			crsAge.createDiv({cls: 'reset'});
		}

		if (data.goals != null){
			const crsGoals = crsInfo.createDiv({cls: 'short'});
			crsGoals.createDiv({cls: 'shortTitle', text: 'Goals'});
			const crsGoal = crsGoals.createDiv({cls: 'shortText'});
			data.goals.fillContent(crsGoal, this.sourcePath);
			crsGoals.createDiv({cls: 'reset'});
		}

		const crsImage = crsContainer.createDiv({cls: 'image'});
		if (data.imgSrc != null) {
			const image = new Image(data.imgWidth, data.imgHeight);
			image.src = data.imgSrc;
			image.style.objectFit = 'cover';
			crsImage.append(image);
		}

		crsContainer.createDiv({cls: 'reset'});
	}
}
