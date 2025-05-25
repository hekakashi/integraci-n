from api.models.dolar import Dollar
from api.db.external import external

class DollarService:
    def get_dollar_today(self):
        try:
            data = external.get_dollar_data()
            serie = data['serie'][0]
            return Dollar(fecha=['fecha'], valor=serie['valor']).to_dict()
        except Exception as e:
            return {'error obtenido dollar : -＞ ' : str(e)}
