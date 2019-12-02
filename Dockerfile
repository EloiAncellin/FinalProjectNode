FROM node
WORKDIR /app
COPY ./package.json .
COPY ./package-lock.json .
RUN npm ci
COPY ./app.js .
COPY ./views .
CMD npm start
