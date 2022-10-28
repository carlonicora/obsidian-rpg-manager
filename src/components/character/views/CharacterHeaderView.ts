import {AbstractHeaderView} from "../../../managers/viewsManager/abstracts/AbstractHeaderView";
import {NewHeaderViewInterface} from "../../../managers/viewsManager/interfaces/NewHeaderViewInterface";
import {CharacterInterface} from "../interfaces/CharacterInterface";
import {LongTextElement} from "../../../managers/viewsManager/elements/LongTextElement";
import {ShortTextElement} from "../../../managers/viewsManager/elements/ShortTextElement";
import {DateService} from "../../../services/dateService/DateService";
import {DateElement} from "../../../managers/viewsManager/elements/DateElement";

export class CharacterHeaderView extends AbstractHeaderView implements NewHeaderViewInterface {
	public model: CharacterInterface;

	public render(
	): void {
		this.addBreadcrumb();
		this.addTitle();
		this.addComponentOptions();
		this.addGallery();

		this.addInfoElement(LongTextElement, {title: 'Description', values: this.model.synopsis ?? '<span class="missing">Synopsis Missing</span>', editableKey: 'data.synopsis'});
		this.addInfoElement(LongTextElement, {title: 'Goals', values: this.model.goals ?? '<span class="missing">Goals Missing</span>', editableKey: 'data.goals'});

		if (this.model.age !== undefined)
			this.addInfoElement(ShortTextElement, {title: 'Age', values: this.model.age.toString()});

		//this.addInfoElement(ShortTextElement, {title: 'Status', values: this.model.isDead ? 'dead' : 'alive'});
		this.addInfoElement(DateElement, {title: 'Date of Birth', values: this.model.dob, editableKey: 'data.dob'});
		this.addInfoElement(DateElement, {title: 'Date of Death', values: this.model.death, editableKey: 'data.death'});

		if (this.model.death != null) {
			let death = this.api.service(DateService).getReadableDate(this.model.death, this.model);
			if (this.model.age !== undefined)
				death += ' at age ' + this.model.age;

			this.addInfoElement(ShortTextElement, {title: 'Death', values: death});
		}
	}
}
