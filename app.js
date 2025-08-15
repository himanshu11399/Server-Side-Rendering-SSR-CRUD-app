import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';
import User from "./models/user.js"; // example if inside models/
import { error } from 'console';



// ES Module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.render("index")
});

app.get("/read", async (req, res) => {
    try {
        const alluser = await User.find();
        res.render("read", { users: alluser })
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

app.post("/create", async (req, res) => {
    let { name, email, image, password } = req.body;

    const createUser = await User.create({
        name, email, image, password
    });

    // res.send(createUser)
    res.redirect("/read");
});

app.get("/readall", async (req, res) => {
    try {
        const alluser = await User.find();
        res.send(alluser);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }

})

app.get("/delete/:email", async (req, res) => {
    try {
        let email = req.params.email;
        let delUser = await User.findOneAndDelete({ email: email });
        if (delUser) {
            console.log("Delete user", delUser);
        } else {
            console.log("User not found  with email : ", email)
        }
        res.redirect("/read");
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
})

//Update the details
app.get(("/edit/:email"), async (req, res) => {
    try {
        const email = req.params.email;
        const user = await User.findOne({ email: email });
        res.render("edit", { user });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }

})

app.post(("/edit/:email"),async(req,res)=>{
   try{
     let email=req.params.email;
     const {name,image,password}=req.body;

     await User.findOneAndUpdate(
        {email:email},
        {name,email,image,password}
     );
     res.redirect("/read");


   }catch(err){
    res.status(500).send({ error: err.message });
   }
})

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});