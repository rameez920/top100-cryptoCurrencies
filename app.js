const Koa = require('koa');
const Router = require('koa-router');
var request = require('request');


const app = new Koa();

const router = new Router();

//returns top ranked currencies from coinmarketcap api
function getCurrencyRanks(numResults) {
  //url for coinmarketcap api
  const url = 'https://api.coinmarketcap.com/v1/ticker/?limit=' + numResults

  return new Promise((resolve, reject) => {
    request(url, function (error, response, body) {
      if (body)
        resolve(body);
      else
        reject(error);
    });
  })
}

//GET top 100 currencies
router.get('/top100', async (ctx, next) => {
  let data = await getCurrencyRanks(100);
  ctx.body = data;
});

//mount router to server
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
    console.log('Server running on https://localhost:3000')
});
