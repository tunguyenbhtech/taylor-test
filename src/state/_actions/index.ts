import * as AppActions from './App';
import * as ErrorActions from './Error';
import * as FetchingActions from './Fetching';

import * as CommitActions from './Commit';

export { AppActions, ErrorActions, FetchingActions, CommitActions };

export type RootAction =
    | AppActions.AppActions
    | ErrorActions.ErrorActions
    | FetchingActions.FetchingActions
    | CommitActions.CommitActions;
