import {createReducer} from "typesafe-actions";
import {
    ADD_FAVORITE,
    BreedActionType, GET_BREED_FAILED, GET_BREED_REQUEST, GET_BREED_SUCCESS,
    GET_BREEDS_FAILED,
    GET_BREEDS_REQUEST,
    GET_BREEDS_SUCCESS, LOAD_FAVORITE, REMOVE_FAVORITE, SET_CURRENT_BREED
} from "../actions/BreedsAction";


// Мой тип
type BreedType = {
    breeds: any[],
    favoriteBreedsNameStorage: any[],
    breed: any,
    loading: boolean,
    error: string,
}

// Инициализируем состояние
const initialState: BreedType = {
    breeds: [],
    favoriteBreedsNameStorage: [],
    breed: null,
    loading: false,
    error: '',
}

export const breedReducer = createReducer<BreedType, BreedActionType>(
    initialState, {
        [GET_BREEDS_REQUEST]: (state, {payload: data}) => {
            return {
                ...state, loading: data
            }
        },
        [GET_BREEDS_SUCCESS]: (state, {payload: data}) => {
            return {
                ...state, breeds: data, loading: false, breedsTest: data,
            }
        },
        [GET_BREEDS_FAILED]: (state, {payload: text}) => {
            return {
                ...state, error: "Breeds failed: " + text
            }
        },
        [GET_BREED_REQUEST]: (state) => {
            return {
                ...state, loading: true
            }
        },
        [GET_BREED_SUCCESS]: (state, {payload: data}) => {
            return {
                ...state, breed: data[0], loading: false
            }
        },
        [GET_BREED_FAILED]: (state, {payload: text}) => {
            return {
                ...state, error: "Breed failed: " + text
            }
        },
        [ADD_FAVORITE]: (state, {payload: name}) => {
            return {
                ...state,
                favoriteBreedsNameStorage: [...state.favoriteBreedsNameStorage, name],
            }
        },
        [REMOVE_FAVORITE]: (state, {payload: name}) => {
            return {
                ...state, favoriteBreedsNameStorage: state.favoriteBreedsNameStorage.filter(item => item !== name),
            }
        },
        [LOAD_FAVORITE]: (state, {payload: array}) => {
            return {
                ...state, favoriteBreedsNameStorage: array,
            }
        },
        [SET_CURRENT_BREED]: (state, {payload: data}) => {
            return {
                ...state, breed: data,
            }
        },
    })