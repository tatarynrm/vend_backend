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
      'Authorization': 'bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVUb2tlblRpbWUiOjE2OTM5ODI0Mzc2NTcsInVzZXJfbmFtZSI6InRlcm1pbmFsLmhlcnNvbkBnbWFpbC5jb20iLCJzY29wZSI6WyJvcGVuaWQiXSwicm9sZV9rZXkiOiJST0xFX09CTV9DVVNUT01FUl9NQU5BR0VSIiwidXNlcl9rZXkiOiJlODQ5YjdhNy1kNzIxLTRlNzItOTUzMy0yNGZjYjI4M2NlZmQiLCJleHAiOjE2OTQwMjU2MzcsImFkZGl0aW9uYWxEZXRhaWxzIjp7ImN1c3RvbWVyX3Byb2ZpbGVfaWQiOiI1MDI0MTMwIn0sImxvZ2lucyI6W3sidHlwZUtleSI6IkxPR0lOLk1TSVNETiIsInN0YXRlS2V5IjpudWxsLCJsb2dpbiI6IjM4MDY3NTU3NjYwOSJ9LHsidHlwZUtleSI6IkxPR0lOLkVNQUlMIiwic3RhdGVLZXkiOm51bGwsImxvZ2luIjoidGVybWluYWwuaGVyc29uQGdtYWlsLmNvbSJ9LHsidHlwZUtleSI6IkxPR0lOLk5JQ0tOQU1FIiwic3RhdGVLZXkiOm51bGwsImxvZ2luIjoi0YTQvtC_INGP0YXQvdC-INC80LDRgNC40L3QsCDRltCz0L7RgNGW0LLQvdCwIn1dLCJhdXRob3JpdGllcyI6WyJST0xFX09CTV9DVVNUT01FUl9NQU5BR0VSIl0sImp0aSI6IjZiYzhlMTlkLTYwZDItNDY2YS1iYWIyLWQ0OGI4OGM1MWFiNyIsInRlbmFudCI6IlhNIiwiY2xpZW50X2lkIjoiaW50ZXJuYWwifQ.dczSWcy2ZWHTU7qm9XzemwHrvTret4aMkLaZh-8LEAemOOzwNFhcgU8jzRcbmUkKqHyXB1xwpCGPRGA5LDI4VyzPLwQzmNLfCwmfat7mADE__3bjCmjbxhi_ehnrik5iCMDSB3n1lxrTGYpEgn1OG5mBTiDvGZoktY9r1Gq2AEDYJoFg0qAtC78flz00xtHG-v3fJ5clwcFTiipupJBczSwVrZ3aroOdpWoAU3yWic19MPGlikzK51pHSU2Rb79t4UEeGNaxP9Qo8DJAP4jioVuTiOsYtYc3_qibHw5HTp0U63izphmB8-lN5JRxfHoqFOsE7lKUy3jzD5GBFX0-VA'
    };
    
    const data = {
      content: 'Тестове повідомлення від програміста)))',
      type: 'SMS',
      receiver: [{ id: 443, phoneNumber: 380958009195 }],
      sender: { id: 'Vend Water' },
      characteristic: [
        { name: 'DISTRIBUTION.ID', value: 5029972 },
        { name: 'VALIDITY.PERIOD', value: '000000000100000R' }
      ]
    };
    
// if (MACHINE_ID) {
//     axios({
//         method: 'post',
//         url: url,
//         headers: headers,
//         data: data
//       })
//         .then(response => {
//           console.log('Response:', response.data);
//         })
//         .catch(error => {
//           console.error('Error:', error.message);
//         });
// }
    console.log(MACHINE_ID);
} catch (error) {
    console.log(error);
}
}


module.exports = {
    sendMsgAddLitr
}