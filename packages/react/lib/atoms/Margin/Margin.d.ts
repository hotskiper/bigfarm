import React from 'react';
import { Spacing } from '@bigfarm/foundation';
interface MarginProps {
    space?: keyof typeof Spacing;
    children: any;
    left?: boolean;
    right?: boolean;
    top?: boolean;
    bottom?: boolean;
}
declare const Margin: React.FC<MarginProps>;
export default Margin;
