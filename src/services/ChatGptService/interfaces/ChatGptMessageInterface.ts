export interface ChatGptMessageInterface {
	role: "system" | "user" | "assistant";
	content: string;
}
