from api.db.webpay_api import WebpaApi

class WebpayService:
    def iniciar_pago(self, monto):
        transaction = WebpaApi.get_transaction()
        response = transaction.create(
            buy_order="order123",       
            session_id="session123",   
            amount=monto,              
            return_url="http://localhost:5000/confirmar_pago"
        )
        return response["url"] + "?token_ws=" + response['token']

    def confirmar_pago(self, token):
        transaction = WebpaApi.get_transaction()
        return transaction.commit(token)
