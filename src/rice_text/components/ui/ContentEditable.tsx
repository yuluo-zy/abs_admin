import "../styles/ContentEditable.less";

import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import * as React from "react";

export default function EspContentEditable({
  className,
}: {
  className?: string;
}): JSX.Element {
  return <ContentEditable className={className || 'ContentEditable__root'} />;
}
