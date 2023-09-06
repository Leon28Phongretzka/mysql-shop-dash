Step by Step to use this repository:
1. Clone this repository
2. In the 'db' folder:
    <p>2.1. Use db.mySQL_create.sql to create the database</p>
    <p>2.2. Use all other files in the entityWithoutForeignKey folder to create the tables without relationships</p>
    <p>2.3. Use all other files in the entityWithForeignKey folder to create the tables have relationships with entityWithoutForeignKey. Need to patient, see the graph I draw in the 'db' folder to know the order to create the tables.</p>
3. In the 'server' folder:
    <p>3.1. Install all dependencies by ``npm, yarn``</p>
    <p>3.2. Run the server by ``npm run dev`` or ``yarn dev``</p>
    <p>3.3. The server will run on port 3000</p>
    <p>3.4. Install extension thunder client to test it</p>