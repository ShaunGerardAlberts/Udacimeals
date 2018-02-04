import {
    ADD_RECIPE,
    REMOVE_FROM_CALENDAR
} from '../actions'
import { combineReducers } from 'redux'

// initail state, going to be used by the reducer to set the inital state
const initialCalendarState = {
    sunday: {
        breakfast: null,
        lunch: null,
        dinner: null,
    },
    monday: {
        breakfast: null,
        lunch: null,
        dinner: null,
    },
    tuesday: {
        breakfast: null,
        lunch: null,
        dinner: null,
    },
    wednesday: {
        breakfast: null,
        lunch: null,
        dinner: null,
    },
    thursday: {
        breakfast: null,
        lunch: null,
        dinner: null,
    },
    friday: {
        breakfast: null,
        lunch: null,
        dinner: null,
    },
    saturday: {
        breakfast: null,
        lunch: null,
        dinner: null,
    },
}

// now make reducer
function calendar(state = initialCalendarState, action) {
    const { day, recipe, meal } = action
    switch (action.type) {
        case ADD_RECIPE:
            return {
                ...state,
                [day]: {
                    ...state[day],
                    [meal]: recipe.label
                }
            }
        case REMOVE_FROM_CALENDAR:
            return {
                ...state,
                [day]: {
                    ...state[day],
                    [meal]: null
                }
            }
        default:
            return state
    }
}

function food(state = {}, action) {
    switch (action.type) {
        case ADD_RECIPE:
            const { recipe } = action

            return {
                ...state,
                [recipe.label]: recipe,
            }
        default:
            return state
    }
}

export default combineReducers({
    food,
    calendar,
})
