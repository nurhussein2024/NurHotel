// redisTest.js

const { createClient } = require('redis');

// Använd samma värden som i din .env-fil om du har PORT eller lösenord
const client = createClient({
  url: 'redis://localhost:6379'
});

(async () => {
  try {
    await client.connect();
    console.log('✅ Ansluten till Redis');

    // Sätta ett nyckel-värde par
    await client.set('testKey', 'Hello Redis!');
    console.log('✅ Värde sparat i Redis');

    // Hämta värdet
    const value = await client.get('testKey');
    console.log('📥 Värde hämtat från Redis:', value);

    // Stäng anslutningen
    await client.quit();
    console.log('🔌 Anslutning stängd');
  } catch (err) {
    console.error('❌ Fel vid test av Redis:', err);
  }
})();
