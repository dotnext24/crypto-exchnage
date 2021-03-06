# pull official base image
FROM node:13.12.0-alpine
RUN apk add --update \
  python \
  python-dev \
  py-pip \
  build-base \
  git \
  openssh-client \
&& pip install virtualenv \
&& rm -rf /var/cache/apk/*
# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# add app
COPY . ./

RUN cd client && npm install && npm run build
RUN cd ..
ENV PORT 5000
EXPOSE 5000
# start app
CMD ["npm","run", "start"]