
from api.models.subscription import Subscription

class SubscriptionService:
    def __init__(self, mysql):
        self.mysql = mysql

    def get_all_sus(self):
        cursor = self.mysql.connection.cursor()
        cursor.execute("SELECT cod, email FROM Subscription")
        results = cursor.fetchall()
        subs = [Subscription(cod=row[0], email=row[1]).to_dict() for row in results]
        return subs

    def add_subscription(self, email):
        if not email or '@' not in email:
            return {'error': 'Correo inválido'}, 400

        try:
            cursor = self.mysql.connection.cursor()
            cursor.execute("INSERT INTO Subscription (email) VALUES (%s)", (email,))
            self.mysql.connection.commit()
            return {'message': 'Correo suscrito correctamente'}, 200
        except Exception as e:
            print("Error al insertar suscripción:", e)
            return {'error': 'Error al guardar en la base de datos'}, 500
