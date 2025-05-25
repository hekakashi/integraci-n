from flask import Flask
from api.routes.routes import register_routes
from api.db.database import init_db
from dotenv import load_dotenv
import os
import logging
from logging.handlers import RotatingFileHandler
from werkzeug.middleware.proxy_fix import ProxyFix

# Cargar variables de entorno desde .env
load_dotenv()

def create_app():
    app = Flask(__name__)
    
    # Configuración de seguridad para proxies (si la app está detrás de Nginx/Apache)
    app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1, x_host=1)
    
    # Configuración básica de la aplicación
    app.config.update(
        # Configuración MySQL (valores sensibles solo desde variables de entorno)
        MYSQL_HOST='localhost',
        MYSQL_USER='root',
        MYSQL_PASSWORD='Alcl1203.',
        MYSQL_DB='ferramas',
        
        # Configuración Webpay (Transbank)
        WEBPAY_COMMERCE_CODE=os.getenv('WEBPAY_COMMERCE_CODE', '597055555532'),
        WEBPAY_API_KEY=os.getenv('WEBPAY_API_KEY', '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C'),
        WEBPAY_ENVIRONMENT=os.getenv('WEBPAY_ENVIRONMENT', 'test').lower(),
        WEBPAY_RETURN_URL=os.getenv('WEBPAY_RETURN_URL', 'http://localhost:5000/webpay/confirm'),
        
        # Configuración de seguridad
        SECRET_KEY=os.getenv('SECRET_KEY', os.urandom(24).hex()),
        SESSION_COOKIE_SECURE=(os.getenv('ENVIRONMENT') == 'production'),
        SESSION_COOKIE_HTTPONLY=True,
        
        # Configuración adicional
        ENVIRONMENT=os.getenv('ENVIRONMENT', 'development')
    )

    validate_required_config(app)
    configure_logging(app)

    # Inicializar MySQL (debe retornar la conexión)
    mysql = init_db(app)
    
    # Registrar rutas pasando la conexión mysql
    register_routes(app, mysql)
    
    return app

def validate_required_config(app):
    required = ['MYSQL_HOST', 'MYSQL_USER', 'MYSQL_PASSWORD', 'MYSQL_DB']
    for key in required:
        if not app.config.get(key):
            raise ValueError(f"Falta la configuración requerida: {key}")

def configure_logging(app):
    log_level = logging.DEBUG if app.config['ENVIRONMENT'] == 'development' else logging.INFO

    if not os.path.exists('logs'):
        os.mkdir('logs')

    file_handler = RotatingFileHandler(
        'logs/ferramas.log',
        maxBytes=1024*100,  # 100 KB
        backupCount=10,
        encoding='utf-8'
    )
    file_handler.setFormatter(logging.Formatter(
        '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'
    ))
    file_handler.setLevel(log_level)

    logging.basicConfig(level=log_level)

    # Limpiar handlers por defecto para evitar logs duplicados
    for handler in app.logger.handlers[:]:
        app.logger.removeHandler(handler)

    app.logger.addHandler(file_handler)
    app.logger.info(f'Ferramas startup - Environment: {app.config["ENVIRONMENT"]}')

if __name__ == '__main__':
    app = create_app()
    port = int(os.getenv('FLASK_PORT', 5000))
    host = os.getenv('FLASK_HOST', '0.0.0.0')
    debug = app.config['ENVIRONMENT'] == 'development'

    app.logger.info(f"Starting server on {host}:{port}")
    app.run(host=host, port=port, debug=debug)
