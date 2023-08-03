const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('hypermode')
    .setDescription('This is a test command!'),
    async execute(interaction, client) {
        await interaction.reply({ content: 'The bot is working' });
    }
} 