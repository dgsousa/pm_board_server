FROM node:8.16.0
RUN npm install -g yarn

WORKDIR /src/
COPY . .
RUN yarn
CMD [ "yarn", "start" ]