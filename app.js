var express = require('express')
var app = express()
var path = require('path');
var bodyParser = require('body-parser');

const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'aripian.webapp@gmail.com',
		pass: 'aripian123'
	}
})

var port = process.env.PORT || 3000

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + '/public'));

app.use('/scripts', express.static(__dirname + '/node_modules'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
})

app.post('/sendmail',function(req, res){
	
	let mailOptions = {
	    from: 'aripian.webapp@gmail.com', // sender address
	    to: req.body.data.email, // list of receivers
	    subject: 'Terima kasih '+req.body.data.name+' menghubungi kami!', // plain text body
	    html: '<b>Terima kasih '+req.body.data.name+' mengubungi kami!</b>' // html body
	};

	transporter.sendMail(mailOptions, (error, info) => {
	    if (error) {
	        res.json(error);
	    }
	    res.json(info);
	});

})

app.listen(port, function () {
  console.log('App is listening on port '+ port +'!')
})