"use client";

// import { useUser } from "@saas/auth/hooks/use-user";
import { ColorModeToggle } from "@shared/components/ColorModeToggle";
// import { LocaleSwitch } from "@shared/components/LocaleSwitch";
import { Logo } from "@shared/components/Logo";
import { Button } from "@ui/components/Button";
import { Icon } from "@ui/components/Icon";
import { Sheet, SheetContent, SheetTrigger } from "@ui/components/Sheet";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useIsClient } from "usehooks-ts";
// import { Banner } from "./Banner";

export function NavBar() {
  // const t = useTranslations();
  // const { user, loaded: userLoaded } = useUser();
  // const locale = useLocale();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isClient = useIsClient();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const menuItems: {
    label: string;
    href: string;
  }[] = [
    {
      label: "Pricing",
      href: `/pricing`,
    },
    {
      label: "Blogs",
      href: "/blog",
    },
  ];

  return (
    <nav
      className={`bg-background/80 fixed left-0 top-0 z-20 w-full backdrop-blur-lg`}
      data-test="navigation"
    >
      {/* <Banner /> */}

      <div className="container">
        <div className="flex items-center gap-6 py-8 justify-stretch">
          <div className="flex justify-start flex-1">
            <Link
              href="/"
              className="block hover:no-underline active:no-underline"
            >
              <Logo />
            </Link>
          </div>

          <div className="items-center justify-center flex-1 hidden md:flex">
            {menuItems.map((menuItem) => (
              <Link
                key={menuItem.href}
                href={menuItem.href}
                className="block px-3 py-2 text-lg"
              >
                {menuItem.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-end flex-1 gap-3">
            <ColorModeToggle />
            {/* <LocaleSwitch /> */}

            <Sheet
              open={mobileMenuOpen}
              onOpenChange={(open) => setMobileMenuOpen(open)}
            >
              <SheetTrigger asChild>
                <Button className="md:hidden" size="icon" variant="outline">
                  <Icon.menu />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[250px]" side="right">
                <div className="flex flex-col items-start justify-center">
                  {menuItems.map((menuItem) => (
                    <Link
                      key={menuItem.href}
                      href={menuItem.href}
                      className="block px-3 py-2 text-lg"
                    >
                      {menuItem.label}
                    </Link>
                  ))}

                  <Link
                    key={false ? "dashboard" : "login"}
                    href={false ? `/app` : "/auth/login"}
                    className="block px-3 py-2 text-lg"
                    // prefetch={!user}
                  >
                    {"Login"}
                  </Link>
                </div>
              </SheetContent>
            </Sheet>

            {isClient && (
              <>
                {false ? (
                  <Button
                    key="dashboard"
                    className="hidden md:block"
                    asChild
                    variant="ghost"
                  >
                    <Link href="/app">{"Dashboard"}</Link>
                  </Button>
                ) : (
                  <Button
                    key="login"
                    className="hidden md:block"
                    asChild
                    variant="ghost"
                  >
                    <Link href="/auth/login">{"Login"}</Link>
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
