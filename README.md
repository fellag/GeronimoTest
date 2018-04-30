
    

## install node js  + npm ##
sudo apt-get update
sudo apt-get install nodejs npm
sudo ln -s /usr/bin/nodejs /usr/local/bin/node
sudo ln -s /usr/bin/npm /usr/local/bin/npm
sudo apt install nodejs-legacy

##install grunt cli ##

sudo npm install -g grunt-cli

##install ruby + compass##

sudo apt get install ruby-full ruby-sass
sudo gem update --system
sudo gem install sass 
sudo gem install compass 

## Deploiment task ##

grunt production 

dossier publique : /GeronimoTest/pub/index.php

 j'ai mis un dossier assets-exemple  compiler si vous ne voulez pas passer par grunt il suffit de renomer le dossier assets-exemple en assets .

 

  
