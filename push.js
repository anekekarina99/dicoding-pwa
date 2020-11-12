var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BKw2ON_yI3dm6olwZ900OrcZZIK1s3od4oFncQ49FfmuoBCmeRAtNsZyeeQHZkERhBdAENYuBVs5jroh1jeQS6c",
   "privateKey": "P6bkJRHdohreRPTyzWKKcogMsmJToN4IjJhFo26vPyc"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint":  "https://fcm.googleapis.com/fcm/send/ee2soFalbfw:APA91bGBqMZqmRfW-c9Vjs11-VP_N-7jws5K3kGUnoOegfYYvaCjHAjkT65QwNR_AfbPlxPVemAdfxPgV9XUm8bp3GdCCoOFY9TCYfEHeLoBUnf1vcstbvrFPaI7LPBPhfZTGhM0gQIG",
   "keys": {
       "p256dh": "BNazowXUgF1+odjEcxTqLBQYBAY/7m/AETv/vwsm7rh7/QLDMLTtLCc/DI6XWVzRFXs0Ko8ZIKjiVDyhXNEls+w=",
       "auth": "+0I7vObW6z2R1sw3WBcQ2g=="
   }
}; 
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '196223211019',
   TTL: 60
};
webPush.sendNotification(
 pushSubscription,
   payload,
   options
);