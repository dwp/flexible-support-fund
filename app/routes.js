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

router.post('/submit-item', function (req, res) {
  const choice = req.body['pickItem'];
  req.session.data['pickItem'] = choice;

  if (choice === 'Travel') {
    res.redirect('/prototypes/conditional-content/add-item/pick-travel');
  } else if (choice === 'Tools and equipment') {
    res.redirect('/prototypes/conditional-content/add-item/pick-equipment');
  } else if (choice === 'Identification') {
    res.redirect('/prototypes/conditional-content/add-item/identification-details');
  } else if (choice === 'Accommodation') {
    res.redirect('/prototypes/conditional-content/add-item/accommodation-details');
  } else if (choice === 'Something else') {
    res.redirect('/prototypes/conditional-content/add-item/other-details');
  } else {
    res.redirect('/prototypes/conditional-content/add-item/standard-details');
  }
});

router.post('/submit-travel', function (req, res) {
  const choice = req.body['travel'];
  req.session.data['travel'] = choice;

  if (choice === 'Season ticket') {
    res.redirect('/prototypes/conditional-content/add-item/season-ticket-details');
  } else if (choice === 'Fuel') {
    res.redirect('/prototypes/conditional-content/add-item/fuel-details');
  } else {
    res.redirect('/prototypes/conditional-content/add-item/travel-details');
  }
});

router.post('/zero-texts-pick-item', function (req, res) {
  const choice = req.body['pickItem'];
  req.session.data['pickItem'] = choice;

  if (choice === 'Travel') {
    res.redirect('/prototypes/zero-free-texts/pick-travel');
  } else if (choice === 'Tools and equipment') {
    res.redirect('/prototypes/zero-free-texts/pick-equipment');
  } else {
    res.redirect('/prototypes/zero-free-texts/standard-item');
  }
});