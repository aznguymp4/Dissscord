from flask_wtf import FlaskForm
from wtforms import StringField, URLField, BooleanField
from wtforms.validators import DataRequired, Length

class ServerForm(FlaskForm):
    displayname = StringField('Server Name', validators=[DataRequired(), Length(max=128, message="Length of server name must be less than 128 characters")])
    icon = URLField("icon", validators=[Length(max=256, message="Length of URL must be less than 256 characters")])
    desc = StringField('description', validators=[Length(max=512, message="Length of description must be less than 512 characters")])
    banner = URLField('banner', validators=[Length(max=256, message="Length of URL must be less than 256 characters")])
    public = BooleanField('public')
