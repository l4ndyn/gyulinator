const Discord = require('discord.js');
const auth = require('./auth.json');
const bot = new Discord.Client();
bot.login(auth.token);

bot.once('ready', () => {
	// List servers the bot is connected to
	console.log('Channels:');
	bot.guilds.cache.forEach((guild) => {
		console.log(' - ' + guild.name);

		// List all channels
		guild.channels.cache.forEach((channel) => {
			console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`);
		});
	});

	console.log('Emojis:');
	bot.emojis.cache.forEach((emoji) => {
		console.log(` -- ${emoji.name} (${emoji.toString()})`);
	});
});

let punishment = false;
const peacock = '<:rofi:768470560606519326>';

const days = require('./daydiff.js');

bot.on('message', message => {
	const PREFIX = '!';

	if (!message.content.startsWith(PREFIX) || message.author.bot) return;

	const args = message.content.slice(PREFIX.length).trim().split(' ');
	const command = args.shift().toLowerCase();

	if (command === 'help') {
		if (!punishment && Math.random() * 10 > 3) {
			message.channel.send('Nem!');
		}
		else {
			message.channel.send('1. Ping \n2. week \n3. actest \n4. cave \n5. gyula \n6. punishment');
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
		message.channel.send(`**[${msg}]** het van. :)`);
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
	if (command !== 'punishment') {
		punishment = false;
	}
});