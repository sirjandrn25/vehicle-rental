"use client";

import { useAuthContext } from "@context/auth.provider";
import { DropdownMenuSub } from "@radix-ui/react-dropdown-menu";
import { UserAvatar } from "@shared/components/UserAvatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@ui/components/DropdownMenu";
import { Icon } from "@ui/components/Icon";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useState } from "react";

export function UserMenu() {
  const { user, handleLogout } = useAuthContext();
  const { setTheme: setCurrentTheme, theme: currentTheme } = useTheme();
  const [theme, setTheme] = useState<string>(currentTheme ?? "system");

  const colorModeOptions = [
    {
      value: "system",
      label: "System",
      icon: Icon.system,
    },
    {
      value: "light",
      label: "Light",
      icon: Icon.lightMode,
    },
    {
      value: "dark",
      label: "Dark",
      icon: Icon.darkMode,
    },
  ];

  if (!user) return null;

  const { name, email } = user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="focus-visible:ring-primary rounded-full outline-none focus-visible:ring-2">
          <UserAvatar name={name ?? ""} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          {name}
          <span className="block text-xs font-normal opacity-70">{email}</span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Color mode selection */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Icon.lightMode className="mr-2 h-4 w-4" /> Color mode
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup
                value={theme}
                onValueChange={(value) => {
                  setTheme(value);
                  setCurrentTheme(value);
                }}
              >
                {colorModeOptions.map((option) => (
                  <DropdownMenuRadioItem
                    key={option.value}
                    value={option.value}
                  >
                    <option.icon className="mr-2 h-4 w-4 opacity-50" />{" "}
                    {option.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        {/* <DropdownMenuSeparator /> */}

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href={`/app/settings/account/general`}>
            <Icon.settings className="mr-2 h-4 w-4" /> Account settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <Icon.docs className="mr-2 h-4 w-4" /> Documentation
          </a>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleLogout}>
          <Icon.logout className="mr-2 h-4 w-4" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
