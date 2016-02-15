
import { Action } from 'fluxx';


export const incrementBlue = Action('incrementBlue');

export const incrementRed = Action<number>('incrementRed');
