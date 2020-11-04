/* eslint-disable no-inline-comments */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-case-declarations */

// fs = require('fs');
const login = require('facebook-chat-api');

let appState;
try {
	appState = require('./sentinel-appstate-g.json');
}
catch {
	console.log('[Sentinel] App state not found. Sentinel will terminate.');
}

let stopped = false;

module.exports = {
	watch: function(callback) {
		if (appState === undefined) {
			return;
		}
		stopped = false;

		login({ appState: appState }, (err, api) => {
			if(err) return console.error(err);

			api.setOptions({ listenEvents: true });
			api.setOptions({ selfListen: true });

			console.log(`[Sentinel] Watch has started at ${new Date()}.`);
			const stopListening = api.listenMqtt((err, event) => {
				if(err) return console.error(err);

				if (stopped) {
					return stopListening();
				}

				if (event.threadID == '2562332187160337') {
					switch(event.type) {
					case 'message':
						let msg = event.body;
						if (event.attachments.length == 1 && event.attachments[0].type == 'photo') {
							msg = event.attachments[0].largePreviewUrl;
						}

						let user = 'unknown';
						api.getUserInfo(event.senderID, (err, ret) => {
							if(err) return console.error(err);

							for(const prop in ret) {
								if(ret.hasOwnProperty(prop)) {
									user = ret[prop].name;

									// console.log(`[Sentinelc] ${user} >> ${msg}`);
									if (user !== undefined) callback(user, msg);
								}
							}
						});

						break;
					case 'event':
						console.log(event);
						break;
					}
				}
			});
		});
	},
	stop: function() {
		if (stopped || appState === undefined) return;

		stopped = true;
		console.log(`[Sentinel] Watch has stopped at ${new Date()}.`);
	},
	isStopped: function() {
		return stopped;
	},
};