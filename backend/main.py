import mysql.connector
from fastapi import FastAPI

app = FastAPI()

def get_db_connection():
    connection = mysql.connector.connect(
        host="db",  # nombre del servicio MySQL en docker-compose
        user="trevolt",
        password="gb&176dBC!",
        database="cotizador"
    )
    return connection

@app.get("/products")
def read_products():
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM productos")
    products = cursor.fetchall()
    cursor.close()
    connection.close()
    return products
