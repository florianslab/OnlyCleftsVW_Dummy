var Parameters = {}, 
    URLParameters = window.location.search.replace("?", "").split("&");

for (parameter in URLParameters) Parameters[URLParameters[parameter].split("=")[0]] = URLParameters[parameter].split("=")[1];


var shuffleSequence = seq("2");

var showProgressBar = true;

var defaults = [
    "DynamicQuestion",
    {
        clickableAnswers: true,
        enabled: true
    }
];

var zipFiles = {pictures: "http://files.lab.florianschwarz.net/ibexfiles/OnlyCleftsVW/Pictures.zip"};

var getCharacterSuitPicture = function(character, suit){
  return c2u.newPicture("", 
                          [{id:"topleftcharacter", background: "url('"+character+"')", "background-size": "cover",
                                width: 150, height: 150, left: 75, top: 0}, 
                           {id:"topleftsuit", background: "url('"+suit+"')", "background-size": "cover", 
                                width: 100, height: 150, left: 100, top: 150}],
                        {width: 300, height:300}
                       )
}

var items = [
      
    ["2", "ZipPreloader", {}],

    /*["Instructions", "__SetCounter__", { }],
    
    ["Instructions", "Form", {html: {include: "ProlificConsentForm.html"}, continueOnReturn: true}],

    ["Instructions", "ZipPreloader", {only: ["testsound"]}],

    ["Instructions", "Message", {html: {include: "warning.html"}}],

    ["Instructions", "Message", {html: {include: "instructions.html"}}],

    ["Instructions", "ZipPreloader", {}],
    
    ["AfterPractice", "Message", {html: "Very well, now let's proceed to the actual experiment."}],

    ["PostExp", "Form", {
        html: {include: "ProlificFeedbackPreConfirmation.html"}
    }],
    
    ["PostExp", "__SendResults__", {
       manualSendResults: true,
       sendingResultsMessage: "Please wait while your answers are being saved.",
       completionMessage: "Your answers have successfully being saved!"
    }],
    
    ["PostExp", "Message", {
        transfer: null,
        html: {include: "ProlificConfirmation.html"}
    }]*/

    ].concat(GetItemsFrom(data, null, {
      ItemGroup: ["item", "group"],
      Elements: [
          function(x){return x.order;},          // Name of the item: 'Condition' column
          "DynamicQuestion",
          {
              legend: function(x){ return [x.Condition,x.item,x.group,x.sentence].join("+"); },
              answers: function(x){ 

                  return { 
                            TopLeft: getCharacterSuitPicture(x.pic1_top_female, x.pic1_suit), 
                            BottomLeft: getCharacterSuitPicture(x.pic2_bottom_female, x.pic2_suit), 
                            TopRight: getCharacterSuitPicture(x.pic3_top_male, x.pic3_suit), 
                            BottomRight: getCharacterSuitPicture(x.pic4_bottom_male, x.pic4_suit)
                         };

              },
              sequence: function(x){ return [
                  // DEBUG INFORMATION
                  "Condition: "+x.Condition+"; Item: "+x.item+"; Group: "+x.group,
                  {pause: 150},
                  x.sentence,
                  {this: "answers"}
              ];}
          }
      ]
  }));