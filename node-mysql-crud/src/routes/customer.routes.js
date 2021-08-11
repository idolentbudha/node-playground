module.exports = (app)=>{
    const customer = require('../contollers/customer.controller.js');
    
    app.post('/customer/create',customer.create);
    app.get('/customer',customer.getAll)
}