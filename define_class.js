// define a class with implation

function defineClass(superCtor, def) {
   var tmp = (function () {
        superCtor.call(this);
        def.apply(this, arguments);
    });
    inherits(def, superCtor);
    inherits(tmp, def);
    return tmp;
}
