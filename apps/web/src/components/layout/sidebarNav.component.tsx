"use client";

import { DictionaryType } from "core";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { useCallback } from "react";
import { IconComponent } from "ui";
import { IconAssetsType } from "ui/src/assets/icons.constant";
import { cn } from "ui/src/lib/utils";

// import { useSearchParams } from 'next/navigation'

export type sideBarItemType = {
  icon?: IconAssetsType;
  name: string;
  href: string;
};

interface SidebarNavInterface {
  items: sideBarItemType[];
  className?: string;
}

const SidebarNav = ({ items = [], className }: SidebarNavInterface) => {
  const segment = useSelectedLayoutSegment();

  const isActiveSegment = useCallback(
    (item: DictionaryType) => {
      if (!segment && !item?.href) return true;
      return segment === item?.href;
    },
    [segment]
  );

  return (
    <div
      className={cn(
        "w-[250px] h-full  py-6    border-r  flex flex-col",
        className
      )}
    >
      {items?.map((item) => {
        return (
          <Link
            className={cn(
              "flex items-center gap-4 p-3 px-6   rounded hover:bg-base-200 ",
              {
                "bg-gray-100": isActiveSegment(item),
              }
            )}
            key={item?.name}
            href={`/${item.href}`}
          >
            <IconComponent source={item?.icon ?? "chevron_right"} />
            <span className="text-base-primary">{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default SidebarNav;
