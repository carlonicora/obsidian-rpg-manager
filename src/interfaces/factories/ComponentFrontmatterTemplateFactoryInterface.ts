export interface ComponentFrontmatterTemplateFactoryInterface {
	generateData(): Promise<string>;
}
