const db = require('../db/db')
const jwt = require("jsonwebtoken");
const axios = require('axios');
const sendMsgAddLitr = async(req,res) =>{
    const {MACHINE_ID} = req.body;
try {

    const url = 'https://a2p.vodafone.ua/communication-event/api/communicationManagement/v2/communicationMessage/send';
    
    const headers = {
      'Content-Type': 'application/json',
      'Accept': '*/*',
      'Authorization': 'bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVUb2tlblRpbWUiOjE2OTM5MTMxODU1MzcsInVzZXJfbmFtZSI6InRlcm1pbmFsLmhlcnNvbkBnbWFpbC5jb20iLCJzY29wZSI6WyJvcGVuaWQiXSwicm9sZV9rZXkiOiJST0xFX09CTV9DVVNUT01FUl9NQU5BR0VSIiwidXNlcl9rZXkiOiJlODQ5YjdhNy1kNzIxLTRlNzItOTUzMy0yNGZjYjI4M2NlZmQiLCJleHAiOjE2OTM5NTYzODUsImFkZGl0aW9uYWxEZXRhaWxzIjp7ImN1c3RvbWVyX3Byb2ZpbGVfaWQiOiI1MDI0MTMwIn0sImxvZ2lucyI6W3sidHlwZUtleSI6IkxPR0lOLk1TSVNETiIsInN0YXRlS2V5IjpudWxsLCJsb2dpbiI6IjM4MDY3NTU3NjYwOSJ9LHsidHlwZUtleSI6IkxPR0lOLkVNQUlMIiwic3RhdGVLZXkiOm51bGwsImxvZ2luIjoidGVybWluYWwuaGVyc29uQGdtYWlsLmNvbSJ9LHsidHlwZUtleSI6IkxPR0lOLk5JQ0tOQU1FIiwic3RhdGVLZXkiOm51bGwsImxvZ2luIjoi0YTQvtC_INGP0YXQvdC-INC80LDRgNC40L3QsCDRltCz0L7RgNGW0LLQvdCwIn1dLCJhdXRob3JpdGllcyI6WyJST0xFX09CTV9DVVNUT01FUl9NQU5BR0VSIl0sImp0aSI6IjUxMGVhYzMzLTFjYTgtNDJiOC1hMzAwLWZhZDQyMzM2MWMwMCIsInRlbmFudCI6IlhNIiwiY2xpZW50X2lkIjoiaW50ZXJuYWwifQ.Pl78fc2vZVOos5Klj31c6mCMvrMMw8S0yp1iE8y1EYsXo8dbBOKwMqTPSrZYmTJ9RUwaoLV_szO6qx-owyOvj6D_4pXctRbFnyBIZsydkHRxU-NFE13SKqkOV20yczXs273zsz1SpMShJQ7Roa0Mdvu3Z3T2zN7syVlrvISa32lL4WfrfPSzBQwq8qtatM_T_1oHYe1pImK_JFWepUo5bi84Rd9ctmN7-QT8bUVTdF8jOITx6wtdm6WYtS_P231umnN3i6Kd9FvwO_jXU5TX0b0qVRghz_zlJxq78JONuflA4ryRnTprrvBQymx5TwsUcP_-jNGN-QVUDfJ9v1rJ6A'
    };
    
    const data = {
      content: 'Hello!',
      type: 'SMS',
      receiver: [{ id: 443, phoneNumber: 380505001107 }],
      sender: { id: 'Vend Market' },
      characteristic: [
        { name: 'DISTRIBUTION.ID', value: 5029972 },
        { name: 'VALIDITY.PERIOD', value: '000000000100000R' }
      ]
    };
    
if (MACHINE_ID) {
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
}
    console.log(MACHINE_ID);
} catch (error) {
    console.log(error);
}
}


module.exports = {
    sendMsgAddLitr
}