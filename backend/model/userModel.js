const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
	firstName: {
		type: String,
		required: [true, "Please tell us your name"]
	},
	lastName: {
		type: String,
		required: [true, "Please tell us your family name!"]
	},
	email: {
		type: String
	},
	userName: {
		type: String,
		unique: true
	},
	password: {
		type: String,
		required: [true, "Please provide a password"]
	},
	confirmPassword: {
		type: String,
		required: [true, "Please confirm your password"],
		validate: {
			validator: function (el) {
				return el === this.password;
			},
			message: "Passwords are not the same"
		}
	},
	myfavorites: [String],
	myplaces: [String]
});

module.exports = mongoose.model("User", UserSchema);
