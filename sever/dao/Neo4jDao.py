"""【基盤】Neo4jのアクセスクラス """

from types import TracebackType
from neo4j import GraphDatabase, Session

class Neo4jDao:
    """【基盤】Neo4jのアクセスクラス

    Attributes:
        Neo4jにアクセスする際は本クラスを継承し利用する
    """

    @property
    def session(self) -> Session:
        """DB接続情報の取得

        Returns:
            Session: DB接続情報
        """
        return self._session

    @session.setter
    def driver(self, session: Session):
        """DB接続情報の設定

        Args:
            session (Session): DB接続情報
        """
        self._session = session

    def __init__(self):
        """DB接続情報の定義

        Attributes:
            DB接続情報の新規作成
        """
        self._session = self.create_session()

    def __enter__(self):
        """[with] 開始処理（お約束）

        Returns:
            self: 自身のクラス情報
        """
        return self

    def __exit__(
        self, exc_type: type[BaseException], exc_value: BaseException, trace: TracebackType
    ) -> bool:
        """[with] 終了処理（お約束）

        Args:
            exc_type (type[BaseException]): エラー情報
            exc_value (BaseException): エラー情報
            trace (TracebackType): エラー情報

        Returns:
            bool: エラー情報を呼びもとに返却するかしないか
        """
        self._close()
        return False

    def create_session(self) -> Session:
        """DB接続情報の作成

        Attributes:
            DB接続情報を作成する

        Returns:
            Driver: _description_
        """
        DB_PATH = "bolt://localhost:7687"
        DB_NAME = "neo4j"
        DB_USER = "neo4j"
        DB_PASSWORD = "password"
        return GraphDatabase.driver(
            DB_PATH,
            auth=(
                DB_USER,
                DB_PASSWORD,
            ),
            encrypted=False,
        ).session(
            database=DB_NAME,
        )

    def _close(self):
        """[with] Close処理（お約束）

        DB接続情報がCloseしていない場合、強制的に閉じる
        """
        if not self._session.closed():
            self._session.close()
