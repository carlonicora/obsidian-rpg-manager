import { RpgManagerInterface } from "src/RpgManagerInterface";
import { ArcType } from "src/data/enums/ArcType";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { ChatGptMessage } from "../ChatGptMessage";
import { ChatGptService } from "../ChatGptService";
import { ChatGptModel } from "../enums/ChatGptModel";
import { ChatGptMessageInterface } from "../interfaces/ChatGptMessageInterface";
import { ChatGptResponse } from "../interfaces/ChatGptResponse";

export class ChatGptNonPlayerCharacterModel {
	private _service: ChatGptService;
	private _dataMessages: Map<string, ChatGptMessageInterface> = new Map<string, ChatGptMessageInterface>();

	constructor(
		private _api: RpgManagerInterface,
		private _campaign: ElementInterface,
		private _name: string,
		private _model: ChatGptModel = ChatGptModel.Gpt3Turbo
	) {
		this._service = new ChatGptService(_api, _model);
	}

	private _generateMessages(length: "short" | "long"): ChatGptMessageInterface[] {
		const response: ChatGptMessageInterface[] = [];
		response.push(new ChatGptMessage("system", this._service.persona()));
		response.push(new ChatGptMessage("system", this.persona()));
		response.push(new ChatGptMessage("system", this._service.format()));
		response.push(new ChatGptMessage("system", this._service.tone()));
		response.push(new ChatGptMessage("system", this._service.length(length)));
		response.push(new ChatGptMessage("system", this._service.context(this._campaign)));
		response.push(new ChatGptMessage("system", this.context()));

		const descriptionMessage: ChatGptMessageInterface | undefined = this._dataMessages.get("description");
		if (descriptionMessage) response.push(descriptionMessage);

		const characterArcMessage: ChatGptMessageInterface | undefined = this._dataMessages.get("characterArc");
		if (characterArcMessage) response.push(characterArcMessage);

		const beliefsMessage: ChatGptMessageInterface | undefined = this._dataMessages.get("beliefs");
		if (beliefsMessage) response.push(beliefsMessage);

		const ghostMessage: ChatGptMessageInterface | undefined = this._dataMessages.get("ghost");
		if (ghostMessage) response.push(ghostMessage);

		const lieMessage: ChatGptMessageInterface | undefined = this._dataMessages.get("lie");
		if (lieMessage) response.push(lieMessage);

		const needMessage: ChatGptMessageInterface | undefined = this._dataMessages.get("need");
		if (needMessage) response.push(needMessage);

		const strengthsMessage: ChatGptMessageInterface | undefined = this._dataMessages.get("strengths");
		if (strengthsMessage) response.push(strengthsMessage);

		const weaknessesMessage: ChatGptMessageInterface | undefined = this._dataMessages.get("weaknesses");
		if (weaknessesMessage) response.push(weaknessesMessage);

		const behaviourMessage: ChatGptMessageInterface | undefined = this._dataMessages.get("behaviour");
		if (behaviourMessage) response.push(behaviourMessage);

		const wantMessage: ChatGptMessageInterface | undefined = this._dataMessages.get("want");
		if (wantMessage) response.push(wantMessage);

		const oppositionMessage: ChatGptMessageInterface | undefined = this._dataMessages.get("opposition");
		if (oppositionMessage) response.push(oppositionMessage);

		return response;
	}

	private _generateSuggestions(message: ChatGptMessageInterface, length: "short" | "long"): Promise<string[]> {
		const messages: ChatGptMessageInterface[] = this._generateMessages(length);
		messages.push(message);

		console.info(messages);

		return this._service.sendMessage(messages).then((response: ChatGptResponse[]) => {
			return response.map((message: ChatGptResponse) => message.response);
		});
	}

	persona(): string {
		return `You are particularly experienced in creating three dimensional characters. To create a character you use the following attributes:
- Character Arc (it can be "Positive", "Disillusionment", "Fall", "Corruption" or "Flat")
- Beliefs (What are the character's core beliefs?)
- Ghost (a past event that defines the belief of a character and a lie the character believes to be true)
- Lie (Something the character accepts as the truth and make them follow their want instead of their need (only If the Type of Character Arc is Positive, Disillusionment or Fall)
- Need (What is the real need of the character?)
- Strengths (picked from this list: Adaptable, Ambitious, Assertive, Charismatic, Compassionate, Courageous, Creative, Decisive, Diligent, Disciplined, Energetic, Empathetic, Humble, Inspirational, Intuitive, Loyal, Patient, Resilient, Self-confident, Strategic, Tenacious, Visionary, Witty)
- Weaknesses (picked from this list: Impulsive, Indecisive, Inflexible, Insecure, Intolerant, Irresponsible, Lazy, Naive, Neglectful, Nervous, Obstinate, Overbearing, Overcritical, Perfectionist, Pessimistic, Procrastinator, Reactive, Rigid, Self-centered, Sensitive, Shy, Stubborn, Timid, Unfocused, Vague)
- Behaviour (What is the general behaviour of the character?)
- Want (What does the character believe they want?)
- Opposition (What forces oppose the character in getting what they want?)
`;
	}

	context(): string {
		return `The non-player character you are creating is ${this._name}. `;
	}

	set description(description: string) {
		this._dataMessages.set("description", {
			role: "system",
			content: `The "description" of ${this._name} is: \`\`\`${description}\`\`\`.`,
		});
	}

	set occupation(occupation: string) {
		this._dataMessages.set("occupation", {
			role: "system",
			content: `The "occupation" of ${this._name} is: \`\`\`${occupation}\`\`\`.`,
		});
	}

	set characterArc(characterArc: ArcType) {
		this._dataMessages.set("characterArc", {
			role: "system",
			content: `The "character arc" of ${this._name} is ${ArcType[characterArc]}.`,
		});
	}

	async getBeliefs(): Promise<string[]> {
		const message: ChatGptMessageInterface = {
			role: "user",
			content: `Based on the information provided, suggest 10 core beliefs for ${this._name} that are consistent with the character description and arc.
The core beliefs are the beliefs that define the character. They are the core of the character's personality.
The beliefs should not just circle around the specific information provided so far, but should be more general and applicable to multiple situations.
Imagine the character as a real person and think about what they would believe in, what would be their core values and what would they fight for.`,
		};

		return this._generateSuggestions(message, "long");
	}

	set beliefs(beliefs: string) {
		this._dataMessages.set("beliefs", {
			role: "system",
			content: `The "beliefs" of ${this._name} is: \`\`\`${beliefs}\`\`\`.`,
		});
	}

	async getGhost(): Promise<string[]> {
		const message: ChatGptMessageInterface = {
			role: "user",
			content: `Based on the information provided, suggest 10 "ghosts" for ${this._name} 
that are consistent with the character description and arc.
A Ghost is a challenging event in ${this._name}'s past that created a crack between the reality and the lie the character believes to be true.`,

			// content: `Based on the information provided, suggest 10 "ghosts" for ${this._name} that are consistent with the character description and arc.
			// A ghost is a past event that defines the belief of a character.`,
		};

		return this._generateSuggestions(message, "long");
	}

	set ghost(ghost: string) {
		this._dataMessages.set("ghost", {
			role: "system",
			content: `The "ghost" of ${this._name} is: \`\`\`${ghost}\`\`\`.`,
		});
	}

	async getLie(): Promise<string[]> {
		const message: ChatGptMessageInterface = {
			role: "user",
			content: `Based on the information provided, suggest 10 "lies" for ${this._name} that are consistent with the character described so far.
A lie is something the character accepts as the truth and make them follow their want instead of their need.`,
		};

		return this._generateSuggestions(message, "long");
	}

	set lie(lie: string) {
		this._dataMessages.set("lie", {
			role: "system",
			content: `The "lie" of ${this._name} is: \`\`\`${lie}\`\`\`.`,
		});
	}

	async getNeed(): Promise<string[]> {
		const message: ChatGptMessageInterface = {
			role: "user",
			content: `Based on the information provided, suggest 10 "needs" for ${this._name} with a strong link to the "lie" provided.
The "needs" must are consistent with the character described so far.
A need is what the character really needs to grow and change, even if they don't realise it. They know their want, but they don't know their need.`,
		};

		return this._generateSuggestions(message, "long");
	}

	set need(need: string) {
		this._dataMessages.set("need", {
			role: "system",
			content: `The "need" of ${this._name} is: \`\`\`${need}\`\`\`.`,
		});
	}

	async getStrenghts(): Promise<string[]> {
		const message: ChatGptMessageInterface = {
			role: "user",
			content: `Based on the information provided, suggest 5 "strengths" for ${this._name} that are consistent with the character described so far.
A strength is a positive trait of the character. Your responses should ONLY contain strengths from this list: Adaptable, Ambitious, Assertive, Charismatic, Compassionate, Courageous, Creative, Decisive, Diligent, Disciplined, Energetic, Empathetic, Humble, Inspirational, Intuitive, Loyal, Patient, Resilient, Self-confident, Strategic, Tenacious, Visionary, Witty.
Write ONE strength per line, using exclusively the words from the list without any additional characters.`,
		};

		return this._generateSuggestions(message, "short");
	}

	set strengths(strengths: string) {
		this._dataMessages.set("strenghts", {
			role: "system",
			content: `The "strenghts" of ${this._name} are: \`\`\`${strengths}\`\`\`.`,
		});
	}

	async getWeaknesses(): Promise<string[]> {
		const message: ChatGptMessageInterface = {
			role: "user",
			content: `Based on the information provided, suggest 5 "weaknesses" for ${this._name} that are consistent with the character described so far.
A weakness is a negative trait of the character. Your responses should ONLY contain weaknesses from this list: Impulsive, Indecisive, Inflexible, Insecure, Intolerant, Irresponsible, Lazy, Naive, Neglectful, Nervous, Obstinate, Overbearing, Overcritical, Perfectionist, Pessimistic, Procrastinator, Reactive, Rigid, Self-centered, Sensitive, Shy, Stubborn, Timid, Unfocused, Vague.
Write ONE weakness per line, using exclusively the words from the list without any additional characters.`,
		};

		return this._generateSuggestions(message, "short");
	}

	set weaknesses(weaknesses: string) {
		this._dataMessages.set("weaknesses", {
			role: "system",
			content: `The "weaknesses" of ${this._name} are: \`\`\`${weaknesses}\`\`\`.`,
		});
	}

	async getBehaviour(): Promise<string[]> {
		const message: ChatGptMessageInterface = {
			role: "user",
			content: `Generate 10 distinct sets of mixed behaviors, mannerisms, and speech patterns for ${this._name}
			using all the information provided so far. Each set should encompass various facets of the character's traits 
			into a collection of diverse actions and reactions suitable for immediate role-play. 
			Remember, each set should be a blend of their traits rather than focusing on just one aspect and I will only
			pick one of your answers, so each of them should be a complete set of behaviors. Give me one set of behaviours
			per line, no introduction, lists or numbering. Just the behaviors.`,

			// content: `Given the background and characteristics of ${this._name}, generate ten groups of interrelated
			// behaviors for ${this._name} that reflect a blend of their motivations, traits, and experiences.
			// These behaviors should be clear, actionable patterns that can be immediately used for roleplaying,
			// without focusing on any single element of his character in isolation.`,

			// content: `Using the full scope of details and traits provided about ${this._name}, generate
			// ten behavioral descriptions that weave together the various facets of their personality,
			// background, and motivations. Ensure that each description seamlessly integrates multiple
			// elements of his character, offering a broad perspective on how he behaves in diverse situations.`,

			// content: `"Using all the details and characteristics provided about ${this._name},
			// craft ten groups of behaviors that encompass their entire persona.
			// Each group should not isolate a single trait but instead intertwine multiple aspects
			// of their background, traits, and motivations.
			// The description for each group should offer a rich and interconnected
			// portrayal of how ${this._name} operates in a multitude of scenarios,
			// reflecting the full complexity of their character."`,

			// content: `Given the background and characteristics of ${this._name},
			// enumerate ten comprehensive categories of behaviors that represent different
			// facets of their personality. For each category, provide a detailed description
			// that captures the depth, nuances, and specific instances or mannerisms associated
			// with that behavior, offering a vivid portrayal of how ${this._name} might act and react in various contexts.`,

			// content: `Given the background and characteristics of ${this._name},
			// list ten comprehensive categories or groups of behaviors that encapsulate
			// different facets of their personality.
			// Each category should give an overarching theme of how ${this._name} might
			// act and react in various situations, providing a holistic view of their character.`,
		};

		return this._generateSuggestions(message, "long");
	}

	set behaviour(behaviour: string) {
		this._dataMessages.set("behaviour", {
			role: "system",
			content: `The "behaviour" of ${this._name} is: \`\`\`${behaviour}\`\`\`.`,
		});
	}

	async getWant(): Promise<string[]> {
		const message: ChatGptMessageInterface = {
			role: "user",
			content: `Based on the information provided, suggest 10 "wants" for ${this._name} that are consistent with the character described so far.
A want is what the character wants to achieve. They know their want, but they don't know their need.`,
		};

		return this._generateSuggestions(message, "long");
	}

	set want(want: string) {
		this._dataMessages.set("want", {
			role: "system",
			content: `The "want" of ${this._name} is: \`\`\`${want}\`\`\`.`,
		});
	}

	async getOpposition(): Promise<string[]> {
		const message: ChatGptMessageInterface = {
			role: "user",
			content: `Based on the information provided, suggest 10 "oppositions" for ${this._name} that are consistent with the character described so far.
An opposition is an obstacle that prevents the character from achieving their want. Your responses should provide hints about possible scenarios that could be used to create a story.`,
		};

		return this._generateSuggestions(message, "long");
	}

	set opposition(opposition: string) {
		this._dataMessages.set("opposition", {
			role: "system",
			content: `The "opposition" of ${this._name} is: \`\`\`${opposition}\`\`\`.`,
		});
	}

	async getSensoryImprint(): Promise<string[]> {
		const message: ChatGptMessageInterface = {
			role: "user",
			content: `Based on the information provided, suggest the 5 "sensory imprints" for ${this._name} 
that are consistent with the character described so far.
A "Sensory Imprint" is a description of the immediately perceptible characteristincs of ${this._name}.
Each "sensory imprint" (sight, sound, smell, touch, taste) should be a list of 3-5 bullet points of straightforward, short perceptible characteristincs.
Reply with the sensory imprints in the following order: sight, sound, smell, touch, taste.`,
		};

		const response = await this._generateSuggestions(message, "short");

		const result: string[] = [];
		let temp: string[] = [];

		response.forEach((item, index) => {
			if (item.startsWith("-")) {
				temp.push(item);
			} else {
				if (temp.length > 0) {
					result.push(temp.join("\n"));
					temp = [];
				}
			}

			if (index === response.length - 1 && temp.length > 0) {
				result.push(temp.join("\n"));
			}
		});

		return result;
	}
}
