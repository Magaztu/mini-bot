// ! Initial basic code, should change later on

import { Client, GatewayIntentBits } from 'discord.js';
import { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, VoiceConnectionStatus } from '@discordjs/voice';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

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
    message.channel.send('e e e');
    const voiceChannel = message.member?.voice.channel;

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
      // ~ Proceder si está listo
      if (newState.status === VoiceConnectionStatus.Ready) {
        console.log('Bot en vc');

        const player = createAudioPlayer();

        // const soundPath = '../Audio/jump.mp3';
        const soundPath = path.join(__dirname, '..', 'Audio', 'jump.mp3');

        const resource = createAudioResource(soundPath);

        // ! Reproducir
        connection.subscribe(player);
        player.play(resource);

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
