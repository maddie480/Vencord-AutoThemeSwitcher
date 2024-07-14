/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Settings } from "@api/Settings";
import { classes } from "@utils/misc";
import { IPluginOptionComponentProps } from "@utils/types";
import { findLazy } from "@webpack";
import { Forms, React, TextArea } from "@webpack/common";

const TextAreaProps = findLazy(m => typeof m.textarea === "string");

export function ThemeLinksComponent({ setValue }: IPluginOptionComponentProps, id: string, description: string) {
    const [state, setState] = React.useState(Settings.plugins.AutoThemeSwitcher?.[id] ?? null);

    function handleChange(newValue) {
        setState(newValue);
        setValue(newValue);
    }

    return (
        <Forms.FormSection>
            <Forms.FormTitle>{description}</Forms.FormTitle>
            <TextArea
                value={state}
                onChange={handleChange}
                placeholder="Do not change"
                rows={5}
                className={classes(TextAreaProps.textarea, "vc-settings-theme-links")}
            />
        </Forms.FormSection>
    );
}
