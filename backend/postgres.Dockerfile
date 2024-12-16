FROM postgres:11.5-alpine
COPY init_database.sql /docker-entrypoint-initdb.d/
