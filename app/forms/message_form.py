from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length

class MessageForm(FlaskForm):
    author_id = IntegerField('author id')
    channel_id = IntegerField('integer id')
    content = StringField('message body', validators=[DataRequired(), Length(max=2000, message="Message must be less than 2000 characters")])
