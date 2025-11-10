/*
 * ABOUTME: Desktop window list item component
 * ABOUTME: Represents a single item in a desktop window list
 */

import type { ReactNode } from "react";

type HomeWindowListItemProps = {
  children: ReactNode;
  startAdornment?: ReactNode;
};

const HomeWindowListItem = ({ children, startAdornment }: HomeWindowListItemProps) => {
  return (
    <div className="flex items-start gap-2">
      {startAdornment ? <div>{startAdornment}</div> : null}
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
};

export default HomeWindowListItem;
