# Invoise

Invoice generator hobby project.

#Production Machine

Connect: `ssh ubuntu@invoise.com`

#Domain Name

invoise.com registered on namecheap.com

# Run

On a development machine, just type:

`node app.js`

On a production machine port 80 needs to be specified and sudo may be required to bind to this port.

Nohup is used to get it running after logging out from shell. 

`sudo PORT=80 nohup node app.js &`

To kill it: `ps aux`, find process id and `kill <id>`.  


## Dependencies

### phantomjs-node
https://github.com/sgentle/phantomjs-node
