from ariadne.explorer import ExplorerGraphiQL
from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
from ariadne import InputType

import json
from neo4j import GraphDatabase

from ariadne import ObjectType,graphql_sync,  QueryType, gql, make_executable_schema
from ariadne.asgi import GraphQL


import re


DB_PATH = "bolt://localhost:7687"
DB_NAME = "neo4j"
DB_USER = "neo4j"
DB_PASSWORD = "password"

global typeList
typeList = ['TestData', 'HData']
global datasQuery
datasQuery = [
'{'
, '  datas(title: "${XXX}") {'
, '    ... on TestData {'
, '      title'
, '      body'
, '    }'
]
global query
query = QueryType()
global squ
squ = """
type Query {
    datas(title: String!): [SearchDataResult]!
    links(start: String, end: String): SearchResult
    export(category: String!, group: String): Category
}

type Category {
    pname: String
    ids: String
    datas: [Group]
}
type Group {
    pname: String
    ids: String
    pid: String
    datas: [Alias]
}
type Alias {
    pname: String
    id: String
    ids: String
    ppid: String
    pid: String
    datas: [DataSet]
    schema: DacsData
    metadata: DacsData
}
type DataSet {
    pname: String
    ids: String
    pid: String
    datas: [Data]
}
type Data {
    datafile_name: String
    file_id: String
    summary: String
}
type DacsData {
    id: String
    jsonStr: String
}


type HCatalog {
    title: String
    body: String
    datasets: [HDataSet]
}

type HDataSet {
    catalog: HCatalog
    title: String
    body: String
    datas: [HData]
}

type HData {
    datasets: [HDataSet]
    title: String
    body: String
}

union SearchResult = HCatalog | HDataSet | HData




type TestData {
    title: String
    body: String
}
"""
global schema

app = Flask(__name__)
CORS(app)
explorer_html = ExplorerGraphiQL().html(None)




def exe(cypher: str):
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


@query.field("links")
def resolve_links(_, info, start: str, end: str):
    request = info.context["request"]
    data = request.get_json()

    dd = re.sub(' +', '\n', data['query'].replace('{', '\n{\n').replace('}', '\n}\n'))
    arr = list(filter(lambda x: len(x) != 0, dd.split('\n')))

    ucdcls = ""
    udscls = ""
    uddcls = ""

    queryText = ''.join(arr)
    startDataset = None
    startData = None
    if queryText.find('HCatalog') >= 0:
        if len(start) > 0:
            ucdcls = " AND a.title = '" + start + "' "

    cypher = "MATCH (a:HCatalog) WHERE a.auth = 'public' " + ucdcls + " RETURN a"
    cdata = exe(cypher)
    catalog = cdata[0]['a']

    if queryText.find('HDataSet') >= 0:
        if len(start) > 0:
            udscls = " AND b.title = '" + start + "' "
            cypher = "MATCH (b:HDataSet) WHERE b.auth = 'public' " + udscls + " RETURN b"
            sdata = exe(cypher)
            startDataset = sdata[0]['b']
            startDataset['catalog'] = catalog
            ddata = exe('Match(b:HDataSet{title:"' + startDataset['title'] + '"})<-[r:HLinkDif]-(c:HData) return c')
            datas = list(map(lambda x: x['c'], ddata))
            startDataset['datas'] = datas
            #データ削除

    elif queryText.find('HData') >= 0:
        if len(start) > 0:
            uddcls = " AND c.title = '" + start + "' "
            cypher = "MATCH (c:HData) WHERE c.auth = 'public' " + uddcls + " RETURN c"
            ddata = exe(cypher)
            startData = ddata[0]['c']
            sdata2 = exe('Match(b:HDataSet)<-[r:HLinkDif]-(c:HData{title:"' + startData['title'] + '"}) return b')
            sdatasets = list(map(lambda x: x['b'], sdata2))
            for sdi in sdatasets:
                sdi['catalog'] = catalog
            startData['datasets'] = sdatasets
            #データ削除

    sdata = exe('Match(a:HCatalog)<-[r:HLink]-(b:HDataSet) return b')
    datasets = list(map(lambda x: x['b'], sdata))

    uddclsEnd = ''
    if len(end) > 0:
        uddclsEnd = '{title:"' + end + '"}'

    for dsi in datasets:
        ccopy = catalog.copy()
        ccopy['datasets'] = []
        dsi['catalog'] = ccopy

        ddata = exe('Match(b:HDataSet{title:"' + dsi['title'] + '"})<-[r:HLinkDif]-(c:HData' + uddclsEnd + ') return c')
        datas = list(map(lambda x: x['c'], ddata))
        ndsi = dsi.copy()
        ccopy2 = ccopy.copy()
        ndsi['catalog'] = ccopy2
        ndsi['datas'] = []
        ccopy2['datasets'].append(ndsi)
        for ddi in datas:
            ddi['datasets'] = []
        for ddi in datas:
            cddi = ddi.copy()
            ndsi['datas'].append(cddi)
            ddi['datasets'].append(ndsi)
        dsi['datas'] = datas

    if queryText.find('HDataSet') >= 0:
        for idss in range(len(datasets)):
            if datasets[idss]['title'] == startDataset['title']:
                del datasets[idss]
                break

    elif queryText.find('HData') >= 0:
        for idss in datasets:
            for idds in range(len(idss['datas'])):
                if idss['datas'][idds]['title'] == startData['title']:
                    del idss['datas'][idds]
                    break

    catalog['datasets'] = list(filter(lambda x: len(x['datas']) > 0, datasets))

    if queryText.find('HCatalog') >= 0:
        return catalog
    if queryText.find('HDataSet') >= 0:
        return startDataset
    if queryText.find('HData') >= 0:
        return startData


@query.field("datas")
def resolve_datas(_, info, title):
    global typeList
    r = exe(f"MATCH (n) WHERE n.title = '{title}' and n.__pmdtype = 'data' RETURN n")
    arr = []
    for obj in r:
        if obj['n']['__typename'] in typeList:
            arr.append(obj['n'])
    print(arr)
    return arr

@query.field("export")
def resolve_export(_, info, category: str, group: str):

    groClause = len(group) > 0
    groValue = group

    catClause = '{pname: "' + category + '"}'

    cdatas = exe('MATCH (a:Category' + catClause + ') RETURN a')
    cati = cdatas[0]['a']

    cati['datas'] = []
    dacsDatas = {}
    fileDatas = {}
    for groId in cati['ids'].split(','):
        if groClause and groValue != groId:
            continue

        gdatas = exe('MATCH (b:Group{pname:"' + groId + '", pid:"' + cati['pname'] + '"}) RETURN b')
        group = gdatas[0]['b']
        cati['datas'].append(group)

        adatas = exe('MATCH (c:Alias{ppid:"' + cati['pname'] + '", pid:"' + group['pname'] + '"}) RETURN c')
        aliass = list(map(lambda x: x['c'], adatas))
        group['datas'] = aliass

        for dacsId in group['ids'].split(','):
            r = exe('Match(a:MetaData)<-[r:MetaDataHasSchema{id: "' + dacsId + '"}]-(b:Schema) return a, b')
            for ri in r:
                schema = ri['b']
                metadata = ri['a']
                dacsDatas[dacsId] = {'schema': schema, 'metadata': metadata}

                metadataJson = json.loads(ri['a']['jsonStr'])
                for fi in metadataJson['list']:
                    fileDatas[fi['data']['file_id']] = fi['data']

        for alii in aliass:

            alii['schema'] = dacsDatas[alii['id']]['schema']
            alii['metadata'] = dacsDatas[alii['id']]['metadata']

            alii['datas'] = []
            for datId in alii['ids'].split(','):
                ddatas = exe('MATCH (d:DataSet{pname:"' + datId + '", pid:"' + alii['pname'] + '"}) RETURN d')
                dataset = ddatas[0]['d']
                dataset['datas'] = []
                for fileId in dataset['ids'].split(','):
                    dataset['datas'].append(fileDatas[fileId])
                alii['datas'].append(dataset)
    return cati

@app.route("/dataq", methods=["GET"])
def getDatasQuery():
    global datasQuery
    return datasQuery

@app.route("/reset", methods=["GET"])
def reset():
    global schema
    global typeList
    global datasQuery
    global squ
    r = exe("MATCH (n) WHERE n.__pmdtype = 'data' RETURN n")
    strg = '\n\n'
    for obj in r:
        if obj['n']['__typename'] not in typeList:
            keys = [*obj['n']]
            strg += '    type ' + obj['n']['__typename'] + ' {\n'
            datasQuery.append('    ... on ' + obj['n']['__typename'] + ' {')
            for key in keys:
                if key not in ['auth', '__pmdtype', '__typename', 'group']:
                    strg += '        ' + key + ': String\n'
                    datasQuery.append('      ' + key)
            strg += '    }\n'
            datasQuery.append('    }')
            typeList.append(obj['n']['__typename'])

    ss = '\n\nunion SearchDataResult = ' + ' | '.join(typeList) + '\n\n'
    print()
    print(squ + strg + ss)
    print()
    print(datasQuery)
    print()
    squ += strg
    type_defs = gql(squ + ss)
    schema = make_executable_schema(type_defs, query)
    return {"aa":"aa"}


@app.route("/graphql", methods=["GET"])
def graphql_explorer():
    return explorer_html, 200

@app.route("/graphql", methods=["POST"])
def graphql_server():
    global schema
    data = request.get_json()
    success, result = graphql_sync(
        schema,
        data,
        context_value={"request": request},
        debug=app.debug
    )
    status_code = 200 if success else 400
    return jsonify(result), status_code

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=4000, debug=True)

