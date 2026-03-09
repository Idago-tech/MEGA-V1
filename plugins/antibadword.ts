import type { BotContext } from '../types.js';
import store from '../lib/lightweight_store.js';
import config from '../config.js';

async function getAntibadwordSettings(chatId: string) {
    const settings = await store.getSetting(chatId, 'antibadword');
    return settings || { enabled: false, words: [] };
}

async function saveAntibadwordSettings(chatId: string, settings: any) {
    await store.saveSetting(chatId, 'antibadword', settings);
}

async function handleAntiBadwordCommand(sock: any, chatId: string, message: any, match: string) {
    const args = match.trim().toLowerCase().split(/\s+/);
    const action = args[0];

    const settings = await getAntibadwordSettings(chatId);

    if (!action || action === 'status') {
        const status = settings.enabled ? '✅ Enabled' : '❌ Disabled';
        const wordCount = settings.words?.length || 0;

        await sock.sendMessage(chatId, {
            text: `*Anti-Badword Status*\n\n` +
                  `Status: ${status}\n` +
                  `Blocked Words: ${wordCount}\n\n` +
                  `Use:\n` +
                  `• \`${config.prefix}antibadword on\` - Enable\n` +
                  `• \`${config.prefix}antibadword off\` - Disable\n` +
                  `• \`${config.prefix}antibadword add <word>\` - Add word\n` +
                  `• \`${config.prefix}antibadword remove <word>\` - Remove word\n` +
                  `• \`${config.prefix}antibadword list\` - Show all words`
        }, { quoted: message });
        return;
    }

    if (action === 'on') {
        settings.enabled = true;
        await saveAntibadwordSettings(chatId, settings);

        await sock.sendMessage(chatId, {
            text: '✅ *Anti-Badword Enabled*\n\nMessages with blocked words will be deleted.'
        }, { quoted: message });
        return;
    }

    if (action === 'off') {
        settings.enabled = false;
        await saveAntibadwordSettings(chatId, settings);

        await sock.sendMessage(chatId, {
            text: '❌ *Anti-Badword Disabled*\n\nBadword filter is now inactive.'
        }, { quoted: message });
        return;
    }

    if (action === 'add') {
        const word = args.slice(1).join(' ').toLowerCase().trim();

        if (!word) {
            await sock.sendMessage(chatId, {
                text: `*Please specify a word to add*\n\nExample: ${config.prefix}antibadword add badword`
            }, { quoted: message });
            return;
        }

        if (!settings.words) settings.words = [];

        if (settings.words.includes(word)) {
            await sock.sendMessage(chatId, {
                text: `❌ *Word already in list*\n\n"${word}" is already blocked.`
            }, { quoted: message });
            return;
        }

        settings.words.push(word);
        await saveAntibadwordSettings(chatId, settings);

        await sock.sendMessage(chatId, {
            text: `✅ *Word Added*\n\nAdded "${word}" to blocked words list.\n\nTotal blocked words: ${settings.words.length}`
        }, { quoted: message });
        return;
    }

    if (action === 'remove' || action === 'delete' || action === 'del') {
        const word = args.slice(1).join(' ').toLowerCase().trim();

        if (!word) {
            await sock.sendMessage(chatId, {
                text: `*Please specify a word to remove*\n\nExample: ${config.prefix}antibadword remove badword`
            }, { quoted: message });
            return;
        }

        if (!settings.words || !settings.words.includes(word)) {
            await sock.sendMessage(chatId, {
                text: `❌ *Word not found*\n\n"${word}" is not in the blocked list.`
            }, { quoted: message });
            return;
        }

        settings.words = settings.words.filter((w: string) => w !== word);
        await saveAntibadwordSettings(chatId, settings);

        await sock.sendMessage(chatId, {
            text: `✅ *Word Removed*\n\nRemoved "${word}" from blocked words list.\n\nRemaining blocked words: ${settings.words.length}`
        }, { quoted: message });
        return;
    }

    if (action === 'list') {
        if (!settings.words || settings.words.length === 0) {
            await sock.sendMessage(chatId, {
                text: `📝 *Blocked Words List*\n\nNo words are currently blocked.\n\nUse ${config.prefix}antibadword add <word> to add words.`
            }, { quoted: message });
            return;
        }

        const wordList = settings.words.map((w: string, i: number) => `${i + 1}. ${w}`).join('\n');

        await sock.sendMessage(chatId, {
            text: `📝 *Blocked Words List*\n\n${wordList}\n\nTotal: ${settings.words.length} words`
        }, { quoted: message });
        return;
    }
    await sock.sendMessage(chatId, {
        text: `❌ *Invalid action*
        
        Use:
        • ${config.prefix}antibadword on/off
        • ${config.prefix}antibadword add <word>
        • ${config.prefix}antibadword remove <word>
        • ${config.prefix}antibadword list`
    }, { quoted: message });
}

async function checkAntiBadword(sock: any, message: any) {
    const chatId = message.key.remoteJid;
    if (!chatId.endsWith('@g.us')) return false;

    const settings = await getAntibadwordSettings(chatId);
    if (!settings.enabled || !settings.words || settings.words.length === 0) return false;

    const messageText = (
        message.message?.conversation ||
        message.message?.extendedTextMessage?.text ||
        message.message?.imageMessage?.caption ||
        message.message?.videoMessage?.caption ||
        ''
    ).toLowerCase();

    if (!messageText) return false;

    for (const word of settings.words) {
        if (messageText.includes(word.toLowerCase())) {
            try {
                await sock.sendMessage(chatId, { delete: message.key });

                await sock.sendMessage(chatId, {
                    text: `❌ Message deleted: Contains blocked word "${word}"`
                });

                return true;
            } catch(error: any) {
                console.error('Error deleting badword message:', error);
            }
            break;
        }
    }

    return false;
}

export default {
    command: 'antibadword',
    aliases: ['abw', 'badword', 'antibad'],
    category: 'admin',
    description: 'Configure anti-badword filter to delete messages containing inappropriate words',
    usage: `${config.prefix}antibadword <on|off|add|remove|list>`,
    groupOnly: true,
    adminOnly: true,

    async handler(sock: any, message: any, args: any, context: BotContext) {
        const chatId = context.chatId || message.key.remoteJid;
        const match = args.join(' ');

        try {
            await handleAntiBadwordCommand(sock, chatId, message, match);
        } catch(error: any) {
            console.error('Error in antibadword command:', error);
            await sock.sendMessage(chatId, {
                text: '❌ *Error processing antibadword command*\n\nPlease try again later.'
            }, { quoted: message });
        }
    }
};

export { handleAntiBadwordCommand };
export { checkAntiBadword };
