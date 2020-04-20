import { AppThunk } from 'src/state/common';
import { ErrorActions, FetchingActions } from 'src/state/_actions';

const requestFailure = (error?: Error): AppThunk => dispatch => {
    if (!error) {
        return;
    }

    // add error to queue
    if (typeof error === 'string') {
        dispatch(ErrorActions.errorsQueueAppend(new Error(error)));
    } else if (error instanceof Error) {
        dispatch(ErrorActions.errorsQueueAppend(error));
    }

    // reduce 1 fetch counter when error happens
    dispatch(FetchingActions.stopped());
};

export default {
    requestFailure,
};
