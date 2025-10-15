//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Find an address plugin
const findAddressPlugin = require("find-an-address-plugin");

findAddressPlugin(router);

// Logging session data  
// This code shows in the terminal what session data has been saved.
router.use((req, res, next) => {    
    const log = {  
      method: req.method,  
      url: req.originalUrl,  
      data: req.session.data  
    }  
    console.log(JSON.stringify(log, null, 2))  
   
  next()  
})  

// This code shows in the terminal what page you are on and what the previous page was.
router.use('/', (req, res, next) => {  
    res.locals.currentURL = req.originalUrl; //current screen  
    res.locals.prevURL = req.get('Referrer'); // previous screen
  
  console.log('folder : ' + res.locals.folder + ', subfolder : ' + res.locals.subfolder  );
  
    next();  
  });

  // Routing for the example journey. 
  router.post('/country-answer', function(request, response) {

    var country = request.session.data['country']
    if (country == "England"){
        response.redirect("example/complete")
    } else {
        response.redirect("example/ineligible")
    }
})


  // Add your routes here
  router.post('/submit-reason', function (req, res) {
  const choice = req.body['claimReason'];
  req.session.data['claimReason'] = choice;
 
  if (choice === 'Employment') {
    res.redirect('/prototypes/conditional-content/claim-reason/pick-employment');
  } else if (choice === 'Self-employment start') {
    res.redirect('/prototypes/conditional-content/claim-reason/self-employment-details');
  } else if (choice === 'Training course') {
    res.redirect('/prototypes/conditional-content/claim-reason/training-course-details');
  } else if (choice === 'Jobcentre Plus appointment') {
    res.redirect('/prototypes/conditional-content/claim-reason/jobcentre-appointment-details');
  } else if (choice === 'Job search support') {
    res.redirect('/prototypes/conditional-content/claim-reason/job-search-details');
  } else if (choice === 'Something else') {
    res.redirect('/prototypes/conditional-content/claim-reason/other-details');
  } else {
    res.redirect('/prototypes/conditional-content/claim-reason/programme-details');
  }
});

  router.post('/submit-reason-2', function (req, res) {
  const choice = req.body['claimReason'];
  req.session.data['claimReason'] = choice;
 
  if (choice === 'Employment') {
    res.redirect('/prototypes/zero-free-texts/pick-employment');
  } else {
    res.redirect('/prototypes/zero-free-texts/claim-details');
  }
});