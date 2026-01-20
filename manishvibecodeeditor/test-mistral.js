// test-mistral.js
// import fetch from 'node-fetch';

const MISTRAL_API_KEY = 'tCu3v7ZkPS4qWfJTQuQjKduR6YICRSK2';

async function testMistral() {
  console.log('Testing Mistral API key...');
  
  try {
    // First, test if we can list models
    const modelsResponse = await fetch('https://api.mistral.ai/v1/models', {
      headers: {
        'Authorization': `Bearer ${MISTRAL_API_KEY}`
      }
    });
    
    console.log('Models API Status:', modelsResponse.status);
    const modelsData = await modelsResponse.json();
    console.log('Available models:', modelsData.data?.map(m => m.id) || []);
    
    // Test chat completion
    const chatResponse = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MISTRAL_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'codestral',
        messages: [
          {
            role: 'user',
            content: 'Complete this: console.'
          }
        ],
        max_tokens: 50
      })
    });
    
    console.log('Chat API Status:', chatResponse.status);
    
    if (!chatResponse.ok) {
      const errorText = await chatResponse.text();
      console.error('Chat API Error:', errorText);
    } else {
      const chatData = await chatResponse.json();
      console.log('Chat API Success! Response:', JSON.stringify(chatData, null, 2));
    }
    
  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

testMistral();