// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AppState {}

export interface ErrorState {
    errorsQueue: Array<Error>;
    currentError?: Error;
}

export interface FetchingState {
    fetching: boolean;
    fetchingCount: number;
}
