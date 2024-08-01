# Stage 1: Build the Node.js application
FROM node:14-alpine AS build

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install nodemon globally
RUN npm install -g nodemon

# Copy the rest of the application code
COPY . .

# Stage 2: Set up Nginx with the Node.js application
FROM nginx:alpine

# Copy the built application from the previous stage
COPY --from=build /usr/src/app /usr/src/app

# Remove the default Nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom Nginx configuration file
COPY .docker/nginx.conf /etc/nginx/conf.d

# Expose the port Nginx runs on
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
