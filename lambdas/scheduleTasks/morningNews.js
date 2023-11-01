// const AWS = require('aws-sdk');
// const Responses = require('../common/API_Responses');
// const Axios = require('axios');

// const SES = new AWS.SES();

// const newsURL = 'https://newsapi.org';

// exports.handler = async event => {
//     console.log('event', event);

//     const techNews = await getNews();

//     const emailHTML = createEmailHTML(techNews);

//     const params = {
//         Destination: {
//             ToAddresses: ['raed.besbes@ticketchainer.com'],
//         },
//         Message: {
//             Body: {
//                 Html: { Data: emailHTML },
//             },
//             Subject: { Data: 'Morning Tech News' },
//         },
//         Source: 'raed.besbes@ticketchainer.com',
//     };

//     try {
//         await SES.sendEmail(params).promise();
//         return Responses._200({ message: 'email sent' });
//     } catch (error) {
//         console.log('error', error);
//         return Responses._400({ message: 'failed to send the email' });
//     }
// };

// const createEmailHTML = techNews => {
//     return `<html>
//     <body>
//         <h1>Top Tech News</h1>
//         ${techNews.map(article => {
//             return `
//             <h3>${article.title}</h3>
//             <p>${article.description}</p>
//             <a href=${article.url}><button>Read More</button></a>
//             `;
//         })}
//     </body>
// </html>`;
// };

// const getNews = async () => {
//     const options = {
//         params: {
//             q: 'technology',
//             language: 'en',
//         },
//         headers: {
//             'X-Api-Key': '3cf67de2c96a48c096e2f8909049660e',
//         },
//     };

//     const { data: newsData } = await Axios.get(`${newsURL}/v2/top-headlines`, options);

//     if (!newsData) {
//         throw Error('no data from new api');
//     }

//     return newsData.articles.slice(0, 5);
// };