(function($) {
		
	$.updatePlayerEmail = function() {
		
		var email = $('#email_edit_input');
		
		_processTemplate = function(response) {
			var data;
			$.template("userSession", response);
			$("#sessionUser").html(
			$.tmpl("userSession", data, {}));
		}

		$.ajax({
			url: 'php/userSession.php?action=update&email=' + email.val(),
			type: 'html',
			success: _processTemplate
		});
		
	}
		
	$.loginPlayer = function() {
	
		var login = $("#login");
		var password = $("#password");
		var valid = true;
		
		if (login.val() == null || login.val() == "") {
			login.css({
				'border-color' : 'red'
			});
			valid = false;
				
		} else {
			login.removeAttr('style');
		}
		
		if (password.val() == null || password.val() == "") {
			password.css({
				'border-color' : 'red'
			});
			valid = false;
					
		} else {
			password.removeAttr('style');
		}
		
		
		_processTemplate = function(response) {
			var data;
			$.template("userSession", response);
			$("#sessionUser").html(
			$.tmpl("userSession", data, {}));
		}

		if (valid) {
			var pass = hex_md5(password.val());
			$.ajax({
				url: 'php/userSession.php?action=login&login=' + login.val() + '&password=' + pass,
				type: 'html',
				success: _processTemplate
			});
		}
	
	};
	
	$.logoutPlayer = function() {

		_processTemplate = function(response) {
			var data;
			$.template("userSession", response);
			$("#sessionUser").html(
			$.tmpl("userSession", data, {}));
		}

		$.ajax({
			url: 'php/userSession.php?action=logout',
			type: 'html',
			success: _processTemplate
		});
	
	};
	$.validateEmail = function(email) { 
			var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(email);
		} 
	
	$.registerPlayer = function() {
	
		var username = $("#username");
		var email = $("#email");
		var password = $("#r_password");
		var confirm_password = $("#confirm_password");
		var valid = true;
		
		if (username.val() == null || username.val() == "") {
			username.css({'border-color' : 'red'});
			valid = false;
				
		} else {
			username.removeAttr('style');
		}
		
		if (password.val() == null || password.val() == "") {
			password.css({'border-color' : 'red'});
			valid = false;
					
		} else {
			password.removeAttr('style');
		}
		
		if (confirm_password.val() == null || confirm_password.val() == "" || confirm_password.val() != password.val()) {
			confirm_password.css({'border-color' : 'red'});
			valid = false;
					
		} else {
			confirm_password.removeAttr('style');
		}
		
		if (email.val() == null || email.val() == "" || !$.validateEmail(email.val())) {
			email.css({'border-color' : 'red'});
			valid = false;
					
		} else {
			email.removeAttr('style');
		}
		
		if (valid) {
			var pass = hex_md5(password.val());
			$.ajax({
				url: 'php/userSession.php?action=register&username=' + username.val() + '&password=' + pass + '&email=' + email.val(),
				type: 'html',
				success: _processTemplate
			});
		}
	
	};
	
	pageCant = 10;
	
	$.loadFilter = function(param) {
		
		var state = param.state;
		var district = param.district;
		var sport = param.sport;
		var ground = param.ground;
		var hour = param.hour;
		var day = param.day;
		var view = param.view
		

		_isScrolledIntoView = function(elem){
			var docViewTop = $(window).scrollTop();
			var docViewBottom = docViewTop + $(window).height();
			var elemTop = $(elem).offset().top;
			var elemBottom = elemTop + $(elem).height();

			return (elemBottom <= docViewBottom);
		};
		
		_processTemplate = function(response) {
			
			var data;
			var loading = false;
			var page = 1;
			$.template("filterTemplate", response);
			$("#sidebar").html(
			$.tmpl("filterTemplate", data, {}));
			
			$(window).scroll(function () {	
				if(_isScrolledIntoView($("#results")) && !loading && (pageCant > page)) {
					page = parseInt(page) + 1;
					loading = true;
					$("#results").append("<span id='loading"+ page.toString() +" style='display:block;height:30px'></span>");
					setTimeout(function () {loading = false; $("#loading" + page).css({"display" : "none"});}, 2000);
					$.loadSerchResults(param, page.toString());
				}
			});
			
		}
		$("#results").html("");
		$.ajax({
			url: 'html/filter.php?state=' + state + '&district=' + district + '&sport=' + sport + '&ground=' + ground + '&hour=' + hour + '&day=' + day + '&view=' + view,
			type: 'html',
			success: _processTemplate
		});
	
	};
	
	$.loadEditPlayer = function() {
	
		_processTemplate = function(response) {
			var data;
			$.template('editPlayerDialogTemplate', response);
			$('#edit-player-dialog').html(
			$.tmpl('editPlayerDialogTemplate', data, {}));
			
			$('#edit-player-dialog').dialog({
				modal: true,
				resizable: false,
				draggable: false,
				height: '500',
				width: '700',
				position: 'center'
			});
			
			$('.ui-widget-overlay').on('click', function() {
				$('#edit-player-dialog').dialog('close');
			});
			
		}
		
		$.ajax({
			url: 'html/editPlayerProfile.php',
			type: 'html',
			success: _processTemplate
		});
		
	}
	
	$.loadRegisterDialog = function(action) {
		
		
		_processTemplate = function(response) {
			var data;
			$.template("registerDialogTemplate", response);
			$("#register-dialog").html(
			$.tmpl("registerDialogTemplate", data, {}));
			
			if (action != null && action != '') {
				$('#registerError').css({'visibility' : 'visible'});
				$('#registerError').html("<i class='icon-thumbs-down'></i>" + action);
			} 
			
			$( "#register-dialog" ).dialog({
				modal: true,
				resizable: false,
				draggable: false,
				height: '500',
				width: '700',
				position: 'center'
			});
			
			$('.ui-widget-overlay').on('click', function() {
				$('#register-dialog').dialog('close');
			});
			
		}
		
		var loginDialog = $('#login-dialog');
		
		if (loginDialog.is(':data(dialog)') && loginDialog.dialog('isOpen')) {
			$('#login-dialog').dialog('close');			
		}
		
		$.ajax({
			url: 'html/registerDialog.php',
			type: 'html',
			success: _processTemplate
		});
	
	};
	
	$.loadEmailSendDialog = function(username, playerType) {
	
		_processTemplate = function(response) {
			var data;
			$.template("emailSendTemplate", response);
			$("#email-send-dialog").html(
			$.tmpl("emailSendTemplate", data, {}));
			
			$("#email-send-dialog").dialog({
				modal: true,
				resizable: false,
				draggable: false,
				height: '500',
				width: '700',
				position: 'center'
			});
			
			$('.ui-widget-overlay').on('click', function() {
				$('#register-dialog').dialog('close');
				$('#email-send-dialog').dialog('close');
			});
			
		}
	
		$.ajax({
			url: 'html/'+ playerType + 'EmailSendDialog.php?username=' + username,
			type: 'html',
			success: _processTemplate
		});
	};
	
	$.loadEmailSendDialog = function() {
	
		_processTemplate = function(response) {
			var data;
			$.template("emailSendErrorTemplate", response);
			$("#email-send-dialog").html(
			$.tmpl("emailSendErrorTemplate", data, {}));
			
			$("#email-send-dialog").dialog({
				modal: true,
				resizable: false,
				draggable: false,
				height: '500',
				width: '700',
				position: 'center'
			});
			
			$('.ui-widget-overlay').on('click', function() {
				$('#register-dialog').dialog('close');
				$('#email-send-dialog').dialog('close');
			});
			
		}
	
		$.ajax({
			url: 'html/emailSendErrorDialog.php',
			type: 'html',
			success: _processTemplate
		});
	};
	
	$.loadLoginDialog = function(message) {
		
		
		_processTemplate = function(response) {
			var data;
			$.template("loginDialogTemplate", response);
			$("#login-dialog").html(
			$.tmpl("loginDialogTemplate", data, {}));
			
			$( "#login-dialog" ).dialog({
				modal: true,
				resizable: false,
				draggable: false,
				height: '500',
				width: '700',
				position: 'center'
			});
			
			$('.ui-widget-overlay').on("click", function() {
				$("#login-dialog").dialog("close");
			});
			
			if (message != null) {
				$('#loginError').css({'visibility' : 'visible', 'display' : 'block'});
				$('#loginError').html("<i class='icon-thumbs-down'></i>" + message);
			}
			
		}
		
		$.ajax({
			url: 'html/loginDialog.php',
			type: 'html',
			success: _processTemplate
		});
	
	};
	
	$.loadImagesDialog = function(idAlbum) {
		
		
		_processTemplate = function(response) {
			var data;
			$.template("imagesDialogTemplate", response);
			$("#images-dialog").html(
			$.tmpl("imagesDialogTemplate", data, {}));
				
				
			
			$( "#images-dialog" ).dialog({
				modal: true,
				resizable: false,
				draggable: false,
				height: '650',
				width: '1100',
				position: 'center'
			});
			
			$('.ui-widget-overlay').on("click", function() {
				$("#images-dialog").dialog("close");
				$("#images-dialog").html('');
			});
			
		}
		
		$.ajax({
			url: 'html/imagesDialog.php?idAlbum=' + idAlbum,
			type: 'html',
			success: _processTemplate
		});
	
	};
	
	$.loadMapDialog = function(lat, lng, address) {
		
		
		_processTemplate = function(response) {
			var data;
			$.template("mapDialogTemplate", response);
			$("#map-dialog").html(
			$.tmpl("mapDialogTemplate", data, {}));
				
				
			
			$( "#map-dialog" ).dialog({
				modal: true,
				resizable: false,
				draggable: false,
				height: '650',
				width: '1100',
				position: 'center'
			});
			
			$('.ui-widget-overlay').click(function() {
				$("#map-dialog").dialog("close");
				$("#map-dialog").html('');
			});
			
		}
		
		$.ajax({
			url: 'html/stablishmentDialogMap.php?lat=' + lat + '&lng=' + lng + '&address=' + address,
			type: 'html',
			success: _processTemplate
		});
	
	};
	
	$.loadBookConfirmationDialog = function(id, idf) {
		
	
		
		_processTemplate = function(response) {
			var data;
			$.template("bookConfirmationDialogTemplate", response);
			$("#book-confirmation-dialog").html(
			$.tmpl("bookConfirmationDialogTemplate", data, {}));
			
			$( "#book-confirmation-dialog" ).dialog({
				modal: true,
				resizable: false,
				draggable: false,
				height: '655',
				width: '1200',
				position: 'center'
			});
			
			$('.ui-widget-overlay').on("click", function() {
				$("#book-confirmation-dialog").dialog("close");
			});
			
		}
		var day = $("#day" + idf).text();
		var hour = $("#hour" + idf).text();
		$.ajax({
			url: 'html/bookConfirmation.php?id=' + id + '&idf=' + idf + '&day=' + day + '&hour=' + hour,
			type: 'html',
			success: _processTemplate
		});
	
	};
	
	$.loadPlayerProfile = function(message) {
		
		_processTemplate = function(response) {
			var data;
			$.template('playerDialogTemplate', response);
			$('#player-dialog').html(
			$.tmpl('playerDialogTemplate', data, {}));
			
			$('#player-dialog').dialog({
				modal: true,
				resizable: false,
				draggable: false,
				height: '500',
				width: '700',
				position: 'center'
			});
			
			$('.ui-widget-overlay').on('click', function() {
				$('#player-dialog').dialog('close');
			});
			
			if (message != null) {
				$('#registerError').css({'visibility' : 'visible'});
				$('#registerError').html("<i class='icon-thumbs-down'></i>" + message);
			}
			
		}
		
		$.ajax({
			url: 'html/playerProfile.php',
			type: 'html',
			success: _processTemplate
		});
	
	};
	
	$.loadSerchResults = function(param, page, pageCant2) {
		
		var state = param.state;
		var district = param.district;
		var sport = param.sport;
		var ground = param.ground;
		var hour = param.hour;
		var day = param.day;
		pageCant = pageCant2 !== undefined ? parseInt(pageCant2) : pageCant;
		
		_processTemplate = function(response) {
			var data;
			
			$.template("resultTemplate", response);
			$("#results").append(
			$.tmpl("resultTemplate", data, {}));		
		};
	
		$.ajax({
			url: 'html/serchRestults.php?state=' + state + '&district=' + district + '&sport=' + sport + '&ground=' + ground + '&hour=' + hour + '&day=' + day  + '&page=' + page,
			type: 'html',
			success: _processTemplate
		});
	};
	
	$.loadSerchResultsMap = function(param) {
		
		var state = param.state;
		var district = param.district;
		var sport = param.sport;
		var ground = param.ground;
		var hour = param.hour;
		var day = param.day;
		
		
		_processTemplate = function(response) {
			var data;
			
			$.template("resultTemplate", response);
			$("#results").html(
			$.tmpl("resultTemplate", data, {}));		
		};
	
		$.ajax({
			url: 'html/serchResultsMapContainer.php?state=' + state + '&district=' + district + '&sport=' + sport + '&ground=' + ground + '&hour=' + hour + '&day=' + day,
			type: 'html',
			success: _processTemplate
		});
	};
		
	
	$.loadFeaturedFields = function(param) {
	
		var state = param.state;
		var sport = param.sport;

		
		_processTemplate = function(response) {
			var data;
			$.template("featuredFiedsTemplate", response);
			$("#serch").html(
			$.tmpl("featuredFiedsTemplate", data, {}));
			
		}
		
		$.ajax({
			url: 'html/featuredFields.php?state=' + state.replace(' ', '%20') + '&sport=' + sport.replace(' ', '%20'),
			type: 'html',
			success: _processTemplate
		});
	}
	

	$.loadMainFilter = function(param) {
	
		var state = param.state;
		var district = param.district;
		var sport = param.sport;
		var ground = param.ground;
		var hour = param.hour;
		var day = param.day;
		
		var normalize = (function() {
		var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
		to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
		mapping = {};
 
		for(var i = 0, j = from.length; i < j; i++ )
			mapping[ from.charAt( i ) ] = to.charAt( i );
 
		return function( str ) {
			var ret = [];
			for( var i = 0, j = str.length; i < j; i++ ) {
				var c = str.charAt( i );
				if( mapping.hasOwnProperty( str.charAt( i ) ) )
					ret.push( mapping[ c ] );
				else
					ret.push( c );
			}
			return ret.join( '' );
		}
 
		})();
		
		_processTemplate = function(response) {
			var data;
			$.template("mainFilterTemplate", response);
			$("#mainFilter").html(
			$.tmpl("mainFilterTemplate", data, {}));
			
			$('#mainFilter > ul').dropotron({ 
				offsetX: -2,
				offsetY: -8,
				mode: 'fade',
				noOpenerFade: true,
				hoverDelay: 0,
				hideDelay: 350,
				detach: false
			});
			
			
			
		}
		
		$.ajax({
			url: 'html/mainFilter.php?state=' + state + '&district=' + district + '&sport=' + sport + '&ground=' + ground + '&hour=' + hour + '&day=' + day,
			type: 'html',
			success: _processTemplate
		});
	}
	
	$.loadHeader = function(param) {
		
		var state = param.state;
		var sport = param.sport;
	
		_processTemplate = function(response) {
			var data;
			$.template("headerTemplate", response);
			$("#nav").html(
			$.tmpl("headerTemplate", data, {}));
			
			$('#nav > ul').dropotron({ 
				offsetX: -2,
				offsetY: -8,
				mode: 'fade',
				noOpenerFade: true,
				hoverDelay: 0,
				hideDelay: 350,
				detach: false
			});
		}
	
		$.ajax({
			url: 'html/header.php?state=' + state.replace(' ', '%20') + '&sport=' + sport.replace(' ', '%20'),
			type: 'html',
			success: _processTemplate
		});
	}
	
	$.loadEventInfo = function(id, prepayment, status, eventId, fieldId) {
		
		
	
		_processTemplate = function(response) {
			var data;
			$.template("eventInfo", response);
			$("#eventInfo" + eventId).html(
			$.tmpl("eventInfo", data, {}));
			
		}
	
		$.ajax({
			url: 'html/eventInfo.php?id=' + id + '&prepayment=' + prepayment + '&status=' + status + '&eventId=' + eventId + '&fieldId=' + fieldId,
			type: 'html',
			success: _processTemplate
		});
	}
	
	$.loadUserInSession = function(userJson) {
		
	
		_processTemplate = function(response) {
			var data;
			$.template("userSession", response);
			$("#sessionUser").html(
			$.tmpl("userSession", data, {}));
		}
	
		$.ajax({
			url: 'php/userSession.php?fbJson=' + userJson,
			type: 'html',
			success: _processTemplate
		});
	}
	
	$.loadAvailableHours = function(id, day, openHour, closeHour) {
		
		_processTemplate = function(response) {
			var data;
			$.template("hours", response);
			$("#" + id).html(
			$.tmpl("hours", data, {}));
			
			$('.is-post > ul').dropotron({ 
				offsetX: -2,
				offsetY: -8,
				mode: 'fade',
				expandMode: 'click',
				noOpenerFade: true,
				hoverDelay: 0,
				hideDelay: 350,
				detach: false
			});
		}
	
		$.ajax({
			url: 'html/hours.php?id=' + id + '&day=' + day + '&openHour=' + openHour + '&closeHour=' + closeHour,
			type: 'html',
			success: _processTemplate
		});
	}
	

	
	$.bookingField = function(entity, bookDate, prepayment, userId, entityName) {
		window.location.assign("player.php")
		$.ajax({
				url: 'php/booking.php?action=booking&entity=' + entity + '&bookDate=' + bookDate + '&prepayment=' + prepayment + '&userId=' + userId + '&entityName=' + entityName,
				type: 'html',
				success: _processTemplate
			});
	}
	
	$.cancelEvent = function(id) {
		
		_callback = function(response) {
			var data;
			$.template('booking', response);
			$('#booking').html(
			$.tmpl('booking', data, {}));
		}
		
		$.ajax({
			url: 'php/booking.php?action=cancel&id=' + id,
			type: 'html',
			success: _callback
		});
	
	}

	$.loadCancelEventDialog = function(id) {
		
		_processTemplate = function(response) {
			var data;
			$.template('cancelEventDialogTemplate', response);
			$('#cancel-dialog').html(
			$.tmpl('cancelEventDialogTemplate', data, {}));
			
			$('#cancel-dialog').dialog({
				modal: true,
				resizable: false,
				draggable: false,
				height: '250',
				width: '500',
				position: 'center'
			});
			
			$('.ui-widget-overlay').click(function() {
				$('#cancel-dialog').dialog('close');
			});
			
		}
		
		$.ajax({
			url: 'html/cancelEvent.php?id=' + id,
			type: 'html',
			success: _processTemplate
		});
		
	}
	
	$.closeDialog = function(id) {
		
		$(id).dialog('close');
	
	}
	
	$.loadEvents = function(status) {
		
		_processTemplate = function(response) {
			var data;
			$.template('eventsTab', response);
			$('#' + status).html(
			$.tmpl('eventsTab', data, {}));

			//Hide the tooglebox when page load
			$(".togglebox").hide();
			//slide up and down when click over heading 2
			$("h2").click(function(){
				// slide toggle effect set to slow you can set it to fast too.
				$(this).toggleClass("active").next(".togglebox").slideToggle("slow");
				return true;
			});
		}
		
		
		$.ajax({
			url: 'html/eventsTab.php?status=' + status,
			type: 'html',
			success: _processTemplate
		});
	
	
	}
	
	$.rateField = function(fieldId, userId, playerId, eventId) {
		
	
		_processTemplate = function(response) {
			var data;
			$.template("rateTemplate", response);
			$("#content").html(
			$.tmpl("rateTemplate", data, {}));
		}
	
		$.ajax({
			url: 'html/rateField.php?fieldId=' + fieldId + '&userId=' + userId + '&playerId=' + playerId + '&eventId=' + eventId,
			type: 'html',
			success: _processTemplate
		});
	}
	

})(jQuery);