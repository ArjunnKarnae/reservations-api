FROM  node:18.14.0-alpine3.17
WORKDIR  app
COPY  package*.json /app
RUN   npm install
COPY  . .
CMD  ["npm", "start"]
EXPOSE 5001:5001

