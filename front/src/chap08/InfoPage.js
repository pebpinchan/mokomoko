
import React, { useState, Component } from 'react';
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

export default function InfoPage() {

const json1 = [{
		"dspnm": "値(apiinfo.dspnm)",
		"nmspace": "値(apiinfo.nmspace)",
		"httpmthd": "値(apiinfo.httpmthd)",
		"header": "値(apiinfo.header)",
		"data": {
			"uid": "値(data.uid)",
			"nmspace": "値(data.nmspace)",
			"value": "値(data.value)"
		}
}];
        const TreeModel = require('tree-model');
        const tree = new TreeModel();
        const model = JSON.parse(JSON.stringify(json1));
        const root = tree.parse(model);
       
        let arr = [];
        root.walk(node => {
          node.model.map(m => arr = arr.concat(Object.keys(m)));
        });
        arr = [...new Set(arr)];



        //const arrst = arr.join('\n');
        const arrst = {
	"dspnm": "名称",
	"nmspace": "ネームスペース",
	"httpmthd": "HTTPメソッド",
	"header": "ヘッダー",
	"data": {
		"label": "データ",
		"uid": "UID",
		"nmspace": "データネームスペース",
		"value": "値"
	}
};

  const [token, setToken] = useState("d8215d0c957ffdb1ee63c48527d9d9e5eb55f522ba850f8cbb121dc60f14c60a");
  const [text, setText] = useState("");
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");
  const [text4, setText4] = useState("");
  const [example, setExample] = useState(json1);
  const [example2, setExample2] = useState(JSON.stringify(json1, null, '\t'));
  const [jcol, setJcol] = useState(JSON.stringify(arrst, null, '\t'));
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
  async function doSomethingWithArg(url, v) {
    try {
      const res = await axios.get('http://172.23.67.87:5000/api/' + url + '?v=' + v);
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
      alert('Login Error: ' + text + ' : ' + text2 + ' : ' + error);
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

    const arr = cloneArray(JSON.parse(example2));

const object = JSON.parse(jcol);


const mapToObject = map =>
  [...map].reduce((l,[k,v]) => Object.assign(l, {[k]:v}), {});

const objectToMap = object =>
  new Map(Object.entries(object));

const map = new Map(Object.entries(object));


    
    for (let i = 0; i < arr.length; i++) {
      arr[i] = JSON.parse(JSON.stringify(arr[i]));
      Object.keys(arr[i]).forEach((item) => {
        if(!map.has(item)) delete arr[i][item]
      });
    }

    let arr2 = [];
    for (let i = 0; i < arr.length; i++) {
      if (Object.keys(arr[i]).length > 0) {
        let mergeAnimals = {};
        Object.keys(arr[i]).forEach((item) => {
          if (typeof(map.get(item)) == 'string') {
            mergeAnimals[map.get(item)] = arr[i][item];
          } else {
            let obj = {};
            Object.keys(arr[i][item]).forEach((item2) => {
              if (item2 != 'label') {
                obj[map.get(item)[item2]] = arr[i][item][item2];
              }
            });
            mergeAnimals[map.get(item).label] = obj;
          }
        });
        arr2.push(mergeAnimals);
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



  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


const Ltable = (jdata) => {
  if (typeof jdata != 'object') return jdata;

  const arrList = ['auth', 'datasets', 'datas', 'catalog', '__typename', 'group', '__pmdtype'];
  let countI = 1;
  return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableBody>

        {Object.keys(jdata).filter((jkey) => !arrList.includes(jkey)).map(v => (
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
          {v}
              </TableCell>

              <TableCell>
          {Ltable(jdata[v])}
              </TableCell>
            </TableRow>
        ))}

          </TableBody>
        </Table>
      </TableContainer>

  );
};



  return (
    <React.StrictMode>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <Divider style={{margin: "180px", marginTop: "80px", marginBottom: "80px"}}>
          <Chip label="Input" color="primary" variant="outlined" size="large" />
        </Divider>
      </Box>

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <Textarea minRows={10} maxRows={10} value={example2} onChange={(event) => setExample2(event.target.value)} />
      </Box>

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <Divider style={{margin: "180px", marginTop: "80px", marginBottom: "80px"}}>
          <Chip label="Setting" color="primary" variant="outlined" size="large" />
        </Divider>
      </Box>

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <Textarea minRows={10} maxRows={10} value={jcol} onChange={(event) => setJcol(event.target.value)} />
      </Box>

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <Stack spacing={2} direction="row">
          <Button variant="text" onClick={() => exclude()}>Update</Button>
        </Stack>
      </Box>

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <Divider style={{margin: "180px", marginTop: "80px", marginBottom: "80px"}}>
          <Chip label="View" color="primary" variant="outlined" size="large" />
        </Divider>
      </Box>

      <Box sx={{ width: '100%', typography: 'body1' }}>
        {Ltable(example)}
      </Box>
    </React.StrictMode>
  );
}
