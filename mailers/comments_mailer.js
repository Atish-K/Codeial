const nodeMailer = require('../config/nodemailer');

// this is another way of exporting a method
exports.newComment = (comment) => {
    console.log('Inside newComment mailer', comment);

    nodeMailer.transporter.sendMail({
        from: 'aatish.0075@gmail.com',
        to: comment.user.email,
        subject: "new Comment Published",
        html: '<h1>Yup, your comment is now published! </h1>'
    }, (err, info) =>{
        if(err){
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Messege sent', info);
        return;
    });
}