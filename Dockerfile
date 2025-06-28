# Base Image
FROM node:18

#set working directory
WORKDIR /app

#Copy package file and install dependencies
COPY package*.json ./
RUN npm install

#copy rest of the app
COPY . . 

#expose port
EXPOSE 5000

#start the server
CMD [ "npm", "run", "dev" ]