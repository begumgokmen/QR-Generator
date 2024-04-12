import inquirer from 'inquirer';
import qr from 'qr-image';
import { writeFile, createWriteStream } from 'fs';

inquirer.prompt([
  {
    type: 'input',
    name: 'url',
    message: 'Please provide the URL for the QR code:',
    validate: input => /^https?:\/\/.+\..+/.test(input) 
        ? true : 'Please enter a valid URL starting with http:// or https://'
  }
])
.then(answer => {
    const qrCode = qr.image(answer.url, { type: 'png' });
    const outputStream = createWriteStream('qr_img.png');
    qrCode.pipe(outputStream);

    writeFile('URL.txt', answer.url, err => {
      if (err) {
        console.error('An error occurred while writing the URL to file:', err);
      } else {
        console.log('URL saved to URL.txt and QR code saved to qr_img.png.');
        console.log('Please restart the program if you want to generate a new QR code.');
      }
    });
})
.catch(error => {
  console.error('An error occurred:', error);
});
