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