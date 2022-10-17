import {AbstractFactory} from "../../factories/abstracts/AbstractFactory";
import {GalleryViewFactoryInterface} from "../interfaces/GalleryViewFactoryInterface";
import {GalleryViewType} from "../enums/GalleryViewType";
import {GalleryViewInterface} from "../interfaces/GalleryViewInterface";
import {GalleryListModalView} from "../views/modals/GalleryListModalView";
import {ComponentInterface} from "../../components/interfaces/ComponentInterface";
import {GalleryNavigationModalView} from "../views/modals/GalleryNavigationModalView";
import {GalleryEditModalView} from "../views/modals/GalleryEditModalView";
import {GalleryAddLocalModalView} from "../views/modals/GalleryAddLocalModalView";

export class GalleryViewFactory extends AbstractFactory implements GalleryViewFactoryInterface {
	private _views: Map<GalleryViewType, any> = new Map<GalleryViewType, any>([
		[GalleryViewType.ModalNavigation, GalleryNavigationModalView],
		[GalleryViewType.ModalList, GalleryListModalView],
		[GalleryViewType.ModalEdit, GalleryEditModalView],
		[GalleryViewType.ModalAddLocal, GalleryAddLocalModalView],
	]);

	public create(
		type: GalleryViewType,
		component: ComponentInterface,
	): GalleryViewInterface {
		const view = this._views.get(type);
		if (view === undefined) throw new Error('');

		const response: GalleryViewInterface = new view(this.app);
		response.component = component;

		return response;
	}
}
