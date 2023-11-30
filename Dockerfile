# First stage: Builder
FROM node:20.9.0 as builder

LABEL authors="DefPavel"

RUN npm i -g bun

WORKDIR /server-bun
# Copy both package.json and package-lock.json
COPY package*.json ./
# Install dependencies
RUN npm ci
# Copy the rest of the application files
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
