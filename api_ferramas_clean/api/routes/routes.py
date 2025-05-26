from flask import Blueprint, request, jsonify
from api.services.user_service import UserService
from api.services.product_service import ProductService
from api.services.product_service_by_type import ProductServiceByType
from api.services.dollar_service import DollarService
from api.services.subs_service import SubscriptionService
from api.services.webpay_service import WebpayService
from werkzeug.security import check_password_hash
from flask import redirect

def register_routes(app, mysql):
    api_bp = Blueprint('api', __name__)

    # Inicialización de servicios
    services = {
        'user': UserService(mysql),
        'product': ProductService(mysql),
        'product_by_type': ProductServiceByType(mysql),
        'dollar': DollarService(),
        'subscription': SubscriptionService(mysql),
    }
    webpay_service = WebpayService()

    @api_bp.route('/suscribirse', methods=['POST'])
    def suscribirse():
        data = request.get_json()
        email = data.get('email')
        return services['subscription'].add_subscription(email)
    
    @api_bp.route('/registrar_usuario', methods=['POST'])
    def registrar_usuario():
        data = request.get_json()
        required_fields = ['nombre', 'usuario', 'correo', 'contrasena']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'Falta el campo {field}'}), 400
        
        return services['user'].add_user(data)

    @api_bp.route('/login', methods=['POST'])
    def login():
        data = request.get_json()
        usuario = data.get('usuario')
        clave = data.get('clave')

        if not usuario or not clave:
            return jsonify({'error': 'Faltan usuario o clave'}), 400

        cursor = mysql.connection.cursor()
        cursor.execute("SELECT id, nombre, usuario, correo, contrasena, telefono FROM users WHERE usuario = %s", (usuario,))
        user = cursor.fetchone()
        cursor.close()

        if user and check_password_hash(user[4], clave):
            return jsonify({'message': 'Login exitoso', 'usuario': user[2], 'nombre': user[1]})
        else:
            return jsonify({'error': 'Usuario o contraseña incorrectos'}), 401

    @api_bp.route('/users', methods=['GET'])
    def get_users():
        try:
            users = services['user'].get_all_users()
            return jsonify(users)
        except Exception as e:
            import traceback
            traceback.print_exc()  # Imprime todo el stack trace
            return jsonify({'error': 'Error al obtener usuarios', 'detail': str(e)}), 500


    @api_bp.route('/products', methods=['GET'])
    def get_products():
        return jsonify(services['product'].get_all_products())

    @api_bp.route('/products_by_type', methods=['GET'])
    def get_products_by_type():
        tipo = request.args.get('type')
        if not tipo:
            return jsonify({'error': 'Missing "type" query parameter'}), 400
        products = services['product_by_type'].get_products_by_type(tipo)
        return jsonify(products)

    @api_bp.route('/subscriptions', methods=['GET'])
    def get_subscriptions():
        return jsonify(services['subscription'].get_all_sus())

    @api_bp.route('/dolarvalue', methods=['GET'])
    def get_dolar():
        return jsonify(services['dollar'].get_dollar_today())
    
    # pagos
    @app.route("/crear_transaccion", methods=['GET','POST'])
    def crear_transaccion():
        data = request.get_json()
        monto = data.get("monto")
        if not monto:
            return jsonify({"error": "Falta monto"}), 400
        url = webpay_service.iniciar_pago(monto)
        return jsonify({"url": url})

    @app.route("/confirmar_pago", methods=['POST'])
    def confirmar_pago():
        token = request.form.get("token_ws")
        response = webpay_service.confirmar_pago(token)
        return jsonify({"estado": "Pago exitoso", "detalle": response})
    
    app.register_blueprint(api_bp)
