import axios from 'axios';

async function test() {
  try {
    const res = await axios.post('https://bgy-ipil-backend.onrender.com/api/auth/login', {
      username: 'admin',
      password: 'password123'
    });
    console.log('SUCCESS:', res.data);
  } catch (err) {
    console.error('ERROR:', err.response ? err.response.data : err.message);
  }
}
test();
