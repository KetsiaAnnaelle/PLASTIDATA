import pymysql

pymysql.install_as_MySQLdb()

# Monkeypatch Django's database version check to bypass legacy database check on MariaDB 10.4
from django.db.backends.base.base import BaseDatabaseWrapper
BaseDatabaseWrapper.check_database_version_supported = lambda self: None

# Monkeypatch Django's MySQL features to disable RETURNING support for MariaDB < 10.5 compatibility
from django.db.backends.mysql.features import DatabaseFeatures
DatabaseFeatures.can_return_columns_from_insert = False


