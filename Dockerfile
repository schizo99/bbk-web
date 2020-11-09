FROM node:lts-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
ENV PATH /usr/src/app/node_modules/.bin:${PATH}
RUN npm install && npm run build
EXPOSE 8000
CMD ["npm", "run", "start"]
