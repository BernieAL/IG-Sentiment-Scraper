const toxicityMod = require('@tensorflow-models/toxicity')
require('@tensorflow/tfjs-node');
const fs = require('fs')
const emojiStrip = require('emoji-strip')
const chalk = require('chalk')


//import * as toxicity from '@tensorflow-models/toxicity';


// The minimum prediction confidence.
const threshold = 0.5;
let trueToxicCount=0;
let falseToxicCount=0;
let unclassifiedComments=0;

// const sentences = [ ' POST NUM 0','literally', 'use', 'this', 'every', 'morning', 'and' ,'night', 'best', 'formula',
// 'The best ',
// 'stupid',
// 'bitch',
// 'you suck',
// 'hoe',
// 'dumb',
// 'this is garbage',
// 'pretty',
// 'cookie',
// 'dick'

// ];

 let toxicSentComments = ['']
 let nonToxicSentComments =['']
 let unclassComments = ['']
// Load the model. Users optionally pass in a threshold and an array of
// labels to include.

async function makePrediction(comments){

    let model = await toxicityMod.load(threshold)
    let predictions = await model.classify(comments)
    let arrayOfPredictions = []
    for(i=0;i<predictions.length;i++){
        arrayOfPredictions.push((predictions[i]))
    }
    let toxicityObj = arrayOfPredictions[6] 
    //console.log('toxicityObj:' + JSON.stringify(toxicityObj))
    let results = toxicityObj.results
    return results
}
  async function runAI(data){
    let results = await makePrediction(data)
    return tallyResults(results,data)
  }

  /*This function takes raw prediction results and abstracts out the 'true' and 'false' values by using the 'Match' property on each nested object
    Ex. results[i].match will either be 'true' or 'false' depending on what the model classified the comment as  */
  function tallyResults(results,data){
    for(i=0;i<results.length;i++){
       if(results[i].match == true){
          trueToxicCount+=1
          //console.log('Toxic comment: ' + data[i])
          toxicSentComments.push(data[i]) //<-- writing to array to demonstrate what is toxic
       } else if(results[i].match == false){
         falseToxicCount+=1
         //console.log('Non-toxic comments: ' + data[i])
         nonToxicSentComments.push(data[i])  //<-- writing to array to demonstrate what is non-toxic
       } else {
         unclassifiedComments+=1 //for comments where match = null -> meaning unclassified as toxic or not
         unclassComments.push(data[i])
       }

    }

    let toxicPercentage =  ((trueToxicCount / results.length)*100)
    let nonToxicPercentage = ((falseToxicCount / results.length)*100)
    
    
    console.log('neg comments array: ' + toxicSentComments)
    console.log('pos comments array: ' + nonToxicSentComments) 
    console.log('unclassified comments array: ' + unclassComments)  

    //get some neg comments , get some pos comments
    let  toxicReduced =[];
    let nonToxicReduced=[];
  

    //COME BACK AND MODIFY TO REMOVE DUPLICATES
    function ReduceArray(arr,arr2){
      let r = ''
        for(i=0;i<arr.length;i+=5){
            r = getRandom(arr)
            arr2.push(r)
        }
        //console.log(arr2)
    }

     function getRandom(arr){
      let ran;
      ran = arr[Math.floor(Math.random()*arr.length)];
      //console.log(ran)
      return ran
    }
    
    ReduceArray(toxicSentComments,toxicReduced)
    ReduceArray(nonToxicSentComments,nonToxicReduced)
    
    console.log('toxic reduced: ' + toxicReduced)
    console.log('non toxic reduced ' + nonToxicReduced)
   
    //console.log('Toxic Percentage: ' + toxicPercentage + '% over ' + trueToxicCount +'/'+ results.length + ' total comments')
    //console.log('Non Toxic Percentage: ' + nonToxicPercentage + '% over '+ falseToxicCount +'/'+ results.length + ' total comments')
    //console.log('Total unclassified: ' + unclassifiedComments + ' out of ' + results.length + ' total comments')

    //encapsulate results into an object and return
    let calculatedResults = {
       toxicPercentage: toxicPercentage,
       nonToxicPercentage: nonToxicPercentage,
       unclassifiedComments: unclassifiedComments,
       toxicReduced: toxicReduced,
       nonToxicReduced: nonToxicReduced, 
    }
    return calculatedResults;  //return out to be used in app.js
  }
  

  
  // runAI(comments).then((results)=>{
  //   console.log(results)
  // })
  
  
  module.exports = {
      runAI: runAI
  }



/*   

Each comment is checked against each label, there are 6. 
Each comment has a probability for each label
  Ex. if there are 4 comments, there will be 4 individual probablility results for each of the 6 labels
  we want the the toxicity one because if any of the categories are true, the toxicity will be true as a result.
    'TRUE' in any label results in a true for 'Toxicity' because any of these labels means there is toxicity
  To get toxicity result, we target the 6th element of the predictions array, this will be the object that contains the toxic results for each comment

NEXT
predictions[i]: {"label":"identity_attack","results":[{"probabilities":{"0":0.9999489784240723,"1":0.00005100079579278827},"match":false},{"probabilities":{"0":0.9999662637710571,"1":0.00003373953950358555},"match":false},{"probabilities":{"0":0.9909220337867737,"1":0.009077996015548706},"match":false},{"probabilities":{"0":0.9627095460891724,"1":0.03729041665792465},"match":false}]}
NEXT
predictions[i]: {"label":"insult","results":[{"probabilities":{"0":0.9996121525764465,"1":0.0003878795250784606},"match":false},{"probabilities":{"0":0.9996545314788818,"1":0.00034552469151094556},"match":false},{"probabilities":{"0":0.01454636175185442,"1":0.9854536056518555},"match":true},{"probabilities":{"0":0.0713265910744667,"1":0.9286734461784363},"match":true}]}
NEXT
predictions[i]: {"label":"obscene","results":[{"probabilities":{"0":0.9999475479125977,"1":0.00005243486157269217},"match":false},{"probabilities":{"0":0.9999650716781616,"1":0.0000349632537108846},"match":false},{"probabilities":{"0":0.9579408168792725,"1":0.04205922782421112},"match":false},{"probabilities":{"0":0.23937059938907623,"1":0.7606293559074402},"match":true}]}
NEXT
predictions[i]: {"label":"severe_toxicity","results":[{"probabilities":{"0":1,"1":1.4286326788237602e-8},"match":false},{"probabilities":{"0":1,"1":1.3555439437595851e-8},"match":false},{"probabilities":{"0":0.9999535083770752,"1":0.00004650498885894194},"match":false},{"probabilities":{"0":0.9974665641784668,"1":0.002533425111323595},"match":false}]}
NEXT
predictions[i]: {"label":"sexual_explicit","results":[{"probabilities":{"0":0.9999779462814331,"1":0.000022071044440963306},"match":false},{"probabilities":{"0":0.999977707862854,"1":0.000022236550648813136},"match":false},{"probabilities":{"0":0.9933822154998779,"1":0.0066177998669445515},"match":false},{"probabilities":{"0":0.8009088039398193,"1":0.19909125566482544},"match":false}]}
NEXT
predictions[i]: {"label":"threat","results":[{"probabilities":{"0":0.999947190284729,"1":0.00005286106534185819},"match":false},{"probabilities":{"0":0.999962568283081,"1":0.00003748364542843774},"match":false},{"probabilities":{"0":0.9934804439544678,"1":0.006519549060612917},"match":false},{"probabilities":{"0":0.9492663741111755,"1":0.05073365196585655},"match":false}]}
NEXT
predictions[i]: {"label":"toxicity","results":[{"probabilities":{"0":0.9992080330848694,"1":0.0007920019561424851},"match":false},{"probabilities":{"0":0.9993508458137512,"1":0.000649186666123569},"match":false},{"probabilities":{"0":0.011931026354432106,"1":0.9880689978599548},"match":true},{"probabilities":{"0":0.03350222855806351,"1":0.9664977788925171},"match":true}]}




toxicityObj:
{"label":"toxicity","results":[{"probabilities":{"0":0.9992080330848694,"1":0.0007920019561424851},"match":false},
{"probabilities":{"0":0.9993508458137512,"1":0.000649186666123569},"match":false},
{"probabilities":{"0":0.9996795654296875,"1":0.0003203996457159519},"match":false},
{"probabilities":{"0":0.9054421186447144,"1":0.09455789625644684},"match":false},
{"probabilities":{"0":0.9979326725006104,"1":0.0020673484541475773},"match":false},
{"probabilities":{"0":0.9990547299385071,"1":0.0009452825761400163},"match":false},
{"probabilities":{"0":0.9989796280860901,"1":0.001020379364490509},"match":false},
{"probabilities":{"0":0.011931026354432106,"1":0.9880689978599548},"match":true},
{"probabilities":{"0":0.03350222855806351,"1":0.9664977788925171},"match":true}]}


 `predictions` is an array of objects, one for each prediction head,
    that contains the raw probabilities for each input along with the
    final prediction in `match` (either `true` or `false`).
    If neither prediction exceeds the threshold, `match` is `null`.
 


console.log(JSON.parse(predictions));
    
    prints:
    {
      "label": "identity_attack",
      "results": [{
        "probabilities": [0.9659664034843445, 0.03403361141681671],
        "match": false
      }]
    },
    {
      "label": "insult",
      "results": [{
        "probabilities": [0.08124706149101257, 0.9187529683113098],
        "match": true
      }]
    },
    
 
/* STRUCTURE OF arrayOfPredictions is:
    [
    '{"label":"identity_attack","results":[
        {"probabilities":{"0":0.9659663438796997,"1":0.034033700823783875},"match":false},
        {"probabilities":{"0":0.9921950101852417,"1":0.00780494324862957},"match":false},
        {"probabilities":{"0":0.9999512434005737,"1":0.000048760874051367864},"match":false}
    ]}',

    '{"label":"insult","results":[
        {"probabilities":{"0":0.0812470093369484,"1":0.9187529683113098},"match":true},
        {"probabilities":{"0":0.9633523225784302,"1":0.036647673696279526},"match":false},
        {"probabilities":{"0":0.999562680721283,"1":0.0004372781259007752},"match":false}]}',

    '{"label":"obscene","results":[
        {"probabilities":{"0":0.3993155360221863,"1":0.6006844639778137},"match":null},{"probabilities":{"0":0.9984427094459534,"1":0.0015573396813124418},"match":false},{"probabilities":{"0":0.999913215637207,"1":0.00008679015445522964},"match":false}]}',
    '{"label":"severe_toxicity","results":[{"probabilities":{"0":0.9970394968986511,"1":0.0029604362789541483},"match":false},{"probabilities":{"0":0.999996542930603,"1":0.000003515783646435011},"match":false},{"probabilities":{"0":1,"1":4.7531660385402574e-8},"match":false}]}',
    '{"label":"sexual_explicit","results":[{"probabilities":{"0":0.7053253650665283,"1":0.2946746349334717},"match":null},{"probabilities":{"0":0.9995667338371277,"1":0.0004332040261942893},"match":false},{"probabilities":{"0":0.9999327659606934,"1":0.00006722353282384574},"match":false}]}',
    '{"label":"threat","results":[{"probabilities":{"0":0.910673975944519,"1":0.08932600915431976},"match":false},{"probabilities":{"0":0.9976200461387634,"1":0.002379966201260686},"match":false},{"probabilities":{"0":0.9998364448547363,"1":0.0001634958607610315},"match":false}]}',
    '{"label":"toxicity","results":[{"probabilities":{"0":0.031176742166280746,"1":0.9688233137130737},"match":true},{"probabilities":{"0":0.9092447757720947,"1":0.0907551497220993},"match":false},{"probabilities":{"0":0.9989499449729919,"1":0.0010500926291570067},"match":false}]}'
  ]

*/




/*

ISSUE:
Platform node has already been set. Overwriting the platform with [object Object].
cpu backend was already registered. Reusing existing backend factory.

tried npm update -> https://stackoverflow.com/questions/51675830/tensorflow-js-typeerror-backend-select-is-not-a-function
what i did was: npm install @tensorflow/tfjs-node again and regular tfjs
and removed the require statement for tfjs in AI script and just left the require for tfjs-node


https://www.kdnuggets.com/2020/03/tensorflow-keras-tokenization-text-data-prep.html
https://github.com/tensorflow/tfjs-models/blob/master/toxicity/demo/index.js
https://github.com/conversationai/conversationai.github.io/blob/master/crowdsourcing_annotation_schemes/toxicity_with_subattributes.md
https://stackoverflow.com/questions/11922383/how-can-i-access-and-process-nested-objects-arrays-or-json
*/