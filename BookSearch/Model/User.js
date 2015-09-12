model.User = new DataClass("Users", "public");
include("Model/User-methods.js");

model.User.ID = new Attribute("storage", "UUID", "key auto", {autogenerate: true});
model.User.username = new Attribute("storage", "string");
model.User.HA1Key = new Attribute("storage", "string");
model.User.password = new Attribute("calculated", "string");
model.User.password.onSet = function(password) {
	this.HA1Key = directory.computeHA1(this.ID, password);
}
model.User.password.onGet = function() {
	return "*****";
}
model.User.email = new Attribute("storage", "string");
model.User.person = new Attribute("relatedEntity", "Person", "Person");
model.User.groups = new Attribute("relatedEntities", "Groups", "user", {reversePath:true});

//Events
model.User.events = {};

model.User.events.onValidate = function() {
	var err, emailRegexStr, isValid;
	//Check the email to see if it's valid.
	if (this.email !== null) {
		emailRegexStr = /^[a-zA-Z0-9.-_]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		isValid = emailRegexStr.test(this.email);
		if (!isValid) {
			err = {error: 8080, errorMessage: "Email is invalid."};
		}
	}
	
	return err;
};

