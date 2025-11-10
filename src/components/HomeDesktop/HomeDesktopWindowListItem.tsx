/*
 * ABOUTME: Desktop window list item component
 * ABOUTME: Represents a single item in a desktop window list
 */

import type { ReactNode } from "react";

type HomeDesktopWindowListItemProps = {
  children: ReactNode;
  startAdornment?: ReactNode;
};

const HomeDesktopWindowListItem = ({ children, startAdornment }: HomeDesktopWindowListItemProps) => {
  return (
    <div className="flex items-start gap-2">
      {startAdornment ? <div>{startAdornment}</div> : null}
      <div className="flex flex-col">{children}</div>
    </div>
  );
};

export default HomeDesktopWindowListItem;
