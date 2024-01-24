from flask_sqlalchemy import SQLAlchemy
import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

db = SQLAlchemy()
""" if environment == "production":
    from sqlalchemy import create_engine
    from sqlalchemy.schema import CreateSchema

    connectable = create_engine(os.getenv("DATABASE_URL"), future=True)

    # q = exists(select([(SCHEMA)])#.select_from("information_schema.schemata")
    # .where(f"schema_name = '{SCHEMA}'"))
    # if not connectable.dialect.has_schema(connectable, schema=SCHEMA):
    with connectable.connect() as connection:
        connection.execute(CreateSchema(SCHEMA, if_not_exists=True))
        connection.commit() """

# helper function for adding prefix to foreign key column references in production
def add_prefix_for_prod(attr):
    if environment == "production":
        return f"{SCHEMA}.{attr}"
    else:
        return attr