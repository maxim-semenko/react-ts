import {Epic, ofType} from "redux-observable";
import {catchError, map, mergeMap} from "rxjs/operators";
import {from, of} from "rxjs";
import {fetchBreedAction, fetchBreedsAction} from "../actions/BreedsAction";
import BreedService from "../../service/BreedService";

export const fetchBreedsEpic: Epic = action$ => (action$.pipe(
    ofType(fetchBreedsAction.request),
    mergeMap(
        () => from(BreedService.getAll()).pipe(
            map(response => fetchBreedsAction.success(response.data),
                catchError(err => of(fetchBreedsAction.failure(err)))
            )
        )
    )
));

export const fetchBreedEpic: Epic = action$ => (action$.pipe(
    ofType(fetchBreedAction.request),
    mergeMap(
        ({payload}) => from(BreedService.getBreedByName(payload)).pipe(
            map(response => fetchBreedAction.success(response.data),
                catchError(err => of(fetchBreedAction.failure(err)))
            )
        )
    )
));