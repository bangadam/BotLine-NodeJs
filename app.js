const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      readChunk = require('read-chunk'),
      request = require('request'),
      line = require('@line/bot-sdk');


var config = {
  channelId: '1543888855',
  channelAccessToken: 'XVuY8V/SdXoJba3Seyi3yFi2vK4fJTjQTSEjD5R69zQ7wn7zRM6ALxFZIMQdBearV+1BHaBPK2Cx8QJttLgKQccnKCyrpyIT8heGxvgK3OCp32KOLzpoU6ZA/ypcBtgSmUDpNWZBTSn3UuMR0Da4VgdB04t89/1O/w1cDnyilFU=',
  channelSecret: '4efbc8c31e8609706dd6b7d59bce3cc9',
  verify: true
};

const client = new line.Client(config);


app.post('/webhook', line.middleware(config), (req, res) => {
  const event = req.body.events[0];

  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }
  var kata = event.message.text.toLowerCase();
  // var sholat = kata.match(/jadwal sholat/);
  // console.log(sholat[0]);
  
  if (kata.match(/jadwal sholat/)) {
    var kota = kata.slice(14, 99);
    const data = request.get('http://muslimsalat.com/'+kota+'/daily.json?key=1fe1a93dd5bc67b9ce23899a8c472b6f', function (error, response, body) {
        const data = JSON.parse(response.body);
        if (data.status_code == 0) {
          const error = client.replyMessage(event.replyToken, {
            type: 'text',
            text: 'Maaf Kota yang kamu cari tidak ditemukan \uDBC0\uDC84'
          });
        }else{
          const success = client.replyMessage(event.replyToken, {
          type: 'text',
          text: 'jadwal sholat hari ini kota '+ kota +' dan sekitarnya :'+
                '\n\n'+
                'Shubuh : ' + data.items[0].fajr +
                '\n'+ 
                'Syuruk : ' + data.items[0].shurooq +
                '\n'+ 
                'Dzuhur : ' + data.items[0].dhuhr +
                '\n'+
                'Ashar : ' + data.items[0].asr +
                '\n'+
                'Maghrib : ' + data.items[0].maghrib +
                '\n'+
                'Isya : ' + data.items[0].isha
          }); 
        }
        // console.log(data);
        
      });
  }else if(kata.match(/quote/)){
    const quote = [
      " ",
      "Ilmu itu lebih baik daripada harta. Ilmu menjaga engkau dan engkau menjaga harta. Ilmu itu penghukum (hakim) dan harta terhukum. Harta itu kurang apabila dibelanjakan tapi ilmu bertambah bila dibelanjakan.\n -Khalifah Ali bin Abi Talib-",
      "Akan kuberikan ilmu yang kumiliki kepada siapapun, asal mereka mau memanfaatkan ilmu yang telah kuberikan itu.\n -Imam Syafi’i-",
      "Janganlah kau tuntut Tuhanmu karena tertundanya keinginanmu, tetapi tuntutlah dirimu sendiri karena engkau telah menunda adabmu kepada Allah. \n -Syeikh Ibnu Athaillah As-Sakandar-",
      "Berteman dengan orang yang bodoh yang tidak mengikuti ajakan hawa nafsunya sungguh lebih baik bagi kamu ketimbang berteman dengan orang alim tapi suka terhadap nafsuya. \n -Ibnu Athaillah as-Sakandari-",
      "Jika hati patah, ia laksana kaca pecah yang sulit terhimpun lagi. \n -Shalih bin Abdul Quddus-",
      "Yang dekat akan terasa jauh karena dimusuhi, yang jauh akan terasa dekat karena dicintai. \n -Abdullah bin Al-Mu'tazz-",
      "Belajarlah karena manusia tak terlahir  pandai dan orang alim takkan serupa orang tak berilmu \n -Al-Imam Al-Syafi'iy-",
      "Yang mengejar dunia laksana minum air laut, semakin banyak dia minum, semakin bertambah hausnya \n -Ibnu Al-Muqaffa-",
      "Orang yang tak mau merasakan derita menuntut ilmu sejenak saja akan ditimpa hinanya kebodohan sepanjang hidupnya. \n -Al-Imam Al-Syafi'iy-"
    ];
    var number = Math.floor(Math.random() * 9) + 1 ;
    // console.log(number);
    client.replyMessage(event.replyToken, {
      type: 'text',
      text: quote[number]
    })
  }else {
    const message = client.replyMessage(event.replyToken, {
      type: 'text',
      text: 'Maaf Format Salah. silahkan ulangi lagi'
    })
  }
  
});


app.listen(3001, function() {
  console.log('server listning on port 3000');
})