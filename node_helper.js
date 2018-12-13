/*
*
*/
'use strict';

var NodeHelper = require("node_helper");

var path = require("path");
var fs = require('fs');
var ses = require('node-ses');


module.exports = NodeHelper.create({

  start: function() {
    	 var self = this;
    	 console.log("Starting node helper for: " + this.name);
  },

  changeTemp: function(payload) {
    	 var self = this;

	fs.readFile(path.resolve(global.root_path + "/TempAndHumid/TempAndHumid.js"), "utf8", function(err, data) {

		if(err) {
			self.sendSocketNotification("FAIL_READ", err);
		}
		else {
			self.sendSocketNotification("SUCCESS_READ", data);
		}
	});

  },

  getSNSNotification: function(payload) {
	var self = this;

	client = ses.createClient({ key: payload.key, secret: payload.secret });

	client.sendEmail({
		to: 'yongmin318@naver.com',
		from: 'binyong318@gmail.com',
		subject: "온도 위험!!!!!",
		message: "전원을 끄세요~~~!!!!",
		altText: "plain text"
	}, function(err, data, res) {
		if(!err) {
			self.sendSocketNotification("SUCCESS_SES", data);
		}
		else {
			self.sendSocketNotification("FAIL_SES", data);
		}
	});

  },

  socketNotificationReceived: function(notification, payload) {
	var self = this;

	if (notification == "TEMP_HUMID") {
		self.changeTemp(payload);
	}
	else if(notification == "SNS_SEND") {
		self.getSNSNotification(payload);
	}
  },

});
