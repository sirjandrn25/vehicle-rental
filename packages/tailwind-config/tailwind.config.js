import { shadcnPreset } from "./lib/shadcn-preset";

module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}",
        "../../packages/ui/**/*.{js,ts,jsx,tsx}",
        "../../packages/ui/components/**/*.{js,ts,jsx,tsx}",
    ],
    presets: [shadcnPreset],
};
