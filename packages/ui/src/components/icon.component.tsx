import { EmptyFunction } from "core";
import { iconType, IconAssets } from "../assets/icons.constant";

export const IconComponent = ({
  source,
  size,
  className,
  onClick = EmptyFunction,
}: iconType) => {
  if (!source) return <></>;
  const Icon = IconAssets[source];
  return <Icon onClick={onClick} {...{ size, className }} />;
};
