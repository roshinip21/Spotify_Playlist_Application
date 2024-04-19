from flask import *
from flask_login import login_required, current_user
from flask_mail import Message
from PIL import Image
from . import db
from . import avatars
from . import __init__
from .models import User  # importing User class from models.py
from . import db,mail  # importing db object from __init__.py
from datetime import datetime
#from werkzeug import secure_filename
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash, check_password_hash
main = Blueprint('main', __name__)

@main.route('/') #the route function tells the application which url should call associated function
def index():
    return render_template('index.html')

@main.route('/signup')
@login_required
def signup():
    return render_template('signup.html')

@main.route('/login')
def login():
    return render_template('login1.html')

@main.route('/search')
def search():
    return render_template('search.html')

@main.route('/foryourlisting')
def foryourlisting():
    return render_template('foryourlisting.html')

@main.route('/chart')
def chart():
    return render_template('chart.html')

@main.route('/artist')
def artist():
    return render_template('artist.html')


@main.route('/profile')
@login_required
def profile():
    #image_file=url_for('static',filename='profile_pics/'+current_user.image_file)     # ,image_file=image_file
    return render_template('profile.html', name=current_user.name, email=current_user.email, gender=current_user.gender, dob=current_user.dob,image_file=current_user.profilepic)


@main.route('/update')
@login_required
def update():                                                                     #, image_file = current_user.image_file)
	return render_template('update.html', name=current_user.name, email=current_user.email, gender=current_user.gender, dob=current_user.dob)

''' @main.route('/avatars/<path:filename>')
def get_avatar(filename):
    return send_from_directory(app.config['AVATARS_SAVE_PATH'], filename) '''


@main.route('/edit', methods=["POST"])
@login_required
def edit():
    #handle form data
    name=request.form['name']
    email = request.form['email']
    dob = request.form['dob']
    y,m,d=dob.split('-')
    dob = datetime(int(y), int(m), int(d))
    gender = request.form['gender']
    f = request.files.get('file')
    #raw_filename = avatars.save_avatar(f)
    if not f:
        raw_filename = current_user.profilepic
    else:
        image = Image.open(f)
        image.thumbnail((150, 150))  # resizing
        raw_filename = avatars.save_avatar(image)

    #Update query and Commit to Database
    edit_user = User.query.filter_by(id=current_user.id).first_or_404()
    edit_user.email=email
    edit_user.name=name
    edit_user.dob = dob
    edit_user.gender = gender
    edit_user.profilepic = raw_filename
    db.session.commit()

    #flashing and redirecting
    flash("Details updated successfully")
    image_file = url_for('static', filename='avatars/' + current_user.profilepic)
    return redirect(url_for('main.profile',image_file=image_file))

@main.route('/reset')
@login_required
def reset():
    return render_template('resetpassword.html', name=current_user.name, email=current_user.email, password=current_user.password)


@main.route('/resetpassword',methods=["POST"])
@login_required
def resetpassword():
    curpass=request.form['curpass']
    newpass = request.form['newpass']
    edit_pass = User.query.filter_by(email=current_user.email).first_or_404()
    if not check_password_hash(current_user.password,curpass):
        flash("Please check your current password")

    edit_pass.password =generate_password_hash(newpass, method='sha256')
    db.session.commit()
    flash("Password updated successfully")
    return render_template('resetpassword.html', name=current_user.name)

@main.route('/base')
def base():
	return render_template('base.html')

@main.route('/playlist')
def playlist():
	return render_template('playlist.html')

def send_email(user):
    token = user.get_reset_token()
    msg = Message('Password Reset Request',sender='bethelmv2@gmail.com',recipients=[user.email])
    msg.body = f'''To reset your password, visit the following link:
{url_for('main.reset_token',token=token,_external=True)}
If you did not make this request, ignore this E-mail.
'''
    mail.send(msg)

@main.route('/forgotpassword',methods=['GET','POST'])
def reset_request():
    if current_user.is_authenticated:
        return redirect(url_for('main.profile'))
    if request.method=="POST":
        email = request.form['email']
        user = User.query.filter_by(email=email).first()
        if not user:
            flash("That email address does not exist. You must register first")
            return redirect(url_for('auth.login'))
        send_email(user)
        flash('An email has been sent with instructions to reset your password')
        return redirect(url_for('auth.login'))
    return render_template('forgotpassword.html')

@main.route('/forgotpassword/<token>',methods=['GET','POST'])
def reset_token(token):
    if current_user.is_authenticated:
        return redirect(url_for('main.profile'))
    user = User.verify_reset_token(token)
    if not User:
        flash("Invalid/Expired link")
        return redirect(url_for('reset_request'))
    if request.method=="POST":
        password = request.form['newpass']
        hashed_password = generate_password_hash(password,method='sha256')
        user.password = hashed_password
        db.session.commit()
        flash("Your password has been updated")
        return redirect(url_for('auth.login'))
    return render_template('updatepassword.html')


#onClick = "window.location.href='{{ url_for('main.profile') }}' ;"

#@main.route('/upload')
#def upload_file():
 #  return render_template('base.html')
