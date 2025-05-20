# api/models/preference.py
class Preference:
    def __init__(self, id, init_point, sandbox_init_point):
        self.id = id
        self.init_point = init_point
        self.sandbox_init_point = sandbox_init_point

    def to_dict(self):
        return {
            'id': self.id,
            'init_point': self.init_point,
            'sandbox_init_point': self.sandbox_init_point
        }
