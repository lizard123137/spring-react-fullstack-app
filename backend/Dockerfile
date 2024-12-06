FROM drogonframework/drogon

WORKDIR /usr/src/backend

COPY . .

RUN mkdir -p build && cd build && cmake .. && make

EXPOSE 8080

CMD ["./build/backend"]