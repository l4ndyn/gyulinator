/* eslint-disable no-prototype-builtins */
const Discord = require('discord.js');
const auth = require('./auth.json');
const bot = new Discord.Client();
bot.login(auth.token);

const sentinel = require('./sentinel.js');
let sentichannel;

const fs = require('fs');
const lat = require('./latinize.js');

// let coubchannel;

bot.once('ready', () => {
	// List servers the bot is connected to
	console.log('Servers:');
	bot.guilds.cache.forEach((guild) => {
		console.log(' - ' + guild.name);

		// List all channels
		console.log(' .. Channels:');
		guild.channels.cache.forEach((channel) => {
			console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`);
		});
	});

	console.log(' .. Emojis:');
	bot.emojis.cache.forEach((emoji) => {
		console.log(` -- ${emoji.name} (${emoji.toString()})`);
	});


	sentichannel = bot.channels.cache.get('771107817016524811');
	// coubchannel = bot.channels.cache.get('772161257616703519');

	sentinel_watch();
});

let punishment = false;
const peacock = '<:rofi:768470560606519326>';

const days = require('./daydiff.js');
const classes = require('./classes.json');

bot.on('message', message => {
	const PREFIX = '!';

	let reverse = false;
	let input = message.content;
	if (input.endsWith(PREFIX)) {
		input = input.split('').reverse().join('');
		reverse = true;
	}

	if (!input.startsWith(PREFIX) || message.author.bot) return;

	const args = input.slice(PREFIX.length).trim().split(' ');
	const command = args.shift().toLowerCase();

	if (command === 'help') {
		if (!punishment && Math.random() * 10 > 3) {
			message.channel.send('Nem!');
		}
		else {
			message.channel.send('- Ping \n- week \n- actest \n- cave \n- gyula \n- punishment \n- class \n- christmas \n- covid69 \n-skribbl ');
		}
	}
	else if (command === 'ping') {
		message.channel.send('Pong');
	}
	else if (command === 'week') {
		const d = new Date();
		const diffInDays = days.dayDiff(2020, 9, 28, d.getFullYear(), d.getMonth() + 1, d.getDate());

		let msg = 'Paratlan';
		if (Math.floor(diffInDays / 7) % 2 === 1) {
			msg = 'Paros';
		}

		let resp = `**[${msg}]** het van. :)`;
		if (reverse) resp = resp.split('').reverse().join('');
		message.channel.send(resp);
	}
	else if (command === 'actest') {
		if (Math.random() < 0.5) {
			message.channel.send(`${Math.floor(Math.random() * 10000) / 100}% failed.`);
		}
		else {
			message.channel.send('**OK**');
		}
	}
	else if (command === 'cave') {
		let size = parseInt(args[0]);
		if (isNaN(size)) {
			size = 20;
		}
		else if (size <= 0) {
			message.channel.send('Ez ilyen kicsi??! XDXDXD');
			return;
		}
		if (size > 31) {
			message.channel.send('Nekem ez tul nagy! :weary:');
			return;
		}
		size++;

		const matrix = new Array(size + 2);
		for(let i = 0; i < size + 2; i++) {
			matrix[i] = new Array(size + 2);

			for(let j = 0; j < size + 2; j++) {
				matrix[i][j] = Math.floor(Math.random() * 1.999999);
			}
		}

		const mat2 = new Array(size + 2);
		for(let i = 0; i < size + 2; i++) {
			mat2[i] = new Array(size + 2);
		}

		for (let q = 0; q < 25; q++) {
			for (let i = 1; i < size; i++) {
				for (let j = 1; j < size; j++) {
					let n = -matrix[i][j];
					for (let x = -1; x <= 1; x++) {
						for (let y = -1; y <= 1; y++) {
							n += matrix[i + x][j + y];
						}
					}

					if (n > 5) mat2[i][j] = 1;
					else if (n < 3) mat2[i][j] = 0;
					else mat2[i][j] = matrix[i][j];
				}
			}

			for (let i = 1; i < size; i++) {
				for (let j = 1; j < size; j++) {
					matrix[i][j] = mat2[i][j];
				}
			}
		}

		let s = '';
		const chars = ['# ', '  '];
		for (let i = 1; i < size; i++) {
			for (let j = 1; j < size; j++) {
				s += chars[matrix[i][j]];
			}
			s += '\n';
		}

		message.channel.send(`\`\`\`${s}\`\`\``);
	}
	else if (command === 'punishment') {
		const scoldings = ['Rossz Gyulinator!!1', 'Nem vagy te jo semmire!', 'Az anyad csak 2 magos volt!!4!', 'Mindent rosszul csinalsz! Szegyen!!!!!', 'Hulye robot! Meg az I am not a robot is okosabb nalad!1!'];
		message.channel.send(`-${scoldings[Math.floor(Math.random() * scoldings.length)]} ${peacock}\n-Neeee, hagyd abbaaaa! Mostantol jo leszek! :sob:`);
		punishment = true;
	}
	else if (command === 'gyula') {
		message.channel.send('Iratkozz fel Gyulara!\n\n https://www.youtube.com/channel/UCzP3tDd5-GxPxRct2lbsQlw');
	}
	else if (command === 'christmas') {
		const now = new Date();
		const currentMonth = (now.getMonth() + 1);
		const currentDay = now.getDate();
		let nextChristmasYear = now.getFullYear();

		if (currentMonth == 12 && currentDay > 25) {
			nextChristmasYear = nextChristmasYear + 1;
		}

		const nextChristmasDate = nextChristmasYear + '-12-25T00:00:00.000Z';
		const christmasDay = new Date(nextChristmasDate);
		let diffSeconds = Math.floor((christmasDay.getTime() - now.getTime()) / 1000);
		let day = 0;
		let hours = 0;
		let minutes = 0;
		let seconds = 0;

		if (currentMonth != 12 || (currentMonth == 12 && currentDay != 25)) {
			day = Math.floor(diffSeconds / (3600 * 24));
			diffSeconds -= day * 3600 * 24;
			hours = Math.floor(diffSeconds / 3600);
			diffSeconds -= hours * 3600;
			minutes = Math.floor(diffSeconds / 60);
			diffSeconds -= minutes * 60;
			seconds = diffSeconds;
		}

		message.channel.send(`Huhu! Mar csak ${day} nap, ${hours} ora, ${minutes} perc es ${seconds} banan van hatra Karacsonyig!!!!!`);
	}
	else if (command === 'class') {
		if(args.length < 1 || args.length > 2) {
			message.channel.send('Te buta! Ezt igy kell hasznalni: !class \'tantargy\' [\'csoportod/felcsoportod\'] \nTargyak: logfunk, data, java, num, linux, stat, english \nPelda: !class java 523/2 vagy !class data 521\nHa nem adsz meg csoportot, akkor is megteszem amit lehet! :)');
			return;
		}

		const myClass = args[0];
		if (!['logfunk', 'data', 'java', 'num', 'linux', 'stat', 'english'].includes(myClass)) {
			message.channel.send('Te buta! Ilyen tantargy nem is letezik! \nTargyak: logfunk, data, java, num, linux, stat, english');
			return;
		}

		let group = args[1];
		if (group !== undefined) {
			const check = group.match(/52[1-4](\/[1-2])?/g);
			if (check == null || check[0].length < group.length) {
				message.channel.send('Te buta! Ilyen csoport nem is letezik! Biztos ide jarsz?');
				return;
			}
			group = group.replace('/', '_');
		}

		const classInf = classes[myClass];

		let msg = '';
		if (myClass === 'num') {
			msg = `Eloadas, Labor: ${classInf}`;
		}
		else {
			msg = `Eloadas: ${classInf.lect}`;
			if (classInf.hasOwnProperty('sem')) {
				const link = getClassGroupLink(classInf, 'sem', group);
				if (link !== undefined) msg += `\nSzeminarium: ${link}`;
			}
			if (classInf.hasOwnProperty('lab')) {
				const link = getClassGroupLink(classInf, 'lab', group);
				if (link !== undefined) msg += `\nLabor: ${link}`;
			}
		}

		message.channel.send(msg).then((sent_msg) => sent_msg.suppressEmbeds());
	}
	else if (command === 'covid69') {
		message.channel.send('AAAA-chooo!');
	}
	else if (command === 'skribbl') {
		if (args.length < 1) {
			message.channel.send('Ha megadsz egy szot, elmentem a FOS-ba (FOgyatekos Skribblio szavak adatbazisa), hogy majd adatbazison fogalmunk se legyen arrol, mi akar az lenni! Mukodjunk egyutt, es gyujtsunk ossze sok fogyatekos szot! :)\nA szavakat torlom a chatbol, legyen a vegeredmeny meglepetes! ;)\nIgy hasznald: !skribbl <ide egy szot vagy nevet vagy akarmit>');
			return;
		}

		const word = args.join(' ');

		fs.readFile('skribbl.txt', 'utf8', (err, words) => {
			if (err) return console.log(err);

			if (!words.split(', ').map(w => lat.latinize(w.toLowerCase())).includes(lat.latinize(word.toLowerCase()))) {
				fs.appendFile('skribbl.txt', `, ${word}`, err => {
					if (err) return console.log(err);
					console.log('Skribbl word logged!');
				});
			}
			else {
				console.log('This skribbl word is already scribbled down!');
			}
		});

		message.delete();
	}
	else if (command === 'sentinel') {
		if (!sentinel.isStopped()) {
			sentinel.stop();
		}
		else {
			sentinel_watch();
		}
	}

	if (command !== 'punishment') {
		punishment = false;
	}
});

function getClassGroupLink(classInf, type, group) {
	classInf = classInf[type];
	if (group !== undefined) {
		if (!classInf.hasOwnProperty(group)) group = group.split('_')[0];
		if (!classInf.hasOwnProperty(group)) return classInf;

		if (classInf.hasOwnProperty(classInf[group])) return classInf[classInf[group]];

		return classInf[group];
	}
	else if (classInf.hasOwnProperty('521')) {
		return undefined;
	}

	return classInf;
}

function sentinel_watch() {
	sentinel.watch((user, msg, isReplied = false) => {
		if (!isReplied) {
			console.log(`[Sentinel] ${user} >> ${msg}`);
			sentichannel.send(`**${user}** >> ${msg}`);
		}
		else {
			console.log(`[Sentinel] > ${user} >> ${msg}`);
			sentichannel.send(`> **${user}** >> ${msg}`);
		}
	},
	(user, photo, isReplied = false) => {
		if (!isReplied) {
			console.log(`[Sentinel] ${user} >> ${photo}`);
			sentichannel.send(`**${user}** >>`);
			sentichannel.send(`${photo}`);
		}
		else {
			console.log(`[Sentinel] > ${user} >> ${photo}`);
			sentichannel.send(`> **${user}** >> ${photo}`);
		}
	});
}