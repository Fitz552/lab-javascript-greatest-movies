// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(movies) {
  const directors = movies.map (movie => movie.director)
  return directors
  }

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(movies) {
  const spielbergDramas = movies.filter (movie => movie.director == "Steven Spielberg" && movie.genre.indexOf("Drama")>-1)
  return spielbergDramas.length
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(movies) {
  if (movies.length){ 
    const scoredMovies = movies.filter(movie => movie.score != null && movie.score != "")
    const avgScore = scoredMovies.reduce((sum, movie) => sum+movie.score, 0)
    return (avgScore/scoredMovies.length).toFixed(2)*1.00
  }
  else return 0
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(movies) {
  const dramaMovies = movies.filter(movie => movie.genre.indexOf("Drama")>-1)
  return scoresAverage(dramaMovies)
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(movies) {
  if (movies.length > 0){
    const sortedMovies = movies.sort (function(movie1,movie2) {
      if (movie1.year==movie2.year) {
        if (movie1.title < movie2.title) return -1
        if (movie1.title > movie2.title) return 1
      }
      else
      if (movie1.year<movie2.year) return -1;
      if (movie1.year>movie2.year) return 1;

    })
    return sortedMovies
  }
  else return null
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(movies) {

  let maxLength
  if (movies.length > 20) {
    maxLength = 20;
  }
  else maxLength = movies.length;

  newMovies = [...movies]

  const sortedMovies = newMovies.sort(function(movie1,movie2) {
  //alternativeley const sortedMovies = movies.slice().sort(function(movie1,movie2) {
    if (movie1.title > movie2.title) return 1
    if (movie1.title < movie2.title) return -1 })
  
  let movieTitles = sortedMovies.filter (movie => sortedMovies.indexOf(movie) < maxLength).map(movie=>movie.title)
  
  return movieTitles
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(movies) {
  const minutes = movies.map(function (movie) {
    let hourPosition = movie.duration.indexOf("h");
    let hour = movie.duration.substring(hourPosition-1,hourPosition)*60
    let minutePosition = movie.duration.indexOf("min")
    let minute = movie.duration.substring(minutePosition-2,minutePosition)*1
    return {...movie,
           duration: hour+minute}})
  
  return minutes
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(movies) {
  if (movies.length > 0) {
    let years = []
    for (i = 0; i<movies.length; i++) {
      if (years.indexOf(movies[i].year) < 0) {
        years.push(movies[i].year);
      }
    }
    
    let yearsObjects = []
    for (i = 0; i<years.length; i++) {
      yearsObjects.push({year: years[i],
                        score:0,
                        count:0})
    }
    
    
    for (i=0; i<yearsObjects.length; i++) {
      for (j=0; j<movies.length; j++) {
        if (movies[j].year === yearsObjects[i].year) {
          yearsObjects[i].score = yearsObjects[i].score + movies[j].score;
          yearsObjects[i].count = yearsObjects[i].count + 1;
        } 
      }
      yearsObjects[i].average = (yearsObjects[i].score/yearsObjects[i].count).toFixed(2)*1.00
    }
    
   const orderedYears = yearsObjects.sort(function (year1, year2){
      if (year1.average == year2.average) {
        if (year1.year>year2.year) return 1
        if (year2.year>year1.year) return -1
      }
      else
        if (year1.average > year2.average) return -1
        if (year1.average < year2.average) return 1
    })
    
 
  return `The best year was ${orderedYears[0].year} with an average score of ${orderedYears[0].average}`
  }

  else return null
}



// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = {
    getAllDirectors,
    howManyMovies,
    scoresAverage,
    dramaMoviesScore,
    orderByYear,
    orderAlphabetically,
    turnHoursToMinutes,
    bestYearAvg,
  };
}
