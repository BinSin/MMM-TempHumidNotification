/*
 * Author : BinSin
 * https://github.com/BinSin/MMM-TempHumidNotification
 */

Module.register("MMM-TempHumidNotification", {
  defaults: {
	key: 'AWS_ACCESS_KEY_ID',
	secret: 'AWS_SECRET_ACCESS_KEY'
  },

  start: function() {
	var self = this;
	Log.log("Starting module: " + this.name);
	this.thdata = null;
	self.sendSocketNotification("TEMP_HUMID", self.config);
	setInterval(function() {
		self.sendSocketNotification("TEMP_HUMID", self.config);
	}, 10000);
  },

  getDom: function() {
	var wrapper = document.createElement("div");
	var tempDiv = document.createElement("div");
	var humidDiv = document.createElement("div");

	var temp = this.thdata.substring(0, 4);
	var humid = this.thdata.substring(5,10);

	tempDiv.innerHTML = "온도 : " + temp;
	humidDiv.innerHTML = "습도 : " + humid;

	wrapper.appendChild(tempDiv);
	wrapper.appendChild(humidDiv);

	return wrapper;
  },

  socketNotificationReceived: function(notification, payload) {
	var self = this;

	if(notification == "SUCCESS_READ") {
		console.log("temperature and humidity : " + payload);
		this.thdata = payload;
		self.updateDom(1000);

		var temp = Number(payload.substring(0,4));
		var humid = Number(payload.substring(5,10));

		if(temp >= 40 || humid >= 80) {
			console.log("send aws sns");
			self.sendSocketNotification("SNS_SEND", self.config);
		}
	}
	else if(notification == "FAIL_READ") {
		console.log("faile read temp humid");
	}
	else if(notification == "SNS_SEND") {
		console.log("sns send " + payload);
	}
	else if(notification == "SUCCESS_SES") {
		console.log("success send " + payload);
	}
	else if(notification == "FAIL_SES") {
		console.log("fail send " + payload);
	}
  },

});
