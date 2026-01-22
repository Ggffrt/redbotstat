// Discord Status Monitor Bot
// Monitors specific bots and sends alerts when they go offline/online
const { Client, GatewayIntentBits } = require('discord.js');

// ============================================
// CONFIGURATION - FILL IN YOUR DETAILS HERE
// ============================================
const CONFIG = {
    // Get your bot token from https://discord.com/developers/applications
    token: 'YOUR_BOT_TOKEN_HERE',
    
    // Right-click #general channel and copy ID (need Developer Mode enabled)
    channelId: '1418980424092356790',
    
    // User configurations - Replace with actual Discord User IDs
    // To get User ID: Right-click bot → Copy User ID
    trackedUsers: {
        // Readybot.io#2398
        'USER_ID_READYBOT': {
            offlineMsg: 's!issues',
            onlineMsg: 's!backafterissue'
        },
        // Sapphire#8184
        'USER_ID_SAPPHIRE': {
            offlineMsg: 's!issues',
            onlineMsg: 's!backafterissue'
        },
        // Birthdayy#8610
        'USER_ID_BIRTHDAYY': {
            offlineMsg: 's!issues',
            onlineMsg: 's!backafterissue'
        },
        // Carl-bot#1536
        'USER_ID_CARLBOT': {
            offlineMsg: 's!issues',
            onlineMsg: 's!backafterissue'
        },
        // Dyno#3861
        'USER_ID_DYNO': {
            offlineMsg: 's!issues',
            onlineMsg: 's!backafterissue'
        },
        // FredBoat♪♪#7284
        'USER_ID_FREDBOAT': {
            offlineMsg: 's!issues',
            onlineMsg: 's!backafterissue'
        },
        // LiveAlerts#9240
        'USER_ID_LIVEALERTS': {
            offlineMsg: 's!redalertissue',
            onlineMsg: 's!afterredissue'
        }
    }
};

// ============================================
// BOT CODE - DO NOT MODIFY BELOW
// ============================================

let someoneOffline = false;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMembers
    ]
});

client.once('ready', () => {
    console.log(`✅ Bot is online as ${client.user.tag}`);
    console.log(`📋 Tracking ${Object.keys(CONFIG.trackedUsers).length} users`);
    console.log(`📢 Sending messages to channel: ${CONFIG.channelId}`);
    console.log('🟢 Bot is ready and monitoring status changes!');
});

client.on('presenceUpdate', async (oldPresence, newPresence) => {
    const userId = newPresence.userId;
    
    if (!CONFIG.trackedUsers[userId]) {
        return;
    }

    const channel = await client.channels.fetch(CONFIG.channelId);
    if (!channel) {
        console.error('❌ Could not find channel');
        return;
    }

    const userConfig = CONFIG.trackedUsers[userId];
    const member = newPresence.member;
    const username = member.displayName || member.user.username;

    const oldStatus = oldPresence?.status || 'offline';
    const newStatus = newPresence.status;

    // User went offline
    if (oldStatus !== 'offline' && newStatus === 'offline') {
        if (!someoneOffline) {
            await channel.send(userConfig.offlineMsg);
            console.log(`📤 ${username} went offline → Sent: ${userConfig.offlineMsg}`);
        } else {
            console.log(`⏭️ ${username} went offline (skipped, someone already offline)`);
        }
        someoneOffline = true;
    }

    // User came online
    if (oldStatus === 'offline' && newStatus !== 'offline') {
        const guild = newPresence.guild;
        let anyStillOffline = false;

        for (const trackedUserId of Object.keys(CONFIG.trackedUsers)) {
            try {
                const trackedMember = await guild.members.fetch(trackedUserId);
                if (trackedMember.presence?.status === 'offline' || !trackedMember.presence) {
                    anyStillOffline = true;
                    break;
                }
            } catch (error) {
                console.error(`⚠️ Could not fetch user ${trackedUserId}`);
            }
        }

        if (!anyStillOffline && someoneOffline) {
            await channel.send(userConfig.onlineMsg);
            console.log(`📤 ${username} came online → Sent: ${userConfig.onlineMsg}`);
            someoneOffline = false;
        } else if (!anyStillOffline) {
            someoneOffline = false;
        }
    }
});

client.on('error', error => {
    console.error('❌ Discord client error:', error);
});

client.login(CONFIG.token).catch(error => {
    console.error('❌ Failed to login:', error);
    console.log('Make sure your bot token is correct!');
});