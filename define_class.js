// define a class with implation

function defineClass(superCtor, def) {
    inherits(def, superCtor);
    return function() {
        var obj  = this;
        if (Object.setPrototypeOf) {
             Object.setPrototypeOf(obj, def.prototype);
        } else {
             obj.__proto__ = def.prototype;
        }
        superCtor.call(obj);
        def.apply(obj, arguments);
        return obj;
    }
}
