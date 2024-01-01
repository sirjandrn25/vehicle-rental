"use client";

import { Button } from "@ui/components/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@ui/components/DropdownMenu";
import { Icon } from "@ui/components/Icon";
import { useTheme } from "next-themes";
import { useState } from "react";
import { useIsClient } from "usehooks-ts";

export function ColorModeToggle() {
  const { resolvedTheme, setTheme, theme } = useTheme();
  const [value, setValue] = useState<string>(theme ?? "system");
  const isClient = useIsClient();

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

  if (!isClient) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" data-test="color-mode-toggle">
          {resolvedTheme === "light" ? (
            <Icon.lightMode className="w-4 h-4" />
          ) : (
            <Icon.darkMode className="w-4 h-4" />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(value) => {
            setTheme(value);
            setValue(value);
          }}
        >
          {colorModeOptions.map((option) => (
            <DropdownMenuRadioItem
              key={option.value}
              value={option.value}
              data-test={`color-mode-toggle-item-${option.value}`}
            >
              <option.icon className="w-4 h-4 mr-2 opacity-50" /> {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
