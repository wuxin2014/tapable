// https://blog.csdn.net/qq_41581588/article/details/129177247
const SyncHook = require('../SyncHook.js')
const AsyncSeriesHook = require('../AsyncSeriesHook.js')

/**
 * 实例化Hook时，第一参数是字符串数组，代表执行函数的参数个数
 * 同步 => 注册：tap  触发：call
 * 异步 => 注册：tap, tapAsync, tapPromise  触发：call, callAsync, callPromise
 * tap绑定事件的第一个参数是个字符串,并没有实际用处,仅仅是一个注释的作用,第二个参数就是一个回调函数,触发时会执行的函数
 * 
 */
function SyncHookTest() {
    const hook1 = new SyncHook(["arg1", "arg2", "arg3"]);
    hook1.tap('hook2', (arg1, arg2, arg3) => console.log(arg1, arg2, arg3)) //1,2,3
    hook1.call(1,2,3)
}

function AsyncSeriesHookTest() {
    debugger
    const hook = new AsyncSeriesHook(['arg1', 'arg2', 'arg3']);
    
    console.time('timer');
    
    // 注册事件
    hook.tapAsync('flag1', (arg1, arg2, arg3, callback) => {
        console.log('flag1:', arg1, arg2, arg3);
        setTimeout(() => {
            // 1s后调用callback表示 flag1执行完成
            callback();
        }, 1000);
    });
    
    hook.tapPromise('flag2', (arg1, arg2, arg3) => {
        console.log('flag2:', arg1, arg2, arg3);
        // tapPromise返回Promise
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
    });

    hook.tap('flag3', (arg1) => {
        console.log('flag3==', arg1)
    })
    
    // 调用事件并传递执行参数，后面callback函数只执行一次
    hook.callAsync('19Qingfeng', 'wang', 'haoyu', () => {
        console.log('全部执行完毕 done');
        console.timeEnd('timer');
    })
}

AsyncSeriesHookTest()
