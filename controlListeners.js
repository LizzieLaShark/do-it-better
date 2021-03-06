var $ = require('jquery')
var view = require('./views/linkParagraphs.hbs')
var scrapeParagraphs = require('./scrapeParagraphs')
var request = require('superagent')

function subInfoClick(linkToScrape){
  console.log('listening to subInfoClick')

  console.log(linkToScrape)
  request.post('/scrape')
    .send({linkToScrape: linkToScrape})
    .end(function(err, res){
      console.log("runningSubinfoClick")
      $('#mainView').html("")
      $('#mainView').html(view({paragraphs: res.body}))
      // listener()
      $('#submitNow').click(function(e){
          console.log("form toggle listener fired")
        // e.preventDefault()
        $("#mainForm").toggleClass('form-hidden')
        window.scrollTo(0,document.body.scrollHeight);
      })
    })
}


//the above function links directly to both the listeners.js listener and
//the '/scrape' route in the app.js folder. It does a post request to the /scrape route
//sends the linkToScrape. The linkToScrape gets sent to the route function
//where it is passed into scrapeParagraphs, which then scrapes the data.
//we passed 'listener()' into this code as well as
//passing subscribeToSubmitButtonClick into line 12 of listeners.js
//so that once subInfoClick had been carried out, it would
//continue to listen for subscribeToSubmitButtonClick. Otherwise it
//couldn't find the subscribeToSubmitButtonClick to keep listening to. (???)



module.exports = {
  subInfoClick: subInfoClick
}
