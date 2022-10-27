import {ModalPartInterface} from "../../../core/interfaces/ModalPartInterface";
import {RpgManagerApiInterface} from "../../interfaces/RpgManagerApiInterface";
import {ModalInterface} from "../../../core/interfaces/ModalInterface";

export interface ModalPartClassInterface<T extends ModalPartInterface> {
	new(api: RpgManagerApiInterface, modal: ModalInterface): T;
}
