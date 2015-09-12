
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'signup';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var saveUserButton = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	saveUserButton.click = function saveUserButton_click (event)// @startlock
	{// @endlock
		var errorMessageFiled = getHtmlId('errorMessageFiled');
		
		alert("VALUES GOTTEN");
		var emailFiled = getHtmlId('emailFiled');
		var passwordField = getHtmlId('passwordField');
		var firstNameField = getHtmlId('firstNameField');
		var lastNameField = getHtmlId('lastNameField');
		var addressField = getHtmlId('addressField');
		alert("FIELDNAMES");
		var email = $$(emailFiled).getValue();
		var password = $$(passwordField).getValue();
		var verifyPassword = $$(passwordField).getValue();
		var firstName = $$(firstNameField).getValue();
		var lastName = $$(lastNameField).getValue();
		var address = $$(addressField).getValue();
		
		alert("VALUES GOTTEN");
		var signUpObj = {email: email, 
				password: password, 
				verifyPassword: verifyPassword,
				firstName: firstName,
				lastName: lastName,
				address: address}
		//event.result.errorMessage
		ds.User.addUser({
			onSuccess: function(event) {
				//WAK5CRMUTIL.setMessage(event.result.errorMessage);
				errorMessageFiled.setValue(event.result.errorMessage);
				if (waf.directory.currentUser() !== null) {
					//$$('login2').refresh();
					signUpObj.name = "";
					signUpObj.email = "";
					signUpObj.password = "";
					signUpObj.verifyPassword = "";
					waf.sources.signUpObj.sync();
					
				} //end - if (waf.directory.currentUser() !== null)
			} //end - onSuccess
		}, signUpObj);
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_saveUserButton", "click", saveUserButton.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
