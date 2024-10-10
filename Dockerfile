# Use a specific Node.js version as the base image
FROM mortezahatamikia/base-node

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock (if you are using Yarn)
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Expose the port that Vite uses
EXPOSE 3001

# Start the application
CMD ["npm", "run", "dev"]
