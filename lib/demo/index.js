// https://blog.csdn.net/qq_41581588/article/details/129177247
const { 
    SyncHook, 
    SyncBailHook, 
    SyncWaterfallHook, 
    SyncLoopHook, 
    AsyncSeriesHook, 
    AsyncSeriesBailHook, 
    AsyncSeriesWaterfallHook,
    AsyncSeriesLoopHook,
    AsyncParalleHook,
    AsyncParalleBailHook
 } = require('../index')

/**
 * 实例化Hook时，第一参数是字符串数组，代表执行函数的参数个数
 * 同步 => 注册：tap  触发：call
 * 异步 => 注册：tap, tapAsync, tapPromise  触发：call, callAsync, callPromise
 * tap绑定事件的第一个参数是个字符串,并没有实际用处,仅仅是一个注释的作用,第二个参数就是一个回调函数,触发时会执行的函数
 * 
 * BasicHook: 仅仅执行钩子注册的事件
 * BailHook: 保险型，如果任意一个执行函数返回了非undefined的值，就会中断(后面不走了)
 * WaterfallHook: 瀑布型，如果瀑布类型的钩子会在注册的事件执行时将事件函数执行非 undefined 的返回值传递给接下来的事件函数作为参数。
 * LoopHook: 如果任意一个执行函数返回了非undefined的值，都会从头开始
 * 
 * Series：串行
 * Paralle：并行
 * 
 */

function SyncHookTest() {
    const hook1 = new SyncHook(["arg1", "arg2", "arg3"]);
    hook1.tap('hook2', (arg1, arg2, arg3) => console.log(arg1, arg2, arg3)) //1,2,3
    hook1.call(1,2,3)
}

function SyncBailHookTest() {
    const hook1 = new SyncBailHook(["arg1", "arg2", "arg3"]);
    hook1.tap('hook1', (arg1, arg2, arg3) => {
        console.log('hook1==', arg1, arg2, arg3)
        return
    })
    hook1.tap('hook2', (arg1, arg2, arg3) => {
        console.log('hook2==', arg1, arg2, arg3)
        return true
    })
    hook1.tap('hook3', (arg1, arg2, arg3) => {
        console.log('hook3==', arg1, arg2, arg3)
    }) 
    hook1.call(1,2,3)
}

function SyncWaterfallHookTest() {
    // 返回非undefined值时，只能修改第一个参数值
    const hook1 = new SyncWaterfallHook(["arg1", "arg2", "arg3"]);
    hook1.tap('hook1', (arg1, arg2, arg3) => {
        console.log('hook1==', arg1, arg2, arg3)
        return 'smeil'
    })
    hook1.tap('hook2', (arg1, arg2, arg3) => {
        console.log('hook2==', arg1, arg2, arg3)
        return true
    })
    hook1.tap('hook3', (arg1, arg2, arg3) => {
        console.log('hook3==', arg1, arg2, arg3)
    }) 
    hook1.call(1,2,3)
}

function SyncLoopHookTest() {
    const hook1 = new SyncLoopHook(["arg1", "arg2", "arg3"]);
    hook1.tap('hook1', (arg1, arg2, arg3) => {
        console.log('hook1==', arg1, arg2, arg3)
        return
    })
    hook1.tap('hook2', (arg1, arg2, arg3) => {
        console.log('hook2==', arg1, arg2, arg3)
        return true
    })
    hook1.tap('hook3', (arg1, arg2, arg3) => {
        console.log('hook3==', arg1, arg2, arg3)
    }) 
    hook1.call(1,2,3)
}

// SyncHookTest()
// SyncBailHookTest()
// SyncWaterfallHookTest()

function AsyncSeriesHookTest() {
    debugger
    const hook = new AsyncSeriesHook(['arg1', 'arg2', 'arg3']);
    
    console.time('timer');
    
    hook.tapAsync('flag1', (arg1, arg2, arg3, callback) => {
        console.log('flag1:', arg1, arg2, arg3);
        setTimeout(() => {
            callback();
        }, 1000);
    });
    
    hook.tapPromise('flag2', (arg1, arg2, arg3) => {
        console.log('flag2:', arg1, arg2, arg3);
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
        console.log('AsyncSeriesHookTest全部执行完毕 done');
        console.timeEnd('timer');
    })

    // hook.callAsync('19Qingfeng', 'wang', 'haoyu') // callback不传会报错
}

function AsyncSeriesBailHookTest() {
    const hook = new AsyncSeriesBailHook(['arg1', 'arg2', 'arg3']);
    
    console.time('timer');
    
    hook.tapAsync('flag1', (arg1, arg2, arg3, callback) => {
        console.log('flag1:', arg1, arg2, arg3);
        setTimeout(() => {
            callback(true);
        }, 1000);
    });
    
    hook.tapPromise('flag2', (arg1, arg2, arg3) => {
        console.log('flag2:', arg1, arg2, arg3);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
    });

    // 调用事件并传递执行参数，后面callback函数只执行一次
    hook.callAsync('19Qingfeng', 'wang', 'haoyu', () => {
        console.log('全部执行完毕 done');
        console.timeEnd('timer');
    })
}

function AsyncSeriesWaterfallHookTest() {
    const hook = new AsyncSeriesWaterfallHook(['arg1', 'arg2', 'arg3']);
    
    console.time('timer');

    hook.tapPromise('flag2', (arg1, arg2, arg3) => {
        console.log('flag2:', arg1, arg2, arg3);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, 1000);
        });
    });
    
    // 注意上下两个函数置换位置，输出结果问题
    hook.tapAsync('flag1', (arg1, arg2, arg3, callback) => {
        console.log('flag1:', arg1, arg2, arg3);
        setTimeout(() => {
            callback();
        }, 1000);
    });
    
    // 调用事件并传递执行参数，后面callback函数只执行一次
    hook.callAsync('19Qingfeng', 'wang', 'haoyu', () => {
        console.log('全部执行完毕 done');
        console.timeEnd('timer');
    })
}

function AsyncSeriesLoopHookTest() {
    const hook = new AsyncSeriesLoopHook(['arg1', 'arg2', 'arg3']);
    
    console.time('timer');
    
    hook.tapPromise('flag2', (arg1, arg2, arg3) => {
        console.log('flag2:', arg1, arg2, arg3);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, 1000);
        });
    });

    hook.tapAsync('flag1', (arg1, arg2, arg3, callback) => {
        console.log('flag1:', arg1, arg2, arg3);
        setTimeout(() => {
            callback();
        }, 1000);
    });
    
    // 调用事件并传递执行参数，后面callback函数只执行一次
    hook.callAsync('19Qingfeng', 'wang', 'haoyu', () => {
        console.log('全部执行完毕 done');
        console.timeEnd('timer');
    })
}

AsyncSeriesHookTest()
// AsyncSeriesBailHookTest()
// AsyncSeriesWaterfallHookTest()


function AsyncParalleHookTest() {
    const hook = new AsyncParalleHook(['arg1', 'arg2', 'arg3']);
    
    console.time('timer');
    
    hook.tapAsync('flag1', (arg1, arg2, arg3, callback) => {
        console.log('flag1:', arg1, arg2, arg3);
        setTimeout(() => {
            callback(true);
        }, 1000);
    });
    
    hook.tapPromise('flag2', (arg1, arg2, arg3) => {
        console.log('flag2:', arg1, arg2, arg3);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
    });
    
    // 调用事件并传递执行参数，后面callback函数只执行一次
    hook.callAsync('19Qingfeng', 'wang', 'haoyu', () => {
        console.log('全部执行完毕 done');
        console.timeEnd('timer');
    })
}

function AsyncParalleBailHookTest() {
    const hook = new AsyncParalleBailHook(['arg1', 'arg2', 'arg3']);
    
    console.time('timer');
    
    hook.tapPromise('flag2', (arg1, arg2, arg3) => {
        console.log('flag2:', arg1, arg2, arg3);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, 1000);
        });
    });

    hook.tapAsync('flag1', (arg1, arg2, arg3, callback) => {
        console.log('flag1:', arg1, arg2, arg3);
        setTimeout(() => {
            callback();
        }, 1000);
    });
    
    // 调用事件并传递执行参数，后面callback函数只执行一次
    hook.callAsync('19Qingfeng', 'wang', 'haoyu', () => {
        console.log('全部执行完毕 done');
        console.timeEnd('timer');
    })
    
}

// AsyncParalleHookTest()