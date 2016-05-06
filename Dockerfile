FROM node:6.0.0
MAINTAINER Justin Marney <gotascii@gmail.com>

RUN apt-get update

RUN mkdir -p /opt/gear_list_web_client
WORKDIR /opt/gear_list_web_client

RUN useradd -ms /bin/bash gotascii
RUN chown gotascii:gotascii /opt/gear_list_web_client

# Copy app such that container runs w/o mounted volume.
# When mounting local volume, dir is shadowed.
COPY . ./
RUN chown gotascii:gotascii \.* *

USER gotascii

RUN npm install

CMD ["npm", "run", "lite"]
