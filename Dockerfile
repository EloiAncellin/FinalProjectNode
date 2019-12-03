FROM node
WORKDIR /code
COPY ./package.json .
COPY ./package-lock.json .
RUN npm ci
COPY ./.env .
COPY ./src .
CMD npm start
