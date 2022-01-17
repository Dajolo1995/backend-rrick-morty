const nodemailer = require('nodemailer');
 
 const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'jcssprueba@gmail.com',
        pass: 'pruebasparatrabajar'
    },
    
}
);

module.exports = transporter
