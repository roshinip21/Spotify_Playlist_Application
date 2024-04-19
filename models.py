from flask_login import UserMixin
from . import db
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer

class User(UserMixin,db.Model):
    id = db.Column(db.Integer, primary_key=True) # primary keys are required by SQLAlchemy
    email = db.Column(db.String(1000))
    password = db.Column(db.String(100))
    name = db.Column(db.String(100))
    dob = db.Column(db.Date())
    gender = db.Column(db.String(10))
    profilepic = db.Column(db.String(100))

    def get_reset_token(self,expires_sec=1800):
        s=Serializer('SJWIWHFIAS',expires_sec)
        return s.dumps({'user_id': self.id}).decode('utf-8')

    @staticmethod
    def verify_reset_token(token):
        s=Serializer('SJWIWHFIAS')
        try:
            user_id = s.loads(token)['user_id']
        except:
            return None
        return User.query.get(user_id)
