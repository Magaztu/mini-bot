// const { SlashCommandBuilder } = require("discord.js");
import { SlashCommandBuilder } from "discord.js";

// new SlashCommandBuilder().setName('Perritos').setDescription('Trae perritos de mi API favorita');

// async execute(interaction) {
// 	await interaction.reply('Pong!')
// }

module.exports = {
    data: new SlashCommandBuilder().setName('Perritos').setDescription('Trae perritos de mi API favorita'),
    async execute(interaction: any){
        let perritoIMG = await fetch('https://dog.ceo/api/breeds/image/random');
        let promesa = await perritoIMG.json();
        let imagen = promesa.message;
        await interaction.reply(imagen);
    }
}