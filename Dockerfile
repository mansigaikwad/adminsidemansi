# Use a lightweight Node.js image
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm --force install

# Copy the rest of the app and build it
COPY . .
RUN npm run build

# Use Nginx to serve the build files
FROM nginx:stable-bookworm
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port used by Nginx
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
