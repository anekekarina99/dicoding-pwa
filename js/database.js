function cekDatabase(idb) {
    var dbPromised = idb.open("football-info", 1, function(upgradeDb) {    
        if (!upgradeDb.objectStoreNames.contains("timf")) {
            var riwayatO = upgradeDb.createObjectStore("timf", {
                keyPath: "id"
            });
            
            riwayatO.createIndex("nama_tim", "nama", {
                unique: false
            });
         
        }

    });
    return dbPromised;
}


 
//get
function tambahkeRiwayat(data,riwayat_db) {
    var data_id;
    if (riwayat_db === "timf") {
        data_id = data.id;       
   
    }

    
    cekDatabase(idb)
        .then(function(db) {
            var tx = db.transaction("timf", "readwrite");
            var store = tx.objectStore("timf");
            
            store.put(data);

            return tx.complete;
        })
        .then(function() {
            M.toast({
                html: "Riwayat  ditambahkan",
            });
        });
}

function hapusRiwayat(id,riwayat) {
  if(riwayat === "timf"){
      riwayat = "timf";
    console.log(id + " " + riwayat);
    cekDatabase(idb)
        .then(function(db) {
            var tx = db.transaction("timf" ,"readwrite");
            var store = tx.objectStore("timf");

            store.delete(id);

            return tx.complete;
        })
        .then(function() {
            M.toast({
                html: "Sudah dihapus :(",
            });
        });

    location.reload();
    }
}

function ambilRiwayat(riwayat) {
    if (riwayat === "timf"){
    return new Promise(function(resolve, reject) {
        cekDatabase(idb)
            .then(function(db) {
                var tx = db.transaction("timf", "readonly");
                var store = tx.objectStore("timf");
                
                return store.getAll();
            })
            .then(function(data) {
                resolve(data);
            });
    });
}
}
function ambilId(id){
   
    return new Promise(function(resolve, reject) {
        cekDatabase(idb)
            .then(function(db) {
                var tx = db.transaction("timf", "readonly");
                var store = tx.objectStore("timf");

                return store.get(id);
            })
            .then(function(data) {
                resolve(data);
            });
    });
}

