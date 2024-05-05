import * as React from "react";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import MainV1Component from "../groups/MainV1Component";

export default function NonPlayerCharacterComponent({
  element,
  isInPopover,
}: {
  element: ElementInterface;
  isInPopover: boolean;
}): React.ReactElement {
  return <MainV1Component element={element} isInPopover={isInPopover} />;
}
