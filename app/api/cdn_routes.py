from flask import Blueprint, request
from flask_login import current_user, login_required
import boto3
from botocore.exceptions import ClientError
import os
import time

allowed = {'apng','png','jpg','jpeg','webp','gif'}
schema_name = os.environ.get("SCHEMA")

s3 = boto3.client(
  "s3",
  aws_access_key_id=os.environ.get("AWS_ACCESS_KEY_ID"),
  aws_secret_access_key=os.environ.get("AWS_SECRET_ACCESS_KEY")
)

cdn_routes = Blueprint('cdn', __name__)

@cdn_routes.route('/sign/<string:ext>')
@login_required
def get_signed_url(ext):
  if ext not in allowed:
    return {'errors': {'message': 'File extension not allowed'}}

  key = f'{schema_name}-{current_user.id}-{time.time_ns()}.{ext}'
  try:
    url = s3.generate_presigned_url(
      ClientMethod='put_object',
      ExpiresIn=120,
      Params={
        'Bucket': os.environ.get("AWS_S3_BUCKET"),
        'Key': key,
        'ContentType': 'image/'+ext.replace('jpg','jpeg')
      }
    )
  except ClientError as e:
    print(e)
    return {'errors': {'message': 'An error has occurred when getting the URL'}}
  return {
    'signedUrl': url,
    'fileUrl': f'https://{os.environ.get("AWS_S3_BUCKET")}.s3.{os.environ.get("AWS_S3_BUCKET_REGION")}.amazonaws.com/{key}'
  }