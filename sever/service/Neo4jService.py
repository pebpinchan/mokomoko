from dao.Neo4jDao import Neo4jDao
import hashlib
import json
import datetime


from neo4j import GraphDatabase


DB_PATH = "bolt://localhost:7687"
DB_NAME = "neo4j"
DB_USER = "neo4j"
DB_PASSWORD = "password"

class Neo4jService:

    @classmethod
    def exe(cls, cypher: str):
        result = None
        try:
            with GraphDatabase.driver(DB_PATH, auth=(DB_USER, DB_PASSWORD)) as driver:
                with driver.session() as session:
                    result = session.run(cypher).data()
        except RuntimeError as run_err:
            print(run_err, "RuntimeError")
        except NameError as nm_err:
            print(nm_err, "NameError")
        except Exception as error:
            print(error, "Exception")
        return result

    @classmethod
    def execute(cls, query: str):
        result = None
        try:
            with Neo4jDao() as graphdb:
                transaction = graphdb.session.begin_transaction()
                try:
                    r: Result = transaction.run(query)
                    result = r.data()
                finally:
                    transaction.close()
        except RuntimeError as run_err:
            print(run_err, "RuntimeError")
        except NameError as nm_err:
            print(nm_err, "NameError")
        except Exception as error:
            print(error, "Exception")
        return result

    @classmethod
    def list(cls):
        query = 'MATCH (n) RETURN n'
        r = cls.execute(query)
        return r

    @classmethod
    def find(cls, target: str, value: str):
        cypher = ''
        if target.lower() == 'dataset':
            cypher = f"MATCH(n:DataSet) where n.nmspace =~ '.*{value}.*' RETURN n"
        elif target.lower() == 'catalog':
            cypher = f"MATCH(n:Catalog) where n.uid =~ '.*{value}.*' RETURN n"
        elif target.lower() == 'data':
            cypher = f"MATCH(n) where n.DTKBN_srcdstnmspace =~ '.*{value}.*' RETURN n"
        elif target.lower() == 'datatype':
            cypher = f"MATCH(n:DataType) where n.dstnmspace =~ '.*{value}.*' RETURN n"
        print(cypher)
        r = cls.execute(cypher)
        print(r)
        return r

    @classmethod
    def login(cls, mail: str, password: str):
        query = f"MATCH (n:User) WHERE n.mail = '{mail}' AND n.pass = '{password}' RETURN n.mail AS mail, n.auth AS auth"
        r = cls.exe(query)
        auth = r[0]['auth']
        hs = hashlib.sha256((r[0]['mail'] + auth).encode()).hexdigest()
        cypher = 'CREATE (:Login{auth:"' + auth + '", token:"' + hs + '", mail:"' + mail + '"})'
        cls.exe(cypher)
        return hs

    @classmethod
    def logout(cls, token: str):
        cypher = 'MATCH (u:Login{token:"' + token + '"}) DELETE u'
        with GraphDatabase.driver(DB_PATH, auth=(DB_USER, DB_PASSWORD)) as driver:
            with driver.session() as session:
                result = session.run(cypher) 
        return True

    @classmethod
    def isAdmin(cls, token: str):
        query = f"MATCH (n:Login) WHERE n.token = '{token}' RETURN n.auth AS auth"
        result = False
        try:
            r = cls.exe(query)
            auth = r[0]['auth']
            result = auth.lower() == 'admin'
        except Exception as error:
            print(error, "Exception")
        return result

    @classmethod
    def make(cls):
        r = cls.exe('MATCH (u:Login) DELETE u')
        r = cls.exe('MATCH (u:User) DELETE u')


        cls.exe('CREATE (:User {mail: "admin@pebblecorp.co.jp", auth: "admin", pass: "pass", group: "自社"})')
        cls.exe('CREATE (:User {mail: "user@pebblecorp.co.jp", auth: "user", pass: "pass", group: "自社"})')



        cls.login('admin@pebblecorp.co.jp', 'pass')
        cls.login('user@pebblecorp.co.jp', 'pass')

        cypher = 'MATCH (u) WHERE u.__pmdtype IN ["data", "catalog", "dataset", "category", "alias", "group", "metadata", "schema"] DETACH DELETE u'
        r = cls.exe(cypher)
        cls.exe('CREATE (:TestCatalog {title: "CatalogA", auth: "public", tag: "カタログ", body: "XXX", __pmdtype: "catalog", __typename: "TestCatalog"})')
        cls.exe('CREATE (:TestDataSet {title: "自社公開1", auth: "public", group: "自社", tag: "データセット", body: "XXX", __pmdtype: "dataset", __typename: "TestDataSet"})')
        cls.exe('CREATE (:TestDataSet {title: "自社公開2", auth: "public", group: "自社", tag: "データセット", body: "XXX", __pmdtype: "dataset", __typename: "TestDataSet"})')
        cls.exe('CREATE (:TestDataSet {title: "自社非公開1", auth: "private", group: "自社", tag: "データセット", body: "XXX", __pmdtype: "dataset", __typename: "TestDataSet"})')
        cls.exe('CREATE (:TestDataSet {title: "自社非公開2", auth: "private", group: "自社", tag: "データセット", body: "XXX", __pmdtype: "dataset", __typename: "TestDataSet"})')
        cls.exe('CREATE (:TestDataSet {title: "他社公開1", auth: "public", group: "他社", tag: "データセット", body: "XXX", __pmdtype: "dataset", __typename: "TestDataSet"})')
        cls.exe('CREATE (:TestDataSet {title: "他社公開2", auth: "public", group: "他社", tag: "データセット", body: "XXX", __pmdtype: "dataset", __typename: "TestDataSet"})')
        cls.exe('CREATE (:TestDataSet {title: "他社公開3", auth: "public", group: "他社", tag: "データセット", body: "XXX", __pmdtype: "dataset", __typename: "TestDataSet"})')
        cls.exe('CREATE (:TestDataSet {title: "他社公開4", auth: "public", group: "他社", tag: "データセット", body: "XXX", __pmdtype: "dataset", __typename: "TestDataSet"})')
        cls.exe('CREATE (:TestDataSet {title: "他社非公開1", auth: "private", group: "他社", tag: "データセット", body: "XXX", __pmdtype: "dataset", __typename: "TestDataSet"})')
        cls.exe('CREATE (:TestDataSet {title: "他社非公開2", auth: "private", group: "他社", tag: "データセット", body: "XXX", __pmdtype: "dataset", __typename: "TestDataSet"})')

        cls.exe('CREATE (:TestData {title: "D自社公開1", auth: "public", group: "自社", tag: "データ", body: "XXX", __pmdtype: "data", __typename: "TestData"})')
        cls.exe('CREATE (:TestData {title: "D自社公開2", auth: "public", group: "自社", tag: "データ", body: "XXX", __pmdtype: "data", __typename: "TestData"})')
        cls.exe('CREATE (:TestData {title: "D自社公開3", auth: "public", group: "自社", tag: "データ", body: "XXX", __pmdtype: "data", __typename: "TestData"})')
        cls.exe('CREATE (:TestData {title: "D自社公開4", auth: "public", group: "自社", tag: "データ", body: "XXX", __pmdtype: "data", __typename: "TestData"})')
        cls.exe('CREATE (:TestData {title: "D自社非公開1", auth: "private", group: "自社", tag: "データ", body: "XXX", __pmdtype: "data", __typename: "TestData"})')
        cls.exe('CREATE (:TestData {title: "D自社非公開2", auth: "private", group: "自社", tag: "データ", body: "XXX", __pmdtype: "data", __typename: "TestData"})')
        cls.exe('CREATE (:TestData {title: "D自社非公開3", auth: "private", group: "自社", tag: "データ", body: "XXX", __pmdtype: "data", __typename: "TestData"})')
        cls.exe('CREATE (:TestData {title: "D自社非公開4", auth: "private", group: "自社", tag: "データ", body: "XXX", __pmdtype: "data", __typename: "TestData"})')

        cls.exe('CREATE (:TestData {title: "D他社公開1", auth: "public", group: "他社", tag: "データ", body: "XXX", __pmdtype: "data", __typename: "TestData"})')
        cls.exe('CREATE (:TestData {title: "D他社公開2", auth: "public", group: "他社", tag: "データ", body: "XXX", __pmdtype: "data", __typename: "TestData"})')
        cls.exe('CREATE (:TestData {title: "D他社公開3", auth: "public", group: "他社", tag: "データ", body: "XXX", __pmdtype: "data", __typename: "TestData"})')
        cls.exe('CREATE (:TestData {title: "D他社公開4", auth: "public", group: "他社", tag: "データ", body: "XXX", __pmdtype: "data", __typename: "TestData"})')
        cls.exe('CREATE (:TestData {title: "D他社公開5", auth: "public", group: "他社", tag: "データ", body: "XXX", __pmdtype: "data", __typename: "TestData"})')
        cls.exe('CREATE (:TestData {title: "D他社公開6", auth: "public", group: "他社", tag: "データ", body: "XXX", __pmdtype: "data", __typename: "TestData"})')
        cls.exe('CREATE (:TestData {title: "D他社公開7", auth: "public", group: "他社", tag: "データ", body: "XXX", __pmdtype: "data", __typename: "TestData"})')
        cls.exe('CREATE (:TestData {title: "D他社公開8", auth: "public", group: "他社", tag: "データ", body: "XXX", __pmdtype: "data", __typename: "TestData"})')

        cls.exe('Match(a:TestDataSet{title: "自社公開1"})\nMatch(b:TestData{title: "D自社公開1"})\nCREATE (a)<-[:TestDif]-(b)')
        cls.exe('Match(a:TestDataSet{title: "自社公開1"})\nMatch(b:TestData{title: "D自社公開2"})\nCREATE (a)<-[:TestDif]-(b)')
        cls.exe('Match(a:TestDataSet{title: "自社公開1"})\nMatch(b:TestData{title: "D自社公開3"})\nCREATE (a)<-[:TestDif]-(b)')
        cls.exe('Match(a:TestDataSet{title: "自社非公開1"})\nMatch(b:TestData{title: "D自社公開4"})\nCREATE (a)<-[:TestDif]-(b)')

        cls.exe('Match(a:TestDataSet{title: "自社公開2"})\nMatch(b:TestData{title: "D自社非公開1"})\nCREATE (a)<-[:TestDif]-(b)')
        cls.exe('Match(a:TestDataSet{title: "自社公開2"})\nMatch(b:TestData{title: "D自社非公開2"})\nCREATE (a)<-[:TestDif]-(b)')
        cls.exe('Match(a:TestDataSet{title: "自社公開2"})\nMatch(b:TestData{title: "D自社非公開3"})\nCREATE (a)<-[:TestDif]-(b)')
        cls.exe('Match(a:TestDataSet{title: "自社非公開2"})\nMatch(b:TestData{title: "D自社非公開4"})\nCREATE (a)<-[:TestDif]-(b)')

        cls.exe('Match(a:TestDataSet{title: "他社公開1"})\nMatch(b:TestData{title: "D他社公開1"})\nCREATE (a)<-[:TestDif]-(b)')
        cls.exe('Match(a:TestDataSet{title: "他社公開1"})\nMatch(b:TestData{title: "D他社公開2"})\nCREATE (a)<-[:TestDif]-(b)')
        cls.exe('Match(a:TestDataSet{title: "他社公開2"})\nMatch(b:TestData{title: "D他社公開3"})\nCREATE (a)<-[:TestDif]-(b)')
        cls.exe('Match(a:TestDataSet{title: "他社公開2"})\nMatch(b:TestData{title: "D他社公開4"})\nCREATE (a)<-[:TestDif]-(b)')
        cls.exe('Match(a:TestDataSet{title: "他社公開3"})\nMatch(b:TestData{title: "D他社公開5"})\nCREATE (a)<-[:TestDif]-(b)')
        cls.exe('Match(a:TestDataSet{title: "他社公開3"})\nMatch(b:TestData{title: "D他社公開6"})\nCREATE (a)<-[:TestDif]-(b)')
        cls.exe('Match(a:TestDataSet{title: "他社公開4"})\nMatch(b:TestData{title: "D他社公開7"})\nCREATE (a)<-[:TestDif]-(b)')
        cls.exe('Match(a:TestDataSet{title: "他社公開4"})\nMatch(b:TestData{title: "D他社公開8"})\nCREATE (a)<-[:TestDif]-(b)')

        cypher = 'Match(a:TestCatalog)\nMatch(b:TestDataSet)\nCREATE (a)<-[:TestLink]-(b)'
        r = cls.exe(cypher)

        cls.exe('CREATE (:HCatalog {title: "カタログA", auth: "public", body: "カタログA の body です。", __pmdtype: "catalog", __typename: "HCatalog"})')
        cls.exe('CREATE (:HDataSet {title: "データセット自社1", auth: "public", group: "自社", body: "データセット自社1 の body です。", __pmdtype: "dataset", __typename: "HDataSet"})')
        cls.exe('CREATE (:HDataSet {title: "データセット自社2", auth: "public", group: "自社", body: "データセット自社2 の body です。", __pmdtype: "dataset", __typename: "HDataSet"})')
        cls.exe('CREATE (:HDataSet {title: "データセット他社1", auth: "public", group: "他社", body: "データセット他社1 の body です。", __pmdtype: "dataset", __typename: "HDataSet"})')
        cls.exe('CREATE (:HDataSet {title: "データセット他社2", auth: "public", group: "他社", body: "データセット他社2 の body です。", __pmdtype: "dataset", __typename: "HDataSet"})')
        cls.exe('CREATE (:HDataSet {title: "データセット他社3", auth: "public", group: "他社", body: "データセット他社3 の body です。", __pmdtype: "dataset", __typename: "HDataSet"})')
        cls.exe('CREATE (:HDataSet {title: "データセット他社4", auth: "public", group: "他社", body: "データセット他社4 の body です。", __pmdtype: "dataset", __typename: "HDataSet"})')

        cls.exe('CREATE (:HData {title: "データ自社1", auth: "public", group: "自社", body: "データ自社1 の body です。", __pmdtype: "data", __typename: "HData"})')
        cls.exe('CREATE (:HData {title: "データ自社2", auth: "public", group: "自社", body: "データ自社2 の body です。", __pmdtype: "data", __typename: "HData"})')
        cls.exe('CREATE (:HData {title: "データ自社3", auth: "public", group: "自社", body: "データ自社3 の body です。", __pmdtype: "data", __typename: "HData"})')
        cls.exe('CREATE (:HData {title: "データ自社4", auth: "public", group: "自社", body: "データ自社4 の body です。", __pmdtype: "data", __typename: "HData"})')

        cls.exe('CREATE (:HData {title: "データ他社1", auth: "public", group: "他社", body: "データ他社1 の body です。", __pmdtype: "data", __typename: "HData"})')
        cls.exe('CREATE (:HData {title: "データ他社2", auth: "public", group: "他社", body: "データ他社2 の body です。", __pmdtype: "data", __typename: "HData"})')
        cls.exe('CREATE (:HData {title: "データ他社3", auth: "public", group: "他社", body: "データ他社3 の body です。", __pmdtype: "data", __typename: "HData"})')
        cls.exe('CREATE (:HData {title: "データ他社4", auth: "public", group: "他社", body: "データ他社4 の body です。", __pmdtype: "data", __typename: "HData"})')
        cls.exe('CREATE (:HData {title: "データ他社5", auth: "public", group: "他社", body: "データ他社5 の body です。", __pmdtype: "data", __typename: "HData"})')
        cls.exe('CREATE (:HData {title: "データ他社6", auth: "public", group: "他社", body: "データ他社6 の body です。", __pmdtype: "data", __typename: "HData"})')
        cls.exe('CREATE (:HData {title: "データ他社7", auth: "public", group: "他社", body: "データ他社7 の body です。", __pmdtype: "data", __typename: "HData"})')
        cls.exe('CREATE (:HData {title: "データ他社8", auth: "public", group: "他社", body: "データ他社8 の body です。", __pmdtype: "data", __typename: "HData"})')

        cls.exe('Match(a:HDataSet{title: "データセット自社1"})\nMatch(b:HData{title: "データ自社1"})\nCREATE (a)<-[:HLinkDif]-(b)')
        cls.exe('Match(a:HDataSet{title: "データセット自社1"})\nMatch(b:HData{title: "データ自社2"})\nCREATE (a)<-[:HLinkDif]-(b)')
        cls.exe('Match(a:HDataSet{title: "データセット自社1"})\nMatch(b:HData{title: "データ自社3"})\nCREATE (a)<-[:HLinkDif]-(b)')
        cls.exe('Match(a:HDataSet{title: "データセット自社2"})\nMatch(b:HData{title: "データ自社4"})\nCREATE (a)<-[:HLinkDif]-(b)')

        cls.exe('Match(a:HDataSet{title: "データセット他社1"})\nMatch(b:HData{title: "データ他社1"})\nCREATE (a)<-[:HLinkDif]-(b)')
        cls.exe('Match(a:HDataSet{title: "データセット他社1"})\nMatch(b:HData{title: "データ他社2"})\nCREATE (a)<-[:HLinkDif]-(b)')
        cls.exe('Match(a:HDataSet{title: "データセット他社2"})\nMatch(b:HData{title: "データ他社3"})\nCREATE (a)<-[:HLinkDif]-(b)')
        cls.exe('Match(a:HDataSet{title: "データセット他社2"})\nMatch(b:HData{title: "データ他社4"})\nCREATE (a)<-[:HLinkDif]-(b)')
        cls.exe('Match(a:HDataSet{title: "データセット他社3"})\nMatch(b:HData{title: "データ他社5"})\nCREATE (a)<-[:HLinkDif]-(b)')
        cls.exe('Match(a:HDataSet{title: "データセット他社3"})\nMatch(b:HData{title: "データ他社6"})\nCREATE (a)<-[:HLinkDif]-(b)')
        cls.exe('Match(a:HDataSet{title: "データセット他社4"})\nMatch(b:HData{title: "データ他社7"})\nCREATE (a)<-[:HLinkDif]-(b)')
        cls.exe('Match(a:HDataSet{title: "データセット他社4"})\nMatch(b:HData{title: "データ他社8"})\nCREATE (a)<-[:HLinkDif]-(b)')

        cypher = 'Match(a:HCatalog)\nMatch(b:HDataSet)\nCREATE (a)<-[:HLink]-(b)'
        r = cls.exe(cypher)


        cls.exe('CREATE (:Category {pname: "家", ids: "家具", __pmdtype: "category", __typename: "Category"})')
        cls.exe('CREATE (:Category {pname: "家具", ids: "机,椅子", __pmdtype: "category", __typename: "Category"})')
        cls.exe('CREATE (:Category {pname: "公園", ids: "椅子", __pmdtype: "category", __typename: "Category"})')


        cls.exe('CREATE (:Group {pname: "家具", ids: "sid : mid", pid: "家", __pmdtype: "group", __typename: "Group"})')
        cls.exe('CREATE (:Group {pname: "机", ids: "sid : mid", pid: "家具", __pmdtype: "group", __typename: "Group"})')
        cls.exe('CREATE (:Group {pname: "椅子", ids: "sid : mid", pid: "家具", __pmdtype: "group", __typename: "Group"})')
        cls.exe('CREATE (:Group {pname: "椅子", ids: "sid : mid", pid: "公園", __pmdtype: "group", __typename: "Group"})')



        cls.exe('CREATE (:Alias {pname: "机", id: "sid : mid", ids: "板,足,ネジ", pid: "家具", __pmdtype: "alias", __typename: "Alias"})')
        cls.exe('CREATE (:Alias {pname: "椅子", id: "sid : mid", ids: "木,金属", pid: "家具", __pmdtype: "alias", __typename: "Alias"})')
        cls.exe('CREATE (:Alias {pname: "板", id: "sid : mid", ids: "2022", pid: "机", __pmdtype: "alias", __typename: "Alias"})')
        cls.exe('CREATE (:Alias {pname: "ネジ", id: "sid : mid", ids: "2023", pid: "机", __pmdtype: "alias", __typename: "Alias"})')
        cls.exe('CREATE (:Alias {pname: "足", id: "sid : mid", ids: "2024", pid: "机", __pmdtype: "alias", __typename: "Alias"})')
        cls.exe('CREATE (:Alias {pname: "木", id: "sid : mid", ids: "木", pid: "椅子", __pmdtype: "alias", __typename: "Alias"})')
        cls.exe('CREATE (:Alias {pname: "金属", id: "sid : mid", ids: "木でない", pid: "椅子", __pmdtype: "alias", __typename: "Alias"})')
        cls.exe('CREATE (:Alias {pname: "ベンチ", id: "sid : mid", ids: "詳細1", pid: "椅子", __pmdtype: "alias", __typename: "Alias"})')
        cls.exe('CREATE (:Alias {pname: "金具", id: "sid : mid", ids: "詳細2", pid: "椅子", __pmdtype: "alias", __typename: "Alias"})')
        cls.exe('CREATE (:Alias {pname: "足",   id: "sid : mid", ids: "高さ", pid: "椅子", __pmdtype: "alias", __typename: "Alias"})')



        cls.exe('CREATE (:DataSet {pname: "板", ids: "fileIdA", pid: "机", __pmdtype: "dataset", __typename: "DataSet"})')
        cls.exe('CREATE (:DataSet {pname: "足", ids: "fileIdB", pid: "机", __pmdtype: "dataset", __typename: "DataSet"})')
        cls.exe('CREATE (:DataSet {pname: "ネジ", ids: "fileIdC", pid: "机", __pmdtype: "dataset", __typename: "DataSet"})')
        cls.exe('CREATE (:DataSet {pname: "木", ids: "fileIdA,fileIdB", pid: "椅子", __pmdtype: "dataset", __typename: "DataSet"})')
        cls.exe('CREATE (:DataSet {pname: "金属", ids: "fileIdC", pid: "椅子", __pmdtype: "dataset", __typename: "DataSet"})')
        cls.exe('CREATE (:DataSet {pname: "2022", ids: "fileIdA", pid: "板", __pmdtype: "dataset", __typename: "DataSet"})')
        cls.exe('CREATE (:DataSet {pname: "2023", ids: "fileIdB", pid: "ネジ", __pmdtype: "dataset", __typename: "DataSet"})')
        cls.exe('CREATE (:DataSet {pname: "2024", ids: "fileIdC", pid: "足", __pmdtype: "dataset", __typename: "DataSet"})')
        cls.exe('CREATE (:DataSet {pname: "木", ids: "fileIdA,fileIdB", pid: "木", __pmdtype: "dataset", __typename: "DataSet"})')
        cls.exe('CREATE (:DataSet {pname: "木でない", ids: "fileIdC", pid: "金属", __pmdtype: "dataset", __typename: "DataSet"})')
        cls.exe('CREATE (:DataSet {pname: "詳細1", ids: "fileIdA,fileIdB", pid: "ベンチ", __pmdtype: "dataset", __typename: "DataSet"})')
        cls.exe('CREATE (:DataSet {pname: "詳細2", ids: "fileIdA,fileIdB", pid: "金具", __pmdtype: "dataset", __typename: "DataSet"})')
        cls.exe('CREATE (:DataSet {pname: "高さ", ids: "fileIdC", pid: "足", __pmdtype: "dataset", __typename: "DataSet"})')

        jsonStr = '{"children":[{"name":"file_id","displayName":{"ja":"ファイルID"}},{"name":"datafile_name","displayName":{"ja":"データファイル名"}},{"name":"summary","displayName":{"ja":"データファイル概要"}}]}'
        cls.exe('CREATE (:Schema {id: "sid", jsonStr: "' + jsonStr.replace('"', '\\"') + '", __pmdtype: "schema", __typename: "Schema"})')
        jsonStr = '{\"list\":[{\"data\":{\"file_id\":\"fileIdA\",\"datafile_name\":\"efff13f2-cf32-41ad-9443-ba2b1c40fd5a/出力1.ply\",\"summary\":\"Test1用\"}},{\"data\":{\"file_id\":\"fileIdB\",\"datafile_name\":\"efff13f2-cf32-41ad-9443-ba2b1c40fd5a/出力2.ply\",\"summary\":\"Test2用\"}},{\"data\":{\"file_id\":\"fileIdC\",\"datafile_name\":\"f977c241-e6f1-4ae0-b1d9-00719befca73/出力3.zip\",\"summary\":\"Test3用\"}}]}'
        cls.exe('CREATE (:MetaData {id: "mid", jsonStr: "' + jsonStr.replace('"', '\\"') + '", __pmdtype: "metadata", __typename: "MetaData"})')
        cls.exe('Match(a:MetaData{id: "mid"})\nMatch(b:Schema {id: "sid"})\nCREATE (a)<-[:MetaDataHasSchema{id: "sid : mid"}]-(b)')

        r = cls.exe('Match(a)<-[r:TestLink]-(b) return a, b')
        return r 

    @classmethod
    def own(cls, token: str):
        query = f"MATCH (n:Login) WHERE n.token = '{token}' RETURN n.mail AS mail"
        r = cls.exe(query)
        mail = r[0]['mail']
        query = f"MATCH (n:User) WHERE n.mail = '{mail}' RETURN n.group AS group"
        r = cls.exe(query)
        group = r[0]['group']
        r = cls.exe('Match(a)<-[r:TestLink]-(b:TestDataSet{group:"' + group + '"}) return a, b')
        return r 

    @classmethod
    def oth(cls):
        r = cls.exe('Match(a)<-[r:TestLink]-(b:TestDataSet{auth:"public"}) return a, b')
        return r 

    @classmethod
    def link(cls, tov, fromv):
        cypher = 'Match(a:TestDataSet{title:"' + tov + '"})\nMatch(b:TestDataSet{title:"' + fromv + '"})\nCREATE (a)<-[:TestRef]-(b)'
        r = cls.exe(cypher)
        return r 

    @classmethod
    def ref(cls):
        r = cls.exe('Match(a)<-[r:TestRef]-(b) return a, b')
        return r 

    @classmethod
    def owndata(cls, token: str):
        query = f"MATCH (n:Login) WHERE n.token = '{token}' RETURN n.mail AS mail"
        r = cls.exe(query)
        mail = r[0]['mail']
        query = f"MATCH (n:User) WHERE n.mail = '{mail}' RETURN n.group AS group"
        r = cls.exe(query)
        group = r[0]['group']
        r = cls.exe('Match(a{group:"' + group + '"})<-[r:TestDif]-(b{group:"' + group + '"}) return a, b')
        return r 

    @classmethod
    def othdata(cls):
        r = cls.exe('Match(a{auth:"public"})<-[r:TestDif]-(b{auth:"public"}) return a, b')
        return r 

    @classmethod
    def dif(cls):
        r = cls.exe('Match(a)<-[r:TestDif]-(b) return a, b')
        return r 

    @classmethod
    def all(cls, value: str):
        list = []
        cypher = "MATCH (a:TestCatalog) WHERE a.body =~ '.*" + value + ".*' AND a.auth = 'public' RETURN a"
        list += cls.exe(cypher)
        cypher = "MATCH (b:TestDataSet) WHERE b.body =~ '.*" + value + ".*' AND b.auth = 'public' RETURN b"
        list += cls.exe(cypher)
        cypher = "MATCH (c:TestData) WHERE c.body =~ '.*" + value + ".*' AND c.auth = 'public' RETURN c"
        list += cls.exe(cypher)
        return list

    @classmethod
    def makeTest(cls):
        cls.exe('CREATE (:TestData2 {title: "追加したデータ", xxx: "追加したカラム1x", yyy: "追加したカラム2y", zzz: "追加したカラム3z", auth: "public", group: "他社", __pmdtype: "data", __typename: "TestData2"})')
        cypher = 'MATCH (n:TestData2) RETURN n'
        r = cls.exe(cypher)
        return r 

    @classmethod
    def makeTest2(cls):
        cls.exe('CREATE (:TestData3 {title: "追加したデータ", aaa: "追加したカラム1a", bbb: "追加したカラム2b", ccc: "追加したカラム3c", auth: "public", group: "他社", __pmdtype: "data", __typename: "TestData3"})')
        cypher = 'MATCH (n:TestData3) RETURN n'
        r = cls.exe(cypher)
        return r 

    @classmethod
    def hdatas(cls):
        cypher = "MATCH (a:HCatalog) WHERE a.auth = 'public' RETURN a"
        cdata = cls.exe(cypher)
        catalog = cdata[0]['a']

        sdata = cls.exe('Match(a:HCatalog)<-[r:HLink]-(b:HDataSet) return b')
        datasets = list(map(lambda x: x['b'], sdata))

        catalog['datasets'] = datasets

        for dsi in datasets:
            ccopy = catalog.copy()
            ccopy['datasets'] = []
            dsi['catalog'] = ccopy

            ddata = cls.exe('Match(b:HDataSet{title:"' + dsi['title'] + '"})<-[r:HLinkDif]-(c:HData) return c')
            datas = list(map(lambda x: x['c'], ddata))
            ndsi = dsi.copy()
            ccopy2 = ccopy.copy()
            ndsi['catalog'] = ccopy2
            ndsi['datas'] = []
            for ddi in datas:
                cddi = ddi.copy()
                ndsi['datas'].append(cddi)
                ddi['datasets'] = ndsi
            dsi['datas'] = datas

        return catalog

    @classmethod
    def save(cls, data):
        if not any(data):
            return
        strch = []
        for mykey in data.keys():
            strch.append(mykey + ':"' + json.dumps(data[mykey]).replace('"', '\\"') + '"')

        dt = datetime.datetime.now()
        dateName = dt.strftime('%Y/%m/%d %H:%M:%S')
        cypher = 'CREATE (:KnownData {dtname:"' + dateName + '", ' + ','.join(strch) + ', jsonData:"' + json.dumps(data).replace('"', '\\"') + '", __public: "public", __group: "自社", __typename: "KnownData"})'
        cls.exe(cypher)
        return

    @classmethod
    def remove(cls, data):
        cypher = 'MATCH (u:KnownData{dtname:"' + data + '"}) DELETE u'
        r = cls.exe(cypher)
        return r

    @classmethod
    def findList(cls, target: str, value: str):
        cypher = f"MATCH(n:KnownData) RETURN n"
        r = cls.exe(cypher)
        r = list(map(lambda x: {'dtname':x['n']['dtname'], 'jsonData': json.loads(x['n']['jsonData'])}, r))
        return r

    @classmethod
    def job(cls, data):
        if not any(data):
            return
        if not any(data['queryData']):
            return
        dt = datetime.datetime.now()
        dateName = dt.strftime('%Y/%m/%d %H:%M:%S')
        cypher = 'CREATE (:JobData {dtname:"' + dateName + '", jsonData:"{}", query:"' + data['queryData'].replace('"', '\\"') + '", __public: "public", __group: "自社", __pmdtype: "job", __typename: "JobData"})'
        print()
        print()
        print(cypher)
        print()
        print()
        cls.exe(cypher)
        return

    @classmethod
    def findJob(cls, target: str, value: str):
        cypher = f"MATCH(n:JobData) RETURN n"
        r = cls.exe(cypher)
        r = list(map(lambda x: {'dtname': x['n']['dtname'], 'jsonData': json.loads(x['n']['jsonData']), 'query': x['n']['query']}, r))
        return r

    @classmethod
    def pdatas(cls):
        cdatas = cls.exe("MATCH (a:Category) RETURN a")
        categorys = list(map(lambda x: x['a'], cdatas))

        for cati in categorys:
            cati['datas'] = []
            for groId in cati['ids'].split(','):
                gdatas = cls.exe('MATCH (b:Group{pname:"' + groId + '", pid:"' + cati['pname'] + '"}) RETURN b')
                group = gdatas[0]['b']
                cati['datas'].append(group)
                adatas = cls.exe('MATCH (c:Alias{pid:"' + group['pname'] + '"}) RETURN c')
                aliass = list(map(lambda x: x['c'], adatas))
                group['datas'] = aliass
                for alii in aliass:
                    alii['datas'] = []
                    for datId in alii['ids'].split(','):
                        ddatas = cls.exe('MATCH (d:DataSet{pname:"' + datId + '", pid:"' + alii['pname'] + '"}) RETURN d')
                        dataset = ddatas[0]['d']
                        alii['datas'].append(dataset)
        return categorys


    @classmethod
    def pdacs(cls):
        r = cls.exe('Match(a:MetaData)<-[r:MetaDataHasSchema]-(b:Schema) return a, b')
        datas = []
        for ri in r:
            schema = ri['b']
            metadata = ri['a']
            datas.append({schema['id'] + ' : ' + metadata['id']: {'schema': schema, 'metadata': metadata}})
        return datas


