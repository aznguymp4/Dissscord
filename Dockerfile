FROM python:3.9.18-alpine3.18

RUN apk add build-base

RUN apk add postgresql-dev gcc python3-dev musl-dev

ARG FLASK_APP
ARG FLASK_ENV
ARG DATABASE_URL
ARG SCHEMA
ARG SECRET_KEY

WORKDIR /var/www

COPY requirements.txt .

RUN pip install pipenv
RUN pipenv install -r requirements.txt
RUN pipenv install psycopg2
# RUN pipenv shell

COPY . .

RUN pipenv run flask run db init
RUN pipenv run flask run db migrate
RUN pipenv run flask run db upgrade
RUN pipenv run flask run seed all
# CMD gunicorn app:app
CMD gunicorn --worker-class eventlet -w 1 app:app