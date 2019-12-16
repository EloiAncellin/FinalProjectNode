FROM node
WORKDIR /code
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY src src
COPY test test
COPY bin bin
COPY run.sh .
COPY .env .
VOLUME ["/code/src", "/code/test", "/code/bin"]
CMD sh run.sh
