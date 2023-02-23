FROM golang:alpine as original

WORKDIR /original

COPY . .

RUN go build index.go


FROM scratch

WORKDIR /app

COPY --from=original /original/index .

CMD [ "./index" ]
