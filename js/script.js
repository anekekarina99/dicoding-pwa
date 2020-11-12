/* Register Service Worker */
if ("serviceWorker" in navigator) {
    registerServiceWorker();
    requestPermission();
} else {
    console.log("Service Worker belum didukung browser ini.");
}

function registerServiceWorker() {
    return navigator.serviceWorker
        .register("/service-worker.js")
        .then(function(registration) {
            console.log("Registrasi Service Worker berhasil.");
            return registration;
        })
        .catch(function(error) {
            console.error(" Registrasi Service Worker gagal:",error);
        });
}

function requestPermission() {
    if ("Notification" in window) {
        Notification.requestPermission().then(function(result) {
            if (result === "denied") {
                console.log("Notifikasi dibatalkan");
                return;
            }
            else if (result === "default") {
                console.error("Kotak dialog diblok.");
                return;
            }
        
            if (("PushManager") in window) {
                navigator.serviceWorker.getRegistration().then(function(registration) {
                    registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array("BKw2ON_yI3dm6olwZ900OrcZZIK1s3od4oFncQ49FfmuoBCmeRAtNsZyeeQHZkERhBdAENYuBVs5jroh1jeQS6c")
                    }).then(function(subscribe) {
                        console.log("Berhasil melakukan subscribe dengan endpoint", subscribe.endpoint);
                        console.log("Berhasil melakukan subscribe dengan p256dh key: ' ", btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey("p256dh")))));
                        console.log("Berhasil melakukan subscribe dengan auth key: ", btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey("auth")))));
                    }).catch(function(e) {
                        console.error("Tidak dapat melakukan subscribe", e.message);
                    })
                })
            }
        });
    }
}