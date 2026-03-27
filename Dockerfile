FROM node:25-alpine AS build

WORKDIR /usr/src/app
COPY package*.json ./
RUN ["npm", "clean-install"]
COPY . .
RUN npm run build

FROM node:24-alpine AS run
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/package*.json .
COPY --from=build /usr/src/app/build build
RUN ["npm", "clean-install", "--omit", "dev"]
ENTRYPOINT ["node", "build"]