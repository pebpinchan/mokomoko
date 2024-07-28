
import React, { useMemo, useState, Component } from 'react';



import { createGraphiQLFetcher } from '@graphiql/toolkit';
import { GraphiQL } from 'graphiql';
import 'graphiql/graphiql.css';

import ReactDOM from 'react-dom/client';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';


import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';




import TextField from '@mui/material/TextField';

import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';


import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import JSONViewer from 'react-json-viewer';

import { FaAnglesUp } from "react-icons/fa6";
import { BiSolidDog } from "react-icons/bi";


import axios from 'axios';

import JsonView from '@uiw/react-json-view';
import { monokaiTheme } from '@uiw/react-json-view/monokai';
import Accordion from '@mui/material/Accordion';

import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';





const GetElementList = (tree, targetKey, childrenKey) => {
    let array = [];
    const GetElement = (tree, targetKey, childrenKey) => {
        for (const i in tree) {
            if (tree[i][targetKey]) {
                array.push(tree[i]);
            }
            if (tree[i][childrenKey]) {
                GetElement(tree[i][childrenKey], targetKey, childrenKey);
            }
        }
    }
    GetElement(tree, targetKey, childrenKey)
    return array;
}
const GetElement = (tree, targetKey, childrenKey) => {
    let data = null;
    for (const i in tree) {
        //console.log(tree[i]);
        if (tree[i][targetKey]) {
            data = tree[i];
            break;
        }
        if (tree[i][childrenKey]) {
            data = GetElement(tree[i][childrenKey], targetKey, childrenKey);
        }
        if (data) {
            break;
        }
    }
    return data;
}


const styleI2 = {
  zIndex: "1000",
  position: "fixed",
  bottom: "10%",
  right: "5%",
  width: "70px",
  height: "70px",
  lineHeight: "70px",
  color: "white",
  fontWeight: "bold",
  fontSize: "30px",
  background: "aqua",
  borderRadius: "50%",
  textAlign: "center"
};


const styleI = {
  zIndex: "1000",
  position: "fixed",
  bottom: "10%",
  right: "10%",
  width: "70px",
  height: "70px",
  lineHeight: "70px",
  color: "white",
  fontWeight: "bold",
  fontSize: "30px",
  background: "aqua",
  borderRadius: "50%",
  textAlign: "center"
};


const styleX = {
  margin: "50px",
};





const style3 = {
  width: "50%",
  height: "200px",
};



const style2 = {
  width: "100%",
  height: "400px",
};




const styleJ = {
  backgroundColor: "white",
  display: "flex",
  width: "auto",
  overflow: "auto"
};
const style = {
  display: "flex",
  width: "auto",
  overflow: "auto"
};

export default function ArticlePage() {
  const [token, setToken] = useState("d8215d0c957ffdb1ee63c48527d9d9e5eb55f522ba850f8cbb121dc60f14c60a");
  const [text, setText] = useState("");
  const [text2, setText2] = useState("追加したデータ");
  const [text3, setText3] = useState("");
  const [text4, setText4] = useState("");
  const [example, setExample] = useState("");
  const [example2, setExample2] = useState("");
  const [dcdata, setDcdata] = useState("");
  const [dsdata, setDsdata] = useState("");
  const [dddata, setDddata] = useState("");

const query1 = `{
  datas(title: "OYNOU") {
  }
}`;

  const [jcol, setJcol] = useState(query1);
  /*
  function toTop2() {
    window.scrollTo(0, document.body.scrollHeight);
  }
      <FaAnglesUp style={styleI} onClick={() => toTop()}/>
      <BiSolidDog style={styleI2} onClick={() => toTop2()} />
  function toTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  */
  function reset() {
    setExample({});
    setExample2({});
    setJcol('');
  }
  async function doX() {
    try {
      const res = await axios.get('http://172.23.67.87:5000/api/list', {headers: {"Token":token}, data:{}});
      if (res.data) {
        await setExample(res.data.map(d => d['n']));
        await setExample2(res.data.map(d => d['n']));


        const TreeModel = require('tree-model');
        const tree = new TreeModel();
        const model = JSON.parse(JSON.stringify(res.data.map(d => d['n'])));
        const root = tree.parse(model);
        
        let arr = [];
        root.walk(node => {
          node.model.map(m => arr = arr.concat(Object.keys(m)));
        });
        arr = [...new Set(arr)];
        setJcol(arr.join('\n'));
      }
    } catch (error) {
      alert('認証エラー');
    }
  }
  async function dos() {
    try {
      const res = await axios.get('http://172.23.67.87:5000/api/all?v=XXX');
      if (res.data) {
        console.log(res.data);

        const r1 = res.data.filter((value) => { return value['a']; }).map(d => d['a']);
        const r2 = res.data.filter((value) => { return value['b']; }).map(d => d['b']);
        const r3 = res.data.filter((value) => { return value['c']; }).map(d => d['c']);

        setDcdata(r1);
        setDsdata(r2);
        setDddata(r3);
      }
    } catch (error) {
      alert(error);
    }
  }

  function cloneArray(array) {
    let clone = [];
    array.forEach((item) =>
      Array.isArray(item) ? clone.push(cloneArray(item)) : clone.push(item)
    );
    return clone;
  }
  function exclude() {

    const arr = cloneArray(example2);

    
    for (let i = 0; i < arr.length; i++) {
      arr[i] = JSON.parse(JSON.stringify(arr[i]));
      Object.keys(arr[i]).forEach((item) => {
        if(jcol.split('\n').indexOf(item) >= 0) delete arr[i][item]
      })
    }

    let arr2 = [];
    for (let i = 0; i < arr.length; i++) {
      if (Object.keys(arr[i]).length > 0) {
        arr2.push(arr[i]);
      }
    }
    setExample(arr2);
  }
  async function recoil() {
    const res = await axios.get('http://172.23.67.87:4000/reset', {headers: {"Token":token}, data:{}});
  }
  function include() {

    const arr = cloneArray(example2);

    
    for (let i = 0; i < arr.length; i++) {
      arr[i] = JSON.parse(JSON.stringify(arr[i]));
      Object.keys(arr[i]).forEach((item) => {
        if(jcol.split('\n').indexOf(item) < 0) delete arr[i][item]
      })
    }

    let arr2 = [];
    for (let i = 0; i < arr.length; i++) {
      if (Object.keys(arr[i]).length > 0) {
        arr2.push(arr[i]);
      }
    }
    setExample(arr2);
  }


  const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
  };

  const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
  };

  const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    box-sizing: border-box;
    width: 100%;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
  );


const Litem = () => {
  const handleOnClick = (v, e) => {
    const arr = jcol.split('\n');
    for (let i = 0; i < arr.length; i++) {
      if (arr.indexOf(arr[i]) >= 0) {
        delete arr[arr.indexOf(v)];
      }
    }
    setJcol(arr.join('\n'));
  };
  return (
    <List>
      {jcol.split('\n').map(v => (
        <ListItem disablePadding>
          <ListItemButton onClick={handleOnClick.bind(this, v)} key={v}>
            <ListItemText primary={v} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};


  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };




  async function reset2() {
      const res = await axios.get('http://172.23.67.87:4000/dataq', {headers: {"Token":token}, data:{}});
      if (res.data) {
        const arr = res.data;
        arr.push('  }\n}');
        const qstr = arr.join('\n').replace('${XXX}', text2);
        setJcol(qstr);
        const data = {
          query: qstr
        };
        const response = await axios.post('http://172.23.67.87:4000/graphql', data);
        setExample(response.data);
      }
  }



  const fetcher = createGraphiQLFetcher({ url: 'http://172.23.67.87:4000/graphql' });
  return (
    <React.StrictMode>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <Divider style={{margin: "180px", marginTop: "80px", marginBottom: "80px"}}>
          <Chip label="API" color="primary" variant="outlined" size="large" />
        </Divider>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Query</TableCell>
              <TableCell>Search Field</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                datas
              </TableCell>
              <TableCell>
                <TextField value={text2} onChange={(event) => setText2(event.target.value)} label="title" variant="standard" />
              </TableCell>
              <TableCell>
                <Button variant="outlined" size="small" onClick={() => reset2()}>Send</Button>
              </TableCell>
            </TableRow>

            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
              </TableCell>
              <TableCell>
              </TableCell>
              <TableCell>
                <Button variant="outlined" size="small" onClick={() => recoil()}>Update</Button>
              </TableCell>
            </TableRow>

            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
              </TableCell>
              <TableCell>
              </TableCell>
              <TableCell>
                <Button variant="outlined" size="small" onClick={() => dos()}>RestAPI</Button>
              </TableCell>
            </TableRow>

          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <Divider style={{margin: "180px", marginTop: "80px", marginBottom: "80px"}}>
          <Chip label="Query" color="primary" variant="outlined" size="large" />
        </Divider>
      </Box>

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography>Query</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <GraphiQL fetcher={fetcher} query={jcol} /> 
          </AccordionDetails>
        </Accordion>
      </Box>

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <Divider style={{margin: "180px", marginTop: "80px", marginBottom: "80px"}}>
          <Chip label="Result" color="primary" variant="outlined" size="large" />
        </Divider>
      </Box>

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="result">
              <Tab label="Json" value="1" />
              <Tab label="Table" value="2" />
              <Tab label="Tree" value="3" />
              <Tab label="Rest API" value="4" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <textarea style={{width:"100%", height:"300px"}} onChange={(event) => setExample(event.target.value)} value={JSON.stringify(example, null, '\t')} />
          </TabPanel>
          <TabPanel value="2"><div style={styleJ}><JSONViewer json={example} /></div></TabPanel>
          <TabPanel value="3"><JsonView style={monokaiTheme} value={example} /></TabPanel>
          <TabPanel value="4">
            <Box sx={{ width: '100%', typography: 'body1' }}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon />}
                  aria-controls="panel3-content"
                  id="panel3-header"
                >
                  <Typography>Catalog</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div style={styleJ}>
                    <JSONViewer json={dcdata} />
                  </div>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon />}
                  aria-controls="panel4-content"
                  id="panel4-header"
                >
                  <Typography>DataSet</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div style={styleJ}>
                    <JSONViewer json={dsdata} />
                  </div>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon />}
                  aria-controls="panel5-content"
                  id="panel5-header"
                >
                  <Typography>Data</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div style={styleJ}>
                    <JSONViewer json={dddata} />
                  </div>
                </AccordionDetails>
              </Accordion>

            </Box>

          </TabPanel>
        </TabContext>
      </Box>

    </React.StrictMode>
  );
}
