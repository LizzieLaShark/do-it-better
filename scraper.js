var Promise = require('promise');
var request = require('superagent-promise')(require('superagent'), Promise);
var fs = require('fs')
var cheerio = require('cheerio')

// $(document).ready(function() {



var scraper = function(){
  request.get('http://www.parliament.nz/en-nz/pb/sc/make-submission')  //gets the website using superagent
  .then(function(results){
      var $ = cheerio.load(results.text)
      var linksArray = []
      $('a').each(function(i, elem) {            //special cheerio documentation that is getting links
        // linksArray[i] = $(this).attr('href')  //cheerio documentation pushing all 'a' things with href
        // console.log ($(this).text())          //attributes into the previously declared links array
        linksArray[i] = {
         title: $(this).text(),
         url: $(this).attr('href')
        }
      })

    // console.log(linksArray)
    return linksArray

  })
  .then(function(results){
    //func below will need to be changed. When more than this amount of subs are up they wont display.
    //Need to find a way to knowck off the last 9 and the firs 35 while haing the middle
    //fluctuate depending on # of subs
      var sliced = results.slice(35, 51)
    console.log(sliced)
     fs.writeFile('./links.json', JSON.stringify(sliced), function(err, data) {
        if (err) console.log(err);
     })
  }) 
  .catch(function(err){
    console.log("Uh ooh...")
  })
}



scraper();

module.exports = scraper
