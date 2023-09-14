# Step by Step to use this repository:
## 1. Clone this repository
    Use 'git clone' to clone
## 2. In the 'db' folder:
    2.1. Use db.mySQL_create.sql to create the database
    
    2.2. Use all other files in the entityWithoutForeignKey folder to create the tables without relationships
    
    2.3. Use all other files in the entityWithForeignKey folder to create the tables have relationships with entityWithoutForeignKey. Need to patient, see the graph I draw in the 'db' folder to know the order to create the tables.
## 3. In the 'server' folder:
    3.1. Install all dependencies by npm, yarn

    3.2. Run the server by npm run dev or yarn dev

    3.3. The server will run on port 3000

    3.4. Install extension "Thunder Client" to test it like I do below

# Update: 14/9/23
## 1. Re-factor the folder structure, split the model and controller to lv1, lv2,...like the structure I draw in the 'db' folder ( graphql.jpg )

## 2. The input form from the lv2, lv3...table not have the field references by the lower level ( usually some ID has FK), instead of it is the value of this ID is the value this ID references. For example, in the ``address``, we have a field ``country_id``. In the input form, we don't need to input the ``country_id``, instead of it, we need to input the ``country_name``. The server will find the ``country_id`` by the ``country_name`` and insert it into the ``address`` table.

In the logout test, you need to login an email, after that copy the ``access_token`` to the ``Auth`` and ``Bearer`` in the header of the logout test.
