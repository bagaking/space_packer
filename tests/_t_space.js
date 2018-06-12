let space = require('../src/space.js')

let a = space.create(20, 20, 20)

a.print()
a.set(0,0,1, 35)
a.print()
a.set(0,0,0, 1)
a.print()
console.log(a.deserialize('_24l_9213'))
a.print()
console.log(a.get(0,0,0))
console.log(a.serialize())