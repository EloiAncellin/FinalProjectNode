FROM node
WORKDIR /code
COPY ./package.json .
COPY ./package-lock.json .
RUN npm ci
COPY ./.env .
COPY ./app.js .
COPY ./views .
CMD npm start
