FROM node
RUN mkdir /app
RUN mkdir /app/views
WORKDIR /app
ADD ./package.json .
ADD ./package-lock.json .
ADD ./app.js .
ADD ./views/index.ejs ./views
RUN npm install
CMD node /app/app.js
