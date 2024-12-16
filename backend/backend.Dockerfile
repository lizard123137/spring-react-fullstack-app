FROM drogonframework/drogon

WORKDIR /usr/src/backend

COPY . .

RUN mkdir -p build && cd build && rm -rf * && cmake .. && make

EXPOSE 8080

CMD ["./build/backend"]