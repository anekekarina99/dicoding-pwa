"use strict";

const base_url = "https://api.football-data.org/v2";
const api_token = "5c8067d28a814255a4ba1d98827833f3";
const id_ligaChamp = 2001;
const id_ligaIng = 2021;
const id_ligaSpan = 2014;
const riwayat_tim = "timf";
const tab_riwayat_name = "timf";
const riwayat_tim2 = "timf2";
const riwayat_tim3 = "timf3";
const e_stand = `${ base_url }/competitions/${ id_ligaChamp }/standings?standingType=TOTAL`;
const e_stand2 = `${ base_url }/competitions/${ id_ligaIng }/standings?standingType=TOTAL`;
const e_stand3 = `${ base_url }/competitions/${ id_ligaSpan }/standings?standingType=TOTAL`;
const e_tim = `${ base_url }/teams/`;

function status(response) {
  if (response.status !== 200) {
    console.log("Status : " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

function json(response) {
  return response.json();
}

function error(error) {
  console.log(" Error : " + error);
}

function fetchAPI(endpoint) {
  return fetch(endpoint, {
    headers: {
      "X-Auth-Token": api_token
    }
  });
} //ambil Tim liga Champion


function ambilTim() {
  return new Promise(function (resolve, reject) {
    if ("caches" in window) {
      caches.match(e_stand).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            ambilTimJSON(data);
            resolve(data);
          });
        }
      });
    }

    fetchAPI(e_stand).then(status).then(json).then(function (data) {
      ambilTimJSON(data);
      resolve(data);
    }).catch(error);
  });
} //ambil Tim JSON liga Champion


function ambilTimJSON(data) {
  let tim_json = '';
  data.standings.forEach(team => {
    team.table.forEach(team => {
      team = JSON.parse(JSON.stringify(team).replace(/^http:\/\//i, 'https://'));
      tim_json += `<div class="row">
            <div class="col s12 m7">
              <div class="card">
                <div class="card-content">
                  <p>${ team.team.name }</p>
                </div>
                <div class="card-action ">
                  <a class="center-align waves-effect" href="./riwayat_tim.html?id=${ team.team.id }">Detail</a>
                </div>
              </div>
            </div>
          </div>`;
    });
  });
  document.getElementById('tim').innerHTML = tim_json;
} //tim inggris
function ambilTimIng() {
  return new Promise(function (resolve, reject) {
    if ("caches" in window) {
      caches.match(e_stand2).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            ambilTimJSONIng(data);
            resolve(data);
          });
        }
      });
    }

    fetchAPI(e_stand2).then(status).then(json).then(function (data) {
      ambilTimJSONIng(data);
      resolve(data);
    }).catch(error);
  });
} //ambil Tim JSON liga ing
function ambilTimJSONIng(data) {
  let tim_json1 = '';
  data.standings.forEach(team => {
    team.table.forEach(team => {
      team = JSON.parse(JSON.stringify(team).replace(/^http:\/\//i, 'https://'));
      tim_json1 += `<div class="row">
            <div class="col s12 m7">
              <div class="card">
                <div class="card-content">
                  <p>${ team.team.name }</p>
                </div>
                <div class="card-action ">
                  <a class="center-align waves-effect" href="./riwayat_tim1.html?id=${ team.team.id }">Detail</a>
                </div>
              </div>
            </div>
          </div>
           `;
    });
  });
  document.getElementById('tim').innerHTML = tim_json1;
} //ambil Tim liga Spanyol
function ambilTimSpan() {
  return new Promise(function (resolve, reject) {
    if ("caches" in window) {
      caches.match(e_stand3).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            ambilTimJSONSpan(data);
            resolve(data);
          });
        }
      });
    }

    fetchAPI(e_stand3).then(status).then(json).then(function (data) {
      ambilTimJSONSpan(data);
      resolve(data);
    }).catch(error);
  });
} //ambil Tim JSON liga Span
function ambilTimJSONSpan(data) {
  let tim_json2 = '';
  data.standings.forEach(team => {
    team.table.forEach(team => {
      team = JSON.parse(JSON.stringify(team).replace(/^http:\/\//i, 'https://'));
      tim_json2 += `<div class="row">
            <div class="col s12 m7">
              <div class="card">
                <div class="card-content">
                  <p>${ team.team.name }</p>
                </div>
                <div class="card-action ">
                  <a class="center-align waves-effect" href="./riwayat_tim2.html?id=${ team.team.id }">Detail</a>
                </div>
              </div>
            </div>
          </div>
           `;
    });
  });
  document.getElementById('tim').innerHTML = tim_json2;
} //ambil Tim Detail (umum)
function ambilTimDetailId(id_tim) {
  return new Promise(function (resolve, reject) {
    if ("caches" in window) {
      caches.match(e_tim + id_tim).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            ambilTimDetailJSON(data);
            resolve(data);
          });
        }
      });
    }

    fetchAPI(e_tim + id_tim).then(status).then(json).then(function (data) {
      ambilTimDetailJSON(data);
      resolve(data);
    }).catch(error);
  });
} //ambil Tim Detail JSON (umum)
function ambilTimDetailJSON(data) {
  let detail_tab = '';
  data = JSON.parse(JSON.stringify(data).replace(/^http:\/\//i, 'https://'));
  detail_tab += `

    <div class="section white">
              <div class="row container" style="margin-top: 15px;">
                <h2 class="header">${ data.name }</h2>
                <p class="grey-text text-darken-3 lighten-3"> Nama Tim berikut adalah <span class="green accent-3 white-text"> ${ data.name }</span>, kependekan  adalah  <span>${ data.shortName }</span></p>
                <p>Dibentuk tahun <span class="red accent-3 white-text">${ data.founded }</span>. Alamat yakni <span class="orange accent-3 white-text">${ data.address }</span>, Nomor dihubungi <span class="blue accent-3 white-text">${ data.phone } </span>. Email, yakni <span class="brown accent-3 white-text">${ data.email }</span> </p>

                <a class="btn waves-effect waves-light" href="javascript:history.back()">Kembali
  <i class="material-icons right">chevron_left</i>
</a>
                </div>
                </div>
           `;
  document.getElementById('timD').innerHTML = detail_tab;
} //fungsi wadahRiwayat
function wriwayat(type) {
  if (type === riwayat_tim) {
    ambilRiwayat(tab_riwayat_name).then(function (data) {
      let riwayat_tim_book = '';
      data.forEach(function (riwayat_tim) {
        riwayat_tim_book += `
                <div class="card">
                <table>
                <thead>
                  <tr>
                      <th>Name Tim</th>
                      <th>Detail</th>
                      <th>      </th>
                  </tr>
                </thead>
        
                <tbody>
                  <tr>
                    <td>${ riwayat_tim.name }</td>
                    <td><a class="pink-text"href="./riwayat_tim.html?id=${ riwayat_tim.id }&saved=true">Detail</a></td>
                    <td> <a class="waves-effect waves-light btn-small white-text" onclick=hapusRiwayat(${ riwayat_tim.id })">
                    <i class="large material-icons">clear</i>
                </a></td>
                  </tr>
                </tbody>
              </table>
              </div>`;
      });
      document.getElementById("riwayat_tab").innerHTML = riwayat_tim_book;
    });
  } else {
    if (type === riwayat_tim2) {
      ambilRiwayat(tab_riwayat_name).then(function (data) {
        let riwayat_tim_book = '';
        data.forEach(function (riwayat_tim) {
          riwayat_tim_book += `
                        <div class="card">
                        <table>
                        <thead>
                          <tr>
                              <th>Name Tim</th>
                              <th>Detail</th>
                              <th>      </th>
                          </tr>
                        </thead>
                
                        <tbody>
                          <tr>
                            <td>${ riwayat_tim.name }</td>
                            <td><a class="pink-text"href="./riwayat_tim1.html?id=${ riwayat_tim.id }&saved=true">Detail</a></td>
                            <td> <a class="waves-effect waves-light btn-small white-text" onclick=hapusRiwayat(${ riwayat_tim.id })">
                         Hapus
                        </a></td>
                          </tr>
                        </tbody>
                      </table>
                      </div>`;
        });
        document.getElementById("riwayat_tab").innerHTML = riwayat_tim_book;
      });
    } else {
      ambilRiwayat(tab_riwayat_name).then(function (data) {
        let riwayat_tim_book = '';
        data.forEach(function (riwayat_tim) {
          riwayat_tim_book += `
                    <div class="card">
                    <table>
                    <thead>
                      <tr>
                          <th>Name Tim</th>
                          <th>Detail</th>
                          <th>      </th>
                      </tr>
                    </thead>
            
                    <tbody>
                      <tr>
                        <td>${ riwayat_tim.name }</td>
                        <td><a class="pink-text"href="./riwayat_tim2.html?id=${ riwayat_tim.id }&saved=true">Detail</a></td>
                        <td> <a class="waves-effect waves-light btn-small white-text" onclick=hapusRiwayat(${ riwayat_tim.id },"timf")>
                       Hapus
                    </a></td>
                      </tr>
                    </tbody>
                  </table>
                  </div>`;
        });
        document.getElementById("riwayat_tab").innerHTML = riwayat_tim_book;
      });
    }
  }
} //simpan riwayat jenis tim

function simpanRiwayat(ID, riwayat_jenis) {
  if (riwayat_jenis === "timf") {
    riwayat_jenis= "timf";
    simpanRiwayat(ID, riwayat_jenis).then(function (data) {
      let detail_tab = '';
      data = JSON.parse(JSON.stringify(data).replace(/^http:\/\//i, 'https://'));
      detail_tab += `
               
                    <div class="section white">
                      <div class="row container" style="margin-top: 15px;">
                        <h2 class="header">${ data.name }</h2>
                        <p class="grey-text text-darken-3 lighten-3"> Nama Tim berikut adalah <span class="green accent-3"> ${ data.name }</span>, kependekan  adalah  <span>${ data.shortName }</span></p>
                        <p>Dibentuk tahun <span class="red accent-3 white-text">${ data.founded }</span>. Alamat yakni <span class="orange accent-3 white-text">${ data.address }</span>, Nomor dihubungi <span class="blue accent-3 white-text">${ data.phone } </span>. Email, yakni <span class="brown accent-3 white-text">${ data.email }</span> </p>
        
                        <a class="btn waves-effect waves-light" href="riwayat.html">Kembali
          <i class="material-icons right">chevron_left</i>
        </a>
                        </div>
                    </div>
                   
                   `;
    });
    document.getElementById('timD').innerHTML = detail_tab;
  }
}