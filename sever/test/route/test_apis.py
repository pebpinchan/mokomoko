import pytest
from service.Neo4jService import Neo4jService
from main import app

@pytest.fixture
def before():
    app.config['TESTING'] = True

@pytest.fixture()
def client():
    return app.test_client()

def test_getList(mocker, client):
    mocker.patch.object(Neo4jService, 'list').return_value = [1, 2, 3]
    r = client.get('/api/')
    assert '200 OK' == r.status
    assert b'[1,2,3]\n' == r.data

def test_getTargets(mocker, client):
    mocker.patch.object(Neo4jService, 'find').return_value = [1, 2, 3]
    r = client.get('/api/xxx?q=xxx')
    assert '200 OK' == r.status
    assert b'[1,2,3]\n' == r.data
