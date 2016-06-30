//var id = window.location.search.match(/\d+/)[0];

function setToken(token) {
	var _sync = Backbone.sync;
	Backbone.sync = function (post, model, options) {
		if ($.cookie('AuthToken')) {
			options.headers = {
				'Authorization': 'Token ' + token
			};
		}
		return _sync.call(this, post, model, options);
	};
}

if ($.cookie('AuthToken')) {
	setToken($.cookie('AuthToken'));
}


$("#logInForm").submit(function (e) {
	// alert("logInForm");
	e.preventDefault();
	var username = $("#username").val();
	var password = $("#password").val();
	console.log(username);
	console.log(password);
	$.ajax({
		method: 'POST',
		url: 'http://parent-teacher-connection.herokuapp.com/api/api-token-auth/',
		data: {
			username: username,
			password: password,
			user_type: ""
		}

	}).done(function (resp) {
		if ($('#remember_me').is(":checked")) {
			$.cookie('AuthToken', resp.token);
			$.cookie('username', resp.username);
			console.log("created cookies for token and user");
		}
		setToken(resp.token);
		console.log("logged in");
		console.log(resp.token);
		var userId = resp.id;
		console.log(userId);
		// User.set(resp.User);
		console.log(resp);
		if (resp.user_type == "parent") {
			console.log("redirect to the parents home page");
			window.location.href = "./parentStudents.html";

		} else if (resp.user_type == "teacher") {
			console.log("redirect to the teachers home page");
			window.location.href = "./classSet.html";
		}

		$.cookie('UserId', userId);
		$.cookie('AuthToken', resp.token);
	});


	///////////////////////////////////////////token//////////////////////////////////
	var UserParent = Backbone.Model.extend({

		initialize: function() {
			console.log("UserParent model initialized");
		},
		defaults: {
			id: null,
			user_type: null,
			first_name: null,
			last_name: null,
			student_set: null
		},
		validate: function (attrs) {
			if (!attrs.username) {
				$("#usernameLogIn").html("username is required");
			}
			if (!attrs.password) {
				$("#passwordLogIn").html("password is required");
			}
			if (attrs.username) {
				return student_set;
			}
			if (attrs.password) {
				return student_set;
			}
		},
		success: function() {
			url: 'http://parent-teacher-connection.herokuapp.com/api/api-token-auth/'
		}
	});
	var LogInParentModel = new UserParent();

	var UserParentCollection = Backbone.Collection.extend({
		model: LogInParentModel,
		url: 'http://parent-teacher-connection.herokuapp.com/api/api-token-auth/'
	});
});