import React, { useState, useRef, useEffect, KeyboardEventHandler } from "react";
import Text from "@/atoms/Text";

const KEY_CODES = {
    ENTER: 13,
    SPACE: 32,
    DOWN_ARROW: 40
}

interface SelectOption {
    label: string;
    value: string;
}

interface RenderOptionProps {
    isSelected: boolean;
    option: SelectOption;
    getOptionRecommendedProps: (overrideProps?: Object) => Object;
}

interface SelectProps {
    onOptionSelected?: (option: SelectOption, optionIndex: number) => void;
    options?: SelectOption[];
    label?: string;
    renderOption?: (props: RenderOptionProps) => React.ReactNode;
}

const Select: React.FC<SelectProps> = ({
    options = [],
    label = "Please select",
    onOptionSelected: handler,
    renderOption,
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedIndex, setSelectedIndex] = useState<null | number>(null);
    const [overlayTop, setOverlayTop] = useState<number>(0);
    const [optionRefs, setOptionRefs] = useState<React.RefObject<HTMLLIElement>[]>([])
    const labelRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        setOverlayTop((labelRef.current?.offsetHeight || 0) + 10);
    }, [labelRef.current?.offsetHeight]);

    const onOptionSelected = (option: SelectOption, optionIndex: number) => {
        if (handler) handler(option, optionIndex);
        setSelectedIndex(optionIndex);
        setIsOpen(false);
    };

    const onLabelClick = () => {
        setIsOpen(!isOpen);
    };
 
    const onButtonKeyDown: KeyboardEventHandler = (event) => {
        event.preventDefault();
        if([KEY_CODES.ENTER, KEY_CODES.SPACE, KEY_CODES.DOWN_ARROW].includes(event.keyCode)){
            setIsOpen(true)
        }
    }

    return (
        <div className='dse-select'>
            <button 
            role="menu"
            aria-controls="dse-select-list"
                aria-haspopup={true}
                aria-expanded={isOpen?true:undefined}
                ref={labelRef}
                className='dse-select__label'
                onKeyDown={onButtonKeyDown}
                onClick={() => {
                    onLabelClick();
                }}
            >
                <Text>
                    {selectedIndex === null
                        ? label
                        : options[selectedIndex].label}
                </Text>

                <svg
                    width='1rem'
                    height='1rem'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className={`dse-select__caret ${
                        isOpen
                            ? "dse-select__caret--open"
                            : "dse-select__caret--closed"
                    }`}
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='m4.5 15.75 7.5-7.5 7.5 7.5'
                    />
                </svg>
            </button>
            {isOpen && (
                <ul id="dse-select-list" style={{ top: overlayTop }} className='dse-select__overlay'>
                    {options.map((option, optionIndex) => {
                        const isSelected = optionIndex === selectedIndex;
                        const renderOptionProps = {
                            isSelected,
                            option,
                            getOptionRecommendedProps: (overrideProps = {}) => {
                                return {
                                    role: 'menuitemradio',
                                    className: `dse-select__option ${
                                        isSelected
                                            ? "dse-select__option--selected"
                                            : ""
                                    }`,
                                    key: option.value,
                                    onClick: ()=> onOptionSelected(option, optionIndex),
                                    ...overrideProps
                                };
                            },
                        };
                        if (renderOption) {
                            return renderOption(renderOptionProps);
                        }
                        return (
                            <li
                                className={`dse-select__option ${
                                    isSelected
                                        ? "dse-select__option--selected"
                                        : ""
                                }`}
                                onClick={() => {
                                    onOptionSelected(option, optionIndex);
                                }}
                                key={option.value}
                            >
                                <Text>{option.label}</Text>
                                {isSelected && (
                                    <svg
                                        width='1rem'
                                        height='1rem'
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        strokeWidth={1.5}
                                        stroke='currentColor'
                                        className='w-6 h-6'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            d='m4.5 12.75 6 6 9-13.5'
                                        />
                                    </svg>
                                )}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default Select;
