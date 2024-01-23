"use client";

// import { useUser } from "@saas/auth/hooks/use-user";
// import { LocaleSwitch } from "@shared/components/LocaleSwitch";
import { Logo } from "@shared/components/Logo";
import { Icon } from "@ui/components/Icon";
import Link from "next/link";

import { UserMenu } from "@components/dashboard/user.menu.component";
import { usePathname } from "next/navigation";
import { useCallback } from "react";
// import { Banner } from "./Banner";

export function DashboardNavbar() {
  // const t = useTranslations();
  // const { user, loaded: userLoaded } = useUser();
  // const locale = useLocale();

  const pathname = usePathname();

  const isActiveMenuItem = useCallback(
    (href: string | null) => {
      return href && pathname.includes(href);
    },
    [pathname]
  );

  const menuItems = [
    {
      label: "Dashboard",
      href: `/app/dashboard`,
      icon: Icon.grid,
    },
    {
      label: "Files",
      href: `/app/files`,
      icon: Icon.magic,
    },
    {
      label: "Settings",
      href: `/app/settings`,
      icon: Icon.settings,
    },
  ];

  return (
    <nav className="bg-muted w-full border-b">
      <div className="container max-w-6xl py-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="block">
              <Logo withLabel={false} />
            </Link>

            <span className="hidden opacity-30 lg:block">
              <Icon.chevronRight className="h-4 w-4" />
            </span>

            {/* <TeamSelect teams={teams} /> */}
          </div>

          <div className="ml-auto mr-0 flex items-center justify-end gap-4">
            <UserMenu />
          </div>
        </div>

        <ul className="no-scrollbar -mx-8 -mb-4 mt-6 flex list-none items-center justify-start gap-6 overflow-x-auto px-8 text-sm lg:text-base">
          {menuItems.map((menuItem) => (
            <li key={menuItem.href}>
              <Link
                href={menuItem.href}
                className={`flex items-center gap-2 border-b-2 px-1 pb-3 ${
                  isActiveMenuItem(menuItem.href)
                    ? "border-primary font-bold"
                    : "border-transparent"
                }`}
              >
                <menuItem.icon
                  className={`h-4 w-4 shrink-0 ${
                    isActiveMenuItem(menuItem.href) ? "text-primary" : ""
                  }`}
                />
                <span>{menuItem.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
