if (typeof Object.create === 'function') {
  console.log("implementation from standard node.js 'util' module");
  // implementation from standard node.js 'util' module
  window.inherits = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  console.log("old school shim for old browsers");
  // old school shim for old browsers
  window.inherits = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


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

function B() { 
    // implements object attributs from super object
    A.call(this);
    if (typeof(this.name) !== 'undefined') {
        this.name = "BBBB";
    }   
}


inherits(B, A);

new B().sayName();


// use defineClass function ('defineClass' is defined in define_class.js at the root of this repo)

var C = defineClass(A, function(name) {
     console.log("init name: " + name);
     console.log("init this.name: " + this.name);
     if (typeof(this.name) !== 'undefined') {
         this.name = name;
     }   
});

var c = new C("CCCC");
c.sayName();
console.log(c);


// provent chrome console print 'undefined' at the end
"";
