
export const LoginHash = (req) => {
    return req.headers.cookie.split('; ')
        .map(c => c.split('='))
        .filter(c => c[0] === 'login')
        .shift()[1];
};
