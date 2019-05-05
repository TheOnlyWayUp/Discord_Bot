const Discord = require('discord.js')

exports.run = async (handler, message, args, pre) => {
	let member = message.member

	if (args.user) {
		let user

		try {
			user = await message.client.fetchUser(args.user)
			try {
				member = await message.guild.fetchMember(user)
			}catch(exception){
				return message.channel.send('User is not in the server.')
			}
		} catch (exception) {
			return message.channel.send('Invalid user.')
		}
	}

	const embed = new Discord.RichEmbed()
		.setColor(member.displayColor || null)
		.setAuthor(member.user.username, member.user.avatarURL)

	if (member.nickname) {
		embed.addField('Nickname', member.nickname, true)
	}

	embed.addField('Discriminator', member.user.discriminator, true)
		.addField('Date Joined', `${member.joinedAt.toISOString().slice(0, -5)}Z`, true)
		.addField('User Creation Date', `${member.user.createdAt.toISOString().slice(0, -5)}Z`, true)

	return message.channel.send({ embed })
}

exports.yargsOpts = {
	positional: {
		args: [
			{
				name: 'user',
				type: 'user'
			}
		],
		required: 0
	}
}

exports.help = {
	name: ['userinfo'],
	group: 'utility',
	description: 'Get information about yourself.'
}
