# retro-video-server


This project lets you run a server on a local machine on your network that
will search for YouTube videos and transcode them to something that older
computers can use.


It's targeted to the Windows 9x through XP era of machines, that is,
Pentium MMX through Pentium 4. Anything newer can just use normal YouTube.


You'll want to access it using a computer from that era, with RetroZilla (or
other Firefox browser) and VLC installed, with the Mozilla plugin activated.




## How it works


All it does is search YouTube for videos, then when you click on one it spawns
a VLC process set to transcode the video to a simple MPEG-1 format. The quality
level is selectable on the index page - there are three options: 240p, 360p, and 480p.
Smaller or larger options are of course possible, so feel free to play around with
that aspect of it.


This is currently in a highly alpha stage, so I make no guarantees as to the




## Requirements


* A computer running Linux (Windows and Mac not tested but might work fine)
* Node.js
* VLC
* A YouTube API key - get this using your Google account
* A local network and internet connection
* A retro computer to try it out on, with the following:
	* Pentium MMX or better CPU (slower CPUs might work but even 240p will probably struggle)
	* Windows 95, 98SE, 2000, or XP - basically any 32-bit version of Windows
	* Firefox-based browser (RetroZilla recommended)
	* VLC (version I used was 0.8.6i, the last to run on Windows 9x)
	* Mozilla plugin from VLC (select this option when installing it)


My test retro machine is a Pentium III 500 MHz running Windows 2000 SP4.




## Instructions


Clone the repository and run `npm install`.


Create a file called `.env` in the repository folder, and put your YouTube API key in it like this:


`YOUTUBE_API_KEY=<key>`


Or you can just replace `process.env.YOUTUBE_API_KEY` in server.js with a string containing your key.


IMPORTANT: Change the address in the iframe in views/video.ejs to contain your local server's IP address!


Run `node server.js` to start the server.