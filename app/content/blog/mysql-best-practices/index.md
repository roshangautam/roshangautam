---
title: "Best practices for general MySql administration"
description: ""
coverImage: "/assets/images/posts/covers/mysql-logo.jpg"
date: "2024-12-25"
author:
  name: Roshan Gautam
  picture: "https://avatars.githubusercontent.com/u/978347?v=4"
ogImage:
  url: "/assets/images/posts/covers/mysql-logo.jpg"
---
## Access and Credential Security

### Command Line Password Security
Avoid using passwords directly in command line:
```bash
mysql -u testuser -pMyP@ss0rd  # Not recommended
```
⚠️ Warning: Using passwords in command line is insecure as they can be viewed in shell history.

Better alternatives:
- Use `mysql_config_editor` for script automation
- Use password prompt

### Strong Access Policy Recommendations
1. Implement `validate_password` plugin
2. Limit user access by IP/IP range
3. Follow principle of least privilege
4. Create dedicated users for specific operations (e.g., backup user)
5. Restrict FILE and SUPER privileges for remote users
6. Use SSL for public network connections

## Replication Best Practices

### Object Creation
- Always use `IF EXISTS` and `IF NOT EXISTS` clauses
- Prevents common replication breaks from object conflicts

### General Guidelines

Most common problem for replication break or errors is that OBJECT already exists on SLAVE. By using IF EXISTS and IF NOT EXISTS while creating database objects we can avoid.

- Enable GTID and crash-safe replication
- Keep slaves in read-only mode
- Run backups and query optimization on slaves
- Offload reporting queries to slaves

## Logging

### Available Log Types
1. **Binary Log**: Transaction records
2. **Relay Log**: Replication-related logs
3. **General Log**: Client command logging
4. **Slow Query Log**: Performance monitoring
5. **Error Log**: Server messages (NOTES, WARNINGS, ERRORS)
6. **Audit Log**: User activity tracking

## Basic Administration Commands

### Database and Table Management
```sql
-- Create database
CREATE DATABASE IF NOT EXISTS test_db;

-- Create table
CREATE TABLE IF NOT EXISTS t1 (
    id int(11) primary key auto_increment,
    uname varchar(50),
    comments text
);
```

### User Management
```sql
-- Create users
CREATE USER IF NOT EXISTS 'local_user1'@'localhost' IDENTIFIED BY 'mypass';
CREATE USER IF NOT EXISTS 'remote_user1'@'%' IDENTIFIED BY 'mypass';

-- Modify users
RENAME USER 'abc'@'localhost' TO 'xyz'@'%';
ALTER USER IF EXISTS 'remote_user1'@'%' IDENTIFIED BY 'mypass';
ALTER USER IF EXISTS 'remote_user1'@'%' PASSWORD EXPIRE;
ALTER USER IF EXISTS 'remote_user1'@'%' ACCOUNT LOCK;
```

### Privilege Management
```sql
-- Grant examples
GRANT ALL PRIVILEGES ON db1.* TO 'remote_user1'@'%';
GRANT SELECT, INSERT, UPDATE, DELETE ON db1.* TO 'remote_user1'@'%';
GRANT SELECT ON db1.table1 TO 'remote_user1'@'%';

-- Check privileges
SHOW GRANTS FOR 'remote_user1'@'%';
```

## Monitoring

### Database Size
```sql
SELECT 
    table_schema "Database Name",
    sum(data_length + index_length) / 1024 / 1024 "Database Size in MB",
    sum(data_free) / 1024 / 1024 "Free Space in MB"
FROM information_schema.TABLES
GROUP BY table_schema;
```

### Active Sessions

```bash
SHOW PROCESSLIST;
```

### InnoDB Engine Status:

```bash
SHOW STATUS;

SHOW ENGINE INNODB STATUS;
```

### Performance schema: Live statistics

Example:

- Enable Locking related instruments (if it’s not enabled):

```sql
UPDATE performance_schema.setup_instruments SET ENABLED=’YES’, TIMED=’YES’ WHERE NAME=’wait/lock/metadata/sql/mdl’;

SELECT * FROM performance_schema.metadata_locks WHERE OBJECT_SCHEMA=’test’ AND OBJECT_NAME LIKE ‘t_’;

```

### Check Database objects info:

#### Show Databases:

```bash
SHOW DATABASES;
```

#### Select Database:

```bash
Use db_name;
```

#### Tables:

```bash
SHOW TABLES;

SELECT TABLE_NAME from information_schema.TABLES where TABLE_SCHEMA = 'test_db';
```

#### Routines:

```sql
select * from ROUTINES where ROUTINE_SCHEMA='db_name’;
```

#### Index:

```sql
select TABLE_NAME,INDEX_NAME,COLUMN_NAME,INDEX_TYPE  from information_schema.STATISTICS where TABLE_SCHEMA = 'db_name';
```

#### Views:

```sql
select * from information_schema.VIEWS where TABLE_SCHEMA = 'db_name';
```

## Backup and Restore

> `Require privileges`: mysqldump requires at least the `SELECT` privilege for dumped tables, `SHOW VIEW` for dumped views, `TRIGGER` for dumped triggers, and `LOCK TABLES` if the –single-transaction option is not used. Certain options might require other privileges as noted in the option descriptions. [Reference](http://dev.mysql.com/doc/refman/5.7/en/mysqldump.html)

### Backup Commands

```bash
# Full database backup
mysqldump -u root -p --single-transaction --databases db1 --routines > db1_fullbkp.sql

# Compressed full database backup
mysqldump -u root -p --single-transaction --databases db1 --routines | gzip > db1_fullbkp.sql.gz
```

```bash
# Single table backup
mysqldump -u  -h  -p --single-transaction db_name table_name --routines > db1_full.sql
```

### Restore Commands

To reload a dump file, you must have the privileges required to execute the statements that it contains, such as the appropriate `CREATE` privileges for objects created by those statements.

```bash
mysql -u username -p db_name < db1_fullbkp.sql
# OR for compressed files
gunzip < db1_fullbkp.sql.gz | mysql -u username -p db_name
```

## Replication Setup

### Master Configuration

Create replication user on MASTER with replication privileges.

```sql
CREATE USER IF NOT EXISTS 'rpluser'@'%' IDENTIFIED BY 'rpluser1234';
GRANT REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'rpluser'@'%';
```

### Slave Configuration

```sql
CHANGE MASTER TO
    MASTER_HOST='<MASTER_IP>',
    MASTER_USER='rpluser',
    MASTER_PASSWORD='rpluser1234',
    MASTER_PORT=3306,
    MASTER_AUTO_POSITION=1;
```

### Start Slave and check its status

```sql
START SLAVE;
SHOW SLAVE STATUS;

> Slave_IO_Running and Slave_SQL_Running column value should be ‘YES’
```

## Service Management (Linux)

```bash
# Stop MySQL
sudo service mysqld stop

# Start MySQL
sudo service mysqld start
```

