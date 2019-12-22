import * as AppActions from './App';
import * as ErrorActions from './Error';
import * as FetchingActions from './Fetching';

export { AppActions, ErrorActions, FetchingActions };

export type RootAction =
    | AppActions.AppActions
    | ErrorActions.ErrorActions
    | FetchingActions.FetchingActions;
