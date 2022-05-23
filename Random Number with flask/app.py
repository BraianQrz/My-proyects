from flask import Flask, render_template, url_for


app = Flask(__name__) 

app.secret_key = 'mysecretkey'

@app.route('/')
def index():
    return render_template(url_for('index.html'))


if __name__ == "__main__":
    app.run(3000 , debug=True)