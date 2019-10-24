console.log("server.js loaded");

const express = require('express');
const app = express();

const bodyParser = require('body-parser');


const searchYoutube = require('youtube-api-v3-search');

require('dotenv').config();


const { spawn } = require('child_process');




app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());




let port = process.env.PORT;
if (!port) {port = 3000;}


const testResult = {"kind":"youtube#searchListResponse","etag":"\"j6xRRd8dTPVVptg711_CSPADRfg/yYuVuvOqzWt3w09WrZ-__Zv2_Ew\"","nextPageToken":"CAUQAA","regionCode":"US","pageInfo":{"totalResults":1000000,"resultsPerPage":5},"items":[{"kind":"youtube#searchResult","etag":"\"j6xRRd8dTPVVptg711_CSPADRfg/9ilKoCSHV1Tq626XziY0FrwNg8Y\"","id":{"kind":"youtube#video","videoId":"A1wr3Rqxjy4"},"snippet":{"publishedAt":"2019-10-16T14:05:29.000Z","channelId":"UCcXhhVwCT6_WqjkEniejRJQ","title":"Vibraphone Marble Drops - Marble Machine X 99","description":"Welcome to Episode 99 of Building Marble Machine X! This time I spent a lot of days making the marble drops for the vibraphone. A huge project and it worked ...","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/A1wr3Rqxjy4/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/A1wr3Rqxjy4/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/A1wr3Rqxjy4/hqdefault.jpg","width":480,"height":360}},"channelTitle":"Wintergatan","liveBroadcastContent":"none"}},{"kind":"youtube#searchResult","etag":"\"j6xRRd8dTPVVptg711_CSPADRfg/ygxtYhsMRIR39IUx0NAkBG7jhdg\"","id":{"kind":"youtube#video","videoId":"IvUU8joBb1Q"},"snippet":{"publishedAt":"2016-03-02T04:37:43.000Z","channelId":"UCcXhhVwCT6_WqjkEniejRJQ","title":"Wintergatan - Marble Machine (music instrument using 2000 marbles)","description":"Get the audio track \"Marble Machine\" by Wintergatan: https://wintergatan.bandcamp.com/track/marble-machine Marble Machine built and composed by Martin ...","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/IvUU8joBb1Q/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/IvUU8joBb1Q/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/IvUU8joBb1Q/hqdefault.jpg","width":480,"height":360}},"channelTitle":"Wintergatan","liveBroadcastContent":"none"}},{"kind":"youtube#searchResult","etag":"\"j6xRRd8dTPVVptg711_CSPADRfg/AZWkCoDYodhyGNGwgZF4u6O2AnQ\"","id":{"kind":"youtube#video","videoId":"hrEpIgIEUnU"},"snippet":{"publishedAt":"2019-10-09T14:00:08.000Z","channelId":"UCcXhhVwCT6_WqjkEniejRJQ","title":"Cymbal Marble Drop - Marble Machine X 98","description":"Welcome to Episode 98 of Building Marble Machine X! This week I improvise a design for the Cymbal Marble Drop build while having Hannes, Marius and Alex ...","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/hrEpIgIEUnU/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/hrEpIgIEUnU/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/hrEpIgIEUnU/hqdefault.jpg","width":480,"height":360}},"channelTitle":"Wintergatan","liveBroadcastContent":"none"}},{"kind":"youtube#searchResult","etag":"\"j6xRRd8dTPVVptg711_CSPADRfg/1hWgDf_JzCQo6ryoTUi8DYX8Kn4\"","id":{"kind":"youtube#video","videoId":"qJz95Wm0_Ck"},"snippet":{"publishedAt":"2019-09-25T14:00:17.000Z","channelId":"UCcXhhVwCT6_WqjkEniejRJQ","title":"Liquid Latex - Vibraphone Sound Fix","description":"Welcome to episode #95 of Building the Marble Machine X! Applying Liquid Latex to the Vibraphone Plats of the Marble Machine X seems to be a fantastic ...","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/qJz95Wm0_Ck/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/qJz95Wm0_Ck/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/qJz95Wm0_Ck/hqdefault.jpg","width":480,"height":360}},"channelTitle":"Wintergatan","liveBroadcastContent":"none"}},{"kind":"youtube#searchResult","etag":"\"j6xRRd8dTPVVptg711_CSPADRfg/4EanCnijdxpjZBFMSf6hWBz0XPQ\"","id":{"kind":"youtube#video","videoId":"NyRJaVOIgYU"},"snippet":{"publishedAt":"2019-10-02T14:00:07.000Z","channelId":"UCcXhhVwCT6_WqjkEniejRJQ","title":"Polishing 3D Printed Metal!","description":"Welcome to episode #97 of Building the Marble Machine X! This week I am polishing 3D metal prints. Feels kind of Sci-Fi to me anyway, never held a 3D printed ...","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/NyRJaVOIgYU/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/NyRJaVOIgYU/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/NyRJaVOIgYU/hqdefault.jpg","width":480,"height":360}},"channelTitle":"Wintergatan","liveBroadcastContent":"none"}}]};


let vlcChild = null;

let globalVideoQuality = '';
let globalVideoTitle = '';
let globalVideoId = '';



killVlcChild = () =>
{
	if (vlcChild)
	{
		//destroy if already existing
		//vlcChild.kill();
		process.kill(-vlcChild.pid);
		console.log("NODE: killed existing VLC process");
	}
}




app.get('/', (req, res)=>
{
	//killVlcChild();

	res.render('index.ejs', {results: {kind: "none"}, isVideoRunning: vlcChild && true})
});

app.post('/ytsearchtest', (req, res)=>
{
	//console.log(testResult.items[0]);
	

	//killVlcChild();

	res.render('index.ejs', {results: testResult, isVideoRunning: vlcChild && true});
});


app.post('/ytsearch', (req, res)=>
{
	
	//killVlcChild();

	//console.log(req.body);

	searchYoutube(process.env.YOUTUBE_API_KEY,{q: req.body.searchQuery, part: 'snippet', type: 'video'},(err, result)=>
	{
		if (err)
		{
			console.log(err);
		}
		else
		{
			//console.log(result);
			//res.send(result);
			res.render('index.ejs', {results: result, isVideoRunning: vlcChild && true});
		}
	});
});




app.post('/spawnvlc', (req, res)=>
{
	//spawns a vlc process for the video ID given
	//destroys all previous processes!
	killVlcChild();
	//else
	//{
	
		//Now spawn a new one:
		//vlcChild = spawn('vlc', ["-vvv https://www.youtube.com/watch?v=" + req.params.id, "--sout '#transcode{height=240,vcodec=mp1v,acodec=mpga,vb=1024,ab=192}:standard{access=http{mime=video/mpeg},mux=mpeg1}'"], {shell: false});
		const args = [
			"-vvv",
			"https://www.youtube.com/watch?v=" + req.body.videoId,
			"--sout",
			""
		];

		switch (req.body.quality)
		{
			case '480p':
				args[3] = "\"#transcode{height=480,vcodec=mp1v,acodec=mpga,vb=4096,ab=192}:standard{access=http{mime=video/mpeg},mux=mpeg1}\""
				break;
			case '360p':
				args[3] = "\"#transcode{height=360,vcodec=mp1v,acodec=mpga,vb=2048,ab=192}:standard{access=http{mime=video/mpeg},mux=mpeg1}\""
				break;
			case '240p':
				args[3] = "\"#transcode{height=240,vcodec=mp1v,acodec=mpga,vb=1024,ab=192}:standard{access=http{mime=video/mpeg},mux=mpeg1}\"";
				break;
			default:
				res.send("Error: unknown quality selection!");
				res.status(200).end();
		}
		
		console.log(args);

		vlcChild = spawn('vlc', args, {shell: true, detached: true});


		vlcChild.stdout.on('data', (data) => {
		  console.log(`stdout: ${data}`);
		});

		vlcChild.stderr.on('data', (data) => {
		  console.error(`stderr: ${data}`);
		});

		vlcChild.on('close', (code) => {
		  console.log(`NODE: child process exited with code ${code}`);
		  vlcChild = null;
		});

		//vlcChild.kill('SIGKILL');


		globalVideoQuality = req.body.quality;
		globalVideoTitle = req.body.title;
		globalVideoId = req.body.videoId;
		

		res.redirect('/video');

		//res.redirect('http://192.168.0.175:8080');
		
	//}
});


app.get('/video', (req, res) =>
{
	res.render('video.ejs', {videoInfo:
	{
		quality: globalVideoQuality,
		title: globalVideoTitle,
		id: globalVideoId
	}});
});


//app.use(express.static('./public'));

app.listen(port, function()
{
	console.log("server listening on port " + port);
});