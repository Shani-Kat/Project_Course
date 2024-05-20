// import {nodemailer} from 'nodemailer'

// export default function Mail() {
// const temporaryPassword = Math.random().toString(36).slice(-8)
// const transporter = nodemailer.createTransport({
//     service: 'Gmail', // או כל שירות מייל אחר
//     auth: {
//       user: '37214728933@mby.co.il',
//       pass: '111111111',
//     },
//   });

//   const mailOptions = {
//     from: '373225928810@mby.co.il',
//     to: email,
//     subject: 'Temporary Password',
//     text: `Your temporary password is: ${temporaryPassword}`,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     res.status(200).json({ message: 'Temporary password sent.' });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to send email.' });
//   }

// }