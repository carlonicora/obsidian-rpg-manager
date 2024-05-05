import * as React from "react";

export default function ContainerComponent({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <div className="flex flex-col w-full rounded-md border border-[--background-modifier-border] bg-[--background-primary]">
      <h2 className="!text-3xl p-3 !mt-0 !text-[--text-accent] !font-light border-b border-b-[--background-modifier-border] bg-[--background-secondary-alt] rounded-t-md">
        {title}
      </h2>
      <div className="p-3 w-full">{children}</div>
    </div>
  );
}
