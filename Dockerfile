FROM node
WORKDIR /code
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY src src
COPY test test
COPY run.sh .
COPY .env .
VOLUME ["/code/src", "/code/test"]
CMD sh run.sh
