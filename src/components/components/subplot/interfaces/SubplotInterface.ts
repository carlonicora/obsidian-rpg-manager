import {ComponentInterface} from "../../../interfaces/ComponentInterface";
import {PlotsInterface} from "../../../../plots/interfaces/PlotsInterface";
import {SubplotDataInterface} from "./SubplotDataInterface";

export interface SubplotInterface extends ComponentInterface, PlotsInterface, SubplotDataInterface {

}
