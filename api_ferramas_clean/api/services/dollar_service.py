from api.models.dolar import Dollar
from api.db.external import external

class DollarService:
    def get_dollar_today(self):
        try:
            data = external.get_dollar_data()
            serie = data['serie'][0]  # Tomamos la primera entrada
            # Aseguramos que la fecha y valor se asignen correctamente
            fecha = serie.get('fecha', 'N/A')
            valor = serie.get('valor', 0)
            return Dollar(fecha=fecha, valor=valor).to_dict()
        except Exception as e:
            return {'error': f'Error obteniendo valor dólar: {str(e)}'}
