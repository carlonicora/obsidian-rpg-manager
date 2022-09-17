import {AbstractElementRecord} from "../abstracts/database/AbstractElementRecord";
import {CharacterInterface} from "../interfaces/data/CharacterInterface";
import {Pronoun} from "../enums/Pronoun";

export class Character extends AbstractElementRecord implements CharacterInterface {
	public dob: Date|null;
	public death: Date|null;
	public goals: string|null;
	public pronoun: Pronoun|null;

	protected initialiseData(
	): void {
		this.dob = this.initialiseDate(this.frontmatter?.dates?.dob);
		this.death = this.initialiseDate(this.frontmatter?.dates?.death);
		this.goals = this.frontmatter?.goals;
		this.pronoun = this.frontmatter?.pronoun ? this.app.plugins.getPlugin('rpg-manager').factories.pronouns.create(this.frontmatter?.pronoun) : null;

		super.initialiseData();
	}

	public get age(
	): number|null {
		if (this.dob == null || (this.death == null && this.campaign.currentDate == null)) return null;

		const end = this.death ? this.death : this.campaign.currentDate;

		if (end == null) return null;

		const ageDifMs = end.valueOf() - this.dob.valueOf();
		const ageDate = new Date(ageDifMs);

		return (Math.abs(ageDate.getUTCFullYear() - 1970));
	}

	public get isDead(
	): boolean {
		return this.death != null;
	}
}
