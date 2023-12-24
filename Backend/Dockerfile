FROM python:3.9.3-slim
COPY requirements.txt /
RUN pip3 install --upgrade pip
RUN pip3 install -r /requirements.txt 
COPY . /app
WORKDIR /app
EXPOSE 8080
RUN python3 -m spacy download en_core_web_sm
CMD ["gunicorn","--config", "gunicorn_config.py", "server:app"]