var BrowserDetect = {
  init: function () {
    this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
    this.version = this.searchVersion(navigator.userAgent)
      || this.searchVersion(navigator.appVersion)
      || "an unknown version";
    this.OS = this.searchString(this.dataOS) || "an unknown OS";
  },
  searchString: function (data) {
    for (var i=0;i<data.length;i++) {
      var dataString = data[i].string;
      var dataProp = data[i].prop;
      this.versionSearchString = data[i].versionSearch || data[i].identity;
      if (dataString) {
        if (dataString.indexOf(data[i].subString) != -1)
          return data[i].identity;
      }
      else if (dataProp)
        return data[i].identity;
    }
  },
  searchVersion: function (dataString) {
    var index = dataString.indexOf(this.versionSearchString);
    if (index == -1) return;
    return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
  },
  dataBrowser: [
    {
      string: navigator.userAgent,
      subString: "Chrome",
      identity: "Chrome"
    },
    {   string: navigator.userAgent,
      subString: "OmniWeb",
      versionSearch: "OmniWeb/",
      identity: "OmniWeb"
    },
    {
      string: navigator.vendor,
      subString: "Apple",
      identity: "Safari",
      versionSearch: "Version"
    },
    {
      prop: window.opera,
      identity: "Opera",
      versionSearch: "Version"
    },
    {
      string: navigator.vendor,
      subString: "iCab",
      identity: "iCab"
    },
    {
      string: navigator.vendor,
      subString: "KDE",
      identity: "Konqueror"
    },
    {
      string: navigator.userAgent,
      subString: "Firefox",
      identity: "Firefox"
    },
    {
      string: navigator.vendor,
      subString: "Camino",
      identity: "Camino"
    },
    {   // for newer Netscapes (6+)
      string: navigator.userAgent,
      subString: "Netscape",
      identity: "Netscape"
    },
    {
      string: navigator.userAgent,
      subString: "MSIE",
      identity: "Explorer",
      versionSearch: "MSIE"
    },
    {
      string: navigator.userAgent,
      subString: "Gecko",
      identity: "Mozilla",
      versionSearch: "rv"
    },
    {     // for older Netscapes (4-)
      string: navigator.userAgent,
      subString: "Mozilla",
      identity: "Netscape",
      versionSearch: "Mozilla"
    }
  ],
  dataOS : [
    {
      string: navigator.platform,
      subString: "Win",
      identity: "Windows"
    },
    {
      string: navigator.platform,
      subString: "Mac",
      identity: "Mac"
    },
    {
         string: navigator.userAgent,
         subString: "iPhone",
         identity: "iPhone/iPod"
      },
    {
      string: navigator.platform,
      subString: "Linux",
      identity: "Linux"
    }
  ]

};
BrowserDetect.init();

/*
showSlide(id)
Displays each slide
*/

function showSlide(id) {
  $(".slide").hide();
  $("#"+id).show();
}

/* 
random(a,b)
Returns random number between a and b, inclusive
*/

function random(a,b) {
  if (typeof b == "undefined") {
    a = a || 2;
    return Math.floor(Math.random()*a);
  } else {
    return Math.floor(Math.random()*(b-a+1)) + a;
  }
}


/* 
Array.prototype.random
Randomly shuffles elements in an array. Useful for condition randomization.
*/

Array.prototype.random = function() {
  return this[random(this.length)];
}


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/* 
Produces an array with numbers 0~arrLength
in random order. Kind of spurious--use 
Array.prototype.random instead
*/

function shuffledArray(arrLength)
{
  var j, tmp;
  var arr = new Array(arrLength);
  for (i = 0; i < arrLength; i++)
  {
    arr[i] = i;
  }
  for (i = 0; i < arrLength-1; i++)
  {
    j = Math.floor((Math.random() * (arrLength - 1 - i)) + 0.99) + i;
    tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}

/* 
Gets the value of the checked radio button
*/

function getRadioCheckedValue(formNum, radio_name)
{
   var oRadio = document.forms[formNum].elements[radio_name];
   for(var i = 0; i < oRadio.length; i++)
   {
      if(oRadio[i].checked)
      {
         return oRadio[i].value;
      }
   }
   return '';
}

function setQuestion(array) {
    var i = random(0, array.length - 1);
    var q = array[i];
    return q;
}


/* 
Clears value from form
*/

function clearForm(oForm) {
    
  var elements = oForm.elements; 
    
  oForm.reset();

  for(i=0; i<elements.length; i++) {
      
	field_type = elements[i].type.toLowerCase();
	
	switch(field_type) {
	
		case "text": 
		case "password": 
		case "textarea":
	        case "hidden":	
			
			elements[i].value = ""; 
			break;
        
		case "radio":
		case "checkbox":
  			if (elements[i].checked) {
   				elements[i].checked = false; 
			}
			break;

		case "select-one":
		case "select-multi":
            		elements[i].selectedIndex = -1;
			break;

		default: 
			break;
	}
    }
}


/* Experimental Variables */




/*
Show the instructions slide — this is what we want subjects to see first.
*/

if (BrowserDetect.browser != 'Chrome' && BrowserDetect.browser != 'Safari' && BrowserDetect.browser != 'Firefox') {
    alert ("Warning: We have not tested this HIT with your browser. We recommend Chrome, Firefox or Safari");
    $("#startButton").attr("disabled", "disabled");
}

showSlide("instructions");

/*
The actual variable that will be returned to MTurk. The experiment object with various variables that you want to keep track of and return as results.

More practically, you should stick everything in an object and submit that whole object so that you don’t lose data (e.g. randomization parameters, what condition the subject is in, etc). Don’t worry about the fact that some of the object properties are functions — mmturkey (the Turk submission library) will strip these out.
*/

var experiment = {

/*
Parameters for this sequence.
*/
  startTime: 0,
  endTime: 0,

  nonliteral: Math.round(Math.random()),
  
  // My Results:
  happy1: -1,
  sad1: -1,
  amuse1: -1,
  content1: -1,
  disapp1: -1,
  anger1: -1,
  regret1: -1,

  happy2: -1,
  sad2: -1,
  amuse2: -1,
  content2: -1,
  disapp2: -1,
  anger2: -1,
  regret2: -1,

  response1ReactionTime: -1,
  response2ReactionTime: -1,
  freeResponseReactionTime: -1,

  consent: -1,
  ventingResponseLength: -1,
  ventingResponse: "",

  // Demographics
  gender: "",
  age:"",
  nativeLanguage:"",
  browser: BrowserDetect.browser,
  browserVersion: BrowserDetect.version,
  browserOS: BrowserDetect.OS,
  comments:"",

 //trials: myTrialOrder,

/*
An array to store the data that we’re collecting.
*/

  // data: [],

// Goes to description slide
  description: function() {
    showSlide("description");

    if (experiment.nonliteral==0) {
      // literal language / straightforward
      $('#ventingManipulation').html("<br>Try to be as straightforward as you can in your descriptions.");
    } else {
      // nonliteral language / sarcastic
      $('#ventingManipulation').html("<br>Try to be as sarcastic as you can in your descriptions.");
    };

    if (turk.previewMode) {
      alert ( "Please accept the HIT before continuing." );
    };

    $('#response1').hide();
  },

/*
The function that gets called when the sequence is finished.
*/

  end: function() {
  	// Records demographics
    experiment.consent = $('input[name="consentButton"]:checked').val();

    experiment.gender = $('input[name="genderButton"]:checked').val();
    //experiment.age = $('select[name="ageRange"]').val();
    experiment.age = $('#ageRange').val();
    experiment.nativeLanguage = $('input[name="nativeLanguage"]').val();
    experiment.comments = $('textarea[name="commentsTextArea"]').val();

    // Show the finish slide.
    showSlide("finished");

    /*
    Wait 1.5 seconds and then submit the whole experiment object to Mechanical Turk (mmturkey filters out the functions so we know we’re just submitting properties [i.e. data])
    */
    setTimeout(function() { turk.submit(experiment);}, 1500);
  },


  toWriting: function() {
    experiment.endTime = (new Date()).getTime();
    
    experiment.happy1 = parseInt($('input[name="happy1"]:checked').val());
    experiment.sad1 = parseInt($('input[name="sad1"]:checked').val());
    experiment.amuse1 = parseInt($('input[name="amuse1"]:checked').val());
    experiment.content1 = parseInt($('input[name="content1"]:checked').val());
    experiment.disapp1 = parseInt($('input[name="disapp1"]:checked').val());
    experiment.anger1 = parseInt($('input[name="anger1"]:checked').val());
    experiment.regret1 = parseInt($('input[name="regret1"]:checked').val());

    showSlide("writing");
    
    experiment.response1ReactionTime = experiment.endTime - experiment.startTime;
    experiment.startTime = (new Date()).getTime();
  },


  afterWriting: function() {
    experiment.endTime = (new Date()).getTime();
    experiment.freeResponseReactionTime = experiment.endTime - experiment.startTime;

    experiment.ventingResponseLength = parseInt($('#freeResponseInput').val().length);
    experiment.ventingResponse = $('#freeResponseInput').val();
    showSlide("response2");
    experiment.startTime = (new Date()).getTime();
  },

  afterResponse2: function() {
    experiment.endTime = (new Date()).getTime();
    
    experiment.happy2 = parseInt($('input[name="happy2"]:checked').val());
    experiment.sad2 = parseInt($('input[name="sad2"]:checked').val());
    experiment.amuse2 = parseInt($('input[name="amuse2"]:checked').val());
    experiment.content2 = parseInt($('input[name="content2"]:checked').val());
    experiment.disapp2 = parseInt($('input[name="disapp2"]:checked').val());
    experiment.anger2 = parseInt($('input[name="anger2"]:checked').val());
    experiment.regret2 = parseInt($('input[name="regret2"]:checked').val());
    
    showSlide("askInfo");

    experiment.response2ReactionTime = experiment.endTime - experiment.startTime;
    // experiment.startTime = (new Date()).getTime();
  }

  


};