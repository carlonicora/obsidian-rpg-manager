import {ComponentInterface} from "../../interfaces/ComponentInterface";
import {PlotsInterface} from "../../plots/interfaces/PlotsInterface";
import {AdventureDataInterface} from "./data/AdventureDataInterface";

export interface AdventureInterface extends ComponentInterface, PlotsInterface, AdventureDataInterface{
}
