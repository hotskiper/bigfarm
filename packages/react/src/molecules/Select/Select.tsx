import React, {
    useState,
    useRef,
    useEffect,
    KeyboardEventHandler,
    createRef,
} from "react";
import Text from "@/atoms/Text";


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

const getPreviousOptionIndex = (currentIndex:number|null, options: Array<SelectOption>)=>{
    if(currentIndex === null){
        return 0;
    }
    if(currentIndex === 0){
        return options.length - 1;
    }
    return currentIndex - 1;
}

const getNextOptionIndex = (currentIndex:number|null, options: Array<SelectOption>)=>{
    if(currentIndex === null){
        return 0;
    }
    if(currentIndex === options.length - 1){
        return 0;
    }
    return currentIndex + 1;
}

const Select: React.FC<SelectProps> = ({
    options = [],
    label = "Please select",
    onOptionSelected: handler,
    renderOption,
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedIndex, setSelectedIndex] = useState<null | number>(null);
    const [highlightedIndex, setHighlightedIndex] = useState<null | number>(
        null
    );
    const [overlayTop, setOverlayTop] = useState<number>(0);
    const [optionRefs, setOptionRefs] = useState<
        React.RefObject<HTMLLIElement>[]
    >([]);
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

    const highlightOption = (optionIndex: number | null) => {
        setHighlightedIndex(optionIndex);

    };

    const onButtonKeyDown: KeyboardEventHandler = (event) => {
        event.preventDefault();
        if (
            ['Enter','','ArrowDown'].includes(
                event.key
            )
        ) {
            setIsOpen(true); 
            highlightOption(0)
        }
    };

    useEffect(() => {
        setOptionRefs(options.map((_) => createRef<HTMLLIElement>()));
    }, [options.length]);

    useEffect(()=>{
        if(highlightedIndex !== null && isOpen){
            const ref = optionRefs[highlightedIndex]
            if(ref && ref.current){
                ref.current.focus();
            }
        }
    },[isOpen, highlightedIndex])

    // console.log(1, optionRefs);

   

    const onOptionKeyDown: KeyboardEventHandler = (event) =>{
        console.log(event.key)
        if(event.key === 'Escape'){
            setIsOpen(false)
            return;
        }
        if(event.key === 'ArrowDown'){
            highlightOption(getNextOptionIndex(highlightedIndex, options));
        }
        if(event.key === 'ArrowUp'){
            highlightOption(getPreviousOptionIndex(highlightedIndex, options));
        }
        if(event.key === 'Enter'){
            onOptionSelected(options[highlightedIndex!], highlightedIndex!)
        }
    }

    return (
        <div className='dse-select'>
            <button
                data-testid='DseSelectButton'
                role='menu'
                aria-controls='dse-select-list'
                aria-haspopup={true}
                aria-expanded={isOpen ? true : undefined}
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
                <ul
                    id='dse-select-list'
                    style={{ top: overlayTop }}
                    className='dse-select__overlay'
                >
                    {options.map((option, optionIndex) => {
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
                                    tabIndex: isHighlighted ? -1: 0,
                                    role: "menuitemradio",
                                    className: `dse-select__option 
                                        ${isSelected ? "dse-select__option--selected" : ""} 
                                        ${isHighlighted ? "dse-select__option--highlighted" : ""}
                                    `,
                                    key: option.value,
                                    onMouseEnter: () =>
                                        highlightOption(optionIndex),
                                    onMouseLeave: () => highlightOption(null),
                                    onKeyDown: onOptionKeyDown,
                                    onClick: () =>
                                        onOptionSelected(option, optionIndex),
                                    ...overrideProps,
                                };
                            },
                        };
                        if (renderOption) {
                            return renderOption(renderOptionProps);
                        }
                        return (
                            <li
                                {...renderOptionProps.getOptionRecommendedProps()}
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
