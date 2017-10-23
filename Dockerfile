FROM node:8

LABEL maintainer="nbalduzzi@zemsania.com"

ENV DOCKERIZE_VERSION v0.5.0

RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

WORKDIR ia-dev-zemtime-back

ADD ./package.json package.json

RUN npm -p install

ADD ./src src

EXPOSE 3000

CMD ["npm", "start:dev"]