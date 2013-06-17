# Invoise

Invoice generator hobby project.

#Production Machine

Connect: `ssh ubuntu@invoise.com`

#Domain Name


## Server 

invoise.com registered on namecheap.com

Ubuntu 12.04 LTS seems to be a good choice.

## Dependencies

### wkhtmltopdf

Uses x system and handles fonts better then phantom.

### phantomjs-node (deprecated)
https://github.com/sgentle/phantomjs-node

Phantom needs to be installed on machine
`sudo apt-get install phantomjs`

You may get errors though, like "cannot connect to X server"
`https://github.com/yeoman/yeoman/issues/446`

Solution: Download the latest binary from here:
http://phantomjs.org/download.html
And replacing: /usr/bin/phantomjs

To get where it's installed, you can have look at: `dpkg -L phantomjs`

## Fonts on Ubuntu

Ubuntu doesn't come with many fonts, have a look with `fc -list?

To install basic fonts there is a Microsoft font package.

To install:
1. first you need to enable `multiverse` repo in Ubuntu. sudo vim /etc/apt/sources.list
2. sudo apt-get update
3. sudo apt-get install ttf-mscorefonts-installer
4. Liberation Sans is pretty good option and renders decently on Linux.
http://graphicdesign.stackexchange.com/questions/8827/helvetica-neue-equivalent-on-google-web-fonts

# Raw install log
Amazon EC2  
Ubuntu 12.04 LTS 64-bit

```

sudo vim /etc/apt/sources.list
sudo apt-get update
sudo apt-get install phantomjs (needed?)
sudo apt-get install git

Install node (requires extra repo to be added)
https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager#ubuntu-mint

Copy GitHub keys from local:
scp ~/.ssh/amazon ubuntu@ec2-54-229-57-147.eu-west-1.compute.amazonaws.com:~/.ssh/id_rsa
scp ~/.ssh/amazon.pub ubuntu@ec2-54-229-57-147.eu-west-1.compute.amazonaws.com:~/.ssh/id_rsa.pub

mkdir projects
cd projects
git clone git@github.com:antonholmquist/invoise-web
cd invoise-web/

npm install
// On dependency error, remove the node modules directory and try again

// Install x server 
sudo apt-get install xvfb
sudo apt-get install wkhtmltopdf

// Use latest phantomjs
scp /Users/antonholmquist/Downloads/phantomjs-1.9.1-linux-x86_64\ 2/bin/phantomjs ubuntu@ec2-54-229-57-147.eu-west-1.compute.amazonaws.com:~/

sudo mv ~/phantomjs /usr/bin/phantomjs

// Microsoft core fonts
sudo apt-get install ttf-mscorefonts-installer
```


# Run

The project lies in ~/projects/invoise-web.
The latest version can be fetched from GitHub with `git pull`

Nohup is used to run it.

If you have another version running, you must start by killing it.  

To kill it: `ps aux`, find nohup/node process id and `kill <id>`.  


On a development machine, just type:

`node app.js`

On a production machine port 80 needs to be specified and sudo may be required to bind to this port.

`sudo PORT=80 node app.js`

Nohup is used to get it running after logging out from shell. 

`sudo PORT=80 nohup node app.js &`





