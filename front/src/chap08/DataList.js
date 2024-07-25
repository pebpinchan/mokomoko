import React, { useContext, useState } from "react";
import Graph, { Edge } from "react-json-graph";
import axios from 'axios';

import JSONViewer from 'react-json-viewer';
import JsonView from '@uiw/react-json-view';
import { monokaiTheme } from '@uiw/react-json-view/monokai';

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';


import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';



import DeleteIcon from '@mui/icons-material/Delete';

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

import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';


import Accordion from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';





const GrapgContext = React.createContext({});



export default function DataList() {







const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'white',
    color: 'black',
    maxWidth: '100%',
    fontSize: theme.typography.pxToRem(10),
  },
}));

const handleClick = async (data) => {
  const res = await axios.get('http://172.23.67.87:5000/api/remove?v=' + data, {headers: {"Token":token}, data:{}});
  if (res.data) {
    setExample(res.data);
    setExample2({});
  }
};

const handleClick2 = async (data) => {
  setExample2(data);
};

const Ltable = (jdata) => {
  if (typeof jdata != 'object') return jdata;
  if (jdata == []) return jdata;
  if (!jdata) return jdata;

  const arrList = ['auth', 'datasets', 'datas', 'catalog', '__typename', 'group', '__pmdtype'];
  let countI = 1;
  return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableBody>

        {jdata.map(v => (
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} key={countI++} >
              <TableCell component="th" scope="row">
                {v['dtname']}
              </TableCell>
              <TableCell>
                <Button variant="outlined" size="small" onClick={() => handleClick2(v['jsonData'])}>Open</Button>
              </TableCell>
              <TableCell>
                <Button variant="outlined" size="small" onClick={() => handleClick(v['dtname'])}><DeleteIcon /></Button>
              </TableCell>
            </TableRow>
        ))}

          </TableBody>
        </Table>
      </TableContainer>

  );
};
const Ltable2 = (jdata, countI) => {
  if (typeof jdata != 'object') return jdata;
  if (jdata == []) return jdata;
  if (!jdata) return jdata;

  const arrList = ['auth', 'datasets', 'datas', 'catalog', '__typename', 'group', '__pmdtype'];
  return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableBody>

        {Object.keys(jdata).filter((jkey) => !arrList.includes(jkey)).map(v => (
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} key={countI++} >
              <TableCell component="th" scope="row">
                {v}
              </TableCell>
              <TableCell>
                {Ltable2(jdata[v], countI)}
              </TableCell>
            </TableRow>
        ))}

          </TableBody>
        </Table>
      </TableContainer>

  );
};







  const initial = {
    nodes: [],
    edges: [],
    isStatic: true,
    isVertical: true,
    isDirected: true,
    height: 100
  };
  




  const [text, setText] = useState("y.yokouchi@pebblecorp.co.jp");
  const [text2, setText2] = useState("http://172.23.67.87:5000/api/i/dc");
  const [text3, setText3] = useState('{"test":"value"}');
  const [data, setData] = useState(initial);
  const [data2, setData2] = useState(initial);
  const [data3, setData3] = useState(initial);
  const [data4, setData4] = useState([]);
  const [token, setToken] = useState("9d2ad0e79acbfad52bea1c89ac71755170be5c7a9684d1ef45298386ec2470eb");
  const [example, setExample] = useState("");
  const [example2, setExample2] = useState("");
  const [ownData, setOwnData] = useState("");
  const [othData, setOthData] = useState("");
  const [jcol, setJcol] = useState("");
  async function doSomethingWithArg() {
    let data = {};
    if (text3) data = text3; 
    const response = await axios.post(text2, data, {headers: {"Token":token, 'Content-Type': 'application/json'}});
    setJcol(JSON.stringify(response.data, null, '\t'));
  }
  async function doXY2(label, __pmdtype) {
      const res = await axios.get('http://172.23.67.87:5000/api/find', {headers: {"Token":token}, data:{}});
      if (res.data) {
        setExample(res.data);
        setExample2({});
      }
  }
  async function doXY() {
    try {
      const res = await axios.get('http://172.23.67.87:5000/api/hdatas', {headers: {"Token":token}, data:{}});
      if (res.data) {
        let selects = [];
        const rcatalog = res.data;
        let list = [];
        let listLink = [];
        list.push({
          id: '0',
          label: rcatalog.title,
          data: rcatalog,
          position: { x: 50, y: 0 }
        });
        let countV = 1;
        for (let i = 0; i < rcatalog.datasets.length; i++) {
          countV += 1;
          list.push({
            id: countV,
            label: rcatalog.datasets[i].title,
            position: { x: 250, y: (i + 1) * 100 },
            data: rcatalog.datasets[i]
          });
          listLink.push({source: "0", target: countV});
          const idvvv = countV;
          for (let j = 0; j < rcatalog.datasets[i].datas.length; j++) {
            countV += 1;
            list.push({
              id: countV,
              label: rcatalog.datasets[i].datas[j].title,
              position: { x: 300 + ((j + 1) * 200), y: ((i + 1) * 100) + 100 },
              data: rcatalog.datasets[i].datas[j]
            });
            listLink.push({source: idvvv, target: countV});
            selects.push(rcatalog.datasets[i].datas[j].title);
          }
        }
        const ini = {
          nodes: list,
          edges: listLink,
          isStatic: true,
          isVertical: true,
          isDirected: true,
          height: 150 * rcatalog.datasets.length,
        };
        await setData(ini);
        await setText2(rcatalog.title);
        await setData4(selects);
      }
    } catch (error) {
      alert(error);
    }
  }



const styleJ = {
  backgroundColor: "white",
  display: "flex",
  width: "auto",
  overflow: "auto"
};


const graphJsonObj = {
        nodes: [{
            id: '0',
            label: 'Alice',
            position: {x: 150, y: 250},
        },
        {
            id: '1',
            label: 'Bob',
            position: {x: 350, y: 350},
        }],
        edges: [{
            source: '0',
            target: '1'
        }]
    };


  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
                <TextField value={text2} onChange={(event) => setText2(event.target.value)} style={{width: "100%"}} label="post" variant="standard" />
              </TableCell>

              <TableCell>
                <textarea value={text3} onChange={(event) => setText3(event.target.value)} />
              </TableCell>

              <TableCell>
                <Button variant="outlined" size="small" onClick={() => doSomethingWithArg()}>Send</Button>
              </TableCell>
            </TableRow>


            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

              <TableCell component="th" scope="row">
              </TableCell>

              <TableCell>
              </TableCell>

              <TableCell>
                <Button variant="outlined" size="small" onClick={() => doXY2()}>Load</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <Divider style={{margin: "180px", marginTop: "80px", marginBottom: "80px"}}>
          <Chip label="Result" color="primary" variant="outlined" size="large" />
        </Divider>
      </Box>

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <textarea value={jcol} style={{width:"100%", height:"100px"}} onChange={(event) => setJcol(event.target.value)} />
      </Box>

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <Divider style={{margin: "180px", marginTop: "80px", marginBottom: "80px"}}>
          <Chip label="List" color="primary" variant="outlined" size="large" />
        </Divider>
      </Box>

      <Box sx={{ width: '100%', typography: 'body1' }}>
        {Ltable(example)}
      </Box>

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <Divider style={{margin: "180px", marginTop: "80px", marginBottom: "80px"}}>
          <Chip label="Node" color="primary" variant="outlined" size="large" />
        </Divider>
      </Box>

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="result">
              <Tab label="Json" value="1" />
              <Tab label="Table" value="2" />
              <Tab label="Tree" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <textarea style={{width:"100%", height:"300px"}} onChange={(event) => setExample2(event.target.value)} value={JSON.stringify(example2, null, '\t')} />
          </TabPanel>
          <TabPanel value="2">
            {Ltable2(example2, 0)}
          </TabPanel>
          <TabPanel value="3"><JsonView style={monokaiTheme} value={example2} /></TabPanel>
        </TabContext>
      </Box>

    </React.StrictMode>
  );
}
