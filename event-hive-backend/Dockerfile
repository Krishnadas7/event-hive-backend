FROM node:18-alpine

# Create and change to the app directory.
WORKDIR /app

# Install app dependencies using the npm CLI.
COPY package*.json ./

RUN npm install

# Copy the local code to the container
COPY . .

EXPOSE 3003

# Start the application
CMD [ "npm", "run", "dev"]