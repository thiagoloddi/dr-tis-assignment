FROM node:8.11.0

# Set env variables
ENV NODE_ENV="production"
ENV MONGO_URL="mongodb://mongo:27017/dr-tis"

# Change work dir
WORKDIR /app

# Copy application files
COPY . .

# Install Server Dependencies
RUN npm install --only=production

# Expose Port
EXPOSE 8080

# Start Server
CMD ["npm", "start"]