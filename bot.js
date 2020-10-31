const Discord = require('discord.js');
const auth = require('./auth.json');
const bot = new Discord.Client();
bot.login(auth.token);

const sentinel = require('./sentinel.js');
let sentichannel;

// const classes = require('./classes.json')

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


	sentichannel = bot.channels.cache.get('771107817016524811');

	sentinel.watch((user, msg) => {
		console.log(`[Sentinel] ${user} >> ${msg}`);
		sentichannel.send(`${user} >> ${msg}`);
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
			message.channel.send('- Ping \n- week \n- actest \n- cave \n- gyula \n- punishment \n- class \n- christmas \n- covid69');
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
		if(args.length < 2 || args.length > 2) {
			message.channel.send('Te buta! Ezt igy kell hasznalni: !class \'felcsoportod\' \'tantargy\' \nTargyak: logfunk, data, java, num, linux, stat, english \nPelda: !class 523/2 java');
			return;
		}

		const group = args.shift().toLowerCase();
		const myClass = args.shift().toLowerCase();

		if (group === '521/1') {
			if (myClass === 'logfunk') {
				message.channel.send('Eloadas: https://teams.microsoft.com/l/channel/19%3a987f440164cc45ebb71a108eb243f753%40thread.tacv2/El%25C5%2591ad%25C3%25A1s?groupId=11bff833-213a-4e2e-a6f0-758fa461a44c&tenantId=5a4863ed-40c8-4fd5-8298-fbfdb7f13095 \nSzeminarium: https://teams.microsoft.com/l/channel/19%3ab90e63e21a2e4900be1f8c6cbc26cfde%40thread.tacv2/Szemin%25C3%25A1rium?groupId=11bff833-213a-4e2e-a6f0-758fa461a44c&tenantId=5a4863ed-40c8-4fd5-8298-fbfdb7f13095 \nLabor: https://teams.microsoft.com/l/channel/19%3a74eafc5a75e741868532abdb71add06b%40thread.tacv2/Labor?groupId=11bff833-213a-4e2e-a6f0-758fa461a44c&tenantId=5a4863ed-40c8-4fd5-8298-fbfdb7f13095 \n');
			}
			else if (myClass === 'data') {
				message.channel.send('Eloadas: https://zoom.us/j/98569115531?pwd=L1MwVVQ1dVdQblMzY2FDV2tWQ3Z5dz09 \nSzeminarium: https://zoom.us/j/98279368344?pwd=WnkvbmpjeTFtZ0w1YmdUdjQ3VVBXUT09 \nLabor: https://teams.microsoft.com/l/channel/19%3ae12a102caf7f4796b61e2984cc3bfbd5%40thread.tacv2/General?groupId=2f1905e0-f164-4ee7-abf1-2a3105431020&tenantId=5a4863ed-40c8-4fd5-8298-fbfdb7f13095');
			}
			else if (myClass === 'java') {
				message.channel.send('Eloadas:https://zoom.us/j/99906544437?pwd=TG1OYUt0TnNRRzIxbkJhQzd1UTM4dz09 \nSzeminarium: https://zoom.us/j/93608918970?pwd=bCt2WTNuYU5FR29mTk5leEt3dUo3UT09 \nLabor: https://zoom.us/j/93403301837?pwd=dWk0WWNSeDdHUWxpQnltcUFLRlpZdz09');
			}
			else if (myClass === 'num') {
				message.channel.send('Eloadas, Szeminarium, Labor: https://zoom.us/j/8092820652?pwd=V2kydFZsRnZLUlZrUmc0cEdURXU3dz09');
			}
			else if (myClass === 'linux') {
				message.channel.send('Eloadas, Labor: https://teams.microsoft.com/l/channel/19%3ad6e3d0fe777c4f33ae99d306b6feccbd%40thread.tacv2/General?groupId=5fa96e92-4e45-4f25-b54e-d1a60fc63a79&tenantId=5a4863ed-40c8-4fd5-8298-fbfdb7f13095');
			}
			else if (myClass === 'stat') {
				message.channel.send('Eloadas, Szeminarium: https://teams.microsoft.com/l/channel/19%3a59c025dc8bd64d59a726089120be511b%40thread.tacv2/General?groupId=2a4548c0-174a-4945-8e46-5981ae0561ab&tenantId=5a4863ed-40c8-4fd5-8298-fbfdb7f13095 \nLabor, Hetfo esti kurzus: https://zoom.us/j/2962757083?pwd=UmJRMndzUXlTWHRYSkVHRC9xaEZDZz09');
			}
			else if (myClass === 'english') {
				message.channel.send('Eloadas: https://teams.microsoft.com/l/channel/19%3a17e29916f74c4c77a8464800ac356662%40thread.tacv2/General?groupId=d17c1369-02dc-4cf4-a764-2742586fb81a&tenantId=5a4863ed-40c8-4fd5-8298-fbfdb7f13095');
			}
		}
		else if (group === '521/2') {
			if (myClass === 'logfunk') {
				message.channel.send('Eloadas: https://teams.microsoft.com/l/channel/19%3a987f440164cc45ebb71a108eb243f753%40thread.tacv2/El%25C5%2591ad%25C3%25A1s?groupId=11bff833-213a-4e2e-a6f0-758fa461a44c&tenantId=5a4863ed-40c8-4fd5-8298-fbfdb7f13095 \n Szeminarium: https://teams.microsoft.com/l/channel/19%3ab90e63e21a2e4900be1f8c6cbc26cfde%40thread.tacv2/Szemin%25C3%25A1rium?groupId=11bff833-213a-4e2e-a6f0-758fa461a44c&tenantId=5a4863ed-40c8-4fd5-8298-fbfdb7f13095 \nLabor: https://teams.microsoft.com/l/channel/19%3a74eafc5a75e741868532abdb71add06b%40thread.tacv2/Labor?groupId=11bff833-213a-4e2e-a6f0-758fa461a44c&tenantId=5a4863ed-40c8-4fd5-8298-fbfdb7f13095 \n');
			}
			else if (myClass === 'data') {
				message.channel.send('Eloadas: https://zoom.us/j/98569115531?pwd=L1MwVVQ1dVdQblMzY2FDV2tWQ3Z5dz09 \nSzeminarium: https://zoom.us/j/98279368344?pwd=WnkvbmpjeTFtZ0w1YmdUdjQ3VVBXUT09 \nLabor: https://teams.microsoft.com/l/channel/19%3ae12a102caf7f4796b61e2984cc3bfbd5%40thread.tacv2/General?groupId=2f1905e0-f164-4ee7-abf1-2a3105431020&tenantId=5a4863ed-40c8-4fd5-8298-fbfdb7f13095');
			}
			else if (myClass === 'java') {
				message.channel.send('Eloadas:https://zoom.us/j/99906544437?pwd=TG1OYUt0TnNRRzIxbkJhQzd1UTM4dz09 \nSzeminarium: https://zoom.us/j/93608918970?pwd=bCt2WTNuYU5FR29mTk5leEt3dUo3UT09 \nLabor: https://zoom.us/j/93403301837?pwd=dWk0WWNSeDdHUWxpQnltcUFLRlpZdz09');
			}
			else if (myClass === 'num') {
				message.channel.send('Eloadas, Szeminarium, Labor: https://zoom.us/j/8092820652?pwd=V2kydFZsRnZLUlZrUmc0cEdURXU3dz09');
			}
			else if (myClass === 'linux') {
				message.channel.send('Eloadas, Labor: https://teams.microsoft.com/l/channel/19%3ad6e3d0fe777c4f33ae99d306b6feccbd%40thread.tacv2/General?groupId=5fa96e92-4e45-4f25-b54e-d1a60fc63a79&tenantId=5a4863ed-40c8-4fd5-8298-fbfdb7f13095');
			}
			else if (myClass === 'stat') {
				message.channel.send('Eloadas, Szeminarium: https://teams.microsoft.com/l/channel/19%3a59c025dc8bd64d59a726089120be511b%40thread.tacv2/General?groupId=2a4548c0-174a-4945-8e46-5981ae0561ab&tenantId=5a4863ed-40c8-4fd5-8298-fbfdb7f13095 \nLabor, Hetfo esti kurzus: https://zoom.us/j/2962757083?pwd=UmJRMndzUXlTWHRYSkVHRC9xaEZDZz09');
			}
			else if (myClass === 'english') {
				message.channel.send('Eloadas: https://teams.microsoft.com/l/channel/19%3a17e29916f74c4c77a8464800ac356662%40thread.tacv2/General?groupId=d17c1369-02dc-4cf4-a764-2742586fb81a&tenantId=5a4863ed-40c8-4fd5-8298-fbfdb7f13095');
			}
		}
		else if (group === '522/1') {
			if (myClass === 'logfunk') {
				message.channel.send('Eloadas: https://teams.microsoft.com/l/channel/19%3a987f440164cc45ebb71a108eb243f753%40thread.tacv2/El%25C5%2591ad%25C3%25A1s?groupId=11bff833-213a-4e2e-a6f0-758fa461a44c&tenantId=5a4863ed-40c8-4fd5-8298-fbfdb7f13095 \n Szeminarium: https://teams.microsoft.com/l/channel/19%3ab90e63e21a2e4900be1f8c6cbc26cfde%40thread.tacv2/Szemin%25C3%25A1rium?groupId=11bff833-213a-4e2e-a6f0-758fa461a44c&tenantId=5a4863ed-40c8-4fd5-8298-fbfdb7f13095 \nLabor: https://teams.microsoft.com/l/channel/19%3a74eafc5a75e741868532abdb71add06b%40thread.tacv2/Labor?groupId=11bff833-213a-4e2e-a6f0-758fa461a44c&tenantId=5a4863ed-40c8-4fd5-8298-fbfdb7f13095 \n');
			}
			else if (myClass === 'data') {
				message.channel.send('Eloadas: https://zoom.us/j/98569115531?pwd=L1MwVVQ1dVdQblMzY2FDV2tWQ3Z5dz09 \nSzeminarium: https://zoom.us/j/97994513576?pwd=aDllRm5BeWJaRkZPYXdFU01QaTBaQT09 \nLabor: https://teams.microsoft.com/l/channel/19%3ae12a102caf7f4796b61e2984cc3bfbd5%40thread.tacv2/General?groupId=2f1905e0-f164-4ee7-abf1-2a3105431020&tenantId=5a4863ed-40c8-4fd5-8298-fbfdb7f13095');
			}
			else if (myClass === 'java') {
				message.channel.send('Eloadas:https://zoom.us/j/99906544437?pwd=TG1OYUt0TnNRRzIxbkJhQzd1UTM4dz09 \nSzeminarium: https://zoom.us/j/93185029499?pwd=bzJTc3BZTGZxQmZlR2dabzBBV0tKQT09 \nLabor: https://zoom.us/j/95322517296?pwd=RUdES1VDanh0ZkI2SGwxMDhKaCtZQT09');
			}
			else if (myClass === 'num') {
				message.channel.send('Eloadas, Szeminarium, Labor: https://zoom.us/j/8092820652?pwd=V2kydFZsRnZLUlZrUmc0cEdURXU3dz09');
			}
			else if (myClass === 'linux') {
				message.channel.send('Eloadas, Labor: https://teams.microsoft.com/l/channel/19%3ad6e3d0fe777c4f33ae99d306b6feccbd%40thread.tacv2/General?groupId=5fa96e92-4e45-4f25-b54e-d1a60fc63a79&tenantId=5a4863ed-40c8-4fd5-8298-fbfdb7f13095');
			}
			else if (myClass === 'stat') {
				message.channel.send('Eloadas, Szeminarium: https://teams.microsoft.com/l/channel/19%3a59c025dc8bd64d59a726089120be511b%40thread.tacv2/General?groupId=2a4548c0-174a-4945-8e46-5981ae0561ab&tenantId=5a4863ed-40c8-4fd5-8298-fbfdb7f13095 \nLabor, Hetfo esti kurzus: https://zoom.us/j/2962757083?pwd=UmJRMndzUXlTWHRYSkVHRC9xaEZDZz09');
			}
			else if (myClass === 'english') {
				message.channel.send('Eloadas: https://teams.microsoft.com/l/channel/19%3a17e29916f74c4c77a8464800ac356662%40thread.tacv2/General?groupId=d17c1369-02dc-4cf4-a764-2742586fb81a&tenantId=5a4863ed-40c8-4fd5-8298-fbfdb7f13095');
			}
		}
		else if (group === '522/2') {
			if (myClass === 'logfunk') {
				message.channel.send('Eloadas: https://teams.microsoft.com/l/channel/19%3a987f440164cc45ebb71a108eb243f753%40thread.tacv2/El%25C5%2591ad%25C3%25A1s?groupId=11bff833-213a-4e2e-a6f0-758fa461a44c&tenantId=5a4863ed-40c8-4fd5-8298-fbfdb7f13095 \n Szeminarium: https://teams.microsoft.com/l/channel/19%3ab90e63e21a2e4900be1f8c6cbc26cfde%40thread.tacv2/Szemin%25C3%25A1rium?groupId=11bff833-213a-4e2e-a6f0-758fa461a44c&tenantId=5a4863ed-40c8-4fd5-8298-fbfdb7f13095 \nLabor: https://teams.microsoft.com/l/channel/19%3a74eafc5a75e741868532abdb71add06b%40thread.tacv2/Labor?groupId=11bff833-213a-4e2e-a6f0-758fa461a44c&tenantId=5a4863ed-40c8-4fd5-8298-fbfdb7f13095 \n');
			}
			else if (myClass === 'data') {
				message.channel.send('Eloadas: https://zoom.us/j/98569115531?pwd=L1MwVVQ1dVdQblMzY2FDV2tWQ3Z5dz09 \nSzeminarium: https://zoom.us/j/97994513576?pwd=aDllRm5BeWJaRkZPYXdFU01QaTBaQT09 \nLabor: https://teams.microsoft.com/l/channel/19%3ae12a102caf7f4796b61e2984cc3bfbd5%40thread.tacv2/General?groupId=2f1905e0-f164-4ee7-abf1-2a3105431020&tenantId=5a4863ed-40c8-4fd5-8298-fbfdb7f13095');
			}
			else if (myClass === 'java') {
				message.channel.send('Eloadas:https://zoom.us/j/99906544437?pwd=TG1OYUt0TnNRRzIxbkJhQzd1UTM4dz09 \nSzeminarium: https://zoom.us/j/93185029499?pwd=bzJTc3BZTGZxQmZlR2dabzBBV0tKQT09 \nLabor: https://zoom.us/j/95322517296?pwd=RUdES1VDanh0ZkI2SGwxMDhKaCtZQT09');
			}
			else if (myClass === 'num') {
				message.channel.send('Eloadas, Szeminarium, Labor: https://zoom.us/j/8092820652?pwd=V2kydFZsRnZLUlZrUmc0cEdURXU3dz09');
			}
			else if (myClass === 'linux') {
				message.channel.send('Eloadas, Labor: https://teams.microsoft.com/l/channel/19%3ad6e3d0fe777c4f33ae99d306b6feccbd%40thread.tacv2/General?groupId=5fa96e92-4e45-4f25-b54e-d1a60fc63a79&tenantId=5a4863ed-40c8-4fd5-8298-fbfdb7f13095');
			}
			else if (myClass === 'stat') {
				message.channel.send('Eloadas, Szeminarium: https://teams.microsoft.com/l/channel/19%3a59c025dc8bd64d59a726089120be511b%40thread.tacv2/General?groupId=2a4548c0-174a-4945-8e46-5981ae0561ab&tenantId=5a4863ed-40c8-4fd5-8298-fbfdb7f13095 \nLabor, Hetfo esti kurzus: https://zoom.us/j/2962757083?pwd=UmJRMndzUXlTWHRYSkVHRC9xaEZDZz09');
			}
			else if (myClass === 'english') {
				message.channel.send('Eloadas: https://teams.microsoft.com/l/channel/19%3a17e29916f74c4c77a8464800ac356662%40thread.tacv2/General?groupId=d17c1369-02dc-4cf4-a764-2742586fb81a&tenantId=5a4863ed-40c8-4fd5-8298-fbfdb7f13095');
			}
		}
		else if (group === '523/1') {
			if (myClass === 'logfunk') {
				message.channel.send('Eloadas: https://teams.microsoft.com/l/channel/19%3a987f440164cc45ebb71a108eb243f753%40thread.tacv2/El%25C5%2591ad%25C3%25A1s?groupId=11bff833-213a-4e2e-a6f0-758fa461a44c&tenantId=5a4863ed-40c8-4fd5-8298-fbfdb7f13095 \nSzeminarium: https://teams.microsoft.com/l/channel/19%3ab90e63e21a2e4900be1f8c6cbc26cfde%40thread.tacv2/Szemin%25C3%25A1rium?groupId=11bff833-213a-4e2e-a6f0-758fa461a44c&tenantId=5a4863ed-40c8-4fd5-8298-fbfdb7f13095 \nLabor: https://teams.microsoft.com/l/channel/19%3a74eafc5a75e741868532abdb71add06b%40thread.tacv2/Labor?groupId=11bff833-213a-4e2e-a6f0-758fa461a44c&tenantId=5a4863ed-40c8-4fd5-8298-fbfdb7f13095 \n');
			}
			else if (myClass === 'data') {
				message.channel.send('Eloadas: https://zoom.us/j/98569115531?pwd=L1MwVVQ1dVdQblMzY2FDV2tWQ3Z5dz09 \nSzeminarium: https://zoom.us/j/98993615170?pwd=emcxVWNyQ1VRNEltV0J4Rld1U3hIUT09 \nLabor: https://teams.microsoft.com/l/channel/19%3ae12a102caf7f4796b61e2984cc3bfbd5%40thread.tacv2/General?groupId=2f1905e0-f164-4ee7-abf1-2a3105431020&tenantId=5a4863ed-40c8-4fd5-8298-fbfdb7f13095');
			}
			else if (myClass === 'java') {
				message.channel.send('Eloadas:https://zoom.us/j/99906544437?pwd=TG1OYUt0TnNRRzIxbkJhQzd1UTM4dz09 \nSzeminarium: https://zoom.us/j/92198145026?pwd=M3RtaFE1NHJqVjhyUlBsSjN6aDRkZz09 \nLabor: https://discord.gg/vrHCT7T');
			}
			else if (myClass === 'num') {
				message.channel.send('Eloadas, Szeminarium, Labor: https://zoom.us/j/8092820652?pwd=V2kydFZsRnZLUlZrUmc0cEdURXU3dz09');
			}
			else if (myClass === 'linux') {
				message.channel.send('Eloadas, Labor: https://teams.microsoft.com/l/channel/19%3ad6e3d0fe777c4f33ae99d306b6feccbd%40thread.tacv2/General?groupId=5fa96e92-4e45-4f25-b54e-d1a60fc63a79&tenantId=5a4863ed-40c8-4fd5-8298-fbfdb7f13095');
			}
			else if (myClass === 'stat') {
				message.channel.send('Eloadas, Szeminarium: https://teams.microsoft.com/l/channel/19%3a59c025dc8bd64d59a726089120be511b%40thread.tacv2/General?groupId=2a4548c0-174a-4945-8e46-5981ae0561ab&tenantId=5a4863ed-40c8-4fd5-8298-fbfdb7f13095 \nLabor, Hetfo esti kurzus: https://zoom.us/j/2962757083?pwd=UmJRMndzUXlTWHRYSkVHRC9xaEZDZz09');
			}
			else if (myClass === 'english') {
				message.channel.send('Eloadas: https://teams.microsoft.com/l/channel/19%3a17e29916f74c4c77a8464800ac356662%40thread.tacv2/General?groupId=d17c1369-02dc-4cf4-a764-2742586fb81a&tenantId=5a4863ed-40c8-4fd5-8298-fbfdb7f13095');
			}
		}
		else if (group === '523/2') {
			if (myClass === 'logfunk') {
				message.channel.send('Eloadas: https://teams.microsoft.com/l/channel/19%3a987f440164cc45ebb71a108eb243f753%40thread.tacv2/El%25C5%2591ad%25C3%25A1s?groupId=11bff833-213a-4e2e-a6f0-758fa461a44c&tenantId=5a4863ed-40c8-4fd5-8298-fbfdb7f13095 \nSzeminarium: https://teams.microsoft.com/l/channel/19%3ab90e63e21a2e4900be1f8c6cbc26cfde%40thread.tacv2/Szemin%25C3%25A1rium?groupId=11bff833-213a-4e2e-a6f0-758fa461a44c&tenantId=5a4863ed-40c8-4fd5-8298-fbfdb7f13095 \nLabor: https://teams.microsoft.com/l/channel/19%3a74eafc5a75e741868532abdb71add06b%40thread.tacv2/Labor?groupId=11bff833-213a-4e2e-a6f0-758fa461a44c&tenantId=5a4863ed-40c8-4fd5-8298-fbfdb7f13095 \n');
			}
			else if (myClass === 'data') {
				message.channel.send('Eloadas: https://zoom.us/j/98569115531?pwd=L1MwVVQ1dVdQblMzY2FDV2tWQ3Z5dz09 \nSzeminarium: https://zoom.us/j/98993615170?pwd=emcxVWNyQ1VRNEltV0J4Rld1U3hIUT09 \nLabor: https://teams.microsoft.com/l/channel/19%3ae12a102caf7f4796b61e2984cc3bfbd5%40thread.tacv2/General?groupId=2f1905e0-f164-4ee7-abf1-2a3105431020&tenantId=5a4863ed-40c8-4fd5-8298-fbfdb7f13095');
			}
			else if (myClass === 'java') {
				message.channel.send('Eloadas:https://zoom.us/j/99906544437?pwd=TG1OYUt0TnNRRzIxbkJhQzd1UTM4dz09 \nSzeminarium: https://zoom.us/j/92198145026?pwd=M3RtaFE1NHJqVjhyUlBsSjN6aDRkZz09 \nLabor: https://discord.gg/vrHCT7T');
			}
			else if (myClass === 'num') {
				message.channel.send('Eloadas, Szeminarium, Labor: https://zoom.us/j/8092820652?pwd=V2kydFZsRnZLUlZrUmc0cEdURXU3dz09');
			}
			else if (myClass === 'linux') {
				message.channel.send('Eloadas, Labor: https://teams.microsoft.com/l/channel/19%3ad6e3d0fe777c4f33ae99d306b6feccbd%40thread.tacv2/General?groupId=5fa96e92-4e45-4f25-b54e-d1a60fc63a79&tenantId=5a4863ed-40c8-4fd5-8298-fbfdb7f13095');
			}
			else if (myClass === 'stat') {
				message.channel.send('Eloadas, Szeminarium: https://teams.microsoft.com/l/channel/19%3a59c025dc8bd64d59a726089120be511b%40thread.tacv2/General?groupId=2a4548c0-174a-4945-8e46-5981ae0561ab&tenantId=5a4863ed-40c8-4fd5-8298-fbfdb7f13095 \nLabor, Hetfo esti kurzus: https://zoom.us/j/2962757083?pwd=UmJRMndzUXlTWHRYSkVHRC9xaEZDZz09');
			}
			else if (myClass === 'english') {
				message.channel.send('Eloadas: https://teams.microsoft.com/l/channel/19%3a17e29916f74c4c77a8464800ac356662%40thread.tacv2/General?groupId=d17c1369-02dc-4cf4-a764-2742586fb81a&tenantId=5a4863ed-40c8-4fd5-8298-fbfdb7f13095');
			}
		}
		else if (group === '524/1') {
			if (myClass === 'logfunk') {
				message.channel.send('Eloadas: https://teams.microsoft.com/l/channel/19%3a987f440164cc45ebb71a108eb243f753%40thread.tacv2/El%25C5%2591ad%25C3%25A1s?groupId=11bff833-213a-4e2e-a6f0-758fa461a44c&tenantId=5a4863ed-40c8-4fd5-8298-fbfdb7f13095 \nSzeminarium: https://teams.microsoft.com/l/channel/19%3ab90e63e21a2e4900be1f8c6cbc26cfde%40thread.tacv2/Szemin%25C3%25A1rium?groupId=11bff833-213a-4e2e-a6f0-758fa461a44c&tenantId=5a4863ed-40c8-4fd5-8298-fbfdb7f13095 \nLabor: https://teams.microsoft.com/l/channel/19%3a74eafc5a75e741868532abdb71add06b%40thread.tacv2/Labor?groupId=11bff833-213a-4e2e-a6f0-758fa461a44c&tenantId=5a4863ed-40c8-4fd5-8298-fbfdb7f13095 \n');
			}
			else if (myClass === 'data') {
				message.channel.send('Eloadas: https://zoom.us/j/98569115531?pwd=L1MwVVQ1dVdQblMzY2FDV2tWQ3Z5dz09 \nSzeminarium: https://zoom.us/j/99493679120?pwd=clJ0QzNCQXJmNHpjUyszWXB1eGxIUT09 \nLabor: https://teams.microsoft.com/l/channel/19%3ae12a102caf7f4796b61e2984cc3bfbd5%40thread.tacv2/General?groupId=2f1905e0-f164-4ee7-abf1-2a3105431020&tenantId=5a4863ed-40c8-4fd5-8298-fbfdb7f13095');
			}
			else if (myClass === 'java') {
				message.channel.send('Eloadas:https://zoom.us/j/99906544437?pwd=TG1OYUt0TnNRRzIxbkJhQzd1UTM4dz09 \nSzeminarium: https://zoom.us/j/98099882783?pwd=WmJDTWJMUGgrcDdESUFzK3dpS1VZUT09 \nLabor: https://zoom.us/j/95322517296?pwd=RUdES1VDanh0ZkI2SGwxMDhKaCtZQT09');
			}
			else if (myClass === 'num') {
				message.channel.send('Eloadas, Szeminarium, Labor: https://zoom.us/j/8092820652?pwd=V2kydFZsRnZLUlZrUmc0cEdURXU3dz09');
			}
			else if (myClass === 'linux') {
				message.channel.send('Eloadas, Labor: https://teams.microsoft.com/l/channel/19%3ad6e3d0fe777c4f33ae99d306b6feccbd%40thread.tacv2/General?groupId=5fa96e92-4e45-4f25-b54e-d1a60fc63a79&tenantId=5a4863ed-40c8-4fd5-8298-fbfdb7f13095');
			}
			else if (myClass === 'stat') {
				message.channel.send('Eloadas, Szeminarium: https://teams.microsoft.com/l/channel/19%3a59c025dc8bd64d59a726089120be511b%40thread.tacv2/General?groupId=2a4548c0-174a-4945-8e46-5981ae0561ab&tenantId=5a4863ed-40c8-4fd5-8298-fbfdb7f13095 \nLabor, Hetfo esti kurzus: https://zoom.us/j/2962757083?pwd=UmJRMndzUXlTWHRYSkVHRC9xaEZDZz09');
			}
			else if (myClass === 'english') {
				message.channel.send('Eloadas: https://teams.microsoft.com/l/channel/19%3a17e29916f74c4c77a8464800ac356662%40thread.tacv2/General?groupId=d17c1369-02dc-4cf4-a764-2742586fb81a&tenantId=5a4863ed-40c8-4fd5-8298-fbfdb7f13095');
			}
		}
		else if (group === '524/2') {
			if (myClass === 'logfunk') {
				message.channel.send('Eloadas: https://teams.microsoft.com/l/channel/19%3a987f440164cc45ebb71a108eb243f753%40thread.tacv2/El%25C5%2591ad%25C3%25A1s?groupId=11bff833-213a-4e2e-a6f0-758fa461a44c&tenantId=5a4863ed-40c8-4fd5-8298-fbfdb7f13095 \nSzeminarium: https://teams.microsoft.com/l/channel/19%3ab90e63e21a2e4900be1f8c6cbc26cfde%40thread.tacv2/Szemin%25C3%25A1rium?groupId=11bff833-213a-4e2e-a6f0-758fa461a44c&tenantId=5a4863ed-40c8-4fd5-8298-fbfdb7f13095 \nLabor: https://teams.microsoft.com/l/channel/19%3a74eafc5a75e741868532abdb71add06b%40thread.tacv2/Labor?groupId=11bff833-213a-4e2e-a6f0-758fa461a44c&tenantId=5a4863ed-40c8-4fd5-8298-fbfdb7f13095 \n');
			}
			else if (myClass === 'data') {
				message.channel.send('Eloadas: https://zoom.us/j/98569115531?pwd=L1MwVVQ1dVdQblMzY2FDV2tWQ3Z5dz09 \nSzeminarium: https://zoom.us/j/99493679120?pwd=clJ0QzNCQXJmNHpjUyszWXB1eGxIUT09 \nLabor: https://teams.microsoft.com/l/channel/19%3ae12a102caf7f4796b61e2984cc3bfbd5%40thread.tacv2/General?groupId=2f1905e0-f164-4ee7-abf1-2a3105431020&tenantId=5a4863ed-40c8-4fd5-8298-fbfdb7f13095');
			}
			else if (myClass === 'java') {
				message.channel.send('Eloadas:https://zoom.us/j/99906544437?pwd=TG1OYUt0TnNRRzIxbkJhQzd1UTM4dz09 \nSzeminarium: https://zoom.us/j/98099882783?pwd=WmJDTWJMUGgrcDdESUFzK3dpS1VZUT09 \nLabor: https://discord.gg/vrHCT7T');
			}
			else if (myClass === 'num') {
				message.channel.send('Eloadas, Szeminarium, Labor: https://zoom.us/j/8092820652?pwd=V2kydFZsRnZLUlZrUmc0cEdURXU3dz09');
			}
			else if (myClass === 'linux') {
				message.channel.send('Eloadas, Labor: https://teams.microsoft.com/l/channel/19%3ad6e3d0fe777c4f33ae99d306b6feccbd%40thread.tacv2/General?groupId=5fa96e92-4e45-4f25-b54e-d1a60fc63a79&tenantId=5a4863ed-40c8-4fd5-8298-fbfdb7f13095');
			}
			else if (myClass === 'stat') {
				message.channel.send('Eloadas, Szeminarium: https://teams.microsoft.com/l/channel/19%3a59c025dc8bd64d59a726089120be511b%40thread.tacv2/General?groupId=2a4548c0-174a-4945-8e46-5981ae0561ab&tenantId=5a4863ed-40c8-4fd5-8298-fbfdb7f13095 \nLabor, Hetfo esti kurzus: https://zoom.us/j/2962757083?pwd=UmJRMndzUXlTWHRYSkVHRC9xaEZDZz09');
			}
			else if (myClass === 'english') {
				message.channel.send('Eloadas: https://teams.microsoft.com/l/channel/19%3a17e29916f74c4c77a8464800ac356662%40thread.tacv2/General?groupId=d17c1369-02dc-4cf4-a764-2742586fb81a&tenantId=5a4863ed-40c8-4fd5-8298-fbfdb7f13095');
			}
		}
	}
	else if (command === 'covid69') {
		message.channel.send('AAAA-chooo!');
	}
	else if (command === 'sentinel') {
		if (!sentinel.isStopped()) {
			sentinel.stop();
		}
		else {
			sentinel.watch((user, msg) => {
				console.log(`[Sentinel] ${user} >> ${msg}`);
				sentichannel.send(`${user} >> ${msg}`);
			});
		}
	}
	if (command !== 'punishment') {
		punishment = false;
	}
});