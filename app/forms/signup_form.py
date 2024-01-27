from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, Regexp
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    # https://regex101.com/r/pROaST/1
    username = StringField('username', validators=[DataRequired(), Regexp(r"^[\w\-\.]{1,}$", message="Username contains invalid characters"), username_exists])
    # https://regex101.com/r/9tfqYn/1
    email = StringField('email', validators=[DataRequired(), Regexp(r"[\w|\.|-]{1,}@\w{1,}\.\w{2,}(\.\w{2,})?", message="Not a valid email."), user_exists])
    password = StringField('password', validators=[DataRequired()])
