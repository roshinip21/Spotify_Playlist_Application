from flask import *
from PIL import Image
from . import avatars
from flask_mail import Mail, Message
from . import __init__
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user,logout_user, login_required
from .models import User #importing User class from models.py
from . import db #importing db object from __init__.py
from datetime import datetime
import secrets #for generating random otp #contains password of the email

app = Flask(__name__)
auth = Blueprint('auth', __name__)
def generateOTP(): #function to generate an OTP (6 digit number)
    num = str(secrets.randbelow(999999))
    return num

@auth.route('/login') #for loading the login page for first time
def login():
    return render_template('login1.html')

@auth.route('/login', methods=['POST'])
def login_post():
    #To handle form data
    email = request.form['email']
    password = request.form['password']
    #remember = True if request.form.get('remember-me') else False
    user = User.query.filter_by(email=email).first()

    # To check if the user actually exists
    # take the user-supplied password, hash it, and compare it to the hashed password in the database
    if not user or not check_password_hash(user.password, password):
        flash('Please check your login details and try again.')
        return redirect(url_for('auth.login')) # Reload page if invalid credentials/user doesn't exist

    # if the above check passes, then we know the user has the right credentials
    login_user(user)
    return redirect(url_for('main.profile'))

@auth.route('/signup')
def signup():
    return render_template('signup.html')

@auth.route('/signup', methods=["POST"])
def signup_post():
    #handling form data
    email = request.form['email']
    password = request.form['password']
    name = request.form['Name']
    dob = request.form['dob']
    #converting date into datetime
    y,m,d = dob.split('-')
    dob = datetime(int(y), int(m), int(d))
    gender =  request.form['gender']
    f = request.files.get('file')

    if not f:
    #resizing
        raw_filename = ""
    else:
        image = Image.open(f)
        image.thumbnail((150, 150))
        raw_filename = avatars.save_avatar(image)

    session['email']=request.form['email']
    user = User.query.filter_by(email=email).first() # if this returns a user, then the email already exists in database
    if user: # if a user is found, we want to redirect back to signup page so user can try again with another email
        flash('Email address already exists')
        return redirect(url_for('auth.signup'))
    new_user=User(email=email,password=generate_password_hash(password,method='sha256'),name=name,dob=dob,gender=gender,profilepic=raw_filename)
    db.session.add(new_user)
    db.session.commit()
    flash('Your account has been created successfully. You can now login')
    return render_template('login1.html')

@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('main.index'))
