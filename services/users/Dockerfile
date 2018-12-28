FROM node:latest

# set working directory
WORKDIR /usr/src

# add `/usr/src/node_modules/.bin` to $PATH
# ENV PATH /usr/src/node_modules/.bin:$PATH

# # install and cache app dependencies
# ADD package.json /usr/src/package.json
#COPY package*.json ./

COPY . ./

#RUN npm install

# start app
CMD ["npm", "run", "dev"]