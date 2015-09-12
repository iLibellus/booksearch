
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'customLogin';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var signupButton = {};	// @button
	var loginButton = {};	// @button
	var exitImage = {};	// @image
	// @endregion// @endlock

	// eventHandlers// @lock

	signupButton.click = function signupButton_click (event)// @startlock
	{// @endlock
		$$('mainComponent').loadComponent({path: '/components/signup.waComponent'});
		$$('loginComponent').removeComponent();
		$$('loginContainer').hide();
		//$$('testContainer').show();
		//getHtmlId('mainComponent').loadComponent({path: '/components/signup.waComponent'});
	};// @lock

	loginButton.click = function loginButton_click (event)// @startlock
	{// @endlock
		//$$('loginComponent').removeComponent();
		//$$('passwordInput')
		var v1 = getHtmlId('usernameInput');
		var v2 = getHtmlId('passwordInput');
		var v3 = getHtmlId('invalidLoginText');
		var username = $$(v1).getValue();
		var password = $$(v2).getValue();
		
		//var user = ds.User.login(username, password);
		
		try {
			ds.User.login(username, password, {
				onSuccess: function(event){
					if(event.result) {
						$$(v3).setValue("");
						$$(v1).setValue("");
						$$(v2).setValue("");
						$$('loginComponent').removeComponent();
					} else {
						$$(v3).setValue("Invalid login");
						$$(v1).setValue("");
						$$(v2).setValue("");
					}
				}
			});
		} catch(error) {
			$$(v3).setValue(error);
			$$(v1).setValue("");
			$$(v2).setValue("");
		}
		
		//$$('loginComponent').removeComponent();
		//alert(username);
	};// @lock

	exitImage.click = function exitImage_click (event)// @startlock
	{// @endlock
		$$('loginComponent').removeComponent();
		$$('loginContainer').hide();
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_signupButton", "click", signupButton.click, "WAF");
	WAF.addListener(this.id + "_loginButton", "click", loginButton.click, "WAF");
	WAF.addListener(this.id + "_exitImage", "click", exitImage.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
