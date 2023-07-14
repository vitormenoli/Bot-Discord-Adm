const Discord = require('discord.js')

module.exports = {
    name: 'clear',
    description: 'Limpa o atual canal de texto.',
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'mensagens',
            description: 'Número de mensagens que será apagada. (1-100)',
            type: Discord.ApplicationCommandOptionType.Number,
            required: true
        }
    ],

    run: async(client, interaction) => {
        if(!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages)) {
            interaction.reply({ ephemeral: true, content: `👋 Olá **${interaction.user.username}**, você não possui a permissão \`Gerenciar Mensagens\` para utilizar este comando.` })
        } else {
            const mensagens = Number(interaction.options.getNumber('mensagens'))
            if(mensagens < 1 || mensagens > 100) {
                interaction.reply({ ephemeral: true, content: `❌ Olá **${interaction.user.username}**, você deve colocar uma quantidade de mensagens para serem apagadas entre 1 a 100.` })
            } else {
                interaction.channel.bulkDelete(mensagens).then( (msg) => {
                    interaction.reply({ content: `✅ Olá **${interaction.user.username}**, você apagou \`${msg.size}\` mensagens deste canal.` })
                }).catch(err => {
                    interaction.reply({ content: `❌ Olá **${interaction.user.username}**, não foi possível apagar as mensagens deste canal (possível motivo: as mensagens são antigas de mais, foram enviadas há 14 dias ou mais).` })
                })
            }
        }
    }
}