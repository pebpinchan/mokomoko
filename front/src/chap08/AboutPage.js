import React, { useContext, useState } from "react";
import Graph, { Edge } from "react-json-graph";
import axios from 'axios';

import JSONViewer from 'react-json-viewer';

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';




const GrapgContext = React.createContext({});



export default function AboutPage() {








class CustomNode extends React.PureComponent {
  static contextType = GrapgContext;

  render() {
    const { id, x, y, width, height } = this.props;
    const { data, setData } = this.context;
    const node = data.nodes.find((node) => node.id == id);
    const active = node.active;
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "white",
          alignItems: "center",
          border: "1px solid",
          borderColor: active ? "blue" : "grey",
          borderRadius: 5,
          padding: "0 10px",
          position: "absolute",
          left: x,
          top: y,
          width: 120,
          height: 35,
          cursor: "pointer",
          transition: "left 300ms, top 300ms"
        }}
        onClick={() => {
          setExample(node.data);
          if (node.to) {
            setText2(node.label)
          } else {
            setText3(node.label)
          }
        }}
      >
        <div>-</div>
        <div>{node.label}</div>
      </div>
    );
  }
}
class CustomNode2 extends React.PureComponent {
  static contextType = GrapgContext;

  render() {
    const { id, x, y, width, height } = this.props;
    const { data2, setData2 } = this.context;
    const node = data2.nodes.find((node) => node.id == id);
    const active = node.active;
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "white",
          alignItems: "center",
          border: "1px solid",
          borderColor: active ? "blue" : "grey",
          borderRadius: 5,
          padding: "0 10px",
          position: "absolute",
          left: x,
          top: y,
          width: 120,
          height: 35,
          cursor: "pointer",
          transition: "left 300ms, top 300ms"
        }}
        onClick={() => {
          setExample(node.data);
          if (node.to) {
            setText2(node.label)
          } else {
            setText3(node.label)
          }
        }}
      >
        <div>-</div>
        <div>{node.label}</div>
      </div>
    );
  }
}
class CustomNode3 extends React.PureComponent {
  static contextType = GrapgContext;

  render() {
    const { id, x, y, width, height } = this.props;
    const { data3, setData3 } = this.context;
    const node = data3.nodes.find((node) => node.id == id);
    const active = node.active;
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "white",
          alignItems: "center",
          border: "1px solid",
          borderColor: active ? "blue" : "grey",
          borderRadius: 5,
          padding: "0 10px",
          position: "absolute",
          left: x,
          top: y,
          width: 120,
          height: 35,
          cursor: "pointer",
          transition: "left 300ms, top 300ms"
        }}
        onClick={() => {
          setExample(node.data);
          if (node.to) {
            setText2(node.label)
          } else {
            setText3(node.label)
          }
        }}
      >
        <div>-</div>
        <div>{node.label}</div>
      </div>
    );
  }
}
class CustomNode4 extends React.PureComponent {
  static contextType = GrapgContext;

  render() {
    const { id, x, y, width, height } = this.props;
    const { data4, setData4 } = this.context;
    const node = data4.nodes.find((node) => node.id == id);
    const active = node.active;
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "white",
          alignItems: "center",
          border: "1px solid",
          borderColor: active ? "blue" : "grey",
          borderRadius: 5,
          padding: "0 10px",
          position: "absolute",
          left: x,
          top: y,
          width: 120,
          height: 35,
          cursor: "pointer",
          transition: "left 300ms, top 300ms"
        }}
        onClick={() => {
          setExample(node.data);
          if (node.to) {
            setText2(node.label)
          } else {
            setText3(node.label)
          }
        }}
      >
        <div>-</div>
        <div>{node.label}</div>
      </div>
    );
  }
}













  const initial = {
    nodes: [],
    edges: [],
    isStatic: true,
    isVertical: true,
    isDirected: true
  };
  
  
  const Viz = () => {
    const { data, setData } = useContext(GrapgContext);
    return (
      <div>
        <Graph
          width={1300}
          height={700}
          json={data}
          Node={CustomNode}
        />
      </div>
    );
  };
  
  const Viz2 = () => {
    const { data2, setData2 } = useContext(GrapgContext);
    return (
      <div>
        <Graph
          width={1300}
          height={700}
          json={data2}
          Node={CustomNode2}
        />
      </div>
    );
  };
  const Viz3 = () => {
    const { data3, setData3 } = useContext(GrapgContext);
    return (
      <div>
        <Graph
          width={1300}
          height={700}
          json={data3}
          Node={CustomNode3}
        />
      </div>
    );
  };
  
  const Viz4 = () => {
    const { data4, setData4 } = useContext(GrapgContext);
    return (
      <div>
        <Graph
          width={1300}
          height={700}
          json={data4}
          Node={CustomNode4}
        />
      </div>
    );
  };




  const [text, setText] = useState("y.yokouchi@pebblecorp.co.jp");
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");
  const [data, setData] = useState(initial);
  const [data2, setData2] = useState(initial);
  const [data3, setData3] = useState(initial);
  const [data4, setData4] = useState(initial);
  const [token, setToken] = useState("9d2ad0e79acbfad52bea1c89ac71755170be5c7a9684d1ef45298386ec2470eb");
  const [example, setExample] = useState("");
  const [example2, setExample2] = useState("");
  const [ownData, setOwnData] = useState("");
  const [othData, setOthData] = useState("");
  const [jcol, setJcol] = useState("");
  async function doSomethingWithArg() {
    try {
      const res = await axios.get('http://172.23.67.87:5000/api/link?to=' + text2 + '&from=' + text3, {headers: {"Token":token}, data:{}});
      await doXY();
    } catch (error) {
      alert(error);
    }
  }
  async function doXY() {
    try {
      const res = await axios.get('http://172.23.67.87:5000/api/own', {headers: {"Token":token}, data:{}});
      if (res.data) {
        let arr = {};
        for (let i = 0; i < res.data.length; i++) {
          let rarr = [];
          if (res.data[i].a.title in arr) {
            rarr = arr[res.data[i].a.title];
          }
          rarr.push(res.data[i].b);
          arr[res.data[i].a.title] = rarr;
        }

        let list = [];
        let listLink = [];
        list.push({
          id: '0',
          label: "CatalogA",
          position: { x: 50, y: 0 }
        });
        Object.keys(arr).forEach(catalog => {
          if (catalog == 'CatalogA') {
            for (let i = 0; i < arr[catalog].length; i++) {
              list.push({
                id: i + 1,
                label: arr[catalog][i].title,
                position: { x: 300, y: (i + 1) * 100 },
                group: arr[catalog][i].group,
                auth: arr[catalog][i].auth,
                data: arr[catalog][i],
                to: true
              });
              listLink.push({source: "0", target: i + 1});
            }
          }
        });



        const resOth = await axios.get('http://172.23.67.87:5000/api/oth', {headers: {"Token":token}, data:{}});
        arr = {};
        for (let i = 0; i < resOth.data.length; i++) {
          let rarr = [];
          if (resOth.data[i].a.title in arr) {
            rarr = arr[resOth.data[i].a.title];
          }
          rarr.push(resOth.data[i].b);
          arr[resOth.data[i].a.title] = rarr;
        }
        list.push({
          id: arr['CatalogA'].length + 1,
          label: "CatalogA",
          position: { x: 1030, y: 0 }
        });
        Object.keys(arr).forEach(catalog => {
          if (catalog == 'CatalogA') {
            let idx = arr['CatalogA'].length + 1;
            for (let i = 0; i < arr[catalog].length; i++) {
              list.push({
                id: idx + i + 1,
                label: arr[catalog][i].title,
                data: arr[catalog][i],
                position: { x: 780, y: (i + 1) * 100 }
              });
              listLink.push({source: idx, target: idx + i + 1});
            }
          }
        });

        const resRef = await axios.get('http://172.23.67.87:5000/api/ref', {headers: {"Token":token}, data:{}});
        for (let i = 0; i < resRef.data.length; i++) {
          const a = resRef.data[i].a.title;
          const fa = list.find(element => element.label == a);
          const b = resRef.data[i].b.title;
          const fb = list.reverse().find(element => element.label == b);
          listLink.push({source: fa.id, target: fb.id});
        }

        const ini = {
          nodes: list,
          edges: listLink,
          isStatic: true,
          isVertical: true,
          isDirected: true
        };
        await setData(ini);




//--
        const resOth2 = await axios.get('http://172.23.67.87:5000/api/oth', {headers: {"Token":token}, data:{}});
        arr = {};
        for (let i = 0; i < resOth2.data.length; i++) {
          let rarr = [];
          if (resOth2.data[i].a.title in arr) {
            rarr = arr[resOth2.data[i].a.title];
          }
          rarr.push(resOth2.data[i].b);
          arr[resOth2.data[i].a.title] = rarr;
        }
        const list2 = [];
        const listLink2 = [];
        list2.push({
          id: '0',
          label: "CatalogA",
          position: { x: 1030, y: 0 }
        });
        Object.keys(arr).forEach(catalog => {
          if (catalog == 'CatalogA') {
            for (let i = 0; i < arr[catalog].length; i++) {
              let iv = 150;
              if (i % 2 ==0) iv = 100;
              list2.push({
                id: i + 1,
                label: arr[catalog][i].title,
                data: arr[catalog][i],
                position: { x: (i + 1) * iv, y: (i + 1) * 100 }
              });
              listLink2.push({source: '0', target: i + 1});
            }
          }
        });

        const resRef2 = await axios.get('http://172.23.67.87:5000/api/ref', {headers: {"Token":token}, data:{}});
        for (let i = 0; i < resRef2.data.length; i++) {
          const a = resRef2.data[i].a.title;
          const fa = list2.find(element => element.label == a);
          const b = resRef2.data[i].b.title;
          const fb = list2.reverse().find(element => element.label == b);
          if (fa && fb) listLink2.push({source: fa.id, target: fb.id});
        }

        const ini2 = {
          nodes: list2,
          edges: listLink2,
          isStatic: true,
          isVertical: true,
          isDirected: true
        };
        await setData2(ini2);




//--
        const resOth3 = await axios.get('http://172.23.67.87:5000/api/odn', {headers: {"Token":token}, data:{}});
        arr = {};
        for (let i = 0; i < resOth3.data.length; i++) {
          let rarr = [];
          if (resOth3.data[i].a.title in arr) {
            rarr = arr[resOth3.data[i].a.title];
          }
          rarr.push(resOth3.data[i].b);
          arr[resOth3.data[i].a.title] = rarr;
        }
        const list3 = [];
        const listLink3 = [];
        let ii = 0;
        Object.keys(arr).forEach(catalog => {
          ii += 10;
          list3.push({
            id: '' + ii,
            label: catalog,
            position: { x: ii * 20 - 100, y: 10 }
          });
          for (let i = 0; i < arr[catalog].length; i++) {
            list3.push({
              id: ii + 1 + i,
              label: arr[catalog][i].title,
              data: arr[catalog][i],
              position: { x: (ii * 20), y: i * 50 + 100 }
            });
            listLink3.push({source: '' + ii, target: (ii + 1 + i)});
          }
        });

        const ini3 = {
          nodes: list3,
          edges: listLink3,
          isStatic: true,
          isVertical: true,
          isDirected: true
        };
        await setData3(ini3);





//--
        const resOth4 = await axios.get('http://172.23.67.87:5000/api/odh', {headers: {"Token":token}, data:{}});
        arr = {};
        for (let i = 0; i < resOth4.data.length; i++) {
          let rarr = [];
          if (resOth4.data[i].a.title in arr) {
            rarr = arr[resOth4.data[i].a.title];
          }
          rarr.push(resOth4.data[i].b);
          arr[resOth4.data[i].a.title] = rarr;
        }
        console.log(arr);
        const list4 = [];
        const listLink4 = [];
        ii = 0;
        Object.keys(arr).forEach(catalog => {
          ii += 10;
          list4.push({
            id: '' + ii,
            label: catalog,
            position: { x: ii * 20 - 100, y: 10 }
          });
          for (let i = 0; i < arr[catalog].length; i++) {
            list4.push({
              id: ii + 1 + i,
              label: arr[catalog][i].title,
              position: { x: (ii * 20), y: i * 50 + 100 },
              data: arr[catalog][i]
            });
            listLink4.push({source: '' + ii, target: (ii + 1 + i)});
          }
        });

        const ini4 = {
          nodes: list4,
          edges: listLink4,
          isStatic: true,
          isVertical: true,
          isDirected: true
        };
        await setData4(ini4);









      }
    } catch (error) {
      alert(error);
    }
  }

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



const styleJ = {
  backgroundColor: "white",
  display: "flex",
  width: "auto",
  overflow: "auto"
};


  return (
    <React.StrictMode>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <Divider style={{margin: "180px", marginTop: "80px", marginBottom: "80px"}}>
          <Chip label="API" color="primary" variant="outlined" size="large" />
        </Divider>
      </Box>



      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableBody>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                <TextField value={text2} onChange={(event) => setText2(event.target.value)} label="to" variant="standard" />
              </TableCell>
              <TableCell>
                <TextField value={text3} onChange={(event) => setText3(event.target.value)} label="from" variant="standard" />
              </TableCell>
              <TableCell>
                <Button variant="outlined" size="small" onClick={() => doSomethingWithArg()}>Link</Button>
              </TableCell>
            </TableRow>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
              </TableCell>
              <TableCell>
              </TableCell>
              <TableCell>
                <Button variant="outlined" size="small" onClick={() => doXY()}>Update</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <Divider style={{margin: "180px", marginTop: "80px", marginBottom: "80px"}}>
          <Chip label="Edit" color="primary" variant="outlined" size="large" />
        </Divider>
      </Box>

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="result">
              <Tab label="Own" value="1" />
              <Tab label="Other" value="2" />
              <Tab label="D-Own" value="3" />
              <Tab label="D-Other" value="4" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <GrapgContext.Provider value={{ data, setData }}>
              <Viz />
            </GrapgContext.Provider>
          </TabPanel>
          <TabPanel value="2">
            <GrapgContext.Provider value={{ data2, setData2 }}>
              <Viz2 />
            </GrapgContext.Provider>
          </TabPanel>
          <TabPanel value="3">
            <GrapgContext.Provider value={{ data3, setData3 }}>
              <Viz3 />
            </GrapgContext.Provider>
          </TabPanel>
          <TabPanel value="4">
            <GrapgContext.Provider value={{ data4, setData4 }}>
              <Viz4 />
            </GrapgContext.Provider>
          </TabPanel>
        </TabContext>
      </Box>

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <Divider style={{margin: "180px", marginTop: "80px", marginBottom: "80px"}}>
          <Chip label="Node" color="primary" variant="outlined" size="large" />
        </Divider>
      </Box>

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <div style={styleJ}><JSONViewer json={example} /></div>
      </Box>

    </React.StrictMode>
  );
}
