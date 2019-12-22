export default {
    isLoggingEnable: false,
    timeout: 10000,
    useDummyData: false,
    unauthorizedErrorCode: 401,

    // api
    HOST: process.env.REACT_APP_API_HOST,
    // github
    GITHUB: {
        user: process.env.REACT_APP_GITHUB_USER,
        repo: process.env.REACT_APP_GITHUB_REPO,
    },
};
