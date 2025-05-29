FROM node:20-alpine

WORKDIR /app

ADD package*.json ./
RUN npm ci

ADD . .
RUN npm run build

ENV PORT 8081
ENV NODE_ENV production

EXPOSE 8081

CMD ["npm", "run", "start"]
