FROM node:22-alpine

# Set working directory inside container
WORKDIR /app

# Copy dependency files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all backend source code
COPY . .

# Build NestJS app
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Run the app
CMD ["npm", "run", "start:prod"]
