const nodemailer = require('nodemailer');

async function testEmail() {
    console.log("Testing Email configuration...");
    
    // We'll use the values I just updated in your .env.local
    const user = "tree.india@yahoo.com";
    const pass = "bpnuawvybxepxnqx"; // This is the App Password you provided

    const transporter = nodemailer.createTransport({
      service: "yahoo",
      auth: {
        user: user,
        pass: pass,
      },
      debug: true, // Show more logs
      logger: true
    });

    const mailOptions = {
      from: `"Tree India Local Test" <${user}>`,
      to: user,
      subject: "Local Test Email",
      text: "If you are reading this, the email configuration is correct!"
    };

    try {
      console.log("Sending...");
      const info = await transporter.sendMail(mailOptions);
      console.log("Message sent: %s", info.messageId);
      console.log("SUCCESS!");
    } catch (error) {
      console.error("FAILED TO SEND EMAIL:", error);
    }
}

testEmail();
