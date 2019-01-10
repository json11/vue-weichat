import Router from 'vue-router';

import routes from './routes';

export default () => {
    return new Router({
        routes,
        // mode: 'history',
        scrollBehavior(to, from, savePosition) {
            // console.log(to, from, savePosition);
            if(savePosition) {
                return savePosition
            } else {
                return {x: 0, y: 0}
            }
        },
        fallback: true, // 如果不支持 history  自动切换成hash
    })
}