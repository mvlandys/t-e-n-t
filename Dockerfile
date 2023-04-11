# Node JS v19
FROM node:19-alpine3.16

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Install Required Packages
RUN apk update
RUN apk add -U tzdata yarn

# Set timezone to Sydney Australia
ENV TZ=Australia/Sydney
RUN ln -sf /usr/share/zoneinfo/Australia/Sydney /etc/localtime

# Install dependancies
RUN yarn install

CMD yarn start