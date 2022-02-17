const tx2 = require('tx2');

//
// Expose RPC Methods
//
module.exports = function () {
    
    tx2.action('hello', (reply) => {
        reply({ answer : 'world' });
    });

    return tx2;
};