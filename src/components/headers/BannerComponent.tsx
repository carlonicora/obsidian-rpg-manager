import * as React from "react";
import { ImageInterface } from "src/data/interfaces/ImageInterface";

export default function BannerComponent({ image }: { image: ImageInterface }): React.ReactElement {
	return (
		<div className="relative w-full pb-[56.25%] overflow-hidden rounded-lg">
			<img src={image.src} alt={image.caption} className="absolute top-0 left-0 w-full h-full object-cover" />
		</div>
	);
}
