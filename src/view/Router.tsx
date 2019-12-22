import * as R from 'ramda';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { PrivateRoute, PublicOnlyRoute } from './auth/ControlledRoute';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'react-bootstrap/Button';
import CommitListPage from './CommitList/CommitListVM';
import { ErrorActions } from 'src/state/_actions';
import { ErrorRedux } from 'src/state/reducers';
import Modal from 'react-bootstrap/Modal';

/**
 * handle showing app global error modal
 *
 */
const useErrorModal = () => {
    // current error from redux
    const currentError = useSelector(
        R.pipe(
            ErrorRedux.getReducerState,
            ErrorRedux.selectors.getCurrentError,
        ),
    );

    // dispatch current error finish action
    const dispatch = useDispatch();
    const currentErrorFinish = useCallback(() => {
        dispatch(ErrorActions.currentErrorFinish());
    }, [dispatch]);

    // modal display state
    const [showModal, setShowModal] = useState(false);

    const onModalOkClick = useCallback<() => void>(() => {
        // close modal and dispatch current error finish action
        setShowModal(false);
        currentErrorFinish();
    }, [currentErrorFinish]);

    // display new modal error whenever there is new error
    useEffect(() => {
        if (!currentError) {
            return;
        }

        setShowModal(true);
    }, [currentError]);

    return {
        currentError,
        showModal,
        onModalOkClick,
    };
};

const Router = () => {
    const { currentError, showModal, onModalOkClick } = useErrorModal();

    return (
        <BrowserRouter>
            <Switch>
                <Route component={CommitListPage} />
            </Switch>

            <Modal
                // backdrop='static'
                className="p-0"
                show={showModal}
            >
                <Modal.Header closeButton className="border-bottom-0">
                    <h2>{`Error`}</h2>
                </Modal.Header>
                <Modal.Body>{currentError && currentError.message}</Modal.Body>
                <Modal.Footer className="border-top-0">
                    <Button
                        className="font-weight-bold"
                        variant="danger"
                        onClick={onModalOkClick}
                    >
                        {`Ok`}
                    </Button>
                </Modal.Footer>
            </Modal>
        </BrowserRouter>
    );
};

export default Router;
