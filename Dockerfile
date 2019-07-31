FROM node:12.4.0
WORKDIR /home/rest-api/
COPY package*.json ./
RUN npm ci
COPY ./ ./
ENV NODE_ENV=production
ARG REST_API_HOST 
ARG REST_API_PORT
RUN npm run build
CMD ["npm", "run", "start"]
