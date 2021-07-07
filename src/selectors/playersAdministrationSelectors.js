import {createSelector} from "reselect";

export const getPlayers = createSelector(
    state => state,
    state => state.players
)