var Parameters = {}, 
    URLParameters = window.location.search.replace("?", "").split("&");

for (parameter in URLParameters) Parameters[URLParameters[parameter].split("=")[0]] = URLParameters[parameter].split("=")[1];


var shuffleSequence = seq("first","1",rshuffle("2"));

var showProgressBar = true;

var defaults = [
    "DynamicQuestion",
    {
        clickableAnswers: true,
        enabled: false
    }
];

var zipFiles = {pictures: "http://files.lab.florianschwarz.net/ibexfiles/OnlyCleftsVW/Pictures.zip"};

var getCharacterSuitPicture = function(character, suit){
  return c2u.newPicture("", 
                          [{id:"character", background: "url('"+character+"')", "background-size": "cover",
                                width: 150, height: 150, left: 0, top: 0}, 
                           {id:"suit", background: "url('"+suit+"')", "background-size": "cover", 
                                width: 120, height: 150, left: 160, top: 0}/*,
                           {id:"back", background: "url('Back.png')", "background-size": "cover",
                                width: 120, height: 150, left: 160, top: 0}*/],
                        {width: 300, height:300}
                       )
}

var items = [
      
    ["first", "ZipPreloader", {}],
      
    ["first", "Message", {html: {include: "instructions.html"}, transfer: "click"}],
      
    ["first", "Separator", {normalMessage: "To continue to the tutorial, press any key on the keyboard. "+
                                     "If you have any questions, feel free to ask the experimenter after the practice trials."}],

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
              customAnswerModel: function(x){
               return $("<div>"+
                          "<table style='margin:auto; text-align:center; border-spacing: 20px 0px'>"+
                            "<tr><td id='TopLeft' style='background-color: lightgreen;'></td><td id='TopRight' style='background-color: pink;'></td></tr>"+
                            "<tr><td id='BottomLeft' style='background-color: lightgreen;'></td><td id='BottomRight' style='background-color: pink;'></td></tr>"+
                          "</table>"+
                        "</div>");
              },
              sequence: function(x){ 
                  if (x.Condition == "Practice"){
                     if (x.item == 1001){
                       return [
                         {this: "answers"},
                         function(t){ $("#TopLeft #suit, #TopRight #suit, #BottomLeft #suit, #BottomRight #suit").css("display","none"); },
                         {pause: 1000},
                         function(t){ $("#TopLeft #suit, #TopRight #suit, #BottomLeft #suit, #BottomRight #suit").css("display","block"); },
                         "<p id='txt'>Here as you can see, the gamemaster gave one card to each palyer. Now, the cards get revealed... (press Space)<p>",
                         {pause: "keyF"},
                         "test"
                         /*function(t){ 
                             alert("test");
                             $("#txt").html("Now the gamemaster examines who was assigned which house and makes an announcement. (press Space)");
                         },
                         {pause: "key "},
                         function(t){
                             $("#txt").html("Here is a comment from the gamemaster's announcement, about Amy and the house she will join. (press Space)");
                         },  
                         {pause: "key "},
                         function(t){
                             $("#txt").html(x.test_sentence);
                         },
                         {pause: "key "},
                         function(t){
                             $("#txt").html("Your task is to identify Amy by clicking on the right character. (press Space)");
                         },                             
                         {pause: "key "},
                         function(t){
                             $("#txt").html("Here we know that Amy has clubs, so you should click on the bottom-left character. (press Space and click on Amy)");
                             t.enabled = true;
                         },
                         {pause: "key "}*/
                       ];
                     }
                     else if (x.item == 1002){
                       return [
                         "test",
                         {this:"answers"}
                       ];
                     }
                  }
                  else {
                    return [
                      // DEBUG INFORMATION
                      //"Condition: "+x.Condition+"; Item: "+x.item+"; Group: "+x.group+"; Target: "+x.Target_pic,
                      "Here are the suits of the cards that the players started with. Guess which player "+x.Target_name+" is!",
                      x.test_sentence,
                      {this: "answers"},
                      function(t){ $("#TopLeft #suit, #TopRight #suit, #BottomLeft #suit, #BottomRight #suit").css("display","none"); },
                      {pause: 1000},
                      function(t){ 
                          $("#TopLeft #suit, #TopRight #suit, #BottomLeft #suit, #BottomRight #suit").css("display","block");
                          t.enabled = true;
                      }
                    ];
                  }
                }
          }
      ]
  }));