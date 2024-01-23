import { ReactNode, useCallback } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./DropdownMenu";
import { cn } from "@ui/lib/utils";
import { Icon } from "./Icon";

interface DropdownMenuItemProps {
  name: string;
  key: string;
  onClick: () => void;
  isDanger?: boolean;
  icon?: keyof typeof Icon;
}
interface DropdownMenuListInterface {
  children: ReactNode;
  items: DropdownMenuItemProps[];
}

export const DropdownMenuList = ({
  children,
  items,
}: DropdownMenuListInterface) => {
  const renderIcon = useCallback((item: DropdownMenuItemProps) => {
    if (!item?.icon) return null;
    const IconComponent = Icon[item?.icon];
    return <IconComponent className="mr-2 h-4 w-4" />;
  }, []);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {items?.map((item) => (
          <DropdownMenuItem
            className={cn({
              "text-error": item?.isDanger,
            })}
            key={item.key}
            onClick={item?.onClick}
          >
            {renderIcon(item)} {item.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
