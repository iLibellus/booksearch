model.User.entityMethods.validatePassword = function(password){
	var hash = directory.computeHA1(this.ID, password);
	return (hash === this.HA1Key);
}
model.User.entityMethods.validatePassword.scope = "publicOnServer";

model.User.methods.login = function(username, password){
	return loginByPassword(username, password); //true or false
}
model.User.methods.login.scope = "public";

//Wakanda Login Listener
var customLoginListener = function (emailAddress, password) {
	//May need permission to read User class for new session.
  	var sessionRef = currentSession(); // Get session.
  	
  	if(emailAddress == "systemadmin"){
		return false; //revert to directory authentication
	}
	//var myUser = ds.User({userName:emailAddress});
	if (emailAddress == "sune@sune.com") {
		//create a default user for new installations and login
			var userPerson = new ds.Person({firstName: "Admin", lastName: "User"});
			userPerson.save();
			var userEntity = new ds.User({username: emailAddress, password: password, userPerson: userPerson, email: emailAddress});
			userEntity.save();
			var adminGroup = new ds.Group({directoryID: directory.group("Admin").ID, user: userEntity});
			adminGroup.save();
				
	}
	var myUser = ds.User.find("username == :1", emailAddress);
	myUser = ds.User({username:emailAddress});
	debugger;
	if (myUser === null) {
		//return {error: 1024, errorMessage: "invalid login"};
		throw "Oh no! We are already processing a thing!";
	} else {
		//we will handle login
		if (myUser.validatePassword(password)) {
			var theGroups = [];
			
			switch (myUser.group) {
				case "Administrator":
				theGroups = ['Administrator'];
				break;

				case "Manager":
				theGroups = ['Manager'];
				break;

				default:
				theGroups = ['Employee'];
				break;
			}
			
			var connectTime = new Date();
			return {
				ID : myUser.ID,
				name : myUser.username,
				fullName : myUser.username,
				belongsTo : theGroups,
				storage: {time: connectTime}
			}
			
		} else {
			
			//return {error: 1024, errorMessage: "invalid login"};
			throw "Oh no! We are already processing a thing!";
		}
	}
};

model.User.methods.addUser = function(signUpData) {
	// Add a new user account.
	var passwordRegexStr, isValid,
		sessionRef = currentSession(), // Get session.
		promoteToken = sessionRef.promoteWith("Admin"), //temporarily make this session Admin level.
		newUser;
	
	if (loginByPassword(signUpData.userName, signUpData.password)) {
		return {error: 8020, errorMessage: "You are already signed up."};
	
	} else {
		//Check if the password is at least 7 characters and one digit.
		if (signUpData.password !== null) {
			passwordRegexStr = /^(?=.*\d)[a-zA-Z\d]{7,}$/;
			isValid = passwordRegexStr.test(signUpData.password);
			if (!isValid) {
				return {error: 8025, errorMessage: "Password must be at least 7 characters."};
			}
		}
		
		//Check if password is enterd the same both times on the Sign Up form.
		if (signUpData.password !== signUpData.verifyPassword) {
			return {error: 8030, errorMessage: "Verification of password failed."};
		}
		    	
       	var userPerson = ds.Person.createEntity();
       	userPerson.firstName = signUpData.firstName;
       	userPerson.lastName = signUpData.lastName;
       	userPerson.address = signUpData.address;
		userPerson.save();
       	
       	newUser =  ds.User.createEntity();
       	newUser.userName = signUpData.userName;      
       	newUser.password = signUpData.password;
       	newUser.paerson = userPerson;
       	//*** Best Pratice ***
       	//Save the new User in a Try Catch block and put your validation code for the email address in the User 
       	// onValidate() method (see model.User.events.onValidate below). This is better than doing validation checks in this 
       	// function because you may create other methods in the future that save a new User.
       	
       	try {
			newUser.save(); //Save the entity.
			
			var adminGroup = new ds.Group({directoryID: directory.group("Admin").ID, user: newUser});
			adminGroup.save();
			
			sessionRef.unPromote(promoteToken); //Put the session back to normal.
       		if (loginByPassword(signUpData.userName, signUpData.password)) {
       			return {error: 8010, errorMessage: "Congratulations on your new account!"};
       		} else {
       			return {error: 8090, errorMessage: "I'm sorry but we could not sign you up."};
			}
		}
		catch(e) {
			return {error: 8099, errorMessage: e.messages[1]};
		}
		
		sessionRef.unPromote(promoteToken); //Put the session back to normal.
	} // end if (loginByPassword(signUpData.login, signUpData.password))
};

model.User.methods.addUser.scope ="public";






