document.addEventListener("DOMContentLoaded", function() {
    var urlParams = new URLSearchParams(window.location.search);
    var id_tim = Number(urlParams.get("id"));
    var simpan= urlParams.get("saved");

    var riw = document.getElementById("riwayat");
    if (simpan) {
      
        simpanRiwayat(id_tim, "timf");
    } else {
        var item = ambilTimDetailId(id_tim);
    }

   
  riw.onclick = () => {
      item.then((tim) => {
              tambahkeRiwayat(tim, "timf");
          });
  };
});