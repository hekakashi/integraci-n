import requests
import json
from urllib.parse import urljoin

class WebpayClient:
    def __init__(self, commerce_code, api_key, environment='test'):
        self.base_url = (
            'https://webpay3g.transbank.cl' if environment == 'production'
            else 'https://webpay3gint.transbank.cl'
        )
        self.commerce_code = commerce_code
        self.api_key = api_key
        self.headers = {
            'Tbk-Api-Key-Id': commerce_code,
            'Tbk-Api-Key-Secret': api_key,
            'Content-Type': 'application/json'
        }
        self.session = requests.Session()
        self.session.headers.update(self.headers)

    def create_transaction(self, amount, order_id, session_id, return_url):
        endpoint = '/rswebpaytransaction/api/webpay/v1.2/transactions'
        url = urljoin(self.base_url, endpoint)
        
        payload = {
            "buy_order": str(order_id),
            "session_id": str(session_id),
            "amount": float(amount),
            "return_url": return_url
        }
        
        try:
            response = self.session.post(url, json=payload, timeout=10)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"Error creating transaction: {str(e)}")
            print(f"Response content: {e.response.text if hasattr(e, 'response') else 'No response'}")
            raise

    def commit_transaction(self, token):
        endpoint = f'/rswebpaytransaction/api/webpay/v1.2/transactions/{token}'
        url = urljoin(self.base_url, endpoint)
        
        try:
            response = self.session.put(url, timeout=10)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"Error committing transaction: {str(e)}")
            print(f"Response content: {e.response.text if hasattr(e, 'response') else 'No response'}")
            raise