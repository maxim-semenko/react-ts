import {ActionType, createAction, createAsyncAction} from "typesafe-actions";

export const GET_BREEDS_REQUEST = "GET_BREEDS_REQUEST" as const
export const GET_BREEDS_SUCCESS = "GET_BREEDS_SUCCESS" as const
export const GET_BREEDS_FAILED = "GET_BREEDS_FAILED" as const

export const GET_BREED_REQUEST = "GET_BREED_REQUEST" as const
export const GET_BREED_SUCCESS = "GET_BREED_SUCCESS" as const
export const GET_BREED_FAILED = "GET_BREED_FAILED" as const

export const ADD_FAVORITE = "ADD_FAVORITE" as const
export const REMOVE_FAVORITE = "REMOVE_FAVORITE" as const
export const LOAD_FAVORITE = "LOAD_FAVORITE" as const

export const SET_CURRENT_BREED = "SET_CURRENT_BREED" as const

export const LOAD_ORIGINS = "LOAD_ORIGINS" as const
export const LOAD_COUNTRY_CODES = "LOAD_COUNTRY_CODES" as const

export const CREATE_NEW_BREED = "CREATE_NEW_BREED" as const

export const addFavorite = createAction(ADD_FAVORITE)<string>()
export const removeFavorite = createAction(REMOVE_FAVORITE)<string>()
export const loadFavorite = createAction(LOAD_FAVORITE)<any[]>()
export const setCurrentBreed = createAction(SET_CURRENT_BREED)<any>()

export const loadOrigins = createAction(LOAD_ORIGINS)<any[]>()
export const loadCountryCodes = createAction(LOAD_COUNTRY_CODES)<any[]>()


export const createNewBreed = createAction(CREATE_NEW_BREED)<any[]>()


export const fetchBreedsAction = createAsyncAction(
    GET_BREEDS_REQUEST,
    GET_BREEDS_SUCCESS,
    GET_BREEDS_FAILED,
)<boolean, any[], string>();

export const fetchBreedAction = createAsyncAction(
    GET_BREED_REQUEST,
    GET_BREED_SUCCESS,
    GET_BREED_FAILED,
)<string, any, string>();


const actions = {
    fetchBreedsAction, fetchBreedAction, addFavorite, removeFavorite, loadFavorite,
    setCurrentBreed, loadOrigins, loadCountryCodes, createNewBreed
}
export type BreedActionType = ActionType<typeof actions>