export interface TemplateFactoryInterface {
	generateData(): Promise<string>;
}
