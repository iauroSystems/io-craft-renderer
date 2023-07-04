FROM node:14.16.0-alpine3.13

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json .

COPY server.js .

RUN apk --no-cache add curl && apk --no-cache add vim &&  npm install pm2 -g && npm install --production

# Bundle app source


# COPY apps/pages-gessa/ pages-gessa/  
# COPY apps/view-page/ view-page/ 

EXPOSE 80

CMD ["pm2-docker", "server.js"]
