// ! Initial basic code, should change later on

import { Client, GatewayIntentBits } from 'discord.js';
import { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, VoiceConnectionStatus } from '@discordjs/voice';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

// Añadir porque el bot de voz lo necesita como dependencia
// import ffmpegPath from 'ffmpeg-static';
// process.env.FFMPEG_PATH = ffmpegPath as unknown as string;

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user?.tag}`);
});

client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    if (message.content === 'Adachi') {
    message.reply('True!');
    }

    if (message.content === 'eeeee') {
        const voiceChannel = message.member?.voice.channel;
        // message.channel.send('e e e');

    if (!voiceChannel) {
      return message.reply("I wish I never met you, e e e e e");
    }

    // ? Unirse al vc
    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: message.guildId!,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    });

    connection.on('stateChange', (oldState, newState) => {
        message.channel.send('e e e');
      // ~ Proceder si está listo
      if (newState.status === VoiceConnectionStatus.Ready) {
        console.log('Bot en vc');

        const player = createAudioPlayer();

        // const soundPath = '../Audio/jump.mp3';
        //const soundPath = path.join(__dirname, '..', 'Audio', 'jump.mp3');
        const soundPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'Audio', 'jump.mp3');
        // & Somehow the path became more complex lmaoo fuck ESM modules

        const resource = createAudioResource(soundPath);

        // ! Reproducir
        player.play(resource);
        connection.subscribe(player);

        // * Desconectarse
        player.on(AudioPlayerStatus.Idle, () => {
          connection.destroy();
          console.log('Audio reproducidowiwiwi');
        });
      }
    });
  }
});

client.login(process.env.DISCORD_TOKEN);
