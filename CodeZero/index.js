import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import mongoose from "mongoose";

const app = express();
const port = 3000;

const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

mongoose.connect('mongodb://127.0.0.1:27017/draftit3');

const imageSchema = new mongoose.Schema({
    fieldname: String,
    originalname: String,
    encoding: String,
    mimetype: String,
    buffer: Buffer,
});

const landingSchema = new mongoose.Schema({
    userid: Number,
    siteid: Number,
    blogname: String,
    template_id: Number,
    tag: String,
    facebook: String,
    insta: String,
    twitter: String,
    keywords: String,
    desc: String,
    images: [imageSchema], // Array of images
    // Add other fields as needed
});

const landings = mongoose.model('landings', landingSchema);

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render('landing.ejs');
});

app.get("/landing", (req, res) => {
    res.render('landing.ejs');
});

app.get("/blogpost", (req, res) => {
    res.render('blogpost.ejs');
});

// app.get("/landPages", (req, res) => {
//     res.render('landPages.ejs');
// });

app.post('/saveblog', upload.any(), (req, res) => {
    const blogname = req.body["title"];
    const content = req.body["content"];
    const keywords = req.body["keywords"];
    const description = req.body["description"];
    const template_id = parseInt(req.body["template_id"], 10);

    const images = req.files.map(file => ({
        fieldname: file.fieldname,
        originalname: file.originalname,
        encoding: file.encoding,
        mimetype: file.mimetype,
        buffer: file.buffer
    }));

    if (template_id === 1) {
        res.render('template1.ejs', { blogname, content, keywords, description, images });
    } else if (template_id === 2) {
        res.render('template2.ejs', { blogname, content, keywords, description, images });
    } else {
        // Handle unknown template_id or default case
        res.render('error.ejs', { message: "Invalid template selected" });
    }
});

app.post('/submit1', (req, res) => {
    const blogname = req.body.blogname;
    res.send(`Received blogname: ${blogname}`);
});

app.get('/landingPages', (req, res) => {
    res.render('landPages.ejs');
});

app.post('/saveLanding', upload.any(), (req, res) => {
    const blogname = req.body["title"];
    const description = req.body["content"];
    const template_id = parseInt(req.body["landing_name"], 10);
    const tag = req.body['tag'];
    const facebook = req.body['facebook'];
    const insta = req.body['insta'];
    const twitter = req.body['twitter'];
    const keywords = req.body["keywords"];
    const desc = req.body["description"];
    const userid = 2;
    const siteid = 211;

    const images = req.files.map(file => ({
        fieldname: file.fieldname,
        originalname: file.originalname,
        encoding: file.encoding,
        mimetype: file.mimetype,
        buffer: file.buffer
    }));

    const newLandingData = new landings({
        userid,
        siteid,
        blogname,
        template_id,
        tag,
        facebook,
        insta,
        twitter,
        keywords,
        desc,
        images
    });

    try {
        newLandingData.save();
        console.log("newLandingData inserted successfully");
        console.log(newLandingData);
    } catch (e) {
        console.log(e);
    }

    if (template_id === 1) {
        res.render('page1.ejs', { blogname, tag, description, facebook, insta, twitter, images, keywords, desc });
    } else if (template_id === 2) {
        res.render('page2.ejs', { blogname, tag, description, facebook, insta, twitter, images, keywords, desc });
    } else {
        // handle unknown template_id or default case
        res.render('error.ejs', { message: "Invalid template selected" });
    }
});

app.get('/portfolio', (req, res) => {
    res.render('portfolio.ejs');
});

app.post('/savePortfolio', upload.any(), (req, res) => {
    const profession = req.body["profession"];
    // const description = req.body["content"];
    const template_id = parseInt(req.body["landing_name"], 10);
    const name = req.body['name'];
    const pronounce = req.body['pronounce'];
    const content = req.body['content'];
    const resume = req.body['resume'];
    const email = req.body['email'];
    const keywords = req.body["keywords"];
    const desc = req.body["description"];

    const images = req.files.map(file => ({
        fieldname: file.fieldname,
        originalname: file.originalname,
        encoding: file.encoding,
        mimetype: file.mimetype,
        buffer: file.buffer
    }));

    if (template_id === 1) {
        res.render('folio1.ejs', { profession, template_id, name, pronounce, content, resume, email, images, keywords, desc });
    } else if (template_id === 2) {
        res.render('folio2.ejs', { profession, template_id, name, pronounce, content, resume, email, images, keywords, desc });
    } else if (template_id === 3) {
        res.render('folio3.ejs', { profession, template_id, name, pronounce, content, resume, email, images, keywords, desc });
    } else {
        // handle unknown template_id or default case
        res.render('error.ejs', { message: "Invalid template selected" });
    }
});

app.get('/BrochureSites', (req, res) => {
    res.render('brochure.ejs');
});

app.get('/Certificates', (req, res) => {
    res.render('cert.ejs');
});

app.post('/saveCertificate', upload.any(), (req, res) => {
    const template_id = parseInt(req.body["landing_name"], 10);
    const inst = req.body["inst"];
    const date = req.body["date"];
    // const description = req.body["content"];
    const person = req.body['person'];
    const reason = req.body['reason'];

    const images = req.files.map(file => ({
        fieldname: file.fieldname,
        originalname: file.originalname,
        encoding: file.encoding,
        mimetype: file.mimetype,
        buffer: file.buffer
    }));

    if (template_id === 1) {
        res.render('cert1.ejs', { inst, date, person, reason, images });
    } else if (template_id === 2) {
        res.render('cert2.ejs', { inst, date, person, reason, images });
    } else {
        // Handle unknown template_id or default case
        res.render('error.ejs', { message: "Invalid template selected" });
    }
});

app.post('/saveBrochure', upload.any(), (req, res) => {
    const title = req.body["org"];
    // const description = req.body["content"];
    const template_id = parseInt(req.body["landing_name"], 10);
    const motto = req.body['name'];
    const refer = req.body['designator'];
    const company = req.body['company'];
    const services = req.body['services'];
    const work = req.body['work'];
    const keywords = req.body["keywords"];
    const desc = req.body["description"];

    work.replace(/ /g, '&nbsp;').replace(/\r\n|\r|\n/g, '<br>');

    const images = req.files.map(file => ({
        fieldname: file.fieldname,
        originalname: file.originalname,
        encoding: file.encoding,
        mimetype: file.mimetype,
        buffer: file.buffer
    }));

    if (template_id === 1) {
        res.render('brochure1.ejs', { title, template_id, motto, refer, company, services, work, images, keywords, desc });
    } else if (template_id === 2) {
        res.render('brochure2.ejs', { title, template_id, motto, refer, company, services, work, images, keywords, desc });
    } else {
        // Handle unknown template_id or default case
        res.render('error.ejs', { message: "Invalid template selected" });
    }
});

app.get('/getlanding/:userid/:siteid', async (req, res) => {
    console.log("connected to getsite");
    const { userid, siteid } = req.params;
    console.log("userid:", userid);
    console.log("siteid:", siteid);

    try {
        const Store = await landings.findOne({ userid, siteid });
        const { blogname, tag, desc: description, facebook, insta, twitter, images, keywords, template_id } = Store;

        if (template_id === 1) {
            res.render('page1.ejs', { blogname, tag, description, facebook, insta, twitter, images, keywords, desc: description });
        } else if (template_id === 2) {
            res.render('page2.ejs', { blogname, tag, description, facebook, insta, twitter, images, keywords, desc: description });
        } else {
            // handle unknown template_id or default case
            res.render('error.ejs', { message: "Invalid template selected" });
        }
    } catch (e) {
        console.log(e.message);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
