//Initialisation
const Discord = require('discord.js');
const bot = new Discord.Client();

var request = require('request');
var fs = require('fs')
const channelText="463084076094586890";
const currentSaison="4";
const prefix = "!";

//function
var pseudos = ["VinceGh.Rys", "Haxak.Rys","Hexovel.Rys","lucaslebg","Newka.Rys"];
var platform = ["pc","pc","pc","xbox","xbox"]
var responsesSquad = {};
var responsesDuo = {};
var responsesSolo = {};
var completed_requests = 0;
function sortProperties(obj)
{
  // convert object into array
	var sortable=[];
	for(var key in obj)
		if(obj.hasOwnProperty(key))
			sortable.push([key, obj[key]]); // each item is an array in format [key, value]
	
	// sort items by value
	sortable.sort(function(a, b)
	{
	  return a[1]-b[1]; // compare numbers
	});
	return Object.values(sortable); // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
}
function requeste(){
    var options = {
        url: 'https://api.fortnitetracker.com/v1/profile/'+platform[completed_requests]+'/'+pseudos[completed_requests],
        headers: {
          'TRN-Api-Key': '2ba2a6bf-4504-4f85-9e63-942c66aaab63'
        }
      };
request(options, callback)
}
function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        //var ratio = Math.round((info['stats']['curr_p2']['kd']['valueDec']+info['stats']['curr_p10']['kd']['valueDec']+info['stats']['curr_p9']['kd']['valueDec'])/3*100)/100
        try {
            var ratioSquad = info['stats']['curr_p9']['kd']['valueDec']}
        catch(err) {
            var ratioSquad = undefined}
        try {
            var ratioDuo = info['stats']['curr_p10']['kd']['valueDec']}
        catch(err) {
            var ratioDuo = undefined}
        try {
            var ratioSolo = info['stats']['curr_p2']['kd']['valueDec']}
        catch(err) {
            var ratioSolo = undefined}
        

       /* var ratioSquad = info['stats']['curr_p9']['kd']['valueDec']            
        var ratioDuo = info['stats']['curr_p10']['kd']['valueDec']
        var ratioSolo = info['stats']['curr_p2']['kd']['valueDec']*/

        responsesSquad[pseudos[completed_requests]] = ratioSquad;
        responsesDuo[pseudos[completed_requests]] = ratioDuo;
        responsesSolo[pseudos[completed_requests]] = ratioSolo;

        completed_requests++;
      //When completed
      if (completed_requests == pseudos.length && !error) {
        classementSquad = Object.keys(responsesSquad).sort(function(a,b){return responsesSquad[a]-responsesSquad[b]}).reverse();
        classementDuo = Object.keys(responsesDuo).sort(function(a,b){return responsesDuo[a]-responsesDuo[b]}).reverse();
        classementSolo = Object.keys(responsesSolo).sort(function(a,b){return responsesSolo[a]-responsesSolo[b]}).reverse();

        RatiosSquad = Object.values(responsesSquad).sort(function(a, b){return b - a})
        RatiosDuo = Object.values(responsesDuo).sort(function(a, b){return b - a})
        RatiosSolo = Object.values(responsesSolo).sort(function(a, b){return b - a})

        while (classementSquad.length<5){
            classementSquad.push("undefined")
        }
        while (classementDuo.length<5){
            classementDuo.push("undefined")
        }
        while (classementSolo.length<5){
            classementSolo.push("undefined")
        }

        oldClassementSquad = fs.readFileSync('oldRatioSquad.txt', 'utf8').split(' ');
        oldClassementDuo = fs.readFileSync('oldRatioDuo.txt', 'utf8').split(' ');
        oldClassementSolo = fs.readFileSync('oldRatioSolo.txt', 'utf8').split(' ');
    
        var signeClassemementSquad= [];
        var signeClassemementDuo = [];
        var signeClassemementSolo = [];

        var EcartRatiosSquad = [];
        var EcartRatiosDuo = [];
        var EcartRatiosSolo = [];

        for(var i = 0; i < RatiosSquad.length; i++){
            if(parseFloat(RatiosSquad[i]) == parseFloat(oldClassementSquad[i])){
                signeClassemementSquad.push(' ')
                EcartRatiosSquad.push(' ')
            }
            if(parseFloat(RatiosSquad[i]) > parseFloat(oldClassementSquad[i])){
                signeClassemementSquad.push('▲')
                EcartRatiosSquad.push("+"+(Math.round( (parseFloat(RatiosSquad[i])- parseFloat(oldClassementSquad[i]))*100)/100));
            }
            if(parseFloat(RatiosSquad[i]) < parseFloat(oldClassementSquad[i])){
                signeClassemementSquad.push('▼')
                EcartRatiosSquad.push("-"+(Math.round(parseFloat((oldClassementSquad[i])-parseFloat(RatiosSquad[i]))*100)/100));
            }
        }
        for(var i = 0; i < RatiosDuo.length; i++){
            if(parseFloat(RatiosDuo[i]) == parseFloat(oldClassementDuo[i])){
                signeClassemementDuo.push(' ')
                EcartRatiosDuo.push(' ')
            }
            if(parseFloat(RatiosDuo[i]) > parseFloat(oldClassementDuo[i])){
                signeClassemementDuo.push('▲')
                EcartRatiosDuo.push("+"+(Math.round( (parseFloat(RatiosDuo[i])- parseFloat(oldClassementDuo[i]))*100)/100));
            }
            if(parseFloat(RatiosDuo[i]) < parseFloat(oldClassementDuo[i])){
                signeClassemementDuo.push('▼')
                EcartRatiosDuo.push("-"+(Math.round(parseFloat((oldClassementDuo[i])-parseFloat(RatiosDuo[i]))*100)/100));
            }
        }
        for(var i = 0; i < RatiosSolo.length; i++){
            if(parseFloat(RatiosSolo[i]) == parseFloat(oldClassementSolo[i])){
                signeClassemementSolo.push(' ')
                EcartRatiosSolo.push(' ')
            }
            if(parseFloat(RatiosSolo[i]) > parseFloat(oldClassementSolo[i])){
                signeClassemementSolo.push('▲')
                EcartRatiosSolo.push("+"+(Math.round( (parseFloat(RatiosSolo[i])- parseFloat(oldClassementSolo[i]))*100)/100));
            }
            if(parseFloat(RatiosSolo[i]) < parseFloat(oldClassementSolo[i])){
                signeClassemementSolo.push('▼')
                EcartRatiosSolo.push("-"+(Math.round(parseFloat((oldClassementSolo[i])-parseFloat(RatiosSolo[i]))*100)/100));
            }
        }

        var writeRatioSquad = RatiosSquad.join(' ')
        var writeRatioDuo = RatiosDuo.join(' ')
        var writeRatioSolo = RatiosSolo.join(' ')

        fs.writeFileSync('oldRatioSquad.txt', writeRatioSquad)
        fs.writeFileSync('oldRatioDuo.txt', writeRatioDuo)
        fs.writeFileSync('oldRatioSolo.txt', writeRatioSolo)
        //Sent message
        bot.channels.get(channelText).send({embed:{
            color: 3447003,
            author: {
                name: bot.user.username,
                icon_url: bot.user.avatarURL,
            },
            title: '**Solo Saison '+currentSaison+'**',
            description: ' ',
            fields: [
                {
                    name: '1er',
                    value: classementSolo[0]+' (ratio: '+RatiosSolo[0]+') '+signeClassemementSolo[0]+" "+EcartRatiosSolo[0],
                },
                {
                    name: '2ème',
                    value: classementSolo[1]+' (ratio: '+RatiosSolo[1]+') '+signeClassemementSolo[1]+" "+EcartRatiosSolo[1],
                },
                {
                    name: '3ème',
                    value: classementSolo[2]+' (ratio: '+RatiosSolo[2]+') '+signeClassemementSolo[2]+" "+EcartRatiosSolo[2],
                },
                {
                    name: '4ème',
                    value: classementSolo[3]+' (ratio: '+RatiosSolo[3]+') '+signeClassemementSolo[3]+" "+EcartRatiosSolo[3],
                },
                {
                    name: '5ème',
                    value: classementSolo[4]+' (ratio: '+RatiosSolo[4]+') '+signeClassemementSolo[4]+" "+EcartRatiosSolo[4],
                },
            ],
            timestamp: new Date(),
            footer: {
                icon_url: bot.user.avatarURL,
                text: 'fortnite tracker homeMade'
            }
    
        }}); //Solo
        bot.channels.get(channelText).send({embed:{
            color: 3447003,
            author: {
                name: bot.user.username,
                icon_url: bot.user.avatarURL,
            },
            title: '**Duo Saison '+currentSaison+'**',
            description: ' ',
            fields: [
                {
                    name: '1er',
                    value: classementDuo[0]+' (ratio: '+RatiosDuo[0]+') '+signeClassemementDuo[0]+" "+EcartRatiosDuo[0],
                },
                {
                    name: '2ème',
                    value: classementDuo[1]+' (ratio: '+RatiosDuo[1]+') '+signeClassemementDuo[1]+" "+EcartRatiosDuo[1],
                },
                {
                    name: '3ème',
                    value: classementDuo[2]+' (ratio: '+RatiosDuo[2]+') '+signeClassemementDuo[2]+" "+EcartRatiosDuo[2],
                },
                {
                    name: '4ème',
                    value: classementDuo[3]+' (ratio: '+RatiosDuo[3]+') '+signeClassemementDuo[3]+" "+EcartRatiosDuo[3],
                },
                {
                    name: '5ème',
                    value: classementDuo[4]+' (ratio: '+RatiosDuo[4]+') '+signeClassemementDuo[4]+" "+EcartRatiosDuo[4],
                },
            ],
            timestamp: new Date(),
            footer: {
                icon_url: bot.user.avatarURL,
                text: 'fortnite tracker homeMade'
            }
    
        }}); //Duo
        bot.channels.get(channelText).send({embed:{
            color: 3447003,
            author: {
                name: bot.user.username,
                icon_url: bot.user.avatarURL,
            },
            title: '**Squad Saison '+currentSaison+'**',
            description: ' ',
            fields: [
                {
                    name: '1er',
                    value: classementSquad[0]+' (ratio: '+RatiosSquad[0]+') '+signeClassemementSquad[0]+" "+EcartRatiosSquad[0],
                },
                {
                    name: '2ème',
                    value: classementSquad[1]+' (ratio: '+RatiosSquad[1]+') '+signeClassemementSquad[1]+" "+EcartRatiosSquad[1],
                },
                {
                    name: '3ème',
                    value: classementSquad[2]+' (ratio: '+RatiosSquad[2]+') '+signeClassemementSquad[2]+" "+EcartRatiosSquad[2],
                },
                {
                    name: '4ème',
                    value: classementSquad[3]+' (ratio: '+RatiosSquad[3]+') '+signeClassemementSquad[3]+" "+EcartRatiosSquad[3],
                },
                {
                    name: '5ème',
                    value: classementSquad[4]+' (ratio: '+RatiosSquad[4]+') '+signeClassemementSquad[4]+" "+EcartRatiosSquad[4],
                },
            ],
            timestamp: new Date(),
            footer: {
                icon_url: bot.user.avatarURL,
                text: 'fortnite tracker homeMade'
            }
    
        }}); //Squad

        //Reset
        responses = {};
        completed_requests = 0;
        }else{
            var options = {url: 'https://api.fortnitetracker.com/v1/profile/'+platform[completed_requests]+'/'+pseudos[completed_requests],headers: {'TRN-Api-Key': '2ba2a6bf-4504-4f85-9e63-942c66aaab63'}};
            request(options, callback) 
        }
    }
}
botReady = false
//Loop
bot.on('ready', function(){
    console.log("I'm ready !");
    botReady=true
});
setInterval(function() {
    if(botReady){
    async function clear() {
        const fetched = await bot.channels.get(channelText).fetchMessages({limit: 99});
        bot.channels.get(channelText).bulkDelete(fetched);
    }
    clear();
    requeste();
    console.log("données mises à jour automatiquement")
}
}, 5*60*1000);
bot.on("message", msg => {
    if (msg.content.toLowerCase().startsWith(prefix + "stats")&&msg.channel.id === channelText) {
        async function clear() {
            msg.delete();
            const fetched = await msg.channel.fetchMessages({limit: 99});
            msg.channel.bulkDelete(fetched);
        }
        console.log("données mises à jour par commande")
        clear();
        requeste();
    }
});

bot.login(process.env.TOKEN);
