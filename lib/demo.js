// https://blog.csdn.net/qq_41581588/article/details/129177247
const SyncHook = require('./SyncHook.js')
const AsyncSeriesHook = require('./AsyncSeriesHook.js')

function SyncHookTest() {
    // 第一个参数：这个数组有三项，表示生成的这个实例注册回调的时候接收三个参数
    const hook1 = new SyncHook(["arg1", "arg2", "arg3"]);

    // 绑定事件参数第一个是个字符串,并没有实际用处,仅仅是一个注释的作用,第二个参数就是一个回调函数
    hook1.tap('hook2', (arg1, arg2, arg3) => console.log(arg1, arg2, arg3)) //1,2,3

    // 执行绑定的事件
    hook1.call(1,2,3)
}

function AsyncSeriesHookTest() {
    // 初始化同步钩子
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
    
    // 调用事件并传递执行参数
    hook.callAsync('19Qingfeng', 'wang', 'haoyu', () => {
        console.log('全部执行完毕 done');
        console.timeEnd('timer');
    })
}

AsyncSeriesHookTest()
