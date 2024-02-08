import React from "react";
import Select from './Select'
import {render} from '@testing-library/react'

const options = [
    { label: "black", value: "black" },
    { label: "green", value: "green" },
    { label: "pink", value: "pink" },
];

test('renders all options passed to it', () => {
    const { getAllByRole} = render(<Select options={options} />)

    expect(getAllByRole('menuitemradio')).toHaveLength(options.length)
})