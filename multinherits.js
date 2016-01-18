function multinherits() {
    if (arguments.length == 0) {
        return;
    }
 
    var sub = arguments[0];
    var constructor = sub.prototype.constructor;
    var create;
    if (!Object.create) {
        create = function (obj) {
            function f() {}
            f.prototype = obj;
            return new f();
        };
    } else {
        create = Object.create;
    }
 
    var base;
    var len = arguments.length;
    var supers = [];
    for (var i = 1; i < len; i++) {
        supers[i - 1] = arguments[i];
    }
    len--;

    for (var i = 0; i < len; i++) {
        base = create(supers[i].prototype);
        for (var attr in base) {
            sub.prototype[attr] = base[attr];
        }
        delete base;
    }
    sub.prototype.constructor = constructor;
    sub.prototype.suppers = function() {
        return supers;
    }
}
