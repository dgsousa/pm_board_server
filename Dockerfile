FROM node:8.16.0
RUN npm install -g yarn

WORKDIR /
COPY . .
RUN yarn
CMD [ "yarn", "start" ]