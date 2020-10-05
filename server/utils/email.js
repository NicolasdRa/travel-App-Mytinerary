const nodemailer = require('nodemailer')
const pug = require('pug')
const htmlToText = require('html-to-text')

module.exports = class Email {
  constructor (user, url) {
    this.to = user.email
    this.firstName = user.firstName ? user.firstName : user.userName
    this.url = url
    this.from = `Nicolas di Rago <${process.env.EMAIL_FROM}>`
  }

  newTransport () {
    if (process.env.NODE_ENV === 'production') {
      //Sendgrid - production transport
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD
        }
      })
    }
    //Mailtrap - development transport
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    })
  }

  async send (template, subject) {
    // Actually send the email
    // 1) render html base on a pug template
    const html = pug.renderFile(`views/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject
    })

    // 2) define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html)
    }

    // 3) create transport and send email
    await this.newTransport().sendMail(mailOptions)
  }

  async sendWelcome () {
    await this.send('welcome2', 'Welcome to Mytinerary App')
  }

  async sendPasswordReset () {
    await this.send(
      'passwordReset',
      'Your password reset link (valid for 10 minutes)'
    )
  }
}
