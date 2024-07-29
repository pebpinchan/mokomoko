from flask import Blueprint, request, jsonify, make_response
from service.Neo4jService import Neo4jService as service


apis = Blueprint('apis', __name__, url_prefix='/api')

@apis.route('/list', methods=['GET'])
def getList():
    dh = dict(request.headers)
    data = {}
    if service.isAdmin(dh['Token']):
        data = service.list()
    return jsonify(data), 200

@apis.route('/<target>', methods=['GET'])
def getTargets(target):
    query = request.args.get("v").replace('"', '').replace("'", '').replace("{", ''.replace("}", ''))
    res = service.find(target, query)
    return make_response(jsonify(res))

@apis.route("/i/dc", methods=['POST'])
def dcinfo():
    dh = dict(request.headers)
    data = {}
    if service.isAdmin(dh['Token']):
        data = request.json
        service.save(data)
    return make_response(jsonify(data))

@apis.route("/login", methods=['POST'])
def login():
    data = request.json
    print(data)
    res = service.login(data['mail'], data['password'])
    # データ処理
    return res, 200

@apis.route("/logout", methods=['GET'])
def logout():
    dh = dict(request.headers)
    res = service.logout(dh['Token'])
    return {}, 200

@apis.route("/make", methods=['GET'])
def make():
    res = service.make()
    return jsonify(res), 200

@apis.route('/own', methods=['GET'])
def getOwn():
    dh = dict(request.headers)
    data = service.own(dh['Token'])
    return jsonify(data), 200

@apis.route('/oth', methods=['GET'])
def getOth():
    data = service.oth()
    return jsonify(data), 200

@apis.route('/link', methods=['GET'])
def getLink():
    tov = request.args.get("to")
    fromv = request.args.get("from")
    service.link(tov, fromv)
    return {}, 200

@apis.route('/ref', methods=['GET'])
def getRef():
    data = service.ref()
    return jsonify(data), 200

@apis.route('/odn', methods=['GET'])
def getOwnData():
    dh = dict(request.headers)
    data = service.owndata(dh['Token'])
    return jsonify(data), 200

@apis.route('/odh', methods=['GET'])
def getOthData():
    data = service.othdata()
    return jsonify(data), 200

@apis.route('/dif', methods=['GET'])
def getDif():
    data = service.dif()
    return jsonify(data), 200

@apis.route('/all', methods=['GET'])
def getAll():
    query = request.args.get("v").replace('"', '').replace("'", '').replace("{", ''.replace("}", ''))
    data = service.all(query)
    return jsonify(data), 200

@apis.route('/maketest', methods=['GET'])
def getMakeTest():
    data = service.makeTest()
    return jsonify(data), 200

@apis.route('/maketest2', methods=['GET'])
def getMakeTest2():
    data = service.makeTest2()
    return jsonify(data), 200

@apis.route('/hdatas', methods=['GET'])
def getHdatas():
    data = service.hdatas()
    return jsonify(data), 200

@apis.route('/find', methods=['GET'])
def getFindList():
    data = service.findList()
    return jsonify(data), 200

@apis.route('/remove', methods=['GET'])
def getRemove():
    query = request.args.get("v")
    res = service.remove(query)
    data = service.findList()
    return jsonify(data), 200

@apis.route('/joblist', methods=['GET'])
def getJobList():
    data = service.findJob('', '')
    return jsonify(data), 200

@apis.route("/i/job", methods=['POST'])
def insertJob():
    data = {}
    data = request.json
    service.job(data)
    return jsonify(data), 200

@apis.route('/pdatas', methods=['GET'])
def getPdatas():
    query = request.args.get("v")
    data = service.pdatas(query)
    return jsonify(data), 200

@apis.route('/pdacs', methods=['GET'])
def getPdacs():
    query = request.args.get("v")
    data = service.pdacs(query)
    return jsonify(data), 200


@apis.route('/pfdata', methods=['GET'])
def getPpfdata():
    query = request.args.get("v")
    data = service.pfdata(query)
    return jsonify(data), 200


@apis.route('/pcdata', methods=['GET'])
def getPcdata():
    data = service.pcdata()
    return jsonify(data), 200


@apis.route('/dclist', methods=['GET'])
def getDclist():
    data = service.dacsList()
    return jsonify(data), 200

@apis.route("/i/up", methods=['POST'])
def dasaveup():
    dh = dict(request.headers)
    dataRes = []
    if service.isAdmin(dh['Token']):
        data = request.json
        dataRes = service.savecat(data)
    return make_response(jsonify(dataRes))


@apis.route("/i/mid", methods=['POST'])
def dasavemid():
    dh = dict(request.headers)
    dataRes = []
    if service.isAdmin(dh['Token']):
        data = request.json
        dataRes = service.saveAlias(data)
    return make_response(jsonify(dataRes))



