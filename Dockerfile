# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

ENV REACT_APP_API_URL=https://capstone-project.up.railway.app

COPY . .
RUN npm run build

# Stage 2: Serve
FROM node:22-alpine

WORKDIR /usr/src/app

RUN npm install -g serve
COPY --from=builder /usr/src/app/build ./build

EXPOSE 4000
CMD ["serve", "-n", "-s", "build", "-l", "4000"]