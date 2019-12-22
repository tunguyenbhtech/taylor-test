import React, { ReactNode } from 'react';

import { Provider } from 'react-redux';
import { Store } from 'redux';

interface Props {
    store: Store;
    children: ReactNode;
}

export default ({ store, children }: Props): JSX.Element => (
    <Provider store={store}>{children}</Provider>
);
