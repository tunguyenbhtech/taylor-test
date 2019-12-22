import * as R from 'ramda';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { PrivateRoute, PublicOnlyRoute } from './auth/ControlledRoute';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'react-bootstrap/Button';
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
                {/* <PrivateRoute exact component={HomePage} path='/' />
          <Route exact component={PrivacyPage} path='/privacy' />
          <Route exact component={TermsOfServicePage} path='/terms' />
          <Route exact component={SecurityStatementPage} path='/security' />
          <PublicOnlyRoute component={LoginPage} path='/login' />
          <PublicOnlyRoute component={ResetRequestVM} path='/reset-password' />
          <PublicOnlyRoute component={ResetPasswordVM} path='/reset/:token' />
          <PrivateRoute component={AccoutingPage} path='/accounting' />
          <PrivateRoute component={InvoicePage} path='/invoice/:id/:clientId/:projectId?' />
          <PrivateRoute component={InvoicePaymentPage} path='/invoice-payment/:clientId/:projectId?' />
          <PrivateRoute component={ PaymentPage } path='/payment' /> 
          <PrivateRoute component={ PaymentMethods } path='/payment-methods' />
          <PrivateRoute component={ AccountSettingsPage } path='/account-settings' /> */}
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
