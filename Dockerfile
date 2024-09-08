# Use the official Node.js image
FROM node:16

# Set the working directory to /usr/src/app inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies (including ts-node and typescript)
RUN npm install

# Copy the rest of the application code (including src folder)
COPY . .

# Expose port 3000 (or the port your app runs on)
EXPOSE 3000

# Command to run your app using npx ts-node, pointing to the src directory
CMD ["npx", "ts-node", "src/index.ts"]