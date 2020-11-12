document.addEventListener("DOMContentLoaded", function() {
    var list_menu = document.querySelectorAll(".sidenav");
    M.Sidenav.init(list_menu);
    loadNav();

    var page = window.location.hash.substr(1);
    loadHal(ambilHal(page));

   
});

function loadNav() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status != 200) return;

            document.querySelectorAll(".topnav, .sidenav").forEach(function(elm) {
                elm => list_menu.innerHTML = xhttp.responseText
                }
            );

            document.querySelectorAll(".sidenav a, .topnav a").forEach(function(list_menu) {
                list_menu.addEventListener("click", function(event) {
                    var sidenav = document.querySelector(".sidenav");
                    M.Sidenav.getInstance(sidenav).close();

                    page = event.target.getAttribute("href").substr(1);
                    loadHal(page);
                });
            });
        }
    };

    xhttp.open("GET", "nav.html", true);
    xhttp.send();
}

function ambilHal(page) {
    
    let riwayat_save = "";
    switch(page){
        case "" || "#":{
            page = "beranda";
        }
        break;
        case "lanjut" :{
            page = "lanjut";
        }
        break;
        case "lanjut2" :{
            page = "lanjut2";
        }
        break;
        case "riwayat" || "riwayat_tim":{
            page = "riwayat";
            riwayat_save = "timf";
        }
        break;
        case "riwayat_tim1" :{
            page = "riwayat";
            riwayat_save= "timf2";
        }
        break;
        case "riwayat_tim2" :{
            page = "riwayat";
            riwayat_save= "timf3";
        }
        return page;
    }
}

function loadHal(page) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        var content = document.getElementById("body-content");
            
        if (this.readyState == 4) {
            switch(page) {
               case "index" : ambilTim(); break; 
                case "beranda": ambilTim(); break;
               case "lanjut": ambilTimIng(); break;
               case "lanjut2" : ambilTimSpan(); break;
                case "riwayat": wriwayat(riwayat_save); break;
            }

            if (this.status == 200) {
                content.innerHTML = xhttp.responseText ;
            } else if (this.status == 404) {
                content.innerHTML = "<div class='card-panel deep-orange darken-4'><span class='white-text'>Tidak bisa berjalan gangguan</span></div>";
            } else {
                content.innerHTML = "<div class='card-panel  black'><span class='white-text'>Maaf</span></div>";
            }
        }
    };

    xhttp.open("GET", `pages/${page}$.html`, true);
    xhttp.send();
}