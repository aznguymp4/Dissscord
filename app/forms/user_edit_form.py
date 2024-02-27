from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed
from flask_login import current_user
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User
from app.api.aws import ALLOWED_EXTENSIONS

def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    found_user = User.query.filter(User.username == username).first()
    print('=====================================================================', current_user.username)
    if found_user and not found_user.username == current_user.username:
        print('=====================================================================', found_user.username)
        raise ValidationError('Username is already in use.')

def user_exists(form, field):
    # Checking if user exists
    email = field.data
    found_user = User.query.filter(User.email == email).first()
    print('=====================================================================', current_user.email)
    if found_user and not found_user.email == current_user.email:
        print('=====================================================================', found_user.email)
        raise ValidationError('Email address is already in use.')


class UserEditForm(FlaskForm):
    displayname = StringField('displayname', validators=[Length(max=128, message="Display Name too long")])
    username = StringField('username', validators=[username_exists, Length(max=40, message="Username too long")])
    email = StringField('email', validators=[user_exists])
    bio = StringField('bio', validators=[Length(max=256, message="Bio too long")])
    # icon = StringField('icon')
    icon = FileField("User Image File", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
