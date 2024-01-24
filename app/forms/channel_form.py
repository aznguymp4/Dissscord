from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length

class ChannelForm(FlaskForm):
    displayname: StringField('display name', validators=[DataRequired(), Length(max=40, message='Length of channel name must be less than 40 characters')])
