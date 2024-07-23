from service.Neo4jService import Neo4jService

def test_list(mocker):
    mocker.patch.object(Neo4jService, 'execute').return_value = [1, 2, 3]
    r = Neo4jService.list()
    assert r == [1, 2, 3]

def test_find(mocker):
    mocker.patch.object(Neo4jService, 'execute').return_value = [1, 2, 3]
    r = Neo4jService.find('', '')
    assert r == [1, 2, 3]
