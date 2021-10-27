/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
// Handles a TS-ESLINT bug: https://stackoverflow.com/questions/63961803/eslint-says-all-enums-in-typescript-app-are-already-declared-in-the-upper-scope
export enum ORDER_PHASES {
    IN_PROGRESS = 'inProgress',
    REVIEW = 'review',
    COMPLETE = 'complete',
}

export type OrderPhaseTypes =
    | ORDER_PHASES.IN_PROGRESS
    | ORDER_PHASES.REVIEW
    | ORDER_PHASES.COMPLETE;
