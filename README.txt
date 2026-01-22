DISCORD STATUS BOT - SETUP INSTRUCTIONS
========================================

FILES INCLUDED:
- index.js (main bot code)
- package.json (dependencies)
- README.txt (this file)

WHAT YOU NEED BEFORE STARTING:
1. Discord Bot Token (from https://discord.com/developers/applications)
2. User IDs for all 7 bots you want to track
3. Channel ID for #general (you already have: 1418980424092356790)

SETUP ON REPLIT:
================

Step 1: Create Replit Account
- Go to replit.com and sign up

Step 2: Upload This Project
- Click "+ Create Repl"
- Choose "Import from GitHub" OR "Upload"
- If uploading: drag and drop this ZIP file
- Or create blank Node.js Repl and copy the files

Step 3: Configure the Bot
- Open index.js
- Line 7: Replace 'YOUR_BOT_TOKEN_HERE' with your actual bot token
- Lines 13-49: Replace USER_ID placeholders with actual Discord User IDs:
  * USER_ID_READYBOT (Readybot.io#2398)
  * USER_ID_SAPPHIRE (Sapphire#8184)
  * USER_ID_BIRTHDAYY (Birthdayy#8610)
  * USER_ID_CARLBOT (Carl-bot#1536)
  * USER_ID_DYNO (Dyno#3861)
  * USER_ID_FREDBOAT (FredBoat♪♪#7284)
  * USER_ID_LIVEALERTS (LiveAlerts#9240)

Step 4: Install Dependencies
- In the Shell/Console, run: npm install
- Wait for it to complete

Step 5: Run the Bot
- Click the green "Run" button
- You should see: "✅ Bot is online as [YourBotName]"

Step 6: Keep Bot Running 24/7
- Sign up at uptimerobot.com (free)
- Add a monitor with your Replit URL
- This keeps the bot awake

HOW TO GET USER IDs:
====================
1. Enable Developer Mode in Discord:
   - Settings → Advanced → Developer Mode (ON)
2. Right-click on each bot's name
3. Click "Copy User ID"
4. Paste into the index.js file

NEED HELP?
==========
- Make sure Presence Intent & Server Members Intent are enabled in Discord Developer Portal
- Make sure the bot is invited to your server with proper permissions
- Check console for error messages

Bot created by Claude