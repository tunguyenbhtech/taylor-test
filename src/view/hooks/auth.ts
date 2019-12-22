// import * as R from 'ramda';

// import { UserRedux } from 'src/state/reducers';
// import { useSelector } from 'react-redux';

// hook check if user logged in
export const useAuthenticated = (): boolean => {
    return true; // TODO: not implementing auth for now

    // const user = useSelector(
    //     R.pipe(UserRedux.getReducerState, UserRedux.selectors.getUser),
    // );

    // return Boolean(user);
};
