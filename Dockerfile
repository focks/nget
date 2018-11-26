FROM node:8.12.0-alpine

RUN apk update && apk add ca-certificates && rm -rf /var/cache/apk/*

ADD . /app/nget
WORKDIR /app/nget

RUN npm install

RUN echo "NGET_PORT=8080" > .env
RUN echo "NGET_SECRET_PATH=/secret/apiKey.json" >> .env

EXPOSE 8080

CMD ["npm", "start"]
