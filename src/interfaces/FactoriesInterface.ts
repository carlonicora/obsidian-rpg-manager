import {ComponentFactoryInterface} from "./factories/ComponentFactoryInterface";
import {ContentFactoryInterface} from "./factories/ContentFactoryInterface";
import {DataFactoryInterface} from "./factories/DataFactoryInterface";
import {FileFactoryInterface} from "./factories/FileFactoryInterface";
import {ModalFactoryInterface} from "./factories/ModalFactoryInterface";
import {ModelFactoryInterface} from "./factories/ModelFactoryInterface";
import {PronounFactoryInterface} from "./factories/PronounFactoryInterface";
import {TemplateFactoryInterface} from "./factories/TemplateFactoryInterface";
import {ViewFactoryInterface} from "./factories/ViewFactoryInterface";
import {FetcherFactoryInterface} from "./factories/FetcherFactoryInterface";
import {RelationshipFactoryInterface} from "./factories/RelationshipFactoryInterface";
import {DatabaseFactoryInterface} from "./factories/DatabaseFactoryInterface";
import {IdFactoryInterface} from "./factories/IdFactoryInterface";

export interface FactoriesInterface {
	components: ComponentFactoryInterface;
	contents: ContentFactoryInterface;
	data: DataFactoryInterface;
	files: FileFactoryInterface;
	modals: ModalFactoryInterface;
	models: ModelFactoryInterface;
	pronouns: PronounFactoryInterface;
	templates: TemplateFactoryInterface;
	views: ViewFactoryInterface;
	fetchers: FetcherFactoryInterface;
	relationships: RelationshipFactoryInterface;
	database: DatabaseFactoryInterface;
	id: IdFactoryInterface;
}
