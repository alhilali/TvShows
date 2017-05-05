import { ref, database, firebaseAuth } from '../config/constants'
const api_key = '35a6a172e166875d39a99cf68b63af6b';

export function getFavorites() {
    let list = []
    database.ref('/users/' + firebaseAuth().currentUser.uid + '/favorites/')
    .once('value')
    .then(function(snapshot) {
        //var username = snapshot.val().username;
        var i = 0;
        snapshot.forEach(function(childSnapshot) {
            list.push(childSnapshot.val().id);
        });

    });
    return list;
}

export async function isFavorite(id) {
    const boolean = await database.ref('/users/' + firebaseAuth().currentUser.uid + '/favorites/')
        .once('value')
        .then(snapshot => {
            let output = false;

            snapshot.forEach(childSnapshot => {
                var serverID = childSnapshot.val().id;
                var a = JSON.stringify(serverID);
                var b = JSON.stringify(id);
                if (a === b) {
                    output = true
                    return
                }
            });
            return output
    });

    return boolean;
}

export function setInfo(bind, id) {
    var URL = 'https://api.themoviedb.org/3/tv/' + id + '?language=en-US&api_key=' + api_key + '';

    fetch(URL).then(function(response) {
        return response.json();
    }).then(function(json) {
        bind.cposter = json.poster_path;
        bind.name = json.name;
    });

}

export async function setAllInfo(id) {
    var URL = 'https://api.themoviedb.org/3/tv/' + id + '?language=en-US&api_key=' + api_key + '';
    let response = await fetch(URL);
    let body = await response.json();
    return {
      poster: body.poster_path,
      name: body.name,
      airDate: body.first_air_date,
      overview: body.overview,
      background: body.backdrop_path,
      numSeasons: body.number_of_seasons,
      network: body.networks[0].name,
      running: body.in_production
    }

}

export async function getNumOfSeasons(id) {
    var URL = 'https://api.themoviedb.org/3/tv/' + id + '?language=en-US&api_key=' + api_key + '';
    let response = await fetch(URL);
    let body = await response.json();
    return body.number_of_seasons;
}

export async function getBackground(id) {
    var URL = 'https://api.themoviedb.org/3/tv/' + id + '?language=en-US&api_key=' + api_key + '';

    let response = await fetch(URL);
    let body = await response.json();
    return body.backdrop_path;

}

export async function getSeason(id, seasonNum) {
    var URL = 'https://api.themoviedb.org/3/tv/' + id + '/season/'+ seasonNum + '?api_key=' + api_key + '';
    var season = [], copy = [];
    let response = await fetch(URL);
    let body = await response.json();
    copy = body.episodes;
    for (var i = 0; i < copy.length; i++) {
      season.push({
        num: copy[i].episode_number,
        date: copy[i].air_date,
        name: copy[i].name,
        overview: copy[i].overview,
        rate: copy[i].vote_average,
        thumb: copy[i].still_path
      })
    }
    return season;
}

export async function searchTMDB(query) {
    var URL = "https://api.themoviedb.org/3/search/tv?api_key=35a6a172e166875d39a99cf68b63af6b&language=en-US&page=1&query="+query+"&page=1";
    var results = [], copy = [];
    let response = await fetch(URL);
    let body = await response.json();
    copy = body.results;
    for (var i = 0; i < copy.length; i++) {
      if (copy[i].poster_path) {
          results.push({
            name: copy[i].name,
            id: copy[i].id,
            poster: copy[i].poster_path
          })
      }
    }
    return results;
}

/*export function getPopular(l) {
    var URL = 'https://api.themoviedb.org/3/tv/popular?page=1&language=en-US&api_key=' + api_key + '';

    fetch(URL).then(function(response) {
        return response.json();
    }).then(function(json) {
      var array = [];
      array = json.results;
      var i;
      for (i = 0; i < array.length; i++) {
        l.push(
          {
            name: json.results[i].name,
            poster: json.results[i].poster_path,
            id: json.results[i].id,
          });
      }
    });
}*/

export async function getPopular() {
    var URL = 'https://api.themoviedb.org/3/tv/popular?page=1&language=en-US&api_key=' + api_key + '';

    var list = [], copy = [];
    let response = await fetch(URL);
    let body = await response.json();
    copy = body.results;
    for (var i = 0; i < copy.length; i++) {
      if (copy[i].poster_path) {
          list.push({
            name: copy[i].name,
            id: copy[i].id,
            poster: copy[i].poster_path
          })
      }
    }
    return list;
}

export async function getAiringToday() {
    var URL = 'https://api.themoviedb.org/3/tv/airing_today?page=1&language=en-US&api_key=' + api_key + '';

    var list = [], copy = [];
    let response = await fetch(URL);
    let body = await response.json();
    copy = body.results;
    for (var i = 0; i < copy.length; i++) {
      if (copy[i].poster_path) {
          list.push({
            name: copy[i].name,
            id: copy[i].id,
            poster: copy[i].poster_path
          })
      }
    }
    return list;
}

export async function getOnTheAir() {
    var URL = 'https://api.themoviedb.org/3/tv/on_the_air?page=1&language=en-US&api_key=' + api_key + '';

    var list = [], copy = [];
    let response = await fetch(URL);
    let body = await response.json();
    copy = body.results;
    for (var i = 0; i < copy.length; i++) {
      if (copy[i].poster_path) {
          list.push({
            name: copy[i].name,
            id: copy[i].id,
            poster: copy[i].poster_path
          })
      }
    }
    return list;
}

export async function getTopRated() {
    var URL = 'https://api.themoviedb.org/3/tv/top_rated?page=1&language=en-US&api_key=' + api_key + '';

    var list = [], copy = [];
    let response = await fetch(URL);
    let body = await response.json();
    copy = body.results;
    for (var i = 0; i < copy.length; i++) {
      if (copy[i].poster_path) {
          list.push({
            name: copy[i].name,
            id: copy[i].id,
            poster: copy[i].poster_path
          })
      }
    }
    return list;
}


export function saveShow(user, name, tvID) {
  var favRef = ref.child(`users/${user}/favorites`);
  var newFavorite = favRef.push();
  newFavorite.set({
    id: tvID,
    name: name
  });
}

export function deleteShow(user, tvID) {
  var favRef = ref.child(`users/${user}/favorites`);
  /*favRef.orderByChild("id").equalTo(tvID).on("child_added", function(snapshot) {
      snapshot.ref.remove()
      .then(function() {
          console.log("Succeeded");
      })
      .catch(function(error) {
          console.log(error.message);
      })
  });*/
  favRef.once('value')
  .then(function(snap) {
      snap.forEach(function(childSnap) {
          if (childSnap.val().id === tvID) {
              childSnap.ref.remove();
          }
      });
  })
}

export function episodeWatched (tvID, snNum, epNum) {
  return ref.child('/users/' + firebaseAuth().currentUser.uid +
  '/shows/' + tvID + '/season' + snNum + '/' + epNum +'/')
    .set({
        watched : true
    })
}

export function episodeNotWatched (tvID, snNum, epNum) {
  return ref.child('/users/' + firebaseAuth().currentUser.uid +
  '/shows/' + tvID + '/season' + snNum + '/' + epNum +'/')
    .set({
        watched : false
    })
}

export async function isWatched(tvID, snNum, epNum) {
    const boolean = await database.ref('/users/' + firebaseAuth().currentUser.uid +
    '/shows/' + tvID + '/season' + snNum + '/' + epNum +'/')
        .once('value')
        .then(snapshot => {
            let output = false;
            if (snapshot.val()) output = snapshot.val().watched;
            else return false;


            return output
    });

    return boolean;
}
