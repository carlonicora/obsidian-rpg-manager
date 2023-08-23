import axios from "axios";
import { RpgManagerInterface } from "src/RpgManagerInterface";
import { AttributeType } from "src/data/enums/AttributeType";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { ChatGptModel } from "./enums/ChatGptModel";
import { ChatGptMessageInterface } from "./interfaces/ChatGptMessageInterface";
import { ChatGptResponse } from "./interfaces/ChatGptResponse";

export class ChatGptService {
	private _endpoint = "https://api.openai.com/v1/chat/completions";

	constructor(private _api: RpgManagerInterface, private _model: ChatGptModel = ChatGptModel.Gpt3Turbo) {}

	persona(): string {
		return `You are an expert storyteller with more than 20 years of experience in scriptwriting, storytelling, plotting and ttrpgs.`;
	}

	context(campaign: ElementInterface): string {
		let response = `You are the Game Master of a campaign called ${campaign.name}.`;
		response += `The campaign synopsis is this: ${campaign.attribute(AttributeType.Description).value ?? ""}.`;

		return response;
	}

	format(): string {
		return `You will provide 10 possible standalone responses to the question, one response per line.
You are forbidden to write any introduction, numbering, or concluding remarks. Just the responses.
Do not include any characters outside of the 10 provided options.`;
		//Each response should be formatted as: {"responses":[{"response":"YOUR RESPONSE"}]}.
		// Make sure each response is individually encapsulated in the above JSON format.
		// List 10 distinct standalone responsesto the question. Please avoid any introduction, numbering, or concluding remarks. Just the responses.
	}

	length(type: "short" | "long"): string {
		switch (type) {
			case "long":
				return `You will write your responses in a detailed manner. 
Each option (response) will contain one or more sentences
Each option should be qualitative, not a short sentence and will allow the storyteller to use it as source of multiple ideas.`;
			default:
				return `You will write your responses in a short, concise manner. Each option (response) will be a short sentence.`;
		}
	}

	tone(): string {
		return `You will write your responses in a straightforward tone.`;
	}

	async sendMessage(messages: ChatGptMessageInterface[]): Promise<ChatGptResponse[]> {
		// messages.push(
		// new ChatGptMessage("system", 'Format your response as: {"responses":[{"response":"YOUR RESPONSE"}]}')
		// );
		try {
			const response = await axios.post(
				this._endpoint,
				{
					model: this._model,
					messages: messages,
				},
				{
					headers: {
						Authorization: `Bearer ${this._api.settings.chatGptKey}`,
						"Content-Type": "application/json",
					},
				}
			);

			console.log("ChatGPT API response: ", response.data);

			const latestMessage = response.data.choices?.[0]?.message?.content;
			return this._processLatestMessage(latestMessage);
		} catch (error) {
			console.error("Error calling ChatGPT API: ", error);
			throw error;
		}
	}

	private _processLatestMessage(latestMessage: string): ChatGptResponse[] {
		const splitResponses = latestMessage.trim().split("\n");

		const results: ChatGptResponse[] = splitResponses
			.filter((resp) => resp.trim() !== "")
			.map((resp) => ({ response: resp.replace(/^\d+\.\s*/, "").trim() }));

		return results;
	}
}
