/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { proxyLazy } from "@utils/lazy";
import { OptionType, SettingsDefinition } from "@utils/types";

import { ThemeLinksComponent } from "./themeLinksComponent";
import * as themeLister from "./themeLister";
import { ToggledTheme } from "./types";

function getToggledThemeSettings(theme: ToggledTheme, onChange: () => void): SettingsDefinition {
    const themeName = theme === ToggledTheme.Light ? "Light Theme" : "Dark Theme";

    return {
        themeStartTime: {
            description: `${themeName} Start Time (HH:MM)`,
            type: OptionType.STRING,
            default: theme === ToggledTheme.Light ? "08:00" : "20:00",
            onChange
        },
        theme: {
            description: themeName,
            type: OptionType.SELECT,
            options: proxyLazy(() => themeLister.getSelectOptions(theme)),
            onChange
        },
        themeURLs: {
            type: OptionType.COMPONENT,
            description: "",
            onChange,
            component: props => ThemeLinksComponent(
                props,
                theme === ToggledTheme.Light ? "lightThemeURLs" : "darkThemeURLs",
                `${themeName} CSS URLs (1 per line)`
            ),
        },
    };
}

const timeRegex = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;

function regexValidateCheck() {
    return {
        isValid: (newValue: string) => newValue.match(timeRegex) !== null
    };
}

export function getPluginSettings(onChange: () => void) {
    const lightThemeSettings = getToggledThemeSettings(ToggledTheme.Light, onChange);
    const darkThemeSettings = getToggledThemeSettings(ToggledTheme.Dark, onChange);

    const settings = definePluginSettings({
        lightThemeStartTime: lightThemeSettings.themeStartTime,
        lightTheme: lightThemeSettings.theme,
        lightThemeURLs: lightThemeSettings.themeURLs,
        darkThemeStartTime: darkThemeSettings.themeStartTime,
        darkTheme: darkThemeSettings.theme,
        darkThemeURLs: darkThemeSettings.themeURLs,
    }, {
        lightThemeStartTime: regexValidateCheck(),
        darkThemeStartTime: regexValidateCheck(),
    });

    return settings;
}
