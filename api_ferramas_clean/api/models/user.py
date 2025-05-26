class User:
    def __init__(self, id, nombre, usuario, correo, contrasena, telefono):
        self.id = id
        self.nombre = nombre
        self.usuario = usuario
        self.correo = correo
        self.contrasena = contrasena
        self.telefono = telefono

    def to_dict(self):
        return {
            'id': self.id,
            'nombre': self.nombre,
            'usuario': self.usuario,
            'correo': self.correo,
            'telefono': self.telefono
            # No conviene enviar contrasena
        }
