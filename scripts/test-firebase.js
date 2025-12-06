/**
 * Simple script to test Firebase connection
 * Run with: node scripts/test-firebase.js
 */

const https = require('https');

const databaseUrl = 'embedproject-ac1d3-default-rtdb.asia-southeast1.firebasedatabase.app';
const path = 'test';

console.log('Fetching test value from Firebase...');
console.log(`URL: https://${databaseUrl}/${path}.json\n`);

const options = {
  hostname: databaseUrl,
  path: `/${path}.json`,
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  }
};

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      if (json.error) {
        console.error('❌ Error:', json.error);
        console.log('\nThis might be due to:');
        console.log('1. Firebase security rules preventing public access');
        console.log('2. Authentication required');
        console.log('3. The path "test" does not exist');
      } else {
        console.log('✅ Success! Test value:', json);
        console.log('\nValue:', JSON.stringify(json, null, 2));
      }
    } catch (e) {
      console.log('Response:', data);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Request error:', error.message);
});

req.end();

