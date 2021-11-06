FROM node:16
WORKDIR /app
ENV NODE_ENV production
ENV PORT 3000
COPY package.json ./
COPY . ./
RUN npm install
EXPOSE 3000
CMD [ "node", "app.js" ]