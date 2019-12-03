FROM node
WORKDIR /code
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY .env .
COPY src src
VOLUME ["/code/src"]
CMD npm start
