from api.models.user import User
from werkzeug.security import generate_password_hash
from flask import jsonify

class UserService:
    def __init__(self, mysql):
        self.mysql = mysql

    def get_all_users(self):
        cursor = self.mysql.connection.cursor()
        cursor.execute("SELECT id, nombre, usuario, correo, contrasena, telefono FROM users")
        results = cursor.fetchall()
        users = [
            User(
                id=row[0], 
                nombre=row[1], 
                usuario=row[2], 
                correo=row[3], 
                contrasena=row[4], 
                telefono=row[5]
            ).to_dict() for row in results
        ]
        cursor.close()
        return users

    def add_user(self, data):
        nombre = data.get('nombre')
        usuario = data.get('usuario')
        correo = data.get('correo')
        contrasena = data.get('contrasena')
        telefono = data.get('telefono', None)

        if not (nombre and usuario and correo and contrasena):
            return jsonify({'error': 'Faltan datos obligatorios'}), 400

        hashed_password = generate_password_hash(contrasena)

        cursor = self.mysql.connection.cursor()
        try:
            cursor.execute(
                "INSERT INTO users (nombre, usuario, correo, contrasena, telefono) VALUES (%s, %s, %s, %s, %s)",
                (nombre, usuario, correo, hashed_password, telefono)
            )
            self.mysql.connection.commit()
            return jsonify({'message': 'Usuario creado correctamente'}), 201
        except Exception as e:
            return jsonify({'error': str(e)}), 500
        finally:
            cursor.close()
