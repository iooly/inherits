// define a class with implation

function defineClass(superCtor, def) {
   inherits(def, superCtor);
   var delegate = function () {
        superCtor.apply(this, arguments); // call super
        def.apply(this, arguments); // call me
    };
    // delegate of def, just set their prototypes the same
    delegate.prototype = def.prototype;
    return delegate;
}
