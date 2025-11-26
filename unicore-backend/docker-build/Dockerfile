FROM golang:1.21-alpine AS build

RUN apk add --no-cache tzdata

WORKDIR "/app"

COPY . .

RUN go env -w GO111MODULE=on \
    && go env -w GOOS=linux \
    && go env -w GOARCH=amd64
RUN go mod tidy
RUN go build -o unicore

FROM scratch
WORKDIR /app
COPY --from=build /app/unicore .
COPY --from=build /usr/share/zoneinfo /usr/share/zoneinfo
COPY --from=build /app/ca-certificates.crt /etc/ssl/certs/ca-certificates.crt
ENV SSL_CERT_FILE=/etc/ssl/certs/ca-certificates.crt
EXPOSE 8080
ENTRYPOINT ["/app/unicore"]


#FROM jrottenberg/ffmpeg:5-alpine
#
#RUN mkdir "/app"
#COPY --from=build /go/src/unicore /app/unicore
#
#RUN chmod +x /app/unicore
#
#EXPOSE 18005
#ENTRYPOINT ["/app/unicore"]