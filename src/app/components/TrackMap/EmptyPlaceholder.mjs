/** @jsx createElement */

import {createElement, Component, createRef} from 'react';
import {calculateBounds} from 'helpers/activity';
import css from './TrackMap.styl';
import {cn} from '../../../helpers';


const EmptyPlaceholder = ({className}) => (
    <div
        className={cn(css.emptyPlaceholder, className)}
    />
);


export default EmptyPlaceholder;
