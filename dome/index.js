console.clear();
 Array.prototype.concat1 = function () {
   let arr = this.slice(0);
   
   console.log('=====',arr)
   arguments.length && [].forEach.call(arguments,(value) => {
     if (Array.isArray(value)) {
      value.forEach(val => {
        arr.push(val);
      })
     } else {
       arr.push(value);
     }
   })
   return arr;
 };


 

console.log([].concat1([111,3]))