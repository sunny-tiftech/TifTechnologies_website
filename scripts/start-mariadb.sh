#!/usr/bin/env bash
# Self-healing MariaDB launcher: reinstalls the server if pod binaries were wiped,
# initializes the datadir if missing, then starts mariadbd in the foreground.
set -e

if [ ! -x /usr/sbin/mariadbd ]; then
  export DEBIAN_FRONTEND=noninteractive
  apt-get update -qq && apt-get install -y mariadb-server > /tmp/mariadb_auto_install.log 2>&1
fi

mkdir -p /run/mysqld && chown mysql:mysql /run/mysqld

if [ ! -d /root/mariadb_data/mysql ]; then
  mkdir -p /root/mariadb_data && chown -R mysql:mysql /root/mariadb_data
  mariadb-install-db --user=mysql --datadir=/root/mariadb_data > /tmp/mariadb_auto_init.log 2>&1
fi

exec /usr/sbin/mariadbd --user=mysql --datadir=/root/mariadb_data
