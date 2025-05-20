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