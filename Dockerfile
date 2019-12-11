FROM node
WORKDIR /code
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY src src
COPY run.sh .
COPY .env .
COPY tsconfig.json .
VOLUME ["/code/src"]
CMD sh run.sh
