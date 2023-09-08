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
      'Authorization': 'bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVUb2tlblRpbWUiOjE2OTQxNzYwMzQ1MDksInVzZXJfbmFtZSI6InRlcm1pbmFsLmhlcnNvbkBnbWFpbC5jb20iLCJzY29wZSI6WyJvcGVuaWQiXSwicm9sZV9rZXkiOiJST0xFX09CTV9DVVNUT01FUl9NQU5BR0VSIiwidXNlcl9rZXkiOiJlODQ5YjdhNy1kNzIxLTRlNzItOTUzMy0yNGZjYjI4M2NlZmQiLCJleHAiOjE2OTQyMTkyMzQsImFkZGl0aW9uYWxEZXRhaWxzIjp7ImN1c3RvbWVyX3Byb2ZpbGVfaWQiOiI1MDI0MTMwIn0sImxvZ2lucyI6W3sidHlwZUtleSI6IkxPR0lOLk1TSVNETiIsInN0YXRlS2V5IjpudWxsLCJsb2dpbiI6IjM4MDY3NTU3NjYwOSJ9LHsidHlwZUtleSI6IkxPR0lOLkVNQUlMIiwic3RhdGVLZXkiOm51bGwsImxvZ2luIjoidGVybWluYWwuaGVyc29uQGdtYWlsLmNvbSJ9LHsidHlwZUtleSI6IkxPR0lOLk5JQ0tOQU1FIiwic3RhdGVLZXkiOm51bGwsImxvZ2luIjoi0YTQvtC_INGP0YXQvdC-INC80LDRgNC40L3QsCDRltCz0L7RgNGW0LLQvdCwIn1dLCJhdXRob3JpdGllcyI6WyJST0xFX09CTV9DVVNUT01FUl9NQU5BR0VSIl0sImp0aSI6Ijg2ZmU5MTNjLTBjMjItNDYyOC1iNjViLWM2MTExNjcwYmNhZiIsInRlbmFudCI6IlhNIiwiY2xpZW50X2lkIjoiaW50ZXJuYWwifQ.bKMGChOmwchrNqRLUxwIsSVBbyRg5zSesOSwc0khr1Ua-wMWahLruPpIY0i2ESeTYexSMcU3NU9YL1RydnQRFEaWYQniu2ZQ2pLPTaqUj2ptGYZaP0hz1q1H0Fffq53zQwFDYhu9RfvZGpehd1ooKYDcD7KBC7o5aB12rppIASaFXAuJr_l2Hw8ECmoCOSjRVOzlVw_0AQ-EykGMjY9F4NfxIDC2cfIwND-6obOHzzDmP8kcEO_5viO0XUV-4oBGew20ayxWc-UCCC1Ak4HrjqnsI_vGz3JysenT43f9eDsFmgGKEBTQBSCu-u4NiX-6M32g2HM47F7ueGdyA-YVnQ'
    };
    
    // const data = {
    //   content: 'pin=1111;addlits=1;',
    //   type: 'SMS',
    //   receiver: [{ id: 443, phoneNumber: 380672018231 }],
    //   sender: { id: 'Vend Water' },
    //   characteristic: [
    //     { name: 'DISTRIBUTION.ID', value: 5029972 },
    //     { name: 'VALIDITY.PERIOD', value: '000000000100000R' }
    //   ]
    // };
    

    // axios({
    //     method: 'post',
    //     url: url,
    //     headers: headers,
    //     data: data
    //   })
    //     .then(response => {
    //       console.log('Response:', response.data);
    //     })
    //     .catch(error => {
    //       console.error('Error:', error.message);
    //     });

   
} catch (error) {
    console.log(error);
}
}


module.exports = {
    sendMsgAddLitr
}