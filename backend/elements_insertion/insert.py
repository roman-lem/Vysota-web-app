from psycopg2.extras import execute_values
import psycopg2
import csv

conn = psycopg2.connect(
    dbname="aero_db",
    user="aero_user",
    password="aero_pass",
    host="db",
    port="5432"
)

cur = conn.cursor()

query = '''
    INSERT INTO elements (type, code, score, equipment, description, image)
    VALUES (%s, %s, %s, %s, %s, %s)
    ON CONFLICT (code) DO UPDATE SET
        type = EXCLUDED.type,
        score = EXCLUDED.score,
        equipment = EXCLUDED.equipment,
        description = EXCLUDED.description,
        image = EXCLUDED.image
'''

data = []
with open("all_elements.csv", newline="", encoding="utf-8") as f:
    reader = csv.DictReader(f)

    for row in reader:
        data.append((
            row["type"],
            row["code"],
            float(row["score"]),
            row["equipment"],
            row["description"],
            row["image"]
        ))

execute_values(cur, query, data, page_size=1200)

conn.commit()
cur.close()
conn.close()
