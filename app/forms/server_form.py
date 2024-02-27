from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed
from wtforms import StringField, URLField, BooleanField
from wtforms.validators import DataRequired, Length
from app.api.aws import ALLOWED_EXTENSIONS

class ServerForm(FlaskForm):
    displayname = StringField('Server Name', validators=[DataRequired(), Length(max=128, message="Length of server name must be less than 128 characters")])
    # icon = URLField("icon", validators=[Length(max=256, message="Length of URL must be less than 256 characters")])
    icon = FileField("Icon Image File", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    desc = StringField('description', validators=[Length(max=512, message="Length of description must be less than 512 characters")])
    # banner = URLField('banner', validators=[Length(max=256, message="Length of URL must be less than 256 characters")])
    banner = FileField("Banner Image File", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    public = BooleanField('public')
