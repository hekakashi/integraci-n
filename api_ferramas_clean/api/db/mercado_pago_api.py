# api/db/mercado_pago_api.py
import mercadopago
import os

class MercadoPagoAPI:
    def __init__(self, access_token):
        self.sdk = mercadopago.SDK(access_token)

    def create_preference(self, preference_data):
        preference_response = self.sdk.preference().create(preference_data)
        return preference_response["response"]
