// define a class with implation

function defineClass(supers, def) {
   if (!(supers instanceof Array)) {
         throw new Error("supers must be an array");
   }

   var tmp=[];
   for (var key in supers) {
        tmp[key] = supers[key];
   }
   tmp.unshift(def);
   multinherits.apply(null, tmp);
   delete tmp;

   var delegate = function () {
        // call supers
        for (var key in supers) {
            supers[key].apply(this, arguments);
        }
        def.apply(this, arguments); // call me
    };
    // delegate of def, just set their prototypes the same
    delegate.prototype = def.prototype;
    return delegate;
}
