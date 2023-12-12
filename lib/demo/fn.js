// 1.1-SyncHookTest-call
(function anonymous(arg1, arg2, arg3) {
    "use strict";
    var _context;
    var _x = this._x;
    var _fn0 = _x[0];
    _fn0(arg1, arg2, arg3);
    var _fn1 = _x[1];
    _fn1(arg1, arg2, arg3);
    var _fn2 = _x[2];
    _fn2(arg1, arg2, arg3);
})

// 1.1-SyncHookTest-callAsync
(function anonymous(arg1, arg2, arg3, _callback) {
    "use strict";
    var _context;
    var _x = this._x;
    var _fn0 = _x[0];
    var _hasError0 = false;
    try {
        _fn0(arg1, arg2, arg3);
    } catch(_err) {
        _hasError0 = true;
        _callback(_err);
    }
    if(!_hasError0) {
        var _fn1 = _x[1];
        var _hasError1 = false;
        try {
            _fn1(arg1, arg2, arg3);
        } catch(_err) {
            _hasError1 = true;
            _callback(_err);
        }
        if(!_hasError1) {
            var _fn2 = _x[2];
            var _hasError2 = false;
            try {
                _fn2(arg1, arg2, arg3);
            } catch(_err) {
                _hasError2 = true;
                _callback(_err);
            }
            if(!_hasError2) {
                _callback();
            }
        }
    }
})

// 1.1-SyncHookTest-promise
(function anonymous(arg1, arg2, arg3) {
    "use strict";
    var _context;
    var _x = this._x;
    return new Promise((function(_resolve, _reject) {
        var _sync = true;
        function _error(_err) {
            if(_sync)
                _resolve(Promise.resolve().then((function() { throw _err; })));
            else
                _reject(_err);
        };
        var _fn0 = _x[0];
        var _hasError0 = false;
        try {
            _fn0(arg1, arg2, arg3);
        } catch(_err) {
            _hasError0 = true;
            _error(_err);
        }
        if(!_hasError0) {
            var _fn1 = _x[1];
            var _hasError1 = false;
            try {
                _fn1(arg1, arg2, arg3);
            } catch(_err) {
                _hasError1 = true;
                _error(_err);
            }
            if(!_hasError1) {
                var _fn2 = _x[2];
                var _hasError2 = false;
                try {
                    _fn2(arg1, arg2, arg3);
                } catch(_err) {
                    _hasError2 = true;
                    _error(_err);
                }
                if(!_hasError2) {
                    _resolve();
                }
            }
        }
        _sync = false;
    }));
})

// 1.2-SyncBailHookTest
(function anonymous(arg1, arg2, arg3) {
    "use strict";
    var _context;
    var _x = this._x;
    var _fn0 = _x[0];
    var _result0 = _fn0(arg1, arg2, arg3);
    if(_result0 !== undefined) {
        return _result0;
        ;
    } else {
        var _fn1 = _x[1];
        var _result1 = _fn1(arg1, arg2, arg3);
        if(_result1 !== undefined) {
            return _result1;
            ;
        } else {
        var _fn2 = _x[2];
        var _result2 = _fn2(arg1, arg2, arg3);
            if(_result2 !== undefined) {
                return _result2;
                ;
            } else {
            }
        }
    }
    
})

// 1.3-SyncWaterfallHookTest
(function anonymous(arg1, arg2, arg3) {
    "use strict";
    var _context;
    var _x = this._x;
    var _fn0 = _x[0];
    var _result0 = _fn0(arg1, arg2, arg3);
    if(_result0 !== undefined) {
        arg1 = _result0;
    }
    var _fn1 = _x[1];
    var _result1 = _fn1(arg1, arg2, arg3);
    if(_result1 !== undefined) {
        arg1 = _result1;
    }
    var _fn2 = _x[2];
    var _result2 = _fn2(arg1, arg2, arg3);
    if(_result2 !== undefined) {
        arg1 = _result2;
    }
    return arg1;
})

// 1.4-SyncLoopHookTest
(function anonymous(arg1, arg2, arg3) {
    "use strict";
    var _context;
    var _x = this._x;
    var _loop;
    do {
        _loop = false;
        var _fn0 = _x[0];
        var _result0 = _fn0(arg1, arg2, arg3);
        if(_result0 !== undefined) {
            _loop = true;
        } else {
            var _fn1 = _x[1];
            var _result1 = _fn1(arg1, arg2, arg3);
            if(_result1 !== undefined) {
                _loop = true;
            } else {
                var _fn2 = _x[2];
                var _result2 = _fn2(arg1, arg2, arg3);
                if(_result2 !== undefined) {
                    _loop = true;
                } else {
                    if(!_loop) {
                    }
                }
            }
        }
    } while(_loop);
})

// 2.1-AsyncSeriesHookTest
(function anonymous(arg1, arg2, arg3, _callback) {
    "use strict";
    var _context;
    var _x = this._x;

    function _next1() {
        var _fn2 = _x[2];
        var _hasError2 = false;
        try {
            _fn2(arg1, arg2, arg3);
        } catch(_err) {
            _hasError2 = true;
            _callback(_err);
        }
        if(!_hasError2) {
            _callback();
        }
    }

    function _next0() {
        var _fn1 = _x[1];
        var _hasResult1 = false;
        var _promise1 = _fn1(arg1, arg2, arg3);
        
        if (!_promise1 || !_promise1.then)
            throw new Error('Tap function (tapPromise) did not return promise (returned ' + _promise1 + ')');
        
        _promise1.then((function(_result1) {
            _hasResult1 = true;
            _next1();
        }), function(_err1) {
            if(_hasResult1) throw _err1;
            _callback(_err1);
        });
    }

    var _fn0 = _x[0];
    _fn0(arg1, arg2, arg3, (function(_err0) {
        if(_err0) {
            _callback(_err0);
        } else {
            _next0();
        }
    }));
})

// 2.2-AsyncSeriesBailHookTest
(function anonymous(arg1, arg2, arg3, _callback) {
    "use strict";
    var _context;
    var _x = this._x;

    function _next0() {
        var _fn1 = _x[1];
        var _hasResult1 = false;
        var _promise1 = _fn1(arg1, arg2, arg3);
        if (!_promise1 || !_promise1.then)
            throw new Error('Tap function (tapPromise) did not return promise (returned ' + _promise1 + ')');

        _promise1.then((function(_result1) {
            _hasResult1 = true;
            if(_result1 !== undefined) {
                _callback(null, _result1);
            
            } else {
                _callback();
            }
        }), function(_err1) {
            if(_hasResult1) throw _err1;
            _callback(_err1);
        });
    }

    var _fn0 = _x[0];
    _fn0(arg1, arg2, arg3, (function(_err0, _result0) {
        if(_err0) {
            _callback(_err0);
        } else {
            if(_result0 !== undefined) {
                _callback(null, _result0);
            } else {
                _next0();
            }
        }
    }));
    
})

// 2.3-AsyncSeriesWaterfallHookTest
(function anonymous(arg1, arg2, arg3, _callback) {
    "use strict";
    var _context;
    var _x = this._x;

    function _next0() {
        var _fn1 = _x[1];
        _fn1(arg1, arg2, arg3, (function(_err1, _result1) {
            if(_err1) {
                _callback(_err1);
            } else {
                if(_result1 !== undefined) {
                    arg1 = _result1;
                }
                _callback(null, arg1);
            }
        }));
    }

    var _fn0 = _x[0];
    var _hasResult0 = false;
    var _promise0 = _fn0(arg1, arg2, arg3);
    if (!_promise0 || !_promise0.then)
      throw new Error('Tap function (tapPromise) did not return promise (returned ' + _promise0 + ')');

    _promise0.then((function(_result0) {
        _hasResult0 = true;
        if(_result0 !== undefined) {
            arg1 = _result0;
        }
        _next0();
    }), function(_err0) {
        if(_hasResult0) throw _err0;
        _callback(_err0);
    });
})

// 2.4-AsyncSeriesLoopHookTest
(function anonymous(arg1, arg2, arg3, _callback) {
    "use strict";
    var _context;
    var _x = this._x;

    var _looper = (function() {
        var _loopAsync = false;
        var _loop;
        do {
            _loop = false;
            function _next0() {
                var _fn1 = _x[1];
                _fn1(arg1, arg2, arg3, (function(_err1, _result1) {
                    if(_err1) {
                        _callback(_err1);
                    } else {
                        if(_result1 !== undefined) {
                            _loop = true;
                            if(_loopAsync) _looper();
                        } else {
                            if(!_loop) {
                                _callback();
                            }
                        }
                    }
                }));
            }
            var _fn0 = _x[0];
            var _hasResult0 = false;
            var _promise0 = _fn0(arg1, arg2, arg3);
            if (!_promise0 || !_promise0.then)
                throw new Error('Tap function (tapPromise) did not return promise (returned ' + _promise0 + ')');
            _promise0.then((function(_result0) {
                _hasResult0 = true;
                if(_result0 !== undefined) {
                    _loop = true;
                    if(_loopAsync) _looper();
                } else {
                    _next0();
                }
            }), function(_err0) {
                if(_hasResult0) throw _err0;
                _callback(_err0);
            });
        } while(_loop);
        _loopAsync = true;
    });

    _looper();
})

// 3.1-AsyncParalleHookTest
(function anonymous(arg1, arg2, arg3, _callback) {
    "use strict";
    var _context;
    var _x = this._x;
    do {
        var _counter = 2;
        var _done = (function() {
            _callback();
        });
        if(_counter <= 0) break;
        var _fn0 = _x[0];
        _fn0(arg1, arg2, arg3, (function(_err0) {
            if(_err0) {
                if(_counter > 0) {
                    _callback(_err0);
                    _counter = 0;
                }
            } else {
                if(--_counter === 0) _done();
            }
        }));
        if(_counter <= 0) break;
        var _fn1 = _x[1];
        var _hasResult1 = false;
        var _promise1 = _fn1(arg1, arg2, arg3);
        if (!_promise1 || !_promise1.then)
            throw new Error('Tap function (tapPromise) did not return promise (returned ' + _promise1 + ')');
        _promise1.then((function(_result1) {
            _hasResult1 = true;
            if(--_counter === 0) _done();
        }), function(_err1) {
            if(_hasResult1) throw _err1;
            if(_counter > 0) {
                _callback(_err1);
                _counter = 0;
            }
        });
    } while(false);
    
})

// 3.2-AsyncParalleBailHookTest
(function anonymous(arg1, arg2, arg3, _callback) {
    "use strict";
    var _context;
    var _x = this._x;
    var _results = new Array(2);
    var _checkDone = function() {
        for(var i = 0; i < _results.length; i++) {
            var item = _results[i];
            if(item === undefined) return false;
            if(item.result !== undefined) {
                _callback(null, item.result);
                return true;
            }
            if(item.error) {
                _callback(item.error);
                return true;
            }
        }
        return false;
    }
    do {
        var _counter = 2;
        var _done = (function() {
            _callback();
        });
        if(_counter <= 0) break;
        var _fn0 = _x[0];
        var _hasResult0 = false;
        var _promise0 = _fn0(arg1, arg2, arg3);
        if (!_promise0 || !_promise0.then)
            throw new Error('Tap function (tapPromise) did not return promise (returned ' + _promise0 + ')');
        
        _promise0.then((function(_result0) {
            _hasResult0 = true;
            if(_counter > 0) {
                if(0 < _results.length && (_result0 !== undefined && (_results.length = 1), (_results[0] = { result: _result0 }), _checkDone())) {
                    _counter = 0;
                } else {
                    if(--_counter === 0) _done();
                }
            }
        }), function(_err0) {
            if(_hasResult0) throw _err0;
            if(_counter > 0) {
                if(0 < _results.length && ((_results.length = 1), (_results[0] = { error: _err0 }), _checkDone())) {
                    _counter = 0;
                } else {
                    if(--_counter === 0) _done();
                }
            }
        });

        if(_counter <= 0) break;
        if(1 >= _results.length) {
            if(--_counter === 0) _done();
        } else {
            var _fn1 = _x[1];
            _fn1(arg1, arg2, arg3, (function(_err1, _result1) {
                if(_err1) {
                    if(_counter > 0) {
                        if(1 < _results.length && ((_results.length = 2), (_results[1] = { error: _err1 }), _checkDone())) {
                            _counter = 0;
                        } else {
                            if(--_counter === 0) _done();
                        }
                    }
                } else {
                    if(_counter > 0) {
                        if(1 < _results.length && (_result1 !== undefined && (_results.length = 2), (_results[1] = { result: _result1 }), _checkDone())) {
                            _counter = 0;
                        } else {
                            if(--_counter === 0) _done();
                        }
                    }
                }
            }));
        }
    } while(false);
})