const db = require('../db/db')
const jwt = require("jsonwebtoken");
const axios = require('axios');
const sendMsgAddLitr = async(req,res) =>{
    // const {MACHINE_ID} = req.body;
try {

    const url = 'https://a2p.vodafone.ua/communication-event/api/communicationManagement/v2/communicationMessage/send';
    
    const headers = {
      'Content-Type': 'application/json',
      'Accept': '*/*',
      'Authorization': 'bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVUb2tlblRpbWUiOjE2OTQwOTY2NDc0MjYsInVzZXJfbmFtZSI6InRlcm1pbmFsLmhlcnNvbkBnbWFpbC5jb20iLCJzY29wZSI6WyJvcGVuaWQiXSwicm9sZV9rZXkiOiJST0xFX09CTV9DVVNUT01FUl9NQU5BR0VSIiwidXNlcl9rZXkiOiJlODQ5YjdhNy1kNzIxLTRlNzItOTUzMy0yNGZjYjI4M2NlZmQiLCJleHAiOjE2OTQxMzk4NDcsImFkZGl0aW9uYWxEZXRhaWxzIjp7ImN1c3RvbWVyX3Byb2ZpbGVfaWQiOiI1MDI0MTMwIn0sImxvZ2lucyI6W3sidHlwZUtleSI6IkxPR0lOLk1TSVNETiIsInN0YXRlS2V5IjpudWxsLCJsb2dpbiI6IjM4MDY3NTU3NjYwOSJ9LHsidHlwZUtleSI6IkxPR0lOLkVNQUlMIiwic3RhdGVLZXkiOm51bGwsImxvZ2luIjoidGVybWluYWwuaGVyc29uQGdtYWlsLmNvbSJ9LHsidHlwZUtleSI6IkxPR0lOLk5JQ0tOQU1FIiwic3RhdGVLZXkiOm51bGwsImxvZ2luIjoi0YTQvtC_INGP0YXQvdC-INC80LDRgNC40L3QsCDRltCz0L7RgNGW0LLQvdCwIn1dLCJhdXRob3JpdGllcyI6WyJST0xFX09CTV9DVVNUT01FUl9NQU5BR0VSIl0sImp0aSI6ImQ1ZTc2Mjk0LTUzMWEtNDcwMC1iODY0LTY5MjI4NDJmNThmYSIsInRlbmFudCI6IlhNIiwiY2xpZW50X2lkIjoiaW50ZXJuYWwifQ.GN0kHuLJO98ETNbnOYzvaQIPAkFc_oYGQqnZfMYkM9-R69cF7lPJiTVd4TN2JqbA4Crn2u18vdv4Kwj2VhZVKMmm5D0loYMAIWhfdJcV3OgyiRxYCr0GyTtieRQ-9f8cetMsgFor1nTfnSNcNJb8Xk9nFvZEOs96MxZrHtn2A3GOvAjIlQwsivJNO0u75-CtqVtbCAGZMOU3HVVg9uNCtAdA6uptf7LVk4n7G6J9JMIPr5rNpb6c_XWThnWwBu_Eo5bjS-G-5ucku8wNy5dGzrSS2pHT2wSwQPvlBCduNsQb8ZuyjI3Fbdmjin8x5JdZEaybmL47-vLENtkgqJAGTw'
    };
    
    const data = {
      content: 'pin=1111;addlits=6;',
      type: 'SMS',
      receiver: [{ id: 443, phoneNumber: 380934884189 }],
      sender: { id: 'Vend Water' },
      characteristic: [
        { name: 'DISTRIBUTION.ID', value: 5029972 },
        { name: 'VALIDITY.PERIOD', value: '000000000100000R' }
      ]
    };
    

    axios({
        method: 'post',
        url: url,
        headers: headers,
        data: data
      })
        .then(response => {
          console.log('Response:', response.data);
        })
        .catch(error => {
          console.error('Error:', error.message);
        });

   
} catch (error) {
    console.log(error);
}
}


module.exports = {
    sendMsgAddLitr
}