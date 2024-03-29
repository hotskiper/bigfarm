import React from 'react'
import Color from './Color'
import { text, select } from '@storybook/addon-knobs'
import { Spacing } from '@bigfarm/foundation'

import '@bigfarm/scss/lib/Utilities.css'

export default {
  title: 'Atoms/Color',
}

export const common = () => <Color hexCode={text('HexCode', 'pink')} />

export const CustomDimensions = () => (
  <Color
    hexCode="pink"
    width={select('Width', Object.values(Spacing), 'xxl')}
    height={select('Height', Object.values(Spacing), 'xxl')}
  />
)
