from flask import Blueprint, request
from app.models import db
from app.forms import ImageForm
from flask_login import current_user, login_required
from app.api.aws import (
    upload_file_to_s3, get_unique_filename)

image_routes = Blueprint("images", __name__)


@image_routes.route("/new", methods=['POST'])
@login_required
def upload_image():
    print("IN THE BACK END ***********")
    form = ImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        image = form.data["file"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        print(upload)

        if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message (and we printed it above)
          return {"errors": upload}

        url = upload["url"]
        print("URL: ", url)
        # new_image = Post(image= url)
        # db.session.add(new_image)
        # db.session.commit()
        return {"image": url}
    else:
      return form.errors, 401
