import sqlite3
from flask import Flask, request, session, g, redirect, url_for, \
	abort, render_template, flash

#confiuration
DATABASE = 'flaskbase.db'
DEBUG = True
SECRET_KEY = 'development key'
USERNAME = 'admin'
PASSWORD = 'default'


# This is the creation of the application
flapp = Flask(__name__)
flapp.config.from_object(__name__)

def connectToFlaskbase():
	return sqlite3.connect(app.config['DATABASE'])

if __name__ == '__main__':
	flapp.run()

@flapp.before_request
def before_request():
	g.db = connectToFlaskbase()

@flapp.teardown_request
def teardown_request(exception):
	db = getattr(g,'db',None)
	if db is not None:
		db.close()

@flapp.route('/')
def showEntries():
	cursor = g.db.execute(
		'select titile, text from entries order by id desc')
	entries =[dict(title = row[0], text = row[1]) for row in cur.fetchall()]
	return render_template('list_entries.html', entries = entries)


@flapp.route('/add', methods = ['POST'])
def createNewEntry():
	if not session.get('logged_in'):
		abort(401)
	g.db.execute('insert into entries (title, text) values (?,?)',
	 [request.form['title'],request.form['text']])

	return redirect(url_for('showEntries'))