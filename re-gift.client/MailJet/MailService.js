
const mailjet = require('node-mailjet').connect('2f8d3127794767755803c6d2e7657a74', 'dce56c4f405c28c89d24410e8ff9d0bf');

export const sendEmail = (email, receiptHtml) => {
    mailjet.post('send', { version: 'v3.1' }).request({
        Messages: [
            {
                From: {
                    Email: 'your-email@example.com',
                    Name: 'Your Name'
                },
                To: [
                    {
                        Email: email
                    }
                ],
                Subject: 'Your Purchase Receipt',
                HTMLPart: receiptHtml
            }
        ]
    })
        .then(result => {
            console.log('Email sent successfully:', result.body);
        })
        .catch(err => {
            console.error('Error sending email:', err);
        });
};