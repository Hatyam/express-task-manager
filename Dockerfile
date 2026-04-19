FROM node:20

WORKDIR /app

# зависимости
COPY package*.json ./
RUN npm install

# код
COPY . .

# билд TypeScript
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]