const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const UserModel=require('./models/users')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const cookiesParser=require('cookie-parser')
const nodemailer = require('nodemailer')
const bodyParser = require('body-parser')

const app=express()
app.use(express.json())
app.use(cors(
    {
        origin:'http://localhost:5173',
        methods:'GET,HEAD,PUT,PATCH,POST,DELETE' ,
        credentials:true
    }
));
app.use(cookiesParser())

const port = 3001;
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://poojamandadapu:Pooja123@cluster0.cqavb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.post("/login",(req,res)=>{
    const{email,password}=req.body;
    UserModel.findOne({email: email})
    .then(user=>{
        if(user){
            bcrypt.compare(password,user.password,(err,response)=>{
                if(response)
                {
                    const token=jwt.sign({emil:user.email},
                        "jwt-secret-key",{expiresIn:'1d'})
                    res.cookie('token',token)
                    return res.json("success")
                }
                else{
                    return res.json("The password is incorrect")
                }
            })
        }
        else{
            return res.json("No record is exist")
        }
    })
})
app.post('/register',(req,res)=>
{
        const { name, email, password, mobile } = req.body;

    UserModel.findOne({ email: email })
        .then(existingUser => {
            if (existingUser) {
                // If user already exists, return a conflict response (status 409)
                return res.status(409).json({ error: 'User with this email already exists.' });
            }

            // If user doesn't exist, proceed with creating a new user
            bcrypt.hash(password, 10)
                .then(hash => {
                    UserModel.create({ name, email, password: hash, mobile })
                        .then(user => res.json("success"))
                        .catch(err => res.status(500).json(err));
                })
                .catch(err => res.status(500).json(err));
        })
        .catch(err => res.status(500).json(err));

});

app.post('/send-otp', async (req, res) => {
    try {
        const decodedEmail = decodeURIComponent(req.body.email);
        // Extract email and OTP from the request body
        const { email, otp } = req.body;
        if (!email) {
            return res.status(400).json({ success: false, error: 'Email is required.' });
        }
        // Log the email and OTP for debugging
        console.log('Email:', decodedEmail);
        console.log('OTP:', otp);

        // Logic to send the OTP to the specified email using nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "vrproject6300@gmail.com",
                pass: "xcpz kjal nusv yufc"
            }
        });
        const mailOptions = {
            from: "vrproject6300@gmail.com",
            to: decodedEmail,
            subject: 'Verification Code for Registration',
            text: `Your OTP for registration is: ${otp}`
        };
        const info = await transporter.sendMail(mailOptions);
        // Log the information about the sent email
        console.log('Email sent:', info.response);

        return res.json({ success: true, message: 'OTP sent successfully' });
    } catch (error) {
        // Log the error and send an appropriate response to the client
        console.error('Error sending OTP email:', error);
        res.status(500).json({ success: false, error: 'Failed to send OTP email.' });
    }
});
app.post('/host-form', (req, res) => {
    const { name, age, phone, email, aadharNo, flatNo, gender } = req.body;
  
    HostModel.create({ name, age, phone, email, aadharNo, flatNo, gender })
      .then(host => {
        console.log('Host details saved:', host);
        res.json({ success: true, message: 'Host details saved successfully' });
    })
    .catch(err => {
        console.error('Error saving host details:', err);
        res.status(500).json({ success: false, error: 'Failed to save host details' });
    });
});
  
  // Endpoint to handle saving visitor details
app.post('/visitor-form', (req, res) => {
    const { name, phoneNo, email, gender, hostName, entryTime, exitTime, description } = req.body;
  
    VisitorModel.create({ name, phoneNo, email, gender, hostName, entryTime, exitTime, description })
      .then(visitor => {
        console.log('Visitor details saved:', visitor);
        res.json({ success: true, message: 'Visitor details saved successfully' });
      })
      .catch(err => {
        console.error('Error saving visitor details:', err);
        res.status(500).json({ success: false, error: 'Failed to save visitor details' });
    });
});
app.listen(port, () => {
    console.log('Server is running on port');
});
