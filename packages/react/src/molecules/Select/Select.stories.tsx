import React from "react";
import Select from "./Select";

import "@ds.e/scss/lib/Select.css";

const options = [
    { label: "black", value: "black" },
    { label: "green", value: "green" },
    { label: "pink", value: "pink" },
];

export default {
    title: "Molecules/Select",
};

export const Common = () => <Select options={options} />;

export const RenderOption = () => (
    <Select
        options={options}
        renderOption={({ getOptionRecommendedProps, option, isSelected }) => (
            <span {...getOptionRecommendedProps()}>{option.label} {isSelected? 'selected' : ''}</span>
        )}
    />
);

export const CustomLabel = () => <Select label = 'select a color' options={options} />