from api.models.product import Product

class ProductServiceByType:
    def __init__(self, mysql):
        self.mysql = mysql

    def get_products_by_type(self, tipo):
        cursor = self.mysql.connection.cursor()
        query = "SELECT id, name, price, type FROM product WHERE type = %s"
        cursor.execute(query, (tipo,))
        results = cursor.fetchall()
        products = [Product(id=row[0], name=row[1], price=row[2], types=row[3]).to_dict() for row in results]
        return products
