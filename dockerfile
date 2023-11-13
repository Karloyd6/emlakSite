FROM node:18-slim
WORKDIR /opt/k-server
COPY . .
ENV APP_PORT=3000
ENV DB_HOST=mongodb
ENV DB_PORT=27017
EXPOSE 3000
RUN npm install
CMD [ "npm", "start" ]