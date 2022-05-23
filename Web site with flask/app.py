from flask import Flask, render_template, request, redirect, url_for, flash
from flask_mysqldb import MySQL

app = Flask(__name__)

# Mysql Local connection
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'contact_users'
mysql = MySQL(app)


# session
app.secret_key = 'mysecretkey'


@app.route('/')
def index():
    cursor = mysql.connection.cursor()
    cursor.execute('SELECT * FROM contacts')
    alldata = cursor.fetchall()
    print(alldata)
    return render_template('index.html', contact_data=alldata)


@app.route('/add_contact', methods=['POST'])
def add_contact():
    if request.method == 'POST':
        fullname = request.form['fullname']
        phone = request.form['phone']
        email = request.form['email']
        cursor = mysql.connection.cursor()
        cursor.execute(
            'INSERT INTO contacts (nombre,telefono,email) VALUES(%s,%s,%s)', (fullname, phone, email))
        mysql.connection.commit()
        flash('Contacto agregado satisfactoriamente')
    return redirect(url_for('index'))


@app.route('/edit')
def edit_cotact():
    return 'edit_contact'


@app.route('/delete/<string:id>')
def delete_contact(id):
    cursor = mysql.connection.cursor()
    cursor.execute(f'DELETE FROM contacts WHERE id = {id}')
    mysql.connection.commit()
    flash('Contacto removido satisfactotriamente')
    return redirect(url_for('index'))



if __name__ == "__main__":
    app.run(port=3000, debug=True)
