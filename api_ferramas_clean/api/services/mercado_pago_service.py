# api/services/mercado_pago_service.py
from api.models.preference import Preference
from api.db.mercado_pago_api import MercadoPagoAPI

class MercadoPagoService:
    def __init__(self, access_token):
        self.mercado_pago_api = MercadoPagoAPI(access_token)

    def create_payment_preference(self, title, quantity, unit_price, currency="CLP"):
        preference_data = {
            "items": [
                {
                    "title": title,
                    "quantity": quantity,
                    "unit_price": float(unit_price),
                    "currency_id": currency
                }
            ]
        }

        try:
            response = self.mercado_pago_api.create_preference(preference_data)
            return Preference(
                id=response["id"],
                init_point=response["init_point"],
                sandbox_init_point=response["sandbox_init_point"]
            ).to_dict()
        except Exception as e:
            return {'error': f'Error al crear preferencia: {str(e)}'}
