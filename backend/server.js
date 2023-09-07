require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./model/userModel");

const { MONGO_URL, PORT = 8080 } = process.env;

if (!MONGO_URL) {
	console.error("Missing MONGO_URL environment variable");
	process.exit(1);
}

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
	res.send("Hello from server you");
});

app.get("/api/user/all", async (req, res, next) => {
	try {
		const user = await UserModel.find();
		res.json(user);
	} catch (error) {
		next(error);
	}
});

app.get("/api/user/:username", async (req, res, next) => {
	console.log("This should not happen");
	try {
		const user = await UserModel.findOne({ userName: req.params.username });
		console.log(user);
		res.json(user);
	} catch (error) {
		next(error);
	}
});

app.post("/api/user/login", async (req, res, next) => {
	const { userName, password } = req.body;
	try {
		const user = await UserModel.findOne({
			userName: userName,
			password: password
		}).lean();
		if (user === null) {
			res.json({ status: "fail", message: "Username or Password incorrect" });
		} else {
			res.json({ ...user, status: "success" });
		}
	} catch (error) {
		next(error);
	}
});

app.post("/api/user/", async (req, res, next) => {
	const user = req.body;
	try {
		await UserModel.create(user);
		res.json({ status: "success", message: "User created, you can sign in." });
	} catch (err) {
		if (err.code === 11000) {
			res.json({
				status: "fail",
				message: "Username already exists, please try again"
			});
		} else {
			next(err);
		}
	}
});

app.patch("/api/user/", async (req, res, next) => {
	try {
		const newData = req.body;
		const user = await UserModel.findByIdAndUpdate(newData._id, newData);
		console.log(user);
		res.json(user);
	} catch (error) {
		next(error);
	}
});

const main = async () => {
	await mongoose.connect(MONGO_URL);

	app.listen(PORT, () => {
		console.log("Server running on  http://127.0.0.1:" + PORT);
	});
};

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
