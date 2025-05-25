from flask import Blueprint, request, jsonify
from api.services.user_service import UserService
from api.services.product_service import ProductService
from api.services.product_service_by_id import ProductServiceById
from api.services.dollar_service import DollarService
from api.services.subs_service import SubscriptionService
from api.services.mercado_pago_service import MercadoPagoService

def register_routes(app, mysql):
    api_bp = Blueprint('api', __name__)

    # Inicialización de servicios
    services = {
        'user': UserService(mysql),
        'product': ProductService(mysql),
        'product_by_id': ProductServiceById(mysql),
        'dollar': DollarService(),
        'subscription': SubscriptionService(mysql),
        #'mercado_pago': MercadoPagoService(app.config['MP_ACCESS_TOKEN'])
    }

    # Rutas básicas (GET)
    @api_bp.route('/users', methods=['GET'])
    def get_users():
        return jsonify(services['user'].get_all_users())

    @api_bp.route('/products', methods=['GET'])
    def get_products():
        return jsonify(services['product'].get_all_products())

    @api_bp.route('/products_by_id', methods=['GET'])
    def get_products_by_id():
        return jsonify(services['product_by_id'].get_all_products())

    @api_bp.route('/subscriptions', methods=['GET'])
    def get_subscriptions():
        return jsonify(services['subscription'].get_all_sus())

    @api_bp.route('/dolarvalue', methods=['GET'])
    def get_dolar():
        return jsonify(services['dollar'].get_dollar_today())

    # Rutas Mercado Pago
    @api_bp.route('/mercado_pago/create', methods=['POST'])
    def create_mp_transaction():
        try:
            data = request.get_json()

            # Validación de campos obligatorios
            required_fields = ['title', 'quantity', 'unit_price']
            if not all(field in data for field in required_fields):
                missing = [field for field in required_fields if field not in data]
                return jsonify({'error': f'Missing required fields: {", ".join(missing)}'}), 400

            if float(data['unit_price']) <= 0:
                return jsonify({'error': 'unit_price must be greater than 0'}), 400

            result = services['mercado_pago'].create_payment_preference(
                title=data['title'],
                quantity=int(data['quantity']),
                unit_price=float(data['unit_price'])
            )

            return jsonify({
                'status': 'success',
                'data': result
            }), 200

        except ValueError as e:
            return jsonify({'error': f'Invalid data format: {str(e)}'}), 400
        except Exception as e:
            app.logger.error(f'MercadoPago error: {str(e)}', exc_info=True)
            return jsonify({'error': 'Transaction processing failed'}), 500

    app.register_blueprint(api_bp)
