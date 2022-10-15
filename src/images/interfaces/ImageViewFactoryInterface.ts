import {ImageViewInterface} from "./ImageViewInterface";
import {ImageViewType} from "../enums/ImageViewType";
import {ComponentInterface} from "../../components/interfaces/ComponentInterface";

export interface ImageViewFactoryInterface {
	create(
		type: ImageViewType,
		component: ComponentInterface,
	): ImageViewInterface;
}
