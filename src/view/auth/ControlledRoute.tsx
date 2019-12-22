/* @flow */
import React, { ComponentType } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuthenticated } from 'src/view/hooks';

interface Props {
    component: ComponentType<any>;
    [x: string]: any;
}

export const PrivateRoute = ({
    component: Component,
    ...props
}: Props): JSX.Element => {
    const isAuthenticated = useAuthenticated();

    return (
        <Route
            {...props}
            // eslint-disable-next-line react/jsx-no-bind
            render={matchProps =>
                isAuthenticated ? (
                    <Component {...matchProps} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

export const PublicOnlyRoute = ({
    component: Component,
    ...props
}: Props): JSX.Element => {
    const isAuthenticated = useAuthenticated();

    return (
        <Route
            {...props}
            // eslint-disable-next-line react/jsx-no-bind
            render={matchProps =>
                !isAuthenticated ? (
                    <Component {...matchProps} />
                ) : (
                    <Redirect to="/" />
                )
            }
        />
    );
};
