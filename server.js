console.log("server.js loaded");

const express = require('express');
const app = express();

const bodyParser = require('body-parser');


const searchYoutube = require('youtube-api-v3-search');
const querystring = require('querystring');
const fs = require('fs');

require('dotenv').config();


const { spawn } = require('child_process');

const {google, videointelligence_v1p2beta1} = require('googleapis');
const youtube = google.youtube(
{
	version:'v3', auth: process.env.YOUTUBE_API_KEY
});
const {authenticate} = require('@google-cloud/local-auth');
var path = require('path');

const { Console } = require('console');
const { auth } = require('googleapis/build/src/apis/abusiveexperiencereport');






app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());




let port = process.env.PORT;
if (!port) {port = 3000;}


const testResult = {"kind":"youtube#searchListResponse","etag":"\"j6xRRd8dTPVVptg711_CSPADRfg/yYuVuvOqzWt3w09WrZ-__Zv2_Ew\"","nextPageToken":"CAUQAA","regionCode":"US","pageInfo":{"totalResults":1000000,"resultsPerPage":5},"items":[{"kind":"youtube#searchResult","etag":"\"j6xRRd8dTPVVptg711_CSPADRfg/9ilKoCSHV1Tq626XziY0FrwNg8Y\"","id":{"kind":"youtube#video","videoId":"A1wr3Rqxjy4"},"snippet":{"publishedAt":"2019-10-16T14:05:29.000Z","channelId":"UCcXhhVwCT6_WqjkEniejRJQ","title":"Vibraphone Marble Drops - Marble Machine X 99","description":"Welcome to Episode 99 of Building Marble Machine X! This time I spent a lot of days making the marble drops for the vibraphone. A huge project and it worked ...","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/A1wr3Rqxjy4/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/A1wr3Rqxjy4/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/A1wr3Rqxjy4/hqdefault.jpg","width":480,"height":360}},"channelTitle":"Wintergatan","liveBroadcastContent":"none"}},{"kind":"youtube#searchResult","etag":"\"j6xRRd8dTPVVptg711_CSPADRfg/ygxtYhsMRIR39IUx0NAkBG7jhdg\"","id":{"kind":"youtube#video","videoId":"IvUU8joBb1Q"},"snippet":{"publishedAt":"2016-03-02T04:37:43.000Z","channelId":"UCcXhhVwCT6_WqjkEniejRJQ","title":"Wintergatan - Marble Machine (music instrument using 2000 marbles)","description":"Get the audio track \"Marble Machine\" by Wintergatan: https://wintergatan.bandcamp.com/track/marble-machine Marble Machine built and composed by Martin ...","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/IvUU8joBb1Q/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/IvUU8joBb1Q/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/IvUU8joBb1Q/hqdefault.jpg","width":480,"height":360}},"channelTitle":"Wintergatan","liveBroadcastContent":"none"}},{"kind":"youtube#searchResult","etag":"\"j6xRRd8dTPVVptg711_CSPADRfg/AZWkCoDYodhyGNGwgZF4u6O2AnQ\"","id":{"kind":"youtube#video","videoId":"hrEpIgIEUnU"},"snippet":{"publishedAt":"2019-10-09T14:00:08.000Z","channelId":"UCcXhhVwCT6_WqjkEniejRJQ","title":"Cymbal Marble Drop - Marble Machine X 98","description":"Welcome to Episode 98 of Building Marble Machine X! This week I improvise a design for the Cymbal Marble Drop build while having Hannes, Marius and Alex ...","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/hrEpIgIEUnU/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/hrEpIgIEUnU/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/hrEpIgIEUnU/hqdefault.jpg","width":480,"height":360}},"channelTitle":"Wintergatan","liveBroadcastContent":"none"}},{"kind":"youtube#searchResult","etag":"\"j6xRRd8dTPVVptg711_CSPADRfg/1hWgDf_JzCQo6ryoTUi8DYX8Kn4\"","id":{"kind":"youtube#video","videoId":"qJz95Wm0_Ck"},"snippet":{"publishedAt":"2019-09-25T14:00:17.000Z","channelId":"UCcXhhVwCT6_WqjkEniejRJQ","title":"Liquid Latex - Vibraphone Sound Fix","description":"Welcome to episode #95 of Building the Marble Machine X! Applying Liquid Latex to the Vibraphone Plats of the Marble Machine X seems to be a fantastic ...","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/qJz95Wm0_Ck/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/qJz95Wm0_Ck/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/qJz95Wm0_Ck/hqdefault.jpg","width":480,"height":360}},"channelTitle":"Wintergatan","liveBroadcastContent":"none"}},{"kind":"youtube#searchResult","etag":"\"j6xRRd8dTPVVptg711_CSPADRfg/4EanCnijdxpjZBFMSf6hWBz0XPQ\"","id":{"kind":"youtube#video","videoId":"NyRJaVOIgYU"},"snippet":{"publishedAt":"2019-10-02T14:00:07.000Z","channelId":"UCcXhhVwCT6_WqjkEniejRJQ","title":"Polishing 3D Printed Metal!","description":"Welcome to episode #97 of Building the Marble Machine X! This week I am polishing 3D metal prints. Feels kind of Sci-Fi to me anyway, never held a 3D printed ...","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/NyRJaVOIgYU/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/NyRJaVOIgYU/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/NyRJaVOIgYU/hqdefault.jpg","width":480,"height":360}},"channelTitle":"Wintergatan","liveBroadcastContent":"none"}}]};


let vlcChild = null;

let globalVideoQuality = '';
let VideoDataCache = []


killVlcChild = () =>
{
	if (vlcChild)
	{
		//destroy if already existing
		//vlcChild.kill();
		const args = [
			"/IM",
			"vlc.exe"
		];
		spawn('taskkill', args, {shell: true, detached: true});
		console.log("NODE: killed existing VLC process");
	}
}


function GetCachedVideo(name)
{
	if (VideoDataCache.length == 0)
	{
		return null;
	}
	return VideoDataCache.find(element => element.VideoId ===  name);
}

function TryUpdateCachedVideo(id, comments)
{
	if (VideoDataCache.length > 0)
	{
		VideoDataCache.find(element => element.VideoId ===  id).Comments = comments;
	}
}

function GetCachedComment(id)
{
	if (VideoDataCache.length > 0)
	{
		return VideoDataCache.find(element => element.VideoId ===  id).Comments;
	}
	return null;
}

function GetMockVideoInfo()
{
	return  { Likes: 12, Dislikes: 12, CommentCount: 0, CommentEnabled: false, Comments: [], Description: "Sample video", ChannelName:"Sample Channel", PublishedDate: "01-01-2020", VideoId:"demo"};
}

/**
 * 
 * @param {Request} req 
 * @returns bool
 */
function IsRequestContent(req)
{
	if (req.params.videoId && req.params.videoId.includes(".bmp"))
	{
		return true;		
	}
	return false;
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
function RedirectToImage(req, res)
{
	var readStream = fs.createReadStream('public/' + req.params.videoId);
	readStream.pipe(res);
}

/**
 * 
 * @param {string} name 
 * @param {string} id 
 * @returns
 */
async function AddCachedVideo(name, id)
{
	var newItem = { VideoId: id, Name: name, CommentEnabled: true, CommentCount: -1, Comments: [], Likes: -1, Dislikes: -1, PublishedDate: '', ViewCount: -1, ChannelName: '', Description: ''};
	try
	{
		if (name === ":)demo")
		{
			return  GetMockVideoInfo();
		}
		else
		{
			VideoDataCache.push(newItem);
			var extraData = await youtube.videos.list(
			{
				"part": [
				"snippet,statistics"
				],
				"i": 15,
				"moderationStatus": "published",
				"order": "relevance",
				"id": id
			});	
			newItem.Likes = extraData.data.items[0].statistics.likeCount;
			newItem.Dislikes = extraData.data.items[0].statistics.dislikeCount;
			newItem.CommentCount = extraData.data.items[0].statistics.commentCount;
			if (name === "unknown")
			{
				extraData.Name = extraData.data.items[0].snippet.title;
			}
			else
			{
				extraData.Name = name;
			}
			newItem.Description = extraData.data.items[0].snippet.description;
			newItem.ChannelName = extraData.data.items[0].snippet.channelTitle;
			var date = Date.parse(extraData.data.items[0].snippet.publishedAt);
			let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
			let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
			let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
			newItem.PublishedDate = `${da}-${mo}-${ye}`;
		}
	}
	catch (error)
	{
		Console.log(error);
	}
	return newItem;
}

function HasCommentsDisabled(error)
{
	return error.message.includes('disabled comments');
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

/**
 * 
 * @param {string} videoId 
 * @param {string} videoName 
 * @param {string} quality (420p, 360p, 240p, 144p, c64) 
 * @returns 
 */
async function SpawnEncoder(videoId, videoName, quality)
{
	killVlcChild();
		const args = [
			"-vvv",
			"https://www.youtube.com/watch?v=" + videoId,
			"--loop",
			"--image-duration=-1",
			"--sout",
			"",
		];
		if ( videoId === 'demo')
		{
			args[1] = "./sample.mp4";
			videoName = ":)demo";
		}
		//mux selection information can be found here: https://www.videolan.org/streaming-features.html
		switch (quality)
		{
			case '480p':
				args[5] = "\"#transcode{height=480,vcodec=mp1v,acodec=mpga,vb=4096,ab=192,fps=24}:standard{access=http{mime=video/mpeg},mux=mpeg1,dst=:8080/" + videoId + ".mpg}\"";
				break;
			case '360p':
				args[5] = "\"#transcode{height=360,vcodec=mp1v,acodec=mpga,vb=2048,ab=192,fps=24}:standard{access=http{mime=video/mpeg},mux=mpeg1,dst=:8080/" + videoId + ".mpg}\"";
				break;
			case '240p':
				args[5] = "\"#transcode{height=240,vcodec=mp1v,acodec=mpga,vb=1024,ab=192,fps=24}:standard{access=http{mime=video/mpeg},mux=mpeg1,dst=:8080/" + videoId + ".mpg}\"";
				break;
			case '144p':
				args[5] = "\"#transcode{height=144,vcodec=mp1v,acodec=mpga,vb=1024,ab=192,fps=24}:standard{access=http{mime=video/mpeg},mux=mpeg1,dst=:8080/" + videoId + ".mpg}\"";
				break;
			case 'c64p':
				args[5] = "\"#transcode{height=144,vcodec=mp1v,acodec=mpga,vb=1024,ab=192,fps=12}:standard{access=http{mime=video/mpeg},mux=mpeg1,dst=:8080/" + videoId + ".mpg}\"";
				break;
				default:
				console.log("Quality not set, using 240p.");
				args[5] = "\"#transcode{height=240,vcodec=mp1v,acodec=mpga,vb=1024,ab=192,fps=25}:standard{access=http{mime=video/mpeg},mux=mpeg1,dst=:8080/" + videoId + ".mpg}\"";
				break;
		}		
		console.log(args);

		vlcChild = spawn('VLC', args, {shell: true, detached: true});

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

}


app.post('/spawnvlc', async (req, res)=>
{
		res.redirect('/watch/?v=' + req.body.videoId);
});


app.get('/watch', async (req, res) =>
{
    try {
		if (IsRequestContent(req))
		{
			RedirectToImage(req, res);
			return;
		}
		var quality = '240p';		
		if (req.query.quality)
		{
			quality = req.query.quality;
		}
		var playerType = 'WMP';
		if (req.query.player)
		{
			playerType = req.query.player;
		}

		var videoInfo = GetCachedVideo(req.query.v);
		if (!videoInfo)
		{
			videoinfo = await AddCachedVideo("unknown", req.query.v);
		}
		await SpawnEncoder(req.query.v, null, quality);
		if (videoInfo.Comments.length > 0 || videoInfo.CommentEnabled == false)
		{}
		else
		{
			try{
				var commentsResponse = await youtube.commentThreads.list({
					"part": [
					"snippet"
					],
					"maxResults": 15,
					"moderationStatus": "published",
					"order": "relevance",
					"videoId": req.query.v
				});	
				videoInfo.Comments = commentsResponse.data.items;
			}
			catch (commentError)
			{
				if (HasCommentsDisabled(commentError))
				{
					videoInfo.CommentEnabled = false;
				}
				else
				{
					throw commentError;
				}
			}
		}
		res.render('video.ejs', {videoInfo: videoInfo, playerType: playerType, quality: quality});	
	} catch (error) {
		Console.log(error);	
	}
	
});


app.use(express.static('./public'));

app.listen(port, function()
{
	console.log("server listening on port " + port);
});