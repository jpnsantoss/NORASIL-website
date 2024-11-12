# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Copy the prisma directory
COPY prisma ./prisma

# Copy the rest of the application code
COPY . .

# Install dependencies
RUN npm install

# Generate Prisma client
RUN npx prisma generate

# Build the Next.js app
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "start"]