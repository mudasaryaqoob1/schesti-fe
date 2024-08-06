FROM node:18

# Set the working directory
WORKDIR /app

# Copy package files
COPY package.json ./
COPY .npmrc ./

# Install dependencies
RUN yarn

# Copy the rest of the application code
COPY . ./

# Copy environment configuration
RUN cp .env.dev .env

# Build the application (if necessary)
# RUN yarn build

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]


