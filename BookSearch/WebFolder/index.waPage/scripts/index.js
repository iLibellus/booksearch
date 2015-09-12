
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var showLoginButton = {};	// @button
// @endregion// @endlock

$$('loginContainer').hide();

// eventHandlers// @lock

	showLoginButton.click = function showLoginButton_click (event)// @startlock
	{// @endlock

		//$$('loginComponent').loadComponent();
		$$('loginComponent').loadComponent();
		$$('loginContainer').show();

		$('#loginContainer').css("top", 0);
		$('#loginContainer').css("width", 900);
		$('#loginContainer').css("height", 900);
		$('#loginContainer').css("left", 0);
		$('#loginComponent').css("width", 900);
		$('#loginComponent').css("height", 900);
		
		//$('#loginContainer').css("opacity", 0.6);
		
		$('#loginContainer').css("background-color", rgba(171, 205, 239, 0.5));
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("showLoginButton", "click", showLoginButton.click, "WAF");
// @endregion
};// @endlock
