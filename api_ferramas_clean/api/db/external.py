#capa de infraestructura
import requests

class external:
    urlBase = "https://mindicador.cl/api/"
    @staticmethod
    def get_dollar_data():
        response = requests.get( external.urlBase + 'dolar') # para concatenar
        response.raise_for_status()
        return response.json()
    
