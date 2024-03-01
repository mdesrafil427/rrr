from flask import flask,render_  template
from treading import Thread

app = Flask (__name__)

@app.route('/')
def index():
  return "Alive"

def run():
  aap.run(host='0.0.0.0',port=8080)

def keep_alive():
  t = Thread(target=run)
  t.start()
  