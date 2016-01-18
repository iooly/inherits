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

function old_inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
}

function Base(name, desc) {
    console.log("init desc: " + desc);
    this.desc = desc;
}

Base.prototype.sayDesc = function() {
    console.log('desc is: ' + this.desc);
};


function A() {
    this.name = "AAAAA";
    this.sayHello = function(){
        console.log("Hello, " + this.name);
    };
}

A.fn = A.prototype = {
    sayName:function(){
        console.log("My name is: " + this.name);
    }
};

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

var B = defineClass([Base, A], function(name) {
     console.log("init name: " + name);
     console.log("init this.name: " + this.name);
     if (typeof(this.name) !== 'undefined') {
         this.name = name;
     };   
});

B.prototype.engry = function() {
      console.log("I'm engry, " + this.name);
};


var b =new B("xxx", "ssssssssssssssssss");


b.engry();
b.sayDesc();

console.log(b);

"";
