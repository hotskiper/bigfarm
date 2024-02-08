import React, { useState, useRef, useEffect } from 'react';
import Text from '../../atoms/Text/Text.js';

const KEY_CODES = {
    ENTER: 13,
    SPACE: 32,
    DOWN_ARROW: 40
};
const Select = ({ options = [], label = "Please select", onOptionSelected: handler, renderOption, }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [overlayTop, setOverlayTop] = useState(0);
    useState([]);
    const labelRef = useRef(null);
    useEffect(() => {
        setOverlayTop((labelRef.current?.offsetHeight || 0) + 10);
    }, [labelRef.current?.offsetHeight]);
    const onOptionSelected = (option, optionIndex) => {
        if (handler)
            handler(option, optionIndex);
        setSelectedIndex(optionIndex);
        setIsOpen(false);
    };
    const onLabelClick = () => {
        setIsOpen(!isOpen);
    };
    const onButtonKeyDown = (event) => {
        event.preventDefault();
        if ([KEY_CODES.ENTER, KEY_CODES.SPACE, KEY_CODES.DOWN_ARROW].includes(event.keyCode)) {
            setIsOpen(true);
        }
    };
    return (React.createElement("div", { className: 'dse-select' },
        React.createElement("button", { role: "menu", "aria-controls": "dse-select-list", "aria-haspopup": true, "aria-expanded": isOpen ? true : undefined, ref: labelRef, className: 'dse-select__label', onKeyDown: onButtonKeyDown, onClick: () => {
                onLabelClick();
            } },
            React.createElement(Text, null, selectedIndex === null
                ? label
                : options[selectedIndex].label),
            React.createElement("svg", { width: '1rem', height: '1rem', xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', strokeWidth: 1.5, stroke: 'currentColor', className: `dse-select__caret ${isOpen
                    ? "dse-select__caret--open"
                    : "dse-select__caret--closed"}` },
                React.createElement("path", { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'm4.5 15.75 7.5-7.5 7.5 7.5' }))),
        isOpen && (React.createElement("ul", { id: "dse-select-list", style: { top: overlayTop }, className: 'dse-select__overlay' }, options.map((option, optionIndex) => {
            const isSelected = optionIndex === selectedIndex;
            const renderOptionProps = {
                isSelected,
                option,
                getOptionRecommendedProps: (overrideProps = {}) => {
                    return {
                        className: `dse-select__option ${isSelected
                            ? "dse-select__option--selected"
                            : ""}`,
                        key: option.value,
                        onClick: () => onOptionSelected(option, optionIndex),
                        ...overrideProps
                    };
                },
            };
            if (renderOption) {
                return renderOption(renderOptionProps);
            }
            return (React.createElement("li", { className: `dse-select__option ${isSelected
                    ? "dse-select__option--selected"
                    : ""}`, onClick: () => {
                    onOptionSelected(option, optionIndex);
                }, key: option.value },
                React.createElement(Text, null, option.label),
                isSelected && (React.createElement("svg", { width: '1rem', height: '1rem', xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', strokeWidth: 1.5, stroke: 'currentColor', className: 'w-6 h-6' },
                    React.createElement("path", { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'm4.5 12.75 6 6 9-13.5' })))));
        })))));
};

export { Select as default };
//# sourceMappingURL=Select.js.map
