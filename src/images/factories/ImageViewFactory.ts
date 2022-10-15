import {AbstractFactory} from "../../factories/abstracts/AbstractFactory";
import {ImageViewFactoryInterface} from "../interfaces/ImageViewFactoryInterface";
import {ImageViewType} from "../enums/ImageViewType";
import {ImageViewInterface} from "../interfaces/ImageViewInterface";
import {ImageListModalView} from "../views/modals/ImageListModalView";
import {ComponentInterface} from "../../components/interfaces/ComponentInterface";
import {ImageNavigationModalView} from "../views/modals/ImageNavigationModalView";
import {ImageEditModalView} from "../views/modals/ImageEditModalView";

export class ImageViewFactory extends AbstractFactory implements ImageViewFactoryInterface {
	private _views: Map<ImageViewType, any> = new Map<ImageViewType, any>([
		[ImageViewType.ModalNavigation, ImageNavigationModalView],
		[ImageViewType.ModalList, ImageListModalView],
		[ImageViewType.ModalEdit, ImageEditModalView],
	]);

	public create(
		type: ImageViewType,
		component: ComponentInterface,
	): ImageViewInterface {
		const view = this._views.get(type);
		if (view === undefined) throw new Error('');

		const response: ImageViewInterface = new view(this.app);
		response.component = component;

		return response;
	}
}
