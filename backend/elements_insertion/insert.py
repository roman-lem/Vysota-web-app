from psycopg2.extras import execute_values
from collections import Counter
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
    INSERT INTO element (type, is_custom, sportsmen_number, code, score, equipment, description, image)
    VALUES %s
    ON CONFLICT (code) DO UPDATE SET
        type = EXCLUDED.type,
        sportsmen_number = EXCLUDED.sportsmen_number,
        score = EXCLUDED.score,
        equipment = EXCLUDED.equipment,
        description = EXCLUDED.description,
        image = EXCLUDED.image
'''

data = []
with open("./elements_insertion/all_elements.csv", newline="", encoding="utf-8") as f:
    reader = csv.DictReader(f)

    for row in reader:
        data.append((
            row["type"],
            False,
            int(row["sportsmen_count"]),
            row["code"],
            float(row["score"]),
            row["equipment"],
            row["description"],
            row["image"]
        ))

    seen = set()
    filtered = []

    for row in data:
        code = row[3]
        
        if code is None or code not in seen:
            filtered.append(row)
            if code is not None:
                seen.add(code)

    data = filtered
    print(len(filtered))

execute_values(cur, query, data, page_size=1200)

conn.commit()
cur.close()
conn.close()
