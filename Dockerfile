FROM node:18

# set working directory
WORKDIR /app
# install app dependencies
COPY package.json ./
COPY .npmrc ./

# RUN apt-get update && apt-get upgrade -y

RUN yarn

COPY . ./

RUN cp .env.dev .env

RUN npm run build

EXPOSE 3000

# start app
CMD ["npm", "start"]