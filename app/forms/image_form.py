from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed
from app.api.aws import ALLOWED_EXTENSIONS

class ImageForm(FlaskForm):
    image = FileField("Image File", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
