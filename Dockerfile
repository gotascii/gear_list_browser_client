FROM node:6.0.0
MAINTAINER Justin Marney <gotascii@gmail.com>

EXPOSE 3000 3001

RUN apt-get update

RUN useradd -ms /bin/bash gotascii

RUN mkdir -p /opt/gear_list_web_client
RUN chown gotascii:gotascii /opt/gear_list_web_client
WORKDIR /opt/gear_list_web_client

# Copy app such that container runs w/o mounted volume.
# When mounting local volume, dir is shadowed.
COPY . ./
RUN chown -R gotascii:gotascii \.* *

# Copying everything, followed by package.json, prevents having to copy the
# entire app everytime a new dependency is added.
COPY package.json ./
RUN chown gotascii:gotascii package.json

USER gotascii

RUN npm install

CMD ["npm", "run", "lite"]
