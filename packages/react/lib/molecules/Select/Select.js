import React, { useState, useRef, useEffect, createRef } from 'react';
import Text from '../../atoms/Text/Text.js';

const getPreviousOptionIndex = (currentIndex, options) => {
    if (currentIndex === null) {
        return 0;
    }
    if (currentIndex === 0) {
        return options.length - 1;
    }
    return currentIndex - 1;
};
const getNextOptionIndex = (currentIndex, options) => {
    if (currentIndex === null) {
        return 0;
    }
    if (currentIndex === options.length - 1) {
        return 0;
    }
    return currentIndex + 1;
};
const Select = ({ options = [], label = "Please select", onOptionSelected: handler, renderOption, }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [highlightedIndex, setHighlightedIndex] = useState(null);
    const [overlayTop, setOverlayTop] = useState(0);
    const [optionRefs, setOptionRefs] = useState([]);
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
    const highlightOption = (optionIndex) => {
        setHighlightedIndex(optionIndex);
    };
    const onButtonKeyDown = (event) => {
        event.preventDefault();
        if (['Enter', '', 'ArrowDown'].includes(event.key)) {
            setIsOpen(true);
            highlightOption(0);
        }
    };
    useEffect(() => {
        setOptionRefs(options.map((_) => createRef()));
    }, [options.length]);
    useEffect(() => {
        if (highlightedIndex !== null && isOpen) {
            const ref = optionRefs[highlightedIndex];
            if (ref && ref.current) {
                ref.current.focus();
            }
        }
    }, [isOpen, highlightedIndex]);
    // console.log(1, optionRefs);
    const onOptionKeyDown = (event) => {
        console.log(event.key);
        if (event.key === 'Escape') {
            setIsOpen(false);
            return;
        }
        if (event.key === 'ArrowDown') {
            highlightOption(getNextOptionIndex(highlightedIndex, options));
        }
        if (event.key === 'ArrowUp') {
            highlightOption(getPreviousOptionIndex(highlightedIndex, options));
        }
        if (event.key === 'Enter') {
            onOptionSelected(options[highlightedIndex], highlightedIndex);
        }
    };
    return (React.createElement("div", { className: 'dse-select' },
        React.createElement("button", { "data-testid": 'DseSelectButton', role: 'menu', "aria-controls": 'dse-select-list', "aria-haspopup": true, "aria-expanded": isOpen ? true : undefined, ref: labelRef, className: 'dse-select__label', onKeyDown: onButtonKeyDown, onClick: () => {
                onLabelClick();
            } },
            React.createElement(Text, null, selectedIndex === null
                ? label
                : options[selectedIndex].label),
            React.createElement("svg", { width: '1rem', height: '1rem', xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', strokeWidth: 1.5, stroke: 'currentColor', className: `dse-select__caret ${isOpen
                    ? "dse-select__caret--open"
                    : "dse-select__caret--closed"}` },
                React.createElement("path", { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'm4.5 15.75 7.5-7.5 7.5 7.5' }))),
        isOpen && (React.createElement("ul", { id: 'dse-select-list', style: { top: overlayTop }, className: 'dse-select__overlay' }, options.map((option, optionIndex) => {
            const isSelected = optionIndex === selectedIndex;
            const isHighlighted = optionIndex === highlightedIndex;
            const ref = optionRefs[optionIndex];
            const renderOptionProps = {
                isSelected,
                option,
                getOptionRecommendedProps: (overrideProps = {}) => {
                    return {
                        ref,
                        'aria-checked': isSelected ? true : undefined,
                        'aria-label': option.label,
                        tabIndex: isHighlighted ? -1 : 0,
                        role: "menuitemradio",
                        className: `dse-select__option 
                                        ${isSelected ? "dse-select__option--selected" : ""} 
                                        ${isHighlighted ? "dse-select__option--highlighted" : ""}
                                    `,
                        key: option.value,
                        onMouseEnter: () => highlightOption(optionIndex),
                        onMouseLeave: () => highlightOption(null),
                        onKeyDown: onOptionKeyDown,
                        onClick: () => onOptionSelected(option, optionIndex),
                        ...overrideProps,
                    };
                },
            };
            if (renderOption) {
                return renderOption(renderOptionProps);
            }
            return (React.createElement("li", { ...renderOptionProps.getOptionRecommendedProps() },
                React.createElement(Text, null, option.label),
                isSelected && (React.createElement("svg", { width: '1rem', height: '1rem', xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', strokeWidth: 1.5, stroke: 'currentColor', className: 'w-6 h-6' },
                    React.createElement("path", { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'm4.5 12.75 6 6 9-13.5' })))));
        })))));
};

export { Select as default };
//# sourceMappingURL=Select.js.map
