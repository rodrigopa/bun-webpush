FROM golang:1.23.0

WORKDIR /app

RUN apt update -y && apt upgrade -y && apt install -y unzip

RUN mkdir -p /var/db/GeoIP/

RUN wget -O /var/db/GeoIP/GeoLite2-ASN.mmdb https://git.io/GeoLite2-ASN.mmdb
RUN wget -O /var/db/GeoIP/GeoLite2-City.mmdb https://git.io/GeoLite2-City.mmdb
RUN wget -O /var/db/GeoIP/GeoLite2-Country.mmdb https://git.io/GeoLite2-Country.mmdb

RUN wget https://github.com/fcambus/telize/archive/refs/heads/master.zip

RUN unzip master.zip

WORKDIR /app/telize-master

RUN go build
RUN go install telize

ENTRYPOINT ["telize", "-host", "0.0.0.0"]