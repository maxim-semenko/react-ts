import {combineReducers} from "redux";
import {breedReducer} from "./BreedReducer";
import {combineEpics} from "redux-observable";
import {fetchBreedEpic, fetchBreedsEpic} from "../epics/BreedEpic";

// There is store all reducers for work with any entity
export const rootReducer = combineReducers({
    breed: breedReducer,
})

export const rootEpic = combineEpics(
    fetchBreedsEpic,
    fetchBreedEpic,
)

export type RootStateType = ReturnType<typeof rootReducer>
