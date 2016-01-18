function multinherits() {
    if (arguments.length == 0) {
        return;
    }
 
    var args = arguments;
    var sub = args[0];
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
    for (var i = 1; i < args.length; i++) {
        base = create(args[i].prototype);
        for (var attr in base) {
            sub.prototype[attr] = base[attr];
        }
        delete base;
    }
    sub.prototype.constructor = constructor;
}
