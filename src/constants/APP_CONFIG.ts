export default {
    // app specific
    displayName: 'taylor_test',
    QUERY_PAGE_SIZE: 10,
    timerTick: 30, // seconds
    // generic config
    defaultAnimationDelay: 250, // ms
    defaultListEndReachedThreshold: 0.2,
    delayTextInputDebounce: 250,
    longAnimationDelay: 1000, // ms
    prefixReducer: 'taylor_test',
    dateFormat: 'MM/dd/yyyy',
    defaultCurrency: {
        symbol: '$',
    },
    // env
    isDev: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
};
