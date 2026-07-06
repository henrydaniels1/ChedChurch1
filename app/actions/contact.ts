'use server'

import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS?.replace(/\s/g, ''),
  },
})

export interface ContactFormData {
  name: string
  email: string
  company: string
  message: string
}

export async function sendContactEmail(data: ContactFormData) {
  try {
    if (!data.name || !data.email || !data.message) {
      return { success: false, error: 'Please fill in all required fields' }
    }

    await transporter.verify()

    // Confirmation email to the user
    await transporter.sendMail({
      from: `"Peace Chapel Church" <${process.env.SMTP_USER}>`,
      to: data.email,
      replyTo: process.env.BUSINESS_EMAIL,
      subject: `Thank you for contacting Peace Chapel Church, ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1B3A8C;">Thank You for Your Message</h2>
          <p>Hi ${data.name},</p>
          <p>We have received your message and will get back to you within 24 hours.</p>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Your Message Details:</h3>
            <p><strong>Name:</strong> ${data.name}</p>
            ${data.company ? `<p><strong>Subject:</strong> ${data.company}</p>` : ''}
            <p><strong>Message:</strong></p>
            <p style="color: #666; white-space: pre-wrap;">${data.message}</p>
          </div>
          <p style="margin-top: 30px; color: #888; font-size: 12px;">This is an automated response. Our team will contact you shortly.</p>
        </div>
      `,
    })

    // Notification email to the church
    await transporter.sendMail({
      from: `"Peace Chapel Church" <${process.env.SMTP_USER}>`,
      to: process.env.BUSINESS_EMAIL,
      replyTo: data.email,
      subject: `New Contact Form Submission from ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1B3A8C;">New Contact Form Submission</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px;">
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
            ${data.company ? `<p><strong>Subject:</strong> ${data.company}</p>` : ''}
            <p><strong>Message:</strong></p>
            <p style="color: #666; white-space: pre-wrap;">${data.message}</p>
          </div>
        </div>
      `,
    })

    return { success: true, message: 'Thank you for your message! We will get back to you shortly.' }
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error)
    console.error('Contact form error:', errMsg)
    return { success: false, error: errMsg }
  }
}
