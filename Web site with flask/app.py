from flask import Flask, render_template, request, redirect ,url_for
from flask_mysqldb import MySQL

app = Flask(__name__)
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'contact_users'
mysql = MySQL(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/add_contact', methods=['POST'])
def add_contact():
    if request.method == 'POST':
        fullname = request.form['fullname']
        phone = request.form['phone']
        email = request.form['email']
        cursor = mysql.connection.cursor()
        cursor.execute('INSERT INTO contacts (nombre,telefono,email) VALUES(%s,%s,%s)',(fullname, phone, email))
        mysql.connection.commit()
    return redirect(url_for('index'))


@app.route('/edit')
def edit_cotact():
    return 'edit_contact'

@app.route('/delete_contact')
def delete_contact():
    return 'Delete_contact'


if __name__ == "__main__":
    app.run(port = 3000, debug = True)


