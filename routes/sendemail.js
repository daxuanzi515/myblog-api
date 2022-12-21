const router = require("express").Router();
const nodemailer = require("nodemailer");

const Email = (options) => {
    let transpoter = nodemailer.createTransport({
        host: "smtp.163.com",
        port: 25,
        secure: false,
      auth: {
        user: process.env.USER, // email
        pass: process.env.PASSWORD, //password
      },
    });
    transpoter.sendMail(options, (err, info) => {
      if (err) {
        console.log(err);
        return;
      }
    });
  };
  
  // send email
  const EmailSender = ({ fullName, email, message }) => {
    const options = {
      from: `<${process.env.USER}>`,
      to: `${email}`,
      subject: 'Message From Your followers',
      html: `
          <div style="width: 100%; background-color: #f3f9ff; padding: 5rem 0">
          <div style="max-width: 700px; background-color: white; margin: 0 auto">
            <div style="width: 100%; background-color: #00efbc; padding: 20px 0">
            <img
                src="https://img0.baidu.com/it/u=1275095085,1961143463&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800"
                style="width: 100%; height: 100px; object-fit: contain"
              />
            
            </div>
            <div style="width: 100%; gap: 10px; padding: 30px 0; display: grid">
              <p style="font-weight: 800; font-size: 1.2rem; padding: 0 30px">
                My Email
              </p>
              <div style="font-size: .8rem; margin: 0 30px">
                <p>FullName: <b>${fullName}</b></p>
                <p>Email: <b>${email}</b></p>
                <p>Message: <i>${message}</i></p>
              </div>
            </div>
          </div>
        </div>
          `,
    };
    Email(options)
};

router.post("/", async (req,res)=>{
    try {
        const {fullName,email,message} = req.body
        EmailSender({fullName,email,message})
        res.status(200);
        res.json({ msg: "Your message sent successfully" });
      } catch (error) {
        res.status(404).json({ msg: "Error ❌" });
      }
})


module.exports = router 