class Subscription:
    def __init__(self, cod, email):
        self.cod = cod
        self.email = email

    def to_dict(self):
        return {
            'cod': self.cod,
            'email': self.email
        }