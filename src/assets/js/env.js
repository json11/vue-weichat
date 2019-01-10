let baseUrl= '';

if(process.env.NODE_ENV === 'production') {
    baseUrl='https://easy-mock.com/mock/5c061e948f1be27163bf6e1e/wechat';
} else {
    baseUrl='https://easy-mock.com/mock/5c061e948f1be27163bf6e1e/wechat';
}

export {baseUrl}