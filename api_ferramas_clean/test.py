import requests
import json

url = "https://webpay3gint.transbank.cl/webpayserver/api/transactions"

headers = {
    "Content-Type": "application/json",
    "Tbk-Api-Key-Id": "597055555532",  # Código comercio de prueba
    "Tbk-Api-Key-Secret": "579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C"  # Api key de prueba
}

payload = {
    "buy_order": "orden123",
    "session_id": "sesion123",
    "amount": 1000,
    "return_url": "http://localhost:5000/webpay/confirm"
}

response = requests.post(url, headers=headers, data=json.dumps(payload))

print("Status code:", response.status_code)
print("Response JSON:", response.json())
