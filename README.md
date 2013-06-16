# Invoise

Invoice generator hobby project.

#Production Machine

Connect: `ssh ubuntu@invoise.com`

#Domain Name

invoise.com registered on namecheap.com

## Dependencies

### phantomjs-node
https://github.com/sgentle/phantomjs-node

Phantom needs to be installed on machine
`sudo apt-get install phantomjs`

You may get errors though, like "cannot connect to X server"
`https://github.com/yeoman/yeoman/issues/446`

Solution: Download the latest binary from here:
http://phantomjs.org/download.html
And replacing: /usr/bin/phantomjs

/08

# Run

The project lies in ~/projects/invoise-web.
The latest version can be fetched from GitHub with `git pull`

Nohup is used to run it.

If you have another version running, you must start by killing it.  

To kill it: `ps aux`, find nohup/node process id and `kill <id>`.  


On a development machine, just type:

`node app.js`

On a production machine port 80 needs to be specified and sudo may be required to bind to this port.

Nohup is used to get it running after logging out from shell. 

`sudo PORT=80 nohup node app.js &`





