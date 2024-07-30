import React, { useContext, useState } from "react";
import Graph, { Edge } from "react-json-graph";
import axios from 'axios';

import JSONViewer from 'react-json-viewer';

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';


import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

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



export default function DataProv() {







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

  const handleChange = (event) => {
    setText3(event.target.value);
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



class CustomNode extends React.PureComponent {
  static contextType = GrapgContext;


  render() {
    const { id, x, y, width, height } = this.props;
    const { data, setData } = this.context;
    const node = data.nodes.find((node) => node.id == id);
    return (
      <HtmlTooltip
        title={
          <React.Fragment>
            {Ltable(node.data)}
          </React.Fragment>
        }
      >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "white",
          alignItems: "center",
          border: "1px solid",
          borderColor: "grey",
          borderRadius: 5,
          padding: "0 10px",
          position: "absolute",
          left: x,
          top: y,
          width: 150,
          height: 35,
          cursor: "pointer",
          transition: "left 300ms, top 300ms"
        }}
        onChange={(newGraphJSON) => setData(newGraphJSON)}
        onClick={() => {
          setExample(node.data);



        }}
      >
        <div>-</div>
        <div>{node.label}</div>
      </div>
      </HtmlTooltip> 
    );
  }
}






  const initial = {
    nodes: [],
    edges: [],
    isStatic: true,
    isVertical: true,
    isDirected: true,
    height: 100
  };
  
  
  const Viz = () => {
    const { data, setData } = useContext(GrapgContext);
    return (
      <div>
        <Graph
          width={1300}
          height={data.height}
          json={data}
          Node={CustomNode}
        />
      </div>
    );
  };


  const [dsParent, setDsParent] = useState("");
  const [dsItems, setDsItems] = useState([]);
  const [selDsItems, setSelDsItems] = useState([]);
  const [selMData, setSelMData] = useState("{}");
  const [mData, setMData] = useState("{}");
  const [text3, setText3] = useState("橋梁"); // category
  const [textG, setTextG] = useState("スラブ"); // group
  const [textDC, setTextDC] = useState([]); // select dacs list
  const [textDC2, setTextDC2] = useState([]); // select dacs list
  const [selDC, setSelDC] = useState(''); // selected dacs
  const [selDC2, setSelDC2] = useState(''); // selected dacs
  const [textA, setTextA] = useState("図面データ"); // group
  const [aList, setAList] = useState([]); // select alias list
  const [selA, setSelA] = useState(''); // selected dacs
  const [data4, setData4] = useState([]);
  const [data, setData] = useState(initial);
  const [token, setToken] = useState("9d2ad0e79acbfad52bea1c89ac71755170be5c7a9684d1ef45298386ec2470eb");
  const [example, setExample] = useState("");








async function doInit() {
  const resDC = await axios.get('http://172.23.67.87:5000/api/dclist', {headers: {"Token":token}, data:{}});
  if (resDC.data) setTextDC(resDC.data);
}




  async function doAdd1() {
    if (text3 && textG && selDC) {
      let datan = {};
      datan['category'] = text3;
      datan['group'] = textG;
      datan['dacsdata'] = selDC;
      const response = await axios.post("http://172.23.67.87:5000/api/i/up", datan, {headers: {"Token":token, 'Content-Type': 'application/json'}});
      setTextDC2(response.data);
      await doXY(text3);
    }


  }

  async function doAdd2() {
    if (textA && text3 && textG && selDC2) {
      let datan = {};
      datan['category'] = text3;
      datan['group'] = textG;
      datan['dacsdata'] = selDC2;
      datan['alias'] = textA;
      const response = await axios.post("http://172.23.67.87:5000/api/i/mid", datan, {headers: {"Token":token, 'Content-Type': 'application/json'}});
      setAList(response.data);
      await doXY(text3);
    }


  }

  async function doAdd3() {
    if (text3 && textG && selDC) {
      let datan = {};
      datan['category'] = text3;
      datan['group'] = textG;
      datan['dacsdata'] = selDC;
      const response = await axios.post("http://172.23.67.87:5000/api/i/up", datan, {headers: {"Token":token, 'Content-Type': 'application/json'}});
      setTextDC2(response.data);
      await doXY(text3);
    }


  }
  async function doXY(selectV) {
    try {
      if (!selectV) {
        selectV = text3;
      }
      if (!selectV) return;
        
      
      const res = await axios.get('http://172.23.67.87:5000/api/pdatas?v=' + selectV, {headers: {"Token":token}, data:{}});
      if (res.data) {
        const res2 = await axios.get('http://172.23.67.87:5000/api/pdacs?v=' + selectV, {headers: {"Token":token}, data:{}});
        const mapDatas = res2.data;
        Object.keys(mapDatas).forEach((keyItem) => {
          mapDatas[keyItem]["metadata"]['data'] = JSON.parse(mapDatas[keyItem]["metadata"]['jsonStr']);
          mapDatas[keyItem]["schema"]['data'] = JSON.parse(mapDatas[keyItem]["schema"]['jsonStr']);
          delete mapDatas[keyItem]["metadata"]['jsonStr'];
          delete mapDatas[keyItem]["schema"]['jsonStr'];
        });

        setMData(mapDatas);
        const res3 = await axios.get('http://172.23.67.87:5000/api/pfdata?v=' + selectV, {headers: {"Token":token}, data:{}});
        const pfDatas = res3.data;

        const res4 = await axios.get('http://172.23.67.87:5000/api/pcdata', {headers: {"Token":token}, data:{}});
        setData4(res4.data);

        const categories = res.data;
        let list = [];
        let listLink = [];
        //list.push({
        //  id: '0',
        //  label: 'ALL',
        //  position: { x: 0, y: 0 }
        //});
        let countV = 1;
        let heightV = -100;

        let categoryPid = 0;
        let groupPid = 0;
        let dacsPid = 0;
        let aliasPid = 0;
        let dataSetPid = 0;

        let pfDataHeight = 0;
        let pfDataIdMap = {};
        Object.keys(pfDatas).forEach((keyItem) => {
          countV += 1;
          list.push({
            id: countV,
            label: keyItem,
            position: { x: 1000, y: pfDataHeight },
            data: pfDatas[keyItem]
          });
          pfDataIdMap[keyItem] = countV;
          pfDataHeight += 50;
        });



        categories.forEach((category) => {

          countV += 1;
          heightV += 100;
          list.push({
            id: countV,
            label: category.pname,
            position: { x: 50, y: heightV },
            data: category
          });
          heightV += 50
          categoryPid = countV;

          category.datas.forEach((group) => {
            countV += 1;
            list.push({
              id: countV,
              label: group.pname,
              position: { x: 150, y: heightV },
              data: group
            });
            heightV += 50
            groupPid = countV;
            listLink.push({source: categoryPid, target: groupPid});


            group.datas.forEach((alias) => {

              countV += 1;
              list.push({
                id: countV,
                label: alias.id,
                position: { x: 250, y: heightV },
                data: mapDatas[alias.id]
              });
              dacsPid = countV;
              listLink.push({source: groupPid, target: dacsPid});


              countV += 1;
              list.push({
                id: countV,
                label: alias.pname,
                position: { x: 450, y: heightV },
                data: alias
              });
              heightV += 50
              aliasPid = countV;
              listLink.push({source: dacsPid, target: aliasPid});

              alias.datas.forEach((dataSet) => {
                countV += 1;
                list.push({
                  id: countV,
                  label: dataSet.pname,
                  position: { x: 550, y: heightV },
                  data: dataSet
                });
                heightV += 50
                dataSetPid = countV;
                listLink.push({source: aliasPid, target: dataSetPid});

                const pfDataIds = dataSet.ids.split(',');
                pfDataIds.forEach((pfDataId) => {
                  listLink.push({source: dataSetPid, target: pfDataIdMap[pfDataId]});
                });

              });

            });

          });


        });
        const ini = {
          nodes: list,
          edges: listLink,
          isStatic: true,
          isVertical: true,
          isDirected: true,
          height: countV * 50
        };
        console.log(ini);
        await setData(ini);
      }
    } catch (error) {
      console.log(error);
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

  const LSDitem = () => {
    const handleChange = async (event) => {
      setSelDC2(event.target.value);
    };
    return (
      <Select
        labelId="lsd-label"
        id="lsd"
        value={selDC2}
        onChange={handleChange}
        label="Dacs Data"
        style={{width: "100%"}}
      >
        <MenuItem value="">
          None
        </MenuItem>
        {textDC2.map(v => (
          <MenuItem key={v} value={v}>{v}</MenuItem>
        ))}
      </Select>
    );
  };


  const LDitem = () => {
    const handleChange = async (event) => {
      setSelDC(event.target.value);
    };
    return (
      <Select
        labelId="dacs-list-label"
        id="dacs-list"
        value={selDC}
        onChange={handleChange}
        label="Dacs Data"
        style={{width: "100%"}}
      >
        <MenuItem value="">
          None
        </MenuItem>
        {textDC.map(v => (
          <MenuItem key={v} value={v}>{v}</MenuItem>
        ))}
      </Select>
    );
  };
  const Litem = () => {
    const handleChange = async (event) => {
      setSelA(event.target.value);
      try {
        setSelMData(mData[event.target.value]);
        const arrVi = mData[event.target.value]['metadata']['data']['list'].map((value, index) => {
          return {'value': index, 'name': value.data.file_id};
        });
        setDsItems(arrVi);
        setDsParent(mData[event.target.value]['schema']['id'] + ' : ' + mData[event.target.value]['metadata']['id']);
      } catch (error) {
        setSelMData({});
        setDsItems([]);
        setDsParent('');
      }


    };
    return (
      <Select
        labelId="alias-label"
        id="alias"
        value={selA}
        onChange={handleChange}
        label="Alias"
        style={{width: "100%"}}
      >
        <MenuItem value="">
          None
        </MenuItem>
        {aList.map(v => (
          <MenuItem key={v.value} value={v.value}>{v.name}</MenuItem>
        ))}
      </Select>
    );
  };






function IndeterminateCheckbox() {
  const [checked, setChecked] = React.useState([true, false]);

  const handleChange1 = (event) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const handleChange3 = (event) => {
    setChecked([checked[0], event.target.checked]);
  };

  const children = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      {dsItems.map(v => (
        <FormControlLabel
          label={v.name}
          control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
        />

      ))}
    </Box>
  );

  return (
    <div>
      <FormControlLabel
        label={dsParent}
        control={
          <Checkbox
            checked={checked[0] && checked[1]}
            indeterminate={checked[0] !== checked[1]}
            onChange={handleChange1}
          />
        }
      />
      {children}
    </div>
  );
}






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
              </TableCell>
              <TableCell>
              </TableCell>
              <TableCell>
              </TableCell>
              <TableCell>
                <Button variant="outlined" size="small" onClick={() => doInit()}>Init</Button>
              </TableCell>
            </TableRow>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                <TextField value={text3} onChange={(event) => setText3(event.target.value)} label="Category" variant="standard" />
              </TableCell>
              <TableCell>
                <TextField value={textG} onChange={(event) => setTextG(event.target.value)} label="Group" variant="standard" />
              </TableCell>
              <TableCell>
                <InputLabel id="dacs-list-label">DaCS Data</InputLabel>
                <LDitem />
              </TableCell>
              <TableCell>
                <Button variant="outlined" size="small" onClick={() => doAdd1()}>Add1</Button>
              </TableCell>
            </TableRow>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                <TextField value={textG} onChange={(event) => setTextG(event.target.value)} label="Group" variant="standard" />
              </TableCell>
              <TableCell>
                <InputLabel id="lsd-label">- DaCS Data</InputLabel>
                <LSDitem />
              </TableCell>
              <TableCell component="th" scope="row">
                <TextField value={textA} onChange={(event) => setTextA(event.target.value)} label="Alias" variant="standard" />
              </TableCell>
              <TableCell>
                <Button variant="outlined" size="small" onClick={() => doAdd2()}>Add2</Button>
              </TableCell>
            </TableRow>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                <InputLabel id="alias-label">- Alias</InputLabel>
                <Litem />
              </TableCell>
              <TableCell>
                dataset
              </TableCell>
              <TableCell component="th" scope="row">
                <IndeterminateCheckbox />
              </TableCell>
              <TableCell>
                <Button variant="outlined" size="small" onClick={() => doAdd3()}>Add3</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <Divider style={{margin: "180px", marginTop: "80px", marginBottom: "80px"}}>
          <Chip label="Preview" color="primary" variant="outlined" size="large" />
        </Divider>
      </Box>

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <GrapgContext.Provider value={{ data, setData }}>
          <Viz />
        </GrapgContext.Provider>
      </Box>

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <Divider style={{margin: "180px", marginTop: "80px", marginBottom: "80px"}}>
          <Chip label="Node" color="primary" variant="outlined" size="large" />
        </Divider>
      </Box>

      <Box sx={{ width: '100%', typography: 'body1' }}>
        {Ltable(example)}
      </Box>

    </React.StrictMode>
  );
}
